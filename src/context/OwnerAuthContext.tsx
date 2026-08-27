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
  logoutOwner: () => Promise<void>;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

const OwnerAuthContext = createContext<OwnerAuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = "tagskills_owner_jwt_session";

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
          // Access Denied / Invalid role
          setIsOwnerAuthenticated(false);
          setOwnerUser(null);
          sessionStorage.removeItem(TOKEN_STORAGE_KEY);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          setOwnerToken(null);
        }
      } else {
        // Token expired or invalid signature
        setIsOwnerAuthenticated(false);
        setOwnerUser(null);
        sessionStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setOwnerToken(null);
      }
    } catch (err: any) {
      console.warn("Owner session validation network error:", err);
      setIsOwnerAuthenticated(false);
      setOwnerUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    validateSessionWithServer(ownerToken);
  }, [ownerToken, validateSessionWithServer]);

  // Login handler
  const loginOwner = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.token) {
        const errMessage = data.error || "Authentication failed. Access Denied.";
        setAuthError(errMessage);
        setIsOwnerAuthenticated(false);
        setOwnerUser(null);
        return { success: false, error: errMessage };
      }

      // Store token in session storage
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
    } catch (err: any) {
      const msg = err?.message || "Network error during authentication.";
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
      // Invalidate on unauthorized response
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
