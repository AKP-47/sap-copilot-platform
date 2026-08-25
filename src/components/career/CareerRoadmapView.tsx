import React from "react";
import { Award, CheckCircle2, ExternalLink, GraduationCap, Briefcase } from "lucide-react";
import { TagSkillsBanner } from "../common/TagSkillsBanner";

export const CareerRoadmapView: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner */}
      <TagSkillsBanner />

      {/* Certification Tracks */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          Official SAP S/4HANA Certification Paths
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-3">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-600 text-white rounded">
              C_TS452_2022 / 2023
            </span>
            <h3 className="text-base font-bold text-slate-900">
              SAP Certified Associate – S/4HANA Sourcing and Procurement (MM)
            </h3>
            <ul className="space-y-1 text-xs text-slate-600">
              <li>• Procurement Processes & Purchase Orders (12%)</li>
              <li>• Enterprise Structure & Master Data (12%)</li>
              <li>• Valuation and Account Determination OBYC (12%)</li>
              <li>• Inventory Management & Physical Inventory (12%)</li>
              <li>• Logistics Invoice Verification MIRO (12%)</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-200 space-y-3">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-blue-600 text-white rounded">
              C_S4EWM_2023
            </span>
            <h3 className="text-base font-bold text-slate-900">
              SAP Certified Associate – S/4HANA Extended Warehouse Management
            </h3>
            <ul className="space-y-1 text-xs text-slate-600">
              <li>• Inbound & Outbound Execution Processes (12%)</li>
              <li>• Warehouse Order Creation Rules (WOCR) & Task (12%)</li>
              <li>• Storage Control POSC & LOSC (12%)</li>
              <li>• Master Data, Bins & Activity Areas (12%)</li>
              <li>• System Integration & Delivery Documents (12%)</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
