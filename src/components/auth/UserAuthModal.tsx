import React, { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { useSap } from "../../context/SapContext";
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  LogOut,
  Calendar,
  Layers,
  Award
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

  // Sign Up Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Profile Edit
  const [editName, setEditName] = useState(currentUser?.name || "");
  const [editLevel, setEditLevel] = useState(currentUser?.learningLevel || "BEGINNER");
  const [editIndustry, setEditIndustry] = useState(currentUser?.selectedIndustry || "Automotive");
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  const [localError, setLocalError] = useState<string | null>(null);

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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setProfileSuccess(null);

    if (!editName.trim()) {
      setLocalError("Please enter your name.");
      return;
    }

    const res = await updateProfile(editName.trim(), editLevel, editIndustry);
    if (res.success) {
      setLearningLevel(editLevel as any);
      setProfileSuccess("Profile updated successfully!");
      setTimeout(() => setProfileSuccess(null), 3000);
    } else if (res.error) {
      setLocalError(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================ */}
        {/* 1. SIGN UP VIEW                                              */}
        {/* ============================================================ */}
        {authModalMode === "signup" && (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Welcome to SAP Copilot
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                Your name and email are used to create and manage your learning account and provide a personalized learning experience.
              </p>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{authLoading ? "Creating Account..." : "Create Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setAuthModalMode("signin")}
                  className="font-bold text-amber-500 hover:underline"
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
            <div className="space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sign in to continue your SAP MM & EWM learning journey.
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
                    className="text-[11px] font-bold text-slate-400 hover:text-amber-500"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{authLoading ? "Signing In..." : "Sign In"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setAuthModalMode("signup")}
                  className="font-bold text-amber-500 hover:underline"
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. FORGOT PASSWORD VIEW                                      */}
        {/* ============================================================ */}
        {authModalMode === "forgot" && (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Account Recovery
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Password recovery assistance for TagSkills learners.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200 space-y-2">
              <p className="font-bold">Password Reset Instructions:</p>
              <p className="text-[11px] leading-relaxed">
                To protect student data, password reset requests are securely verified. Please contact the TagSkills student support team on WhatsApp at <strong>+91 89711 64999</strong> with your registered email for identity verification.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setAuthModalMode("signin")}
              className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              Back to Sign In
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. USER PROFILE VIEW                                         */}
        {/* ============================================================ */}
        {authModalMode === "profile" && currentUser && (
          <div className="space-y-5">
            <div className="flex items-center space-x-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-slate-400">{currentUser.email}</p>
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 mt-1">
                  <Calendar className="w-3 h-3" />
                  <span>Member since {new Date(currentUser.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>
            </div>

            {profileSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-200 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{profileSuccess}</span>
              </div>
            )}

            {localError && (
              <div className="p-3 rounded-2xl bg-rose-50 text-xs text-rose-800 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>{localError}</span>
              </div>
            )}

            {/* Profile Edit Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Learning Level</label>
                  <select
                    value={editLevel}
                    onChange={(e) => setEditLevel(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="PROFESSIONAL">Professional</option>
                    <option value="CONSULTANT">Consultant</option>
                    <option value="INTERVIEW">Interview Prep</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Industry Focus</label>
                  <select
                    value={editIndustry}
                    onChange={(e) => setEditIndustry(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Automotive">Automotive</option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Retail & E-Commerce">Retail</option>
                    <option value="Food & Beverage">Food & Bev</option>
                    <option value="Aerospace">Aerospace</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Save Profile Changes</span>
              </button>
            </form>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={signOutUser}
                className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center space-x-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>

              <button
                type="button"
                onClick={closeAuthModal}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
