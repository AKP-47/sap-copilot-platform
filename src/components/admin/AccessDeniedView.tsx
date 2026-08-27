import React from "react";
import { useSap } from "../../context/SapContext";
import { ShieldAlert, ArrowLeft, Lock, ArrowRight } from "lucide-react";

interface AccessDeniedViewProps {
  onShowLogin?: () => void;
}

export const AccessDeniedView: React.FC<AccessDeniedViewProps> = ({ onShowLogin }) => {
  const { setCurrentView } = useSap();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
        
        <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            HTTP 403 — FORBIDDEN ACCESS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Access Denied
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            The <strong>Visitor Intelligence & Private Analytics</strong> dashboard is restricted exclusively to the verified website owner. Learner accounts do not possess administrative permissions.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 text-left space-y-1.5 font-mono">
          <div><strong className="text-slate-700 dark:text-slate-300">Enforcement: </strong>Server-Side Role Verification</div>
          <div><strong className="text-slate-700 dark:text-slate-300">Required Role: </strong><span className="text-amber-600 dark:text-amber-400 font-bold">OWNER</span></div>
          <div><strong className="text-slate-700 dark:text-slate-300">Current Role: </strong><span>LEARNER / UNAUTHENTICATED</span></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setCurrentView("dashboard")}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Learning Dashboard</span>
          </button>

          {onShowLogin && (
            <button
              onClick={onShowLogin}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-extrabold text-xs shadow-md transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Owner Authentication</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
