import { useSap } from "../../context/SapContext";
import { ShieldCheck, Lock } from "lucide-react";
import React from "react";
import { ExternalLink, Phone, MessageSquare, Headphones } from "lucide-react";
import { ASSISTANCE_CONTACTS, TAGSKILLS_INSTITUTE_INFO } from "../../data/contacts";

export const Footer: React.FC = () => {
  const { setCurrentView } = useSap();
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
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

          {/* Column 2: Student Counseling & Assistance Contacts (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800">
                STUDENT COUNSELING & SUPPORT TEAM
              </span>
              <h4 className="text-base font-extrabold text-white mt-1 flex items-center">
                <Headphones className="w-4 h-4 mr-1.5 text-blue-400" />
                <span>Need Assistance? Contact Our Team</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                For course inquiries, admissions, and platform support, connect with our counselors:
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
            <span>•</span>
            <button
              onClick={() => setCurrentView("owner_analytics")}
              className="hover:text-amber-400 text-slate-500 transition-colors flex items-center space-x-1"
              title="Restricted Website Owner Access"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
