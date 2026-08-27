import React, { createContext, useContext, useState, useEffect } from "react";
import { setVoluntaryUserName, trackEvent } from "../utils/telemetryTracker";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  learningLevel?: string;
  selectedIndustry?: string;
  completedLabsCount: number;
  quizzesTakenCount: number;
  avgQuizScore: number | null;
}

interface UserAuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: string | null;
  isAuthModalOpen: boolean;
  authModalMode: "signin" | "signup" | "profile" | "forgot";
  openAuthModal: (mode?: "signin" | "signup" | "profile" | "forgot") => void;
  closeAuthModal: () => void;
  setAuthModalMode: (mode: "signin" | "signup" | "profile" | "forgot") => void;
  signUpUser: (name: string, email: string, pass: string, level?: string, ind?: string) => Promise<{ success: boolean; error?: string }>;
  signInUser: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signOutUser: () => void;
  updateProfile: (name: string, level?: string, ind?: string) => Promise<{ success: boolean; error?: string }>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

const USER_TOKEN_KEY = "tagskills_learner_token";
const USER_PROFILE_KEY = "tagskills_learner_profile";
const CRED_TOKEN_PREFIX = "tagskills_cred_";

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(USER_PROFILE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem(USER_TOKEN_KEY);
    } catch {
      return false;
    }
  });

  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup" | "profile" | "forgot">("signin");

  // Validate and sync session with server on mount
  useEffect(() => {
    const token = localStorage.getItem(USER_TOKEN_KEY);
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    fetch("/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.user) {
          setCurrentUser(data.user);
          localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(data.user));
          setIsAuthenticated(true);
        } else if (data && data.error && (data.error.includes("expired") || data.error.includes("Invalid") || data.error.includes("required"))) {
          localStorage.removeItem(USER_TOKEN_KEY);
          localStorage.removeItem(USER_PROFILE_KEY);
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        // Keep active session in case of brief network hiccup
      });
  }, []);

  const openAuthModal = (mode: "signin" | "signup" | "profile" | "forgot" = "signin") => {
    setAuthModalMode(mode);
    setAuthError(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthError(null);
  };

  // Sign Up
  const signUpUser = async (name: string, email: string, pass: string, level?: string, ind?: string): Promise<{ success: boolean; error?: string }> => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass, learningLevel: level, selectedIndustry: ind })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success || !data.user) {
        const err = data.error || "Registration failed. Please check your details.";
        setAuthError(err);
        setAuthLoading(false);
        return { success: false, error: err };
      }

      // Store credential token keyed by email for future sign-ins (no server-side DB required)
      if (data.credentialToken) {
        localStorage.setItem(CRED_TOKEN_PREFIX + data.user.email.toLowerCase(), data.credentialToken);
      }

      localStorage.setItem(USER_TOKEN_KEY, data.token);
      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(data.user));
      setVoluntaryUserName(data.user.name);

      setCurrentUser(data.user);
      setIsAuthenticated(true);
      setAuthLoading(false);
      closeAuthModal();

      trackEvent("PAGE_VIEW", {
        title: `Welcome ${data.user.name}`,
        metadata: { learningLevel: data.user.learningLevel, industryName: data.user.selectedIndustry }
      });

      return { success: true };
    } catch {
      const err = "Network error during registration. Please try again.";
      setAuthError(err);
      setAuthLoading(false);
      return { success: false, error: err };
    }
  };

  // Sign In
  const signInUser = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const cleanEmail = email.trim().toLowerCase();
      // Read credential token stored during registration — enables sign-in without server DB
      const credentialToken = localStorage.getItem(CRED_TOKEN_PREFIX + cleanEmail) || undefined;

      const res = await fetch("/api/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password: pass, credentialToken })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success || !data.user) {
        const err = data.error || "Email or password is incorrect. Please try again.";
        setAuthError(err);
        setAuthLoading(false);
        return { success: false, error: err };
      }

      localStorage.setItem(USER_TOKEN_KEY, data.token);
      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(data.user));
      setVoluntaryUserName(data.user.name);

      setCurrentUser(data.user);
      setIsAuthenticated(true);
      setAuthLoading(false);
      closeAuthModal();

      trackEvent("PAGE_VIEW", {
        title: `Login ${data.user.name}`,
        metadata: { learningLevel: data.user.learningLevel, industryName: data.user.selectedIndustry }
      });

      return { success: true };
    } catch {
      const err = "Network error during sign in. Please try again.";
      setAuthError(err);
      setAuthLoading(false);
      return { success: false, error: err };
    }
  };




  // Sign Out
  const signOutUser = () => {
    localStorage.removeItem(USER_TOKEN_KEY);
    localStorage.removeItem(USER_PROFILE_KEY);
    sessionStorage.removeItem(USER_TOKEN_KEY);
    sessionStorage.removeItem(USER_PROFILE_KEY);
    setCurrentUser(null);
    setIsAuthenticated(false);
    closeAuthModal();
  };

  // Update Profile
  const updateProfile = async (name: string, level?: string, ind?: string): Promise<{ success: boolean; error?: string }> => {
    setAuthLoading(true);
    setAuthError(null);

    const token = localStorage.getItem(USER_TOKEN_KEY);
    if (!token) {
      setAuthLoading(false);
      return { success: false, error: "Not authenticated." };
    }

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, learningLevel: level, selectedIndustry: ind })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success || !data.user) {
        const err = data.error || "Profile update failed.";
        setAuthError(err);
        setAuthLoading(false);
        return { success: false, error: err };
      }

      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(data.user));
      setVoluntaryUserName(data.user.name);
      setCurrentUser(data.user);
      setAuthLoading(false);
      return { success: true };
    } catch {
      const err = "Network error during profile update.";
      setAuthError(err);
      setAuthLoading(false);
      return { success: false, error: err };
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        authLoading,
        authError,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
        signUpUser,
        signInUser,
        signOutUser,
        updateProfile
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};
