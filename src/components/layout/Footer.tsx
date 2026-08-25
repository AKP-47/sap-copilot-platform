import React from "react";
import { ExternalLink, Phone, MessageSquare, Quote, Sparkles, Headphones, UserCheck } from "lucide-react";
import { LEADERSHIP_PROFILE, ASSISTANCE_CONTACTS, TAGSKILLS_INSTITUTE_INFO } from "../../data/contacts";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Institute Identity & Brand (4 cols) */}
          <div className="space-y-4 lg:col-span-4">
            <div className="flex items-center space-x-3 bg-white p-2.5 rounded-xl w-fit shadow-md">
              <img 
                src="/tagskills-logo.jpg" 
                alt="TagSkills Official Institute Logo" 
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-sm font-semibold text-slate-200">
              Powered by TagSkills
            </p>
            <p className="text-sm text-amber-400/90 italic font-medium">
              "Learn. Practice. Prepare. Become Job-Ready."
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Visit TagSkills to explore enterprise SAP cohorts, consultant simulations, and dedicated career mentorship.
            </p>
            
            <div className="pt-1 space-y-2">
              <a
                href={TAGSKILLS_INSTITUTE_INFO.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl shadow transition-all"
              >
                <span>Visit TagSkills</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div>
                <a
                  href={TAGSKILLS_INSTITUTE_INFO.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 underline font-mono"
                >
                  {TAGSKILLS_INSTITUTE_INFO.websiteUrl}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Leadership & Support Experience (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* ============================================================ */}
            {/* SECTION 1 — LEADERSHIP & MENTORSHIP                          */}
            {/* ============================================================ */}
            <div className="bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4 shadow-lg">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div>
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                    LEADERSHIP & MENTORSHIP
                  </span>
                  <h4 className="text-base font-extrabold text-white mt-1 flex items-center">
                    <span>Meet Our CEO & Mentor</span>
                    <Sparkles className="w-4 h-4 ml-1.5 text-amber-400" />
                  </h4>
                </div>
              </div>

              {/* CEO Profile Desktop 2-Col / Mobile Stack */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                
                {/* Left: Image */}
                <div className="w-28 sm:w-36 shrink-0">
                  <div className="rounded-xl overflow-hidden border-2 border-amber-400/40 shadow-md bg-slate-950">
                    <img
                      src={LEADERSHIP_PROFILE.image}
                      alt="Prashun Shetty – Founder & CEO, TagSkills"
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Right: Info */}
                <div className="flex-1 space-y-2 text-left w-full">
                  <div>
                    <h5 className="text-base font-bold text-white">
                      {LEADERSHIP_PROFILE.name}
                    </h5>
                    <p className="text-xs text-amber-300 font-semibold">
                      {LEADERSHIP_PROFILE.role}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 italic bg-slate-950/70 p-3 rounded-xl border border-slate-800 leading-relaxed">
                    "{LEADERSHIP_PROFILE.quote}"
                  </p>

                  <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {LEADERSHIP_PROFILE.phone}
                    </span>

                    {/* WhatsApp ONLY button */}
                    <a
                      href={LEADERSHIP_PROFILE.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-1.5 py-1.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Prashun</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>


            {/* ============================================================ */}
            {/* SECTION 2 — NEED ASSISTANCE?                                 */}
            {/* ============================================================ */}
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800">
                  STUDENT COUNSELING & SUPPORT TEAM
                </span>
                <h4 className="text-base font-extrabold text-white mt-1 flex items-center">
                  <Headphones className="w-4 h-4 mr-1.5 text-blue-400" />
                  <span>NEED ASSISTANCE?</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Contact our counseling team for assistance. You can call or WhatsApp us directly.
                </p>
              </div>

              {/* 4 Contact Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {ASSISTANCE_CONTACTS.map((contact) => (
                  <div
                    key={contact.id}
                    className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2.5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-sm"
                  >
                    <div className="space-y-1">
                      <h5 className="text-xs sm:text-sm font-bold text-white leading-snug">
                        {contact.name}
                      </h5>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        {contact.role}
                      </p>
                      <div className="pt-1 text-[11px] font-mono font-bold text-slate-200 flex items-center">
                        <Phone className="w-3 h-3 text-blue-400 mr-1 shrink-0" />
                        <span>{contact.phone}</span>
                      </div>
                    </div>

                    {/* Call & WhatsApp Action Buttons */}
                    <div className="grid grid-cols-2 gap-1 pt-1 border-t border-slate-800">
                      <a
                        href={contact.callLink}
                        className="flex items-center justify-center space-x-1 py-1.5 px-1.5 text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-center"
                      >
                        <Phone className="w-2.5 h-2.5 shrink-0" />
                        <span>Call</span>
                      </a>
                      <a
                        href={contact.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-1 py-1.5 px-1.5 text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors text-center"
                      >
                        <MessageSquare className="w-2.5 h-2.5 shrink-0" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            <span>© {new Date().getFullYear()} TagSkills Enterprise Academy. All Rights Reserved.</span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href={TAGSKILLS_INSTITUTE_INFO.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-300 transition-colors"
            >
              Official Website
            </a>
            <span>•</span>
            <span>Bengaluru, Karnataka, India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
