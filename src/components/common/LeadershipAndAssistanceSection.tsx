import React from "react";
import { MessageSquare, Quote, Sparkles, UserCheck } from "lucide-react";
import { LEADERSHIP_PROFILE } from "../../data/contacts";

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

          {/* CEO Profile Card: 2-Column Desktop Layout / Stacked Mobile Layout */}
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700/90 p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-center md:items-stretch gap-6 sm:gap-8">
            
            {/* Left: Prashun Shetty Official Portrait Image */}
            <div className="w-full sm:w-64 md:w-72 shrink-0 flex justify-center items-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-slate-900 group">
                <img
                  src={LEADERSHIP_PROFILE.image}
                  alt="Prashun Shetty – Founder & CEO, TagSkills"
                  className="w-full h-auto object-cover max-h-[380px] rounded-xl transition-transform duration-300 group-hover:scale-102"
                />
              </div>
            </div>

            {/* Right: Profile Information, Quote & WhatsApp Action */}
            <div className="flex-1 flex flex-col justify-between space-y-5 text-left w-full">
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 bg-amber-400/20 text-amber-400 rounded-lg border border-amber-400/30">
                    <UserCheck className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    TagSkills Founder & Visionary
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {LEADERSHIP_PROFILE.name}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-amber-300/90 mt-0.5">
                    {LEADERSHIP_PROFILE.role}
                  </p>
                </div>

                {/* Mentor Quote */}
                <div className="relative bg-slate-900/80 p-4 sm:p-5 rounded-xl border border-slate-700/80 text-slate-200">
                  <Quote className="w-6 h-6 text-amber-400/40 absolute top-3 left-3 -scale-x-100 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed pl-6">
                    "{LEADERSHIP_PROFILE.quote}"
                  </p>
                </div>
              </div>

              {/* Contact Action: WhatsApp ONLY */}
              <div className="pt-2 border-t border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-400 font-medium">Direct WhatsApp Mentorship:</span>
                  <div className="text-sm sm:text-base font-mono font-bold text-amber-400">
                    {LEADERSHIP_PROFILE.phone}
                  </div>
                </div>

                <a
                  href={LEADERSHIP_PROFILE.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 py-3 px-6 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all group"
                >
                  <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>WhatsApp Prashun</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
