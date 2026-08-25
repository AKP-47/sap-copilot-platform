import React from "react";
import { ExternalLink, Phone, MessageSquare, UserCheck } from "lucide-react";
import { ASSISTANCE_CONTACTS } from "../../data/contacts";

export const Footer: React.FC = () => {
  const contact1 = ASSISTANCE_CONTACTS[0]; // Priyanka Bajoria
  const contact2 = ASSISTANCE_CONTACTS[1]; // Prashun Shetty

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          
          {/* Column 1: Institute Identity (4 cols) */}
          <div className="space-y-4 md:col-span-4">
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
            <p className="text-sm text-slate-300 italic">
              "Learn. Practice. Prepare. Become Job-Ready."
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Visit TagSkills to explore more learning opportunities, enterprise simulation cohorts, and 1:1 career mentorship programs.
            </p>
            
            <div className="pt-1">
              <a
                href="https://www.tagskills.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg shadow transition-all"
              >
                <span>Visit TagSkills</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="mt-2">
                <a
                  href="https://www.tagskills.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 underline font-mono"
                >
                  https://www.tagskills.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Need Assistance? (Contact 1 & Contact 2) (8 cols) */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Need Assistance?
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Contact us for assistance. You can call or WhatsApp us.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Contact 1 Card: Priyanka Bajoria */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                      Admissions & Assistance
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-white mt-1.5">
                    {contact1.name}
                  </h5>
                  <p className="text-xs text-slate-300">
                    {contact1.role}
                  </p>
                  <div className="text-xs text-amber-400 font-mono font-bold flex items-center mt-2">
                    📞 {contact1.phone}
                  </div>
                </div>

                {/* Functional Call & WhatsApp Action Buttons */}
                <div className="flex items-center space-x-2 pt-2">
                  <a
                    href="tel:+917328071375"
                    className="flex-1 flex items-center justify-center space-x-1 py-1.5 px-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>📞 Call</span>
                  </a>
                  <a
                    href="https://wa.me/917328071375"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-1 py-1.5 px-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>💬 WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Contact 2 Card: Prashun Shetty (Leadership Reference Only) */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800">
                      TagSkills Leadership
                    </span>
                    <span className="p-1 bg-slate-700 text-slate-300 rounded">
                      <UserCheck className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-white mt-1.5">
                    {contact2.name}
                  </h5>
                  <p className="text-xs text-slate-300">
                    {contact2.role}
                  </p>
                </div>

                <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-700/60">
                  Official TagSkills leadership reference.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <span>© {new Date().getFullYear()} TagSkills Enterprise Academy. All Rights Reserved.</span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.tagskills.com" 
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
