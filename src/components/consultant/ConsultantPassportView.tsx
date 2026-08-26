import React from "react";
import { useSap } from "../../context/SapContext";
import { PageHeader } from "../common/PageHeader";
import { 
  Award, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  BookOpen, 
  Briefcase 
} from "lucide-react";

export const ConsultantPassportView: React.FC = () => {
  const { setCurrentView, completedScenarios, bookmarks } = useSap();

  const skillDimensions = [
    { name: "Business Understanding", score: 92, status: "Expert", color: "bg-emerald-500" },
    { name: "SAP MM Sourcing & P2P", score: 88, status: "Advanced", color: "bg-blue-500" },
    { name: "SAP EWM Warehouse Execution", score: 76, status: "Proficient", color: "bg-indigo-500" },
    { name: "Cross-Module Integration (FI/QM)", score: 68, status: "Developing", color: "bg-amber-500" },
    { name: "Industry Domain Knowledge", score: 85, status: "Advanced", color: "bg-teal-500" },
    { name: "Consultant Reasoning & Diagnosis", score: 82, status: "Advanced", color: "bg-purple-500" },
    { name: "Scenario & RCA Problem Solving", score: 79, status: "Proficient", color: "bg-sky-500" },
    { name: "Technical Interview Readiness", score: 84, status: "Advanced", color: "bg-emerald-500" }
  ];

  const averageScore = Math.round(
    skillDimensions.reduce((acc, curr) => acc + curr.score, 0) / skillDimensions.length
  );

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        badge="CERTIFIED CONSULTANT PROFILE"
        badgeColor="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-800"
        title="SAP Consultant Passport & Skill Radar"
        description="Your verified competency passport across 8 core enterprise dimensions. Evaluates business understanding, module depth, integration mastery, and generates your next recommended challenge."
        breadcrumbs={[
          { label: "Career & Consultant Suite" },
          { label: "Consultant Passport" }
        ]}
        learningOutcomes={[
          "Live 8-dimensional competency evaluation",
          "Identify strong domains vs growth areas before interviews",
          "Dynamic AI recommendation for your next high-impact challenge"
        ]}
      />

      {/* Passport Identity Master Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-400 text-slate-950 rounded-2xl shadow-lg">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                OFFICIAL TAGSKILLS PASSPORT ID: TS-SAP-89204
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                SAP Associate Consultant Candidate
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Consultant Index</span>
              <div className="text-2xl font-mono font-extrabold text-amber-400">{averageScore}%</div>
            </div>
          </div>
        </div>

        {/* 8-Dimensional Skill Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {skillDimensions.map((skill, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{skill.name}</span>
                <span className="font-mono text-slate-400 font-bold">{skill.score}% ({skill.status})</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${skill.color} rounded-full transition-all duration-500`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Recommended Next Challenge */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-white/20 rounded-full text-[10px] font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>RECOMMENDED NEXT CHALLENGE (BASED ON SKILL RADAR)</span>
          </div>
          <h4 className="text-lg font-extrabold">
            Elevate Cross-Module Integration: Master OBYC Account Determination
          </h4>
          <p className="text-xs text-blue-100">
            Your integration score is currently at 68%. Practicing automatic account keys (BSX, WRX, GBB, PRD) will immediately boost your overall consultant rating into the top 10%.
          </p>
        </div>

        <button
          onClick={() => setCurrentView("obyc_sim")}
          className="inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs shadow-md transition-all shrink-0 hover:scale-105"
        >
          <span>Launch OBYC Simulator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
