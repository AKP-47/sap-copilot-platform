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
  CheckCircle2
} from "lucide-react";

export const OwnerLoginView: React.FC = () => {
  const { loginOwner, setupOwner, isInitialized, authLoading, authError } = useOwnerAuth();
  const { setCurrentView } = useSap();

  // Login form state
  const [username, setUsername] = useState("");
  const [passkey, setPasskey] = useState("");
  const [showPasskey, setShowPasskey] = useState(false);

  // Setup form state (used only on first initialization)
  const [setupUsername, setSetupUsername] = useState("");
  const [setupPasskey, setSetupPasskey] = useState("");
  const [setupConfirm, setSetupConfirm] = useState("");
  const [showSetupPasskey, setShowSetupPasskey] = useState(false);

  const [localError, setLocalError] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const cleanUser = username.trim();
    const cleanPass = passkey.trim();

    if (!cleanUser) {
      setLocalError("Please enter your owner account identifier.");
      return;
    }

    if (!cleanPass) {
      setLocalError("Please enter your private owner passkey.");
      return;
    }

    const res = await loginOwner(cleanUser, cleanPass);
    if (!res.success && res.error) {
      setLocalError(res.error);
    }
  };

  const handleSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const cleanUser = setupUsername.trim();
    const cleanPass = setupPasskey.trim();
    const cleanConfirm = setupConfirm.trim();

    if (!cleanUser || cleanUser.length < 3) {
      setLocalError("Please choose an owner account identifier (at least 3 characters).");
      return;
    }

    if (!cleanPass || cleanPass.length < 4) {
      setLocalError("Please choose a private passkey of at least 4 characters.");
      return;
    }

    if (cleanPass !== cleanConfirm) {
      setLocalError("The confirmation passkey does not match.");
      return;
    }

    const res = await setupOwner(cleanUser, cleanPass);
    if (!res.success && res.error) {
      setLocalError(res.error);
    }
  };

  // Render One-Time Setup if not yet initialized
  if (isInitialized === false) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in duration-200">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-inner border border-amber-500/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 inline-block">
              ONE-TIME CONFIGURATION
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              OWNER ACCOUNT SETUP
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Choose your private identifier and secret passkey to initialize the Owner Tracker. This setup cannot be repeated once completed.
            </p>
          </div>

          {(localError || authError) && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start space-x-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{localError || authError}</span>
            </div>
          )}

          <form onSubmit={handleSetupSubmit} noValidate className="space-y-4">
            
            <div className="space-y-1.5">
              <label htmlFor="setup-username" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center">
                <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
                <span>Owner Account Identifier</span>
              </label>
              <input
                id="setup-username"
                name="username"
                type="text"
                autoComplete="username"
                value={setupUsername}
                onChange={(e) => {
                  setSetupUsername(e.target.value);
                  if (localError) setLocalError(null);
                }}
                placeholder="Choose identifier (e.g. your email or username)"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="setup-passkey" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center">
                <KeyRound className="w-3.5 h-3.5 mr-1 text-slate-400" />
                <span>Private Owner Passkey</span>
              </label>
              <div className="relative">
                <input
                  id="setup-passkey"
                  name="passkey"
                  type={showSetupPasskey ? "text" : "password"}
                  autoComplete="new-password"
                  value={setupPasskey}
                  onChange={(e) => {
                    setSetupPasskey(e.target.value);
                    if (localError) setLocalError(null);
                  }}
                  placeholder="Choose your private passkey..."
                  className="w-full px-4 py-3 pr-10 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setShowSetupPasskey(!showSetupPasskey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  aria-label={showSetupPasskey ? "Hide passkey" : "Show passkey"}
                >
                  {showSetupPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="setup-confirm" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center">
                <Lock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                <span>Confirm Private Passkey</span>
              </label>
              <input
                id="setup-confirm"
                name="confirm-passkey"
                type={showSetupPasskey ? "text" : "password"}
                autoComplete="new-password"
                value={setupConfirm}
                onChange={(e) => {
                  setSetupConfirm(e.target.value);
                  if (localError) setLocalError(null);
                }}
                placeholder="Re-enter your private passkey..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {authLoading ? (
                <span>Initializing Owner Security...</span>
              ) : (
                <>
                  <span>Initialize & Secure Owner Account</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

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
  }

  // Standard Owner Authentication View
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-inner border border-amber-500/30">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            OWNER AUTHENTICATION
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Restricted access to private platform analytics.
          </p>
        </div>

        {/* Error Callout */}
        {(localError || authError) && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start space-x-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <span>{localError || authError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} noValidate className="space-y-4">
          
          <div className="space-y-1.5">
            <label htmlFor="owner-account" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center">
              <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
              <span>Owner Account</span>
            </label>
            <input
              id="owner-account"
              name="username"
              type="text"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (localError) setLocalError(null);
              }}
              placeholder="Enter your owner account identifier"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="owner-passkey" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span className="flex items-center">
                <KeyRound className="w-3.5 h-3.5 mr-1 text-slate-400" />
                <span>Owner Passkey</span>
              </span>
            </label>
            <div className="relative">
              <input
                id="owner-passkey"
                name="passkey"
                type={showPasskey ? "text" : "password"}
                autoComplete="current-password"
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  if (localError) setLocalError(null);
                }}
                placeholder="Enter your private owner passkey"
                className="w-full px-4 py-3 pr-10 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="button"
                onClick={() => setShowPasskey(!showPasskey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                aria-label={showPasskey ? "Hide passkey" : "Show passkey"}
              >
                {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {authLoading ? (
              <span>Authenticating Passkey...</span>
            ) : (
              <>
                <span>Authenticate & Access Owner Tracker</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

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
