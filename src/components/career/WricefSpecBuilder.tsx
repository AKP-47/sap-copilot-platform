import React, { useState } from "react";
import { WRICEF_TEMPLATES } from "../../data/wricefTemplates";
import { FileCode2, Download, Copy, CheckCircle2 } from "lucide-react";

export const WricefSpecBuilder: React.FC = () => {
  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState<number>(0);
  const currentTmpl = WRICEF_TEMPLATES[selectedTemplateIdx];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white rounded-2xl p-6 border border-slate-700 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-sm">
            <FileCode2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
              Consultant Deliverables Engine
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              WRICEF Functional Specification (FS) Generator
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Create client-ready SAP Functional Specifications (FS) for Workflows, Reports, Interfaces, Conversions, Enhancements (BAdIs/User Exits), and Forms.
        </p>
      </div>

      {/* Template View */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
              Type: {currentTmpl.type} • Module: {currentTmpl.module}
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              {currentTmpl.sampleName}
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {currentTmpl.functionalSpecificationSections.map((sec, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-900">{sec.sectionTitle}</h4>
              <p className="text-xs text-slate-500">{sec.description}</p>
              <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800 whitespace-pre-wrap">
                {sec.sampleContent}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
