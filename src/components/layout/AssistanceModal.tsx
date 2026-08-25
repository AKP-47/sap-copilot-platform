import React from "react";
import { useSap } from "../../context/SapContext";
import { X, Phone, MessageSquare, MapPin, ExternalLink, GraduationCap, ShieldCheck, UserCheck } from "lucide-react";
import { ASSISTANCE_CONTACTS, TAGSKILLS_INSTITUTE_INFO } from "../../data/contacts";

export const AssistanceModal: React.FC = () => {
  const { isAssistanceOpen, setIsAssistanceOpen } = useSap();

  if (!isAssistanceOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={() => setIsAssistanceOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 mb-3 bg-white/95 p-2 rounded-lg w-fit shadow-sm">
            <img 
              src="/tagskills-logo.jpg" 
              alt="TagSkills" 
              className="h-7 w-auto object-contain" 
            />
          </div>

          <h2 className="text-xl font-bold text-white">
            Need Assistance?
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Contact us for assistance. You can call or WhatsApp us.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          {/* Contact 1: Priyanka Bajoria (Direct Phone / WhatsApp) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition-all space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  Admissions & Course Inquiries
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">
                  Priyanka Bajoria
                </h4>
                <p className="text-xs font-medium text-slate-600">
                  Senior Business Development Management
                </p>
              </div>
              <span className="px-2 py-0.5 text-[10px] bg-emerald-100 text-emerald-800 rounded font-semibold flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                Available Now
              </span>
            </div>

            <div className="text-sm font-bold text-slate-800 flex items-center font-mono">
              📞 +91 73280 71375
            </div>

            {/* Functional Call & WhatsApp Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href="tel:+917328071375"
                className="flex items-center justify-center space-x-1.5 py-2 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>📞 Call</span>
              </a>
              <a
                href="https://wa.me/917328071375"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>💬 WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact 2: Prashun Shetty (Leadership Reference Only - No Phone/Buttons) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition-all space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Institute Leadership
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">
                  Prashun Shetty
                </h4>
                <p className="text-xs font-medium text-slate-600">
                  Founder & CEO, TagSkills
                </p>
              </div>
              <span className="p-1.5 bg-blue-100 text-blue-800 rounded-lg">
                <UserCheck className="w-4 h-4" />
              </span>
            </div>

            <p className="text-[11px] text-slate-500 pt-1">
              Official TagSkills leadership reference. For course counseling and direct enrollment assistance, please connect with Priyanka Bajoria above.
            </p>
          </div>

          {/* Institute Info Box */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-900">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>TagSkills Enterprise SAP Academy</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-blue-900">
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-1 text-blue-600" />
                {TAGSKILLS_INSTITUTE_INFO.headquarters}
              </span>
              <a
                href={TAGSKILLS_INSTITUTE_INFO.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-700 hover:text-blue-900 font-bold underline"
              >
                <span>tagskills.com</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsAssistanceOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
