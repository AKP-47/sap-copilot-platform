import React from "react";
import { X, Shield } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-amber-500" />
            <h2 id="privacy-policy-title" className="text-base font-bold text-slate-900 dark:text-white">
              Privacy Policy
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Privacy Policy"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-5 space-y-5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg border border-amber-200 dark:border-amber-800">
            ⚠ This Privacy Policy is provided for candidate review and is pending final review by TagSkills legal counsel before formal publication.
          </p>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">1. Data Controller</h3>
            <p>TagSkills EdTech Pvt. Ltd. ("TagSkills", "we", "us") operates the SAP Copilot learning platform. We are the data controller for personal information collected through this platform.</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">2. Information We Collect</h3>
            <p>When you register, we collect:</p>
            <ul className="list-disc list-inside mt-1 space-y-1 text-slate-600 dark:text-slate-400">
              <li>Full name</li>
              <li>Email address</li>
              <li>Password (stored as a cryptographic hash — never in plaintext)</li>
              <li>Selected learning level and industry preference</li>
              <li>Registration timestamp and consent records</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">3. How We Use Your Information</h3>
            <p>Your information is used to:</p>
            <ul className="list-disc list-inside mt-1 space-y-1 text-slate-600 dark:text-slate-400">
              <li>Create and manage your learning account</li>
              <li>Provide personalised SAP learning content</li>
              <li>Track your learning progress within the platform</li>
              <li>Provide course counselling and training-related services</li>
              <li>Send communications you have opted into (with your consent)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4. Data Storage & Security</h3>
            <p>Your personal data is processed and stored securely. Passwords are hashed using PBKDF2-SHA512 with a random salt and are never stored in plaintext. We implement industry-standard security measures to protect your information.</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">5. Data Sharing</h3>
            <p>We do not sell your personal information. We may share data with trusted service providers who assist in operating the platform, subject to confidentiality obligations.</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">6. Your Rights</h3>
            <p>Subject to applicable law, you have rights to access, correct, or request deletion of your personal data. Contact us at <span className="text-amber-500 font-medium">privacy@tagskills.com</span> for any data-related requests.</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">7. Marketing Communications</h3>
            <p>If you have opted in, we may contact you with course information, counselling calls, and relevant updates. You can withdraw this consent at any time by contacting us.</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">8. Contact</h3>
            <p>
              TagSkills EdTech Pvt. Ltd. &nbsp;·&nbsp;{" "}
              <a href="https://www.tagskills.com" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">
                www.tagskills.com
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
