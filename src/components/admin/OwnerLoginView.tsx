import React, { useState } from "react";
import { useOwnerAuth } from "../../context/OwnerAuthContext";
import { useSap } from "../../context/SapContext";
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  KeyRound,
  ArrowLeft,
  Fingerprint,
  Smartphone,
  Sparkles
} from "lucide-react";

export const OwnerLoginView: React.FC = () => {
  const { loginOwner, loginWithPasskey, loginWithBiometrics, authLoading, authError } = useOwnerAuth();
  const { setCurrentView } = useSap();

  const [authMode, setAuthMode] = useState<"passkey" | "password">("passkey");
  
  // Passkey mode state
  const [passkeyInput, setPasskeyInput] = useState("");
  
  // Password mode state
  const [username, setUsername] = useState("akshatpandey12805@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handlePasskeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!passkeyInput.trim()) {
      setLocalError("Please enter your Owner Passkey.");
      return;
    }

    const res = await loginWithPasskey(passkeyInput.trim());
    if (!res.success && res.error) {
      setLocalError(res.error);
    }
  };

  const handleBiometricsClick = async () => {
    setLocalError(null);
    const res = await loginWithBiometrics();
    if (!res.success && res.error) {
      setLocalError(res.error);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!username.trim() || !password.trim()) {
      setLocalError("Please enter both owner username and password.");
      return;
    }

    const res = await loginOwner(username.trim(), password);
    if (!res.success && res.error) {
      setLocalError(res.error);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <Fingerprint className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 inline-block">
            RESTRICTED ACCESS PORTAL
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Owner Authentication
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Authorized Account: <strong className="text-slate-700 dark:text-slate-200">akshatpandey12805@gmail.com</strong>
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => {
              setAuthMode("passkey");
              setLocalError(null);
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              authMode === "passkey"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-500" />
            <span>Passkey Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode("password");
              setLocalError(null);
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              authMode === "password"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-blue-500" />
            <span>Password Login</span>
          </button>
        </div>

        {/* Error Callout */}
        {(localError || authError) && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start space-x-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <span>{localError || authError}</span>
          </div>
        )}

        {/* ============================================================ */}
        {/* PASSKEY AUTHENTICATION MODE                                  */}
        {/* ============================================================ */}
        {authMode === "passkey" ? (
          <div className="space-y-4">
            
            {/* 1-Click Biometrics / Touch ID / Device Passkey Button */}
            <button
              type="button"
              disabled={authLoading}
              onClick={handleBiometricsClick}
              className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2.5 transform hover:scale-[1.02] disabled:opacity-50"
            >
              <Fingerprint className="w-5 h-5 text-white" />
              <span>{authLoading ? "Verifying Passkey..." : "Use Device Passkey (Touch ID / Face ID)"}</span>
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink mx-3 text-[10px] font-mono text-slate-400 uppercase font-bold">OR ENTER PASSKEY</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            {/* Passkey / PIN Entry Form */}
            <form onSubmit={handlePasskeySubmit} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span className="flex items-center">
                    <KeyRound className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    <span>Owner Security Passkey</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoFocus
                    value={passkeyInput}
                    onChange={(e) => setPasskeyInput(e.target.value)}
                    placeholder="Enter Passkey PIN (e.g. 12805)..."
                    className="w-full px-4 py-3 pr-10 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-750 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>Verify Passkey & Access Dashboard</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </form>

          </div>
        ) : (
          /* ============================================================ */
          /* PASSWORD AUTHENTICATION MODE                                 */
          /* ============================================================ */
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center">
                <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
                <span>Owner Account Identifier</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. akshatpandey12805@gmail.com"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center">
                <Lock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                <span>Owner Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {authLoading ? (
                <span>Authenticating Password...</span>
              ) : (
                <>
                  <span>Authenticate & Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center">
          <button
            onClick={() => setCurrentView("dashboard")}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Learning Dashboard</span>
          </button>
        </div>

      </div>
    </div>
  );
};
