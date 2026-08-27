import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface OwnerUser {
  id: string;
  role: "OWNER";
  displayName: string;
  username?: string;
}

interface OwnerAuthContextType {
  isOwnerAuthenticated: boolean;
  ownerToken: string | null;
  ownerUser: OwnerUser | null;
  isInitialized: boolean | null;
  authLoading: boolean;
  authError: string | null;
  checkAuthStatus: () => Promise<void>;
  setupOwner: (username: string, passkey: string) => Promise<{ success: boolean; error?: string }>;
  loginOwner: (username: string, passkey: string) => Promise<{ success: boolean; error?: string }>;
  logoutOwner: () => Promise<void>;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

const OwnerAuthContext = createContext<OwnerAuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = "tagskills_owner_jwt_session";

export const OwnerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ownerToken, setOwnerToken] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(TOKEN_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const [ownerUser, setOwnerUser] = useState<OwnerUser | null>(() => {
    try {
      const stored = sessionStorage.getItem(TOKEN_STORAGE_KEY);
      if (stored) {
        return {
          id: "tagskills-single-owner-001",
          role: "OWNER",
          displayName: "Website Owner"
        };
      }
      return null;
    } catch {
      return null;
    }
  });

  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState<boolean>(() => {
    try {
      return !!sessionStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return false;
    }
  });

  const [isInitialized, setIsInitialized] = useState<boolean | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check setup status
  const checkAuthStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/status");
      if (res.ok) {
        const data = await res.json();
        setIsInitialized(data.isInitialized);
      } else {
        // Fallback default: assume initialized
        setIsInitialized(true);
      }
    } catch {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Validate active session
  useEffect(() => {
    if (ownerToken) {
      setIsOwnerAuthenticated(true);
      setOwnerUser({
        id: "tagskills-single-owner-001",
        role: "OWNER",
        displayName: "Website Owner"
      });
    }
  }, [ownerToken]);

  // One-time Setup
  const setupOwner = async (username: string, passkey: string): Promise<{ success: boolean; error?: string }> => {
    setAuthLoading(true);
    setAuthError(null);

    const cleanUser = username?.trim();
    const cleanPass = passkey?.trim();

    if (!cleanUser || cleanUser.length < 3) {
      const err = "Please enter an owner account identifier (at least 3 characters).";
      setAuthError(err);
      setAuthLoading(false);
      return { success: false, error: err };
    }

    if (!cleanPass || cleanPass.length < 4) {
      const err = "Please choose a private passkey of at least 4 characters.";
      setAuthError(err);
      setAuthLoading(false);
      return { success: false, error: err };
    }

    try {
      const res = await fetch("/api/auth/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUser, passkey: cleanPass })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success || !data.token) {
        const err = data.error || "Failed to initialize owner account.";
        setAuthError(err);
        setAuthLoading(false);
        return { success: false, error: err };
      }

      sessionStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      setOwnerToken(data.token);
      setIsOwnerAuthenticated(true);
      setIsInitialized(true);
      setOwnerUser({
        id: "tagskills-single-owner-001",
        role: "OWNER",
        displayName: "Website Owner"
      });
      setAuthLoading(false);
      return { success: true };
    } catch {
      const err = "Network error during owner setup. Please check your connection.";
      setAuthError(err);
      setAuthLoading(false);
      return { success: false, error: err };
    }
  };

  // Login
  const loginOwner = async (username: string, passkey: string): Promise<{ success: boolean; error?: string }> => {
    setAuthLoading(true);
    setAuthError(null);

    const cleanUser = username?.trim();
    const cleanPass = passkey?.trim();

    if (!cleanUser) {
      const err = "Please enter your owner account identifier.";
      setAuthError(err);
      setAuthLoading(false);
      return { success: false, error: err };
    }

    if (!cleanPass) {
      const err = "Please enter your private owner passkey.";
      setAuthError(err);
      setAuthLoading(false);
      return { success: false, error: err };
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUser, passkey: cleanPass })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success || !data.token) {
        const err = data.error || "Authentication failed. Please check your credentials.";
        setAuthError(err);
        setAuthLoading(false);
        return { success: false, error: err };
      }

      sessionStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      setOwnerToken(data.token);
      setIsOwnerAuthenticated(true);
      setOwnerUser({
        id: "tagskills-single-owner-001",
        role: "OWNER",
        displayName: "Website Owner"
      });
      setAuthLoading(false);
      return { success: true };
    } catch {
      const err = "Unable to connect to authentication server. Please try again.";
      setAuthError(err);
      setAuthLoading(false);
      return { success: false, error: err };
    }
  };

  // Logout
  const logoutOwner = async () => {
    setAuthLoading(true);
    try {
      if (ownerToken) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { "Authorization": `Bearer ${ownerToken}` }
        }).catch(() => null);
      }
    } catch {
      // Ignore
    } finally {
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      setOwnerToken(null);
      setIsOwnerAuthenticated(false);
      setOwnerUser(null);
      setAuthError(null);
      setAuthLoading(false);
    }
  };

  // Authenticated Fetch
  const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const headers = new Headers(options.headers || {});
    if (ownerToken) {
      headers.set("Authorization", `Bearer ${ownerToken}`);
    }
    return fetch(url, { ...options, headers });
  };

  return (
    <OwnerAuthContext.Provider
      value={{
        isOwnerAuthenticated,
        ownerToken,
        ownerUser,
        isInitialized,
        authLoading,
        authError,
        checkAuthStatus,
        setupOwner,
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
