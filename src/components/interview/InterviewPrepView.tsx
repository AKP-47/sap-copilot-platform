import React, { useState } from "react";
import { INTERVIEW_BANK } from "../../data/interviewBank";
import { GraduationCap, Search, Bookmark, CheckCircle2 } from "lucide-react";

export const InterviewPrepView: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>("All");
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tiers = ["All", "Basic", "Intermediate", "Advanced", "Scenario", "Configuration", "Troubleshooting", "Consultant"];

  const filteredQuestions = INTERVIEW_BANK.filter(q => {
    const matchesMod = selectedModule === "All" || q.module === selectedModule;
    const matchesTier = selectedTier === "All" || q.tier === selectedTier;
    const matchesSearch = !searchQuery ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.idealAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMod && matchesTier && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700/10 via-indigo-700/10 to-blue-700/10 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-blue-700 text-white rounded-xl shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900">
              Career Interview Question Bank
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              7-Tier SAP MM & EWM Interview Preparation
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Master 150+ categorized questions from Junior Basic to Principal Architect level. Learn what interviewers expect, key terminology to articulate, and follow-up drilldown answers.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTier(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                selectedTier === t
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {["All", "MM", "EWM", "INTEGRATION"].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedModule(m)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                selectedModule === m ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <div key={q.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                  Tier: {q.tier}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                  {q.module} • {q.category}
                </span>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Q: {q.question}
            </h3>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-800 space-y-2">
              <strong className="text-emerald-800">Ideal Answer:</strong>
              <p className="leading-relaxed">{q.idealAnswer}</p>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-950 space-y-1">
              <strong>💡 Key Phrases Interviewers Look For:</strong>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {q.keyPhrasesExpected.map((ph, idx) => (
                  <span key={idx} className="bg-white border border-indigo-200 px-2 py-0.5 rounded text-[11px] font-semibold text-indigo-800">
                    {ph}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
