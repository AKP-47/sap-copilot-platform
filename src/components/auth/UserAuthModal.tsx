import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { useSap } from "../../context/SapContext";
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  LogOut,
  Calendar,
  Layers,
  Award,
  KeyRound
} from "lucide-react";

export const UserAuthModal: React.FC = () => {
  const { 
    currentUser, 
    isAuthenticated, 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    setAuthModalMode, 
    signUpUser, 
    signInUser, 
    signOutUser, 
    updateProfile,
    authLoading, 
    authError 
  } = useUserAuth();

  const { learningLevel, setLearningLevel } = useSap();

  // Sign In / Sign Up Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Forgot / Reset Password State
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetStep, setResetStep] = useState<"request" | "verify">("request");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccessMsg, setResetSuccessMsg] = useState<string | null>(null);

  // Profile Edit State
  const [editName, setEditName] = useState(currentUser?.name || "");
  const [editLevel, setEditLevel] = useState(currentUser?.learningLevel || "Beginner");
  const [editIndustry, setEditIndustry] = useState(currentUser?.selectedIndustry || "Automotive");
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowNewPassword(false);
    setLocalError(null);
    setProfileSuccess(null);
    setResetSuccessMsg(null);
    setResetStep("request");
    if (currentUser) {
      setEditName(currentUser.name);
      setEditLevel(currentUser.learningLevel || "Beginner");
      setEditIndustry(currentUser.selectedIndustry || "Automotive");
    }
  }, [authModalMode, isAuthModalOpen, currentUser]);

  if (!isAuthModalOpen) return null;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanName || cleanName.length < 2) {
      setLocalError("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    if (!cleanPass || cleanPass.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    if (cleanPass !== confirmPassword.trim()) {
      setLocalError("Passwords do not match.");
      return;
    }

    const res = await signUpUser(cleanName, cleanEmail, cleanPass, learningLevel, "Automotive");
    if (!res.success && res.error) {
      setLocalError(res.error);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail) {
      setLocalError("Please enter your email address.");
      return;
    }

    if (!cleanPass) {
      setLocalError("Please enter your password.");
      return;
    }

    const res = await signInUser(cleanEmail, cleanPass);
    if (!res.success && res.error) {
      setLocalError(res.error);
    }
  };

  const handleForgotRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setResetSuccessMsg(null);

    const cleanEmail = resetEmail.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    setResetLoading(true);
    try {
      const res = await fetch("/api/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail })
      });
      const data = await res.json().catch(() => ({}));
      setResetLoading(false);

      if (res.ok) {
        setResetSuccessMsg("A 6-digit verification code has been sent. Please enter it below.");
        if (data.demoCode) setResetToken(data.demoCode);
        setResetStep("verify");
      } else {
        setLocalError(data.error || "Failed to send reset code.");
      }
    } catch {
      setResetLoading(false);
      setLocalError("Network error. Please try again.");
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setResetSuccessMsg(null);

    if (!resetToken.trim()) {
      setLocalError("Please enter the 6-digit verification code.");
      return;
    }

    if (!newPassword.trim() || newPassword.trim().length < 6) {
      setLocalError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword.trim() !== confirmNewPassword.trim()) {
      setLocalError("Passwords do not match.");
      return;
    }

    setResetLoading(true);
    try {
      const res = await fetch("/api/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: resetEmail.trim(),
          token: resetToken.trim(),
          newPassword: newPassword.trim()
        })
      });
      const data = await res.json().catch(() => ({}));
      setResetLoading(false);

      if (res.ok && data.success) {
        setResetSuccessMsg("Password reset successfully! You can now sign in.");
        setEmail(resetEmail.trim());
        setPassword("");
        setTimeout(() => {
          setAuthModalMode("signin");
        }, 1500);
      } else {
        setLocalError(data.error || "Failed to reset password.");
      }
    } catch {
      setResetLoading(false);
      setLocalError("Network error. Please try again.");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setProfileSuccess(null);

    const cleanName = editName.trim();
    if (!cleanName || cleanName.length < 2) {
      setLocalError("Name must be at least 2 characters.");
      return;
    }

    const res = await updateProfile(cleanName, editLevel, editIndustry);
    if (res.success) {
      setProfileSuccess("Profile updated successfully!");
      setLearningLevel(editLevel as any);
      setTimeout(() => setProfileSuccess(null), 3000);
    } else {
      setLocalError(res.error || "Failed to update profile.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={closeAuthModal}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================ */}
        {/* 1. SIGN UP VIEW                                              */}
        {/* ============================================================ */}
        {authModalMode === "signup" && (
          <div className="space-y-5">
            <div className="space-y-1.5 text-center">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Welcome to TagSkills SAP Copilot
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Create your account and start your SAP learning journey.
              </p>
            </div>

            {(localError || authError) && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{localError || authError}</span>
              </div>
            )}

            <form onSubmit={handleSignUp} noValidate className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Akshat Pandey"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                  <button
                    type="button"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                <span>{authLoading ? "Creating Account..." : "Create Account →"}</span>
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setAuthModalMode("signin")}
                  className="font-bold text-amber-500 hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. SIGN IN VIEW                                              */}
        {/* ============================================================ */}
        {authModalMode === "signin" && (
          <div className="space-y-5">
            <div className="space-y-1.5 text-center">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Welcome to TagSkills SAP Copilot
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sign in to continue your SAP learning journey.
              </p>
            </div>

            {(localError || authError) && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{localError || authError}</span>
              </div>
            )}

            <form onSubmit={handleSignIn} noValidate className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => setAuthModalMode("forgot")}
                    className="text-[11px] font-bold text-slate-400 hover:text-amber-500 cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                <span>{authLoading ? "Signing In..." : "Sign In →"}</span>
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500">
                New to SAP Copilot?{" "}
                <button
                  type="button"
                  onClick={() => setAuthModalMode("signup")}
                  className="font-bold text-amber-500 hover:underline cursor-pointer"
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. FORGOT / RESET PASSWORD VIEW                              */}
        {/* ============================================================ */}
        {authModalMode === "forgot" && (
          <div className="space-y-5">
            <div className="space-y-1.5 text-center">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {resetStep === "request" ? "Reset Password" : "Enter Verification Code"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {resetStep === "request" 
                  ? "Enter your registered email to receive a 6-digit verification code."
                  : `Enter the code sent to ${resetEmail} and choose a new password.`}
              </p>
            </div>

            {resetSuccessMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-200 flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>{resetSuccessMsg}</span>
              </div>
            )}

            {(localError || authError) && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{localError || authError}</span>
              </div>
            )}

            {resetStep === "request" ? (
              <form onSubmit={handleForgotRequest} noValidate className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Registered Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  <span>{resetLoading ? "Sending Code..." : "Send Verification Code →"}</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetSubmit} noValidate className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">6-Digit Verification Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value.replace(/\D/g, ""))}
                    placeholder="123456"
                    className="w-full text-center tracking-widest text-lg font-mono py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">New Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                    <button
                      type="button"
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  <span>{resetLoading ? "Updating Password..." : "Set New Password →"}</span>
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => setAuthModalMode("signin")}
              className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
            >
              ← Back to Sign In
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. USER PROFILE VIEW                                         */}
        {/* ============================================================ */}
        {authModalMode === "profile" && currentUser && (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white text-lg font-black flex items-center justify-center shadow-md">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    {currentUser.name}
                  </h2>
                  <p className="text-xs text-slate-400">{currentUser.email}</p>
                </div>
              </div>
            </div>

            {profileSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-200 flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>{profileSuccess}</span>
              </div>
            )}

            {(localError || authError) && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{localError || authError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Learning Level</label>
                <select
                  value={editLevel}
                  onChange={(e) => setEditLevel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                >
                  <option value="Beginner">Beginner (Foundations)</option>
                  <option value="Intermediate">Intermediate (Hands-on)</option>
                  <option value="Advanced">Advanced (Consultant Level)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Primary Industry Focus</label>
                <select
                  value={editIndustry}
                  onChange={(e) => setEditIndustry(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                >
                  <option value="Automotive">Automotive & Manufacturing</option>
                  <option value="Pharma">Pharmaceuticals & Healthcare</option>
                  <option value="Retail">Retail & FMCG</option>
                  <option value="Chemicals">Process & Chemicals</option>
                  <option value="HighTech">High-Tech & Electronics</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                {authLoading ? "Saving..." : "Save Profile Changes"}
              </button>
            </form>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={signOutUser}
                className="flex items-center space-x-1 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
              <span className="text-[10px] text-slate-400">
                Member since {new Date(currentUser.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
