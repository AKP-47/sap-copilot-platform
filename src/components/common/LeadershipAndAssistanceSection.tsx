import React from "react";
import { MessageSquare, Quote, Sparkles, UserCheck } from "lucide-react";
import { LEADERSHIP_PROFILE } from "../../data/contacts";
import prashunImage from "../../assets/prashun-shetty.png";

export const LeadershipAndAssistanceSection: React.FC = () => {
  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* LEADERSHIP & MENTORSHIP SECTION                              */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-xl relative overflow-hidden">
        
        {/* Subtle Gold / Amber Glow Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Section Header */}
          <div>
            <div className="inline-flex items-center space-x-2">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider px-2.5 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded">
                LEADERSHIP & MENTORSHIP
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 flex items-center">
              <span>Meet Our CEO & Mentor</span>
              <Sparkles className="w-5 h-5 ml-2 text-amber-400 inline shrink-0" />
            </h2>
          </div>

          {/* CEO Profile Card: Image Left + Info Right, Quote & WhatsApp Number Below */}
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700/90 p-6 sm:p-8 shadow-lg space-y-6">
            
            {/* Top Row: Image on Left (260-300px) + Profile Info & WhatsApp Button on Right */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
              
              {/* Left: Original Prashun Shetty Image Asset */}
              <div className="w-full sm:w-[280px] md:w-[290px] shrink-0 flex justify-center">
                <div className="rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-slate-950 ring-4 ring-amber-400/10 w-full max-w-[290px]">
                  <img
                    src={prashunImage || "/prashun-shetty.png"}
                    alt="Prashun Shetty – Founder & CEO, TagSkills"
                    className="w-full h-auto object-contain block rounded-xl"
                  />
                </div>
              </div>

              {/* Right: Name, Designation & [WhatsApp Prashun] Button */}
              <div className="flex-1 flex flex-col justify-center space-y-4 text-left w-full pt-2 md:pt-4">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 bg-amber-400/20 text-amber-400 rounded-lg border border-amber-400/30">
                      <UserCheck className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      TagSkills Founder & Visionary
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-1">
                    {LEADERSHIP_PROFILE.name}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-amber-300/90">
                    {LEADERSHIP_PROFILE.role}
                  </p>
                </div>

                {/* WhatsApp Prashun Button */}
                <div className="pt-2">
                  <a
                    href={LEADERSHIP_PROFILE.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 py-3 px-6 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all group"
                  >
                    <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>WhatsApp Prashun</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Quote Section */}
            <div className="relative bg-slate-900/80 p-5 sm:p-6 rounded-2xl border border-slate-700/80 text-slate-200 shadow-inner">
              <Quote className="w-7 h-7 text-amber-400/30 absolute top-4 left-4 -scale-x-100 pointer-events-none" />
              <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed pl-7 sm:pl-8">
                "{LEADERSHIP_PROFILE.quote}"
              </p>
            </div>

            {/* Direct WhatsApp Mentorship Number Footer */}
            <div className="pt-2 border-t border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-300 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-medium">Direct WhatsApp Mentorship:</span>
                <span className="font-mono font-bold text-amber-400 text-sm sm:text-base">
                  {LEADERSHIP_PROFILE.phone}
                </span>
              </div>

              <div className="text-[11px] text-slate-400">
                Official TagSkills Leadership & Career Mentorship
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
