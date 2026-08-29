import React, { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { useSap } from "../../context/SapContext";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  Shield
} from "lucide-react";

export const AuthGatewayScreen: React.FC = () => {
  const { signUpUser, signInUser, authLoading, authError } = useUserAuth();
  const { learningLevel } = useSap();

  // Mode: signin | signup | forgot | reset
  const [mode, setMode] = useState<"signin" | "signup" | "forgot" | "reset">("signin");

  // Sign In State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Sign Up State
  const [name, setName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);          // must be explicitly checked
  const [marketingConsent, setMarketingConsent] = useState(false); // optional
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  // Forgot / Reset Password State
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccessMsg, setResetSuccessMsg] = useState<string | null>(null);

  const [localError, setLocalError] = useState<string | null>(null);

  const switchMode = (targetMode: "signin" | "signup" | "forgot" | "reset") => {
    setMode(targetMode);
    setLocalError(null);
    setResetSuccessMsg(null);
    setShowSignInPassword(false);
    setShowSignUpPassword(false);
    setShowConfirmPassword(false);
    setShowNewPassword(false);
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const cleanEmail = signInEmail.trim();
    const cleanPass = signInPassword.trim();

    if (!cleanEmail) {
      setLocalError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setLocalError("Please enter a valid email address.");
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

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const cleanName = name.trim();
    const cleanEmail = signUpEmail.trim();
    const cleanPass = signUpPassword.trim();

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

    if (!agreeTerms) {
      setLocalError("Please read and agree to the Privacy Policy before creating your account.");
      return;
    }

    const res = await signUpUser(cleanName, cleanEmail, cleanPass, learningLevel, "Automotive", true, marketingConsent);
    if (!res.success && res.error) {
      setLocalError(res.error);
    }
  };


  const handleForgotSubmit = async (e: React.FormEvent) => {
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
        setResetSuccessMsg("A 6-digit verification code has been generated. Enter it below to set a new password.");
        if (data.demoCode) setResetToken(data.demoCode);
        setMode("reset");
      } else {
        setLocalError(data.error || "Failed to send reset code. Please try again.");
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
        setResetSuccessMsg("Password reset successfully! You can now sign in with your new password.");
        setSignInEmail(resetEmail.trim());
        setSignInPassword("");
        setTimeout(() => {
          switchMode("signin");
        }, 1500);
      } else {
        setLocalError(data.error || "Failed to reset password. Please verify the code.");
      }
    } catch {
      setResetLoading(false);
      setLocalError("Network error. Please try again.");
    }
  };

  return (
    <>
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950 selection:bg-amber-500 selection:text-white relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-md w-full relative z-10 space-y-6">
        
        {/* Institute Branding Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-xl">
            <img 
              src="/tagskills-logo.jpg" 
              alt="TagSkills Official Logo" 
              className="h-10 w-auto object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-block mb-1">
              TAGSKILLS LEARNING PLATFORM
            </span>
          </div>
        </div>

        {/* Authentication Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* ============================================================ */}
          {/* 1. MANDATORY SIGN IN VIEW                                    */}
          {/* ============================================================ */}
          {mode === "signin" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1 text-center">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Welcome to TagSkills SAP Copilot
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  Sign in to continue your SAP learning journey.
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

              <form onSubmit={handleSignInSubmit} noValidate className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      autoFocus
                      autoComplete="email"
                      value={signInEmail}
                      onChange={(e) => {
                        setSignInEmail(e.target.value);
                        if (localError) setLocalError(null);
                      }}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                    <button
                      type="button"
                      onClick={() => switchMode("forgot")}
                      className="text-[11px] font-bold text-slate-400 hover:text-amber-500 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showSignInPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={signInPassword}
                      onChange={(e) => {
                        setSignInPassword(e.target.value);
                        if (localError) setLocalError(null);
                      }}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none transition-all"
                    />
                    <button
                      type="button"
                      aria-label={showSignInPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                    >
                      {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.01] flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  <span>{authLoading ? "Signing In..." : "Sign In →"}</span>
                </button>
              </form>

              <div className="text-center pt-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  New learner?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("signup")}
                    className="font-bold text-amber-500 hover:underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 2. CREATE ACCOUNT VIEW                                       */}
          {/* ============================================================ */}
          {mode === "signup" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1 text-center">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Welcome to TagSkills SAP Copilot
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  Create your account and start your SAP learning journey.
                </p>
              </div>

              {(localError || authError) && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{localError || authError}</span>
                </div>
              )}

              <form onSubmit={handleSignUpSubmit} noValidate className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      autoFocus
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (localError) setLocalError(null);
                      }}
                      placeholder="e.g. Akshat Pandey"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none transition-all"
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
                      value={signUpEmail}
                      onChange={(e) => {
                        setSignUpEmail(e.target.value);
                        if (localError) setLocalError(null);
                      }}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                    <span className="text-[10px] text-slate-400">Min 6 characters</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showSignUpPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={signUpPassword}
                      onChange={(e) => {
                        setSignUpPassword(e.target.value);
                        if (localError) setLocalError(null);
                      }}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none transition-all"
                    />
                    <button
                      type="button"
                      aria-label={showSignUpPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                    >
                      {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (localError) setLocalError(null);
                      }}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none transition-all"
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

                {/* ── Privacy Policy & Consent Section ── */}
                <div
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-4 space-y-3"
                  role="group"
                  aria-labelledby="consent-section-heading"
                >
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-amber-500 shrink-0" />
                    <span id="consent-section-heading" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Privacy Policy &amp; Consent
                    </span>
                  </div>

                  {/* REQUIRED — Privacy Consent */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);
                        if (localError) setLocalError(null);
                      }}
                      className="mt-0.5 w-5 h-5 rounded accent-amber-500 cursor-pointer shrink-0 focus:ring-2 focus:ring-amber-400 focus:ring-offset-1"
                      aria-required="true"
                    />
                    <label htmlFor="privacyConsent" className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed cursor-pointer">
                      <span className="inline-block px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded mr-1.5 align-middle">
                        Required
                      </span>
                      I have read and agree to the{" "}
                      <button
                        type="button"
                        onClick={() => setShowPrivacyPolicy(true)}
                        className="text-amber-500 font-semibold hover:underline focus:outline-none focus:underline"
                        aria-label="Open Privacy Policy"
                      >
                        Privacy Policy
                      </button>{" "}
                      and consent to TagSkills EdTech Pvt. Ltd. collecting, storing, and using my personal information for candidate registration, course counselling, communication, training-related services, and other purposes described in the Privacy Policy. I understand that my information will be handled in accordance with the applicable privacy and data-protection laws.
                    </label>
                  </div>

                  {/* OPTIONAL — Marketing Consent */}
                  <div className="flex items-start space-x-3 pt-1 border-t border-slate-200 dark:border-slate-700">
                    <input
                      type="checkbox"
                      id="marketingConsent"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded accent-amber-500 cursor-pointer shrink-0 focus:ring-2 focus:ring-amber-400 focus:ring-offset-1"
                    />
                    <label htmlFor="marketingConsent" className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed cursor-pointer">
                      <span className="inline-block px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded mr-1.5 align-middle">
                        Optional
                      </span>
                      I agree to receive relevant updates, course information, counselling calls, and communications from TagSkills EdTech Pvt. Ltd.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.01] flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  <span>{authLoading ? "Creating Account..." : "Register & Start Learning →"}</span>
                </button>
              </form>

              <div className="text-center pt-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("signin")}
                    className="font-bold text-amber-500 hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 3. FORGOT PASSWORD REQUEST VIEW                              */}
          {/* ============================================================ */}
          {mode === "forgot" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1 text-center">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Reset Your Password
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  Enter your registered email address to receive a 6-digit verification code.
                </p>
              </div>

              {(localError || authError) && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{localError || authError}</span>
                </div>
              )}

              <form onSubmit={handleForgotSubmit} noValidate className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Registered Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      autoFocus
                      value={resetEmail}
                      onChange={(e) => {
                        setResetEmail(e.target.value);
                        if (localError) setLocalError(null);
                      }}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  <span>{resetLoading ? "Sending Code..." : "Send Verification Code →"}</span>
                </button>
              </form>

              <button
                type="button"
                onClick={() => switchMode("signin")}
                className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
              >
                ← Back to Sign In
              </button>
            </div>
          )}

          {/* ============================================================ */}
          {/* 4. RESET PASSWORD CODE & NEW PASSWORD VIEW                   */}
          {/* ============================================================ */}
          {mode === "reset" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1 text-center">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Enter Verification Code
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  Enter the 6-digit code for <strong className="text-slate-900 dark:text-white">{resetEmail}</strong> and choose a new password.
                </p>
              </div>

              {resetSuccessMsg && (
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200 flex items-start space-x-2">
                  <KeyRound className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>{resetSuccessMsg}</span>
                </div>
              )}

              {(localError || authError) && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{localError || authError}</span>
                </div>
              )}

              <form onSubmit={handleResetSubmit} noValidate className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">6-Digit Verification Code</label>
                  <input
                    type="text"
                    required
                    autoFocus
                    maxLength={6}
                    value={resetToken}
                    onChange={(e) => {
                      setResetToken(e.target.value.replace(/\D/g, ""));
                      if (localError) setLocalError(null);
                    }}
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
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        if (localError) setLocalError(null);
                      }}
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
                      autoComplete="new-password"
                      value={confirmNewPassword}
                      onChange={(e) => {
                        setConfirmNewPassword(e.target.value);
                        if (localError) setLocalError(null);
                      }}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  <span>{resetLoading ? "Updating Password..." : "Set New Password →"}</span>
                </button>
              </form>

              <button
                type="button"
                onClick={() => switchMode("signin")}
                className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
              >
                ← Cancel & Back to Sign In
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
      <PrivacyPolicyModal
        isOpen={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
      />
    </>
  );
};
