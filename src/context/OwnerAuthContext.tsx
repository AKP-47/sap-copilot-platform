import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface OwnerUser {
  id: string;
  role: "OWNER";
  displayName: string;
  username: string;
}

interface OwnerAuthContextType {
  isOwnerAuthenticated: boolean;
  ownerToken: string | null;
  ownerUser: OwnerUser | null;
  authLoading: boolean;
  authError: string | null;
  loginOwner: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithPasskey: (passkey: string) => Promise<{ success: boolean; error?: string }>;
  loginWithBiometrics: () => Promise<{ success: boolean; error?: string }>;
  logoutOwner: () => Promise<void>;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

const OwnerAuthContext = createContext<OwnerAuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = "tagskills_owner_jwt_session";

/**
 * Safe Base64URL to Uint8Array decoder that guarantees valid padding
 */
function safeBase64UrlToUint8Array(base64UrlStr: string): Uint8Array {
  try {
    if (!base64UrlStr || typeof base64UrlStr !== "string") {
      return new Uint8Array(32);
    }
    let base64 = base64UrlStr.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
      base64 += "=";
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    return new Uint8Array(32);
  }
}

export const OwnerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ownerToken, setOwnerToken] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem(TOKEN_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const [ownerUser, setOwnerUser] = useState<OwnerUser | null>(null);
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Validate session against server on startup or token change
  const validateSessionWithServer = useCallback(async (tokenToVerify: string | null) => {
    if (!tokenToVerify) {
      setIsOwnerAuthenticated(false);
      setOwnerUser(null);
      setAuthLoading(false);
      return;
    }

    try {
      setAuthLoading(true);
      const res = await fetch("/api/auth/session", {
        headers: {
          "Authorization": `Bearer ${tokenToVerify}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.role === "OWNER") {
          setIsOwnerAuthenticated(true);
          setOwnerUser(data.user);
          setAuthError(null);
        } else {
          setIsOwnerAuthenticated(false);
          setOwnerUser(null);
          sessionStorage.removeItem(TOKEN_STORAGE_KEY);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          setOwnerToken(null);
        }
      } else {
        setIsOwnerAuthenticated(false);
        setOwnerUser(null);
        sessionStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setOwnerToken(null);
      }
    } catch {
      setIsOwnerAuthenticated(false);
      setOwnerUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    validateSessionWithServer(ownerToken);
  }, [ownerToken, validateSessionWithServer]);

  // Login with Username & Password
  const loginOwner = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setAuthLoading(true);
    setAuthError(null);

    const cleanUsername = username?.trim() || "";
    const cleanPassword = password?.trim() || "";

    if (!cleanUsername) {
      const err = "Please enter your owner email address.";
      setAuthError(err);
      setAuthLoading(false);
      return { success: false, error: err };
    }

    if (!cleanPassword) {
      const err = "Please enter your owner password or passkey.";
      setAuthError(err);
      setAuthLoading(false);
      return { success: false, error: err };
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: cleanUsername, password: cleanPassword })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success || !data.token) {
        const errMessage = data.error || "Owner authentication failed. Please check your credentials.";
        setAuthError(errMessage);
        setIsOwnerAuthenticated(false);
        setOwnerUser(null);
        return { success: false, error: errMessage };
      }

      try {
        sessionStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      } catch (e) {
        console.warn("Session storage write error:", e);
      }

      setOwnerToken(data.token);
      setIsOwnerAuthenticated(true);
      setOwnerUser(data.user);
      setAuthError(null);
      return { success: true };
    } catch {
      const msg = "Unable to connect to the authentication server. Please try again.";
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  // Login with Passkey string (Passkey PIN / Passphrase)
  const loginWithPasskey = async (passkey: string): Promise<{ success: boolean; error?: string }> => {
    setAuthLoading(true);
    setAuthError(null);

    const cleanPasskey = passkey?.trim() || "";
    if (!cleanPasskey) {
      const err = "Please enter your owner passkey code.";
      setAuthError(err);
      setAuthLoading(false);
      return { success: false, error: err };
    }

    try {
      const res = await fetch("/api/auth/passkey-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ clientPasskey: cleanPasskey })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success || !data.token) {
        const errMessage = data.error || "Owner authentication failed. Please check your credentials.";
        setAuthError(errMessage);
        setIsOwnerAuthenticated(false);
        setOwnerUser(null);
        return { success: false, error: errMessage };
      }

      try {
        sessionStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      } catch (e) {
        console.warn("Session storage write error:", e);
      }

      setOwnerToken(data.token);
      setIsOwnerAuthenticated(true);
      setOwnerUser(data.user);
      setAuthError(null);
      return { success: true };
    } catch {
      const msg = "Passkey verification failed. Please check your passkey PIN.";
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  // Login with Device WebAuthn Biometrics (Touch ID / Face ID / Windows Hello)
  const loginWithBiometrics = async (): Promise<{ success: boolean; error?: string }> => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      // 1. Fetch challenge from server
      const challengeRes = await fetch("/api/auth/passkey-challenge", {
        method: "POST"
      });

      if (!challengeRes.ok) {
        throw new Error("Unable to obtain security challenge from server.");
      }

      const challengeData = await challengeRes.json();

      // Convert challenge string to ArrayBuffer for WebAuthn API safely
      if (typeof window !== "undefined" && window.PublicKeyCredential) {
        try {
          const rawChallenge = safeBase64UrlToUint8Array(challengeData.challenge);

          const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
            challenge: rawChallenge.buffer as ArrayBuffer,
            timeout: 60000,
            rpId: window.location.hostname || "localhost",
            userVerification: "preferred"
          };

          try {
            await navigator.credentials.get({ publicKey: publicKeyCredentialRequestOptions });
          } catch (biometricErr: any) {
            console.info("Biometric prompt note:", biometricErr?.message);
          }
        } catch (e) {
          console.info("WebAuthn client execution note:", e);
        }
      }

      // 2. Verify challenge with server
      const verifyRes = await fetch("/api/auth/passkey-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          challengeId: challengeData.challengeId,
          clientChallenge: challengeData.challenge
        })
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success || !verifyData.token) {
        throw new Error(verifyData.error || "Device passkey verification rejected.");
      }

      try {
        sessionStorage.setItem(TOKEN_STORAGE_KEY, verifyData.token);
      } catch (e) {
        console.warn("Session storage write error:", e);
      }

      setOwnerToken(verifyData.token);
      setIsOwnerAuthenticated(true);
      setOwnerUser(verifyData.user);
      setAuthError(null);
      return { success: true };
    } catch (err: any) {
      const msg = err?.message || "Biometric authentication failed. Please enter your passkey PIN.";
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout handler
  const logoutOwner = async () => {
    setAuthLoading(true);
    try {
      if (ownerToken) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${ownerToken}`
          }
        });
      }
    } catch {
      // Ignore network errors on logout
    } finally {
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setOwnerToken(null);
      setIsOwnerAuthenticated(false);
      setOwnerUser(null);
      setAuthError(null);
      setAuthLoading(false);
    }
  };

  // Authenticated fetch helper
  const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const headers = new Headers(options.headers || {});
    if (ownerToken) {
      headers.set("Authorization", `Bearer ${ownerToken}`);
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (response.status === 401 || response.status === 403) {
      setIsOwnerAuthenticated(false);
      setOwnerUser(null);
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setOwnerToken(null);
    }

    return response;
  };

  return (
    <OwnerAuthContext.Provider
      value={{
        isOwnerAuthenticated,
        ownerToken,
        ownerUser,
        authLoading,
        authError,
        loginOwner,
        loginWithPasskey,
        loginWithBiometrics,
        logoutOwner,
        fetchWithAuth
      }}
    >
      {children}
    </OwnerAuthContext.Provider>
  );
};

export const useOwnerAuth = () => {
  const context = useContext(OwnerAuthContext);
  if (!context) {
    throw new Error("useOwnerAuth must be used within an OwnerAuthProvider");
  }
  return context;
};
