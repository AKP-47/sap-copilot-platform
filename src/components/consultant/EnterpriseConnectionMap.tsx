import React, { useState } from "react";
import { PageHeader } from "../common/PageHeader";
import { ENTERPRISE_PROCESS_NODES, ProcessNode } from "../../data/enterpriseProcessMap";
import { 
  GitMerge, 
  ArrowRight, 
  Table, 
  Terminal, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  ChevronRight,
  Database,
  ArrowDown
} from "lucide-react";

export const EnterpriseConnectionMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ProcessNode>(ENTERPRISE_PROCESS_NODES[0]);

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        badge="ENTERPRISE ARCHITECTURE FRAMEWORK"
        badgeColor="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-purple-200 dark:border-purple-800"
        title="Interactive Enterprise Connection Map"
        description="SAP is not isolated transactions—it is a unified digital nervous system. Click any node in the end-to-end enterprise flow below to inspect its business role, SAP module, database tables, T-Codes, and accounting impact."
        breadcrumbs={[
          { label: "Career & Consultant Suite" },
          { label: "Enterprise Connection Map" }
        ]}
        learningOutcomes={[
          "Understand how Sales, MRP, Purchasing, Warehouse, and Finance integrate",
          "Inspect underlying database tables (VBAK, EKKO, MSEG, ACDOCA, /SCWM/AQUA)",
          "Visualize the single source of truth across the entire Procure-to-Pay lifecycle"
        ]}
      />

      {/* Interactive Process Flow Pipeline */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GitMerge className="w-5 h-5 text-theme-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              End-to-End Enterprise Process Pipeline
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Click any step (1 – 12)
          </span>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 pt-2">
          {ENTERPRISE_PROCESS_NODES.map(node => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{
                  borderColor: isSelected ? "var(--theme-primary)" : undefined,
                  backgroundColor: isSelected ? "var(--theme-primary-soft)" : undefined
                }}
                className={`p-3 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? "border-2 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-850 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    0{node.step}
                  </span>
                  <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {node.module.split(" ")[1] || node.module.split(" ")[0]}
                  </span>
                </div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white mt-1 line-clamp-1">
                  {node.title}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node 360° Inspector */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-theme-primary text-white">
                STEP 0{selectedNode.step} OF 12
              </span>
              <span className="text-xs font-bold text-theme-primary">
                {selectedNode.module}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {selectedNode.title}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* Left Column: Business Function & Processes */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Business Function
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                {selectedNode.businessFunction}
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Key SAP Processes Executed
              </h4>
              <div className="space-y-1">
                {selectedNode.sapProcesses.map((proc, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{proc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center">
                <Terminal className="w-3.5 h-3.5 mr-1 text-indigo-500" />
                <span>Primary T-Codes & Fiori Apps</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.tcodes.map((tc, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-lg font-mono font-bold">
                    {tc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Database Tables & Integration Points */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center">
                <Table className="w-3.5 h-3.5 mr-1 text-amber-500" />
                <span>Database Tables Updated in Background</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.tables.map((tbl, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg font-mono text-[11px]">
                    {tbl}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-1">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider text-[11px]">
                Integration Touchpoint
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedNode.integrationPoints[0]}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-1">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider text-[11px] flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                <span>Consultant Pro Tip</span>
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {selectedNode.consultantTip}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
