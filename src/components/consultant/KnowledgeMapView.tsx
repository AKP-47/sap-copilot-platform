import React, { useState } from "react";
import { useSap } from "../../context/SapContext";
import { PageHeader } from "../common/PageHeader";
import { 
  Network, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Circle, 
  ArrowRight, 
  Sparkles, 
  Package, 
  Warehouse, 
  GitMerge, 
  Layers 
} from "lucide-react";

export type MasteryStatus = "mastered" | "developing" | "needs_practice" | "not_started";

interface KnowledgeNode {
  id: string;
  title: string;
  category: "MM" | "EWM" | "INTEGRATION" | "CORE";
  subdomain: string;
  targetView: string;
  topicId?: string;
  status: MasteryStatus;
  keySkills: string[];
}

export const KnowledgeMapView: React.FC = () => {
  const { setCurrentView, setSelectedTopicId } = useSap();
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const knowledgeTree: KnowledgeNode[] = [
    {
      id: "mm_master_data",
      title: "Material Master & BP Vendor",
      category: "MM",
      subdomain: "Master Data",
      targetView: "mm",
      status: "mastered",
      keySkills: ["MARA, MARC, MARD table schemas", "BP (Business Partner) CVI integration", "Valuation Class & Account Cat Ref"]
    },
    {
      id: "mm_p2p",
      title: "Procure-to-Pay Purchasing Cycle",
      category: "MM",
      subdomain: "Procurement",
      targetView: "mm",
      status: "mastered",
      keySkills: ["PR (ME51N) to PO (ME21N) conversion", "Approval Release Strategy (CEKKO)", "Source List & Info Records"]
    },
    {
      id: "mm_inventory",
      title: "Inventory Movements & MIGO",
      category: "MM",
      subdomain: "Inventory Mgmt",
      targetView: "movement_lab",
      status: "developing",
      keySkills: ["40+ Movement Types (101, 201, 261, 311, 551)", "Material Documents (MATDOC)", "Debit/Credit T-Accounts (BSX/WRX)"]
    },
    {
      id: "mm_liv",
      title: "Logistics Invoice Verification (MIRO)",
      category: "MM",
      subdomain: "Invoicing",
      targetView: "obyc_sim",
      status: "developing",
      keySkills: ["3-Way Match (PO vs GR vs Invoice)", "Price & Quantity Tolerances (PP/BD)", "GR/IR Clearing Account Reconciliations"]
    },
    {
      id: "ewm_org_struct",
      title: "EWM Warehouse Structure",
      category: "EWM",
      subdomain: "Architecture",
      targetView: "ewm",
      status: "mastered",
      keySkills: ["Warehouse Number, Storage Type, Storage Section", "Storage Bin Master (/SCWM/LS01N)", "Activity Areas & Bin Sorters"]
    },
    {
      id: "ewm_execution",
      title: "Warehouse Task & Order Architecture",
      category: "EWM",
      subdomain: "Execution",
      targetView: "whse_monitor",
      status: "developing",
      keySkills: ["Warehouse Task (WT) & Order (WO)", "Creation Rules (WOCR)", "Warehouse Monitor (/SCWM/MON) tree query"]
    },
    {
      id: "ewm_posc",
      title: "Process-Oriented Storage Control (POSC)",
      category: "EWM",
      subdomain: "Advanced EWM",
      targetView: "posc_visualizer",
      status: "needs_practice",
      keySkills: ["Multi-step work center routing (UNLD -> DECO -> QIS -> PUTW)", "Auto-WT confirmation triggers", "External to Internal step mappings"]
    },
    {
      id: "ewm_rf",
      title: "Radio Frequency Mobile Scanning (/RFUI)",
      category: "EWM",
      subdomain: "RF Terminal",
      targetView: "rf_terminal",
      status: "developing",
      keySkills: ["RF screen flows for Receiving & Picking", "Resource & Queue assignment (/SCWM/USER)", "System Guided vs Manual work modes"]
    },
    {
      id: "integration_p2p_ewm",
      title: "MM-EWM Inbound Delivery qRFC Bridge",
      category: "INTEGRATION",
      subdomain: "Cross-Module",
      targetView: "integration",
      status: "developing",
      keySkills: ["Inbound Delivery (VL31N) replication to /SCWM/PRDI", "Queue troubleshooting (SMQ1/SMQ2)", "PGR (Post Goods Receipt) sync back to ERP"]
    },
    {
      id: "integration_obyc_fi",
      title: "Automatic Account Determination (OBYC)",
      category: "INTEGRATION",
      subdomain: "FI-MM Integration",
      targetView: "obyc_sim",
      status: "needs_practice",
      keySkills: ["Transaction Keys (BSX, WRX, GBB, PRD)", "Valuation Grouping Code & Account Modifiers", "Price Differences on Standard vs Moving Avg Cost"]
    }
  ];

  const filteredNodes = knowledgeTree.filter(node => 
    filterCategory === "ALL" || node.category === filterCategory
  );

  const getStatusBadge = (status: MasteryStatus) => {
    switch (status) {
      case "mastered":
        return {
          label: "Mastered",
          bg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        };
      case "developing":
        return {
          label: "Developing",
          bg: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-800",
          icon: <Clock className="w-3.5 h-3.5 text-blue-600" />
        };
      case "needs_practice":
        return {
          label: "Needs Practice",
          bg: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800",
          icon: <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
        };
      case "not_started":
      default:
        return {
          label: "Not Started",
          bg: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-300 dark:border-slate-700",
          icon: <Circle className="w-3.5 h-3.5 text-slate-400" />
        };
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        badge="SKILL MASTERY MATRIX"
        badgeColor="bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 border-teal-200 dark:border-teal-800"
        title="Interactive Knowledge Map & Mastery Tree"
        description="Replace static progress percentages with dynamic competency tracking. Inspect your mastery status across Master Data, P2P Cycles, EWM POSC Routing, and Cross-Module FI-MM Integration."
        breadcrumbs={[
          { label: "Career & Consultant Suite" },
          { label: "Knowledge Map" }
        ]}
        learningOutcomes={[
          "Track 4-tier mastery states (Mastered, Developing, Needs Practice, Not Started)",
          "Click any competence node to launch targeted interactive learning or simulators",
          "Identify knowledge gaps before sitting for technical interviews or client audits"
        ]}
      />

      {/* Category Filter Pills & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
          {["ALL", "MM", "EWM", "INTEGRATION"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                backgroundColor: filterCategory === cat ? "var(--theme-primary)" : undefined,
                color: filterCategory === cat ? "#ffffff" : undefined
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                filterCategory === cat
                  ? "shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              {cat === "ALL" ? "All Domains" : cat}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">Mastered (3)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-slate-600 dark:text-slate-400">Developing (5)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-slate-600 dark:text-slate-400">Needs Practice (2)</span>
          </div>
        </div>
      </div>

      {/* Knowledge Map Node Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNodes.map(node => {
          const badge = getStatusBadge(node.status);
          return (
            <div
              key={node.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {node.category} • {node.subdomain}
                  </span>
                  <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.bg}`}>
                    {badge.icon}
                    <span>{badge.label}</span>
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-theme-primary transition-colors">
                  {node.title}
                </h3>

                {/* Key Skills Checklist */}
                <div className="mt-3 space-y-1">
                  {node.keySkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    setCurrentView(node.targetView as any);
                    if (node.topicId) setSelectedTopicId(node.topicId);
                  }}
                  className="inline-flex items-center text-xs font-bold text-theme-primary hover:underline"
                >
                  <span>Launch Practice Lab</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
