import React from "react";
import { ExternalLink, Phone, MessageSquare, Award, Sparkles } from "lucide-react";
import { ASSISTANCE_CONTACTS } from "../../data/contacts";
import { useSap } from "../../context/SapContext";

export const TagSkillsBanner: React.FC = () => {
  const primaryContact = ASSISTANCE_CONTACTS[0];
  const { setIsAssistanceOpen } = useSap();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 shadow-xl border border-slate-700">
      <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
        <Award className="w-64 h-64 text-white" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-red-600 text-white rounded">
              Official Institute
            </span>
            <span className="text-xs font-semibold text-slate-300">
              TagSkills Enterprise SAP Academy
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Accelerate into an Elite SAP MM & EWM Consultant
          </h3>
          
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Hands-on implementation experience, real-time S/4HANA servers, direct 1:1 resume building, and placement assistance from senior SAP Architects.
          </p>
        </div>

        {/* Action Callouts */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={() => setIsAssistanceOpen(true)}
            className="flex items-center justify-center space-x-2 py-2.5 px-4 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-md transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span>Speak to Advisor</span>
          </button>

          <a
            href="https://www.tagskills.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 py-2.5 px-5 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl shadow-lg transition-all"
          >
            <span>Visit TagSkills</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
