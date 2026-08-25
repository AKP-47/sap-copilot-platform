import React from "react";
import { useSap } from "../../context/SapContext";
import { ExternalLink, CheckCircle2, ArrowRight, Sparkles, BookOpen, Layers, Cpu } from "lucide-react";

export const WelcomeScreen: React.FC = () => {
  const { isWelcomeOpen, setIsWelcomeOpen, setCurrentView } = useSap();

  if (!isWelcomeOpen) return null;

  const handleStart = () => {
    localStorage.setItem("sap_welcome_seen", "true");
    setIsWelcomeOpen(false);
    setCurrentView("dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-300">
        
        {/* Welcome Top Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          
          {/* TagSkills Official Logo */}
          <div className="inline-block bg-white p-3.5 rounded-2xl shadow-lg mb-4">
            <img 
              src="/tagskills-logo.jpg" 
              alt="TagSkills Official Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Welcome to the TagSkills SAP Learning Platform
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Master SAP MM & EWM through concepts, real-world industry scenarios, simulations, and interview preparation.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <BookOpen className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">14-Point Pedagogy</h4>
                <p className="text-xs text-slate-500 mt-0.5">From beginner analogies to SPRO customizing, RCA & consultant challenges.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <Layers className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">MM + EWM Integration</h4>
                <p className="text-xs text-slate-500 mt-0.5">E2E procurement, sales fulfillment, STO, and qRFC queue synchronization.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <Cpu className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Interactive Simulators</h4>
                <p className="text-xs text-slate-500 mt-0.5">Movement Type lab, OBYC T-accounts, /SCWM/MON, and RF scanner terminal.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Consultant & Interview Mode</h4>
                <p className="text-xs text-slate-500 mt-0.5">Solve multi-stage client crises and practice 150+ 7-tier interview questions.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons as requested by User */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href="https://www.tagskills.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 py-3 px-5 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all"
            >
              <span>Visit TagSkills</span>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </a>

            <button
              onClick={handleStart}
              className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 py-3 px-6 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:scale-[1.02]"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
