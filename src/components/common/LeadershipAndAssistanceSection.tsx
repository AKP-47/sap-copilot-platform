import React from "react";
import { Phone, MessageSquare, Quote, Sparkles, UserCheck, GraduationCap, Headphones } from "lucide-react";
import { LEADERSHIP_PROFILE, ASSISTANCE_CONTACTS } from "../../data/contacts";

export const LeadershipAndAssistanceSection: React.FC<{ isCompact?: boolean }> = ({ isCompact = false }) => {
  return (
    <div className="space-y-8">
      
      {/* ============================================================ */}
      {/* SECTION 1 — LEADERSHIP & MENTORSHIP                          */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-xl relative overflow-hidden">
        
        {/* Subtle Gold / Amber Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Section Header */}
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider px-2.5 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded">
                LEADERSHIP & MENTORSHIP
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 flex items-center">
              <span>Meet Our CEO & Mentor</span>
              <Sparkles className="w-5 h-5 ml-2 text-amber-400 inline" />
            </h2>
          </div>

          {/* CEO Profile Card: Two-Column on Desktop, Stacked on Mobile */}
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 sm:p-7 shadow-lg flex flex-col md:flex-row items-center md:items-stretch gap-6 sm:gap-8">
            
            {/* Left: Prashun Shetty Official Image */}
            <div className="w-full sm:w-64 md:w-72 shrink-0 flex justify-center items-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-slate-900 group">
                <img
                  src={LEADERSHIP_PROFILE.image}
                  alt="Prashun Shetty – Founder & CEO, TagSkills"
                  className="w-full h-auto object-cover max-h-[380px] rounded-xl transition-transform duration-300 group-hover:scale-102"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent p-3 text-center md:hidden">
                  <div className="text-xs font-bold text-amber-300">{LEADERSHIP_PROFILE.name}</div>
                  <div className="text-[10px] text-slate-300">{LEADERSHIP_PROFILE.role}</div>
                </div>
              </div>
            </div>

            {/* Right: Profile Information & Quote */}
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


      {/* ============================================================ */}
      {/* SECTION 2 — NEED ASSISTANCE?                                 */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                SUPPORT & ADMISSIONS
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center">
              <Headphones className="w-5 h-5 mr-2 text-blue-600" />
              <span>NEED ASSISTANCE?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Contact us for assistance. You can call or WhatsApp us.
            </p>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Dedicated Student & Consultant Support</span>
          </div>
        </div>

        {/* 3 Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ASSISTANCE_CONTACTS.map((contact) => (
            <div
              key={contact.id}
              className="bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {contact.role.includes("Marketing") ? "Marketing & Community" : "Admissions & Counseling"}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {contact.name}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {contact.role}
                  </p>
                </div>

                <div className="pt-2 text-xs sm:text-sm font-mono font-bold text-slate-800 flex items-center">
                  <Phone className="w-3.5 h-3.5 text-blue-600 mr-1.5 shrink-0" />
                  <span>{contact.phone}</span>
                </div>
              </div>

              {/* Functional [ Call ] and [ WhatsApp ] Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-200/80">
                <a
                  href={contact.callLink}
                  className="flex items-center justify-center space-x-1.5 py-2 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm transition-all text-center"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>☎ Call</span>
                </a>
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-sm transition-all text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
