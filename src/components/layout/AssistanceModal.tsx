import React from "react";
import { useSap } from "../../context/SapContext";
import { X, Phone, MessageSquare, MapPin, ExternalLink, GraduationCap, Quote, Sparkles, UserCheck, Headphones } from "lucide-react";
import { LEADERSHIP_PROFILE, ASSISTANCE_CONTACTS, TAGSKILLS_INSTITUTE_INFO } from "../../data/contacts";

export const AssistanceModal: React.FC = () => {
  const { isAssistanceOpen, setIsAssistanceOpen } = useSap();

  if (!isAssistanceOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={() => setIsAssistanceOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 mb-2.5 bg-white p-2 rounded-xl w-fit shadow-sm">
            <img 
              src="/tagskills-logo.jpg" 
              alt="TagSkills" 
              className="h-7 w-auto object-contain" 
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            TagSkills Leadership & Student Assistance
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Connect directly with our CEO & Mentor or our dedicated student counseling team.
          </p>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          
          {/* ============================================================ */}
          {/* SECTION 1 — LEADERSHIP & MENTORSHIP                          */}
          {/* ============================================================ */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl p-5 sm:p-6 border border-slate-700 shadow-md space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                  LEADERSHIP & MENTORSHIP
                </span>
                <h3 className="text-lg font-extrabold text-white mt-1 flex items-center">
                  <span>Meet Our CEO & Mentor</span>
                  <Sparkles className="w-4 h-4 ml-1.5 text-amber-400" />
                </h3>
              </div>
            </div>

            {/* CEO Profile Layout */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
              
              {/* Prashun Shetty Image */}
              <div className="w-36 sm:w-44 shrink-0">
                <div className="rounded-xl overflow-hidden border-2 border-amber-400/50 shadow-lg bg-slate-900">
                  <img
                    src={LEADERSHIP_PROFILE.image}
                    alt="Prashun Shetty – Founder & CEO, TagSkills"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-2.5 text-left w-full">
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {LEADERSHIP_PROFILE.name}
                  </h4>
                  <p className="text-xs font-semibold text-amber-300">
                    {LEADERSHIP_PROFILE.role}
                  </p>
                </div>

                {/* Quote */}
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 text-slate-200">
                  <p className="text-xs italic leading-relaxed">
                    "{LEADERSHIP_PROFILE.quote}"
                  </p>
                </div>

                <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="text-xs font-mono font-bold text-amber-400">
                    {LEADERSHIP_PROFILE.phone}
                  </div>

                  {/* WhatsApp ONLY button */}
                  <a
                    href={LEADERSHIP_PROFILE.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-1.5 py-2 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow transition-colors"
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
          <div className="space-y-3.5">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                STUDENT SUPPORT TEAM
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-1 flex items-center">
                <Headphones className="w-4 h-4 mr-1.5 text-blue-600" />
                <span>NEED ASSISTANCE?</span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Contact us for assistance. You can call or WhatsApp us.
              </p>
            </div>

            {/* 3 Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {ASSISTANCE_CONTACTS.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3 flex flex-col justify-between hover:border-blue-400 transition-all shadow-sm"
                >
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold text-slate-900">
                      {contact.name}
                    </h5>
                    <p className="text-[11px] text-slate-600 font-medium leading-tight">
                      {contact.role}
                    </p>
                    <div className="pt-1.5 text-xs font-mono font-bold text-slate-800 flex items-center">
                      <Phone className="w-3 h-3 text-blue-600 mr-1 shrink-0" />
                      <span>{contact.phone}</span>
                    </div>
                  </div>

                  {/* Call & WhatsApp Action Buttons */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-200">
                    <a
                      href={contact.callLink}
                      className="flex items-center justify-center space-x-1 py-1.5 px-2 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-center"
                    >
                      <Phone className="w-3 h-3 shrink-0" />
                      <span>Call</span>
                    </a>
                    <a
                      href={contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-1 py-1.5 px-2 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors text-center"
                    >
                      <MessageSquare className="w-3 h-3 shrink-0" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Institute Info Box */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-900">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>TagSkills Enterprise SAP Academy</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-blue-900 gap-2">
              <span className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-blue-600 shrink-0" />
                {TAGSKILLS_INSTITUTE_INFO.headquarters}
              </span>
              <a
                href={TAGSKILLS_INSTITUTE_INFO.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-700 hover:text-blue-900 font-bold underline"
              >
                <span>Visit www.tagskills.com</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={() => setIsAssistanceOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
