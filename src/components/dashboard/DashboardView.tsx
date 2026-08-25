import React from "react";
import { useSap } from "../../context/SapContext";
import { TagSkillsBanner } from "../common/TagSkillsBanner";
import { 
  Package, 
  Warehouse, 
  GitMerge, 
  RotateCw, 
  Terminal, 
  Cpu, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Activity, 
  Layers,
  Sparkles,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { MM_TOPICS } from "../../data/mmTopics";
import { EWM_TOPICS } from "../../data/ewmTopics";
import { MOVEMENT_TYPES } from "../../data/movementTypes";
import { SCENARIO_BANK } from "../../data/scenarioBank";

export const DashboardView: React.FC = () => {
  const { setCurrentView, setSelectedTopicId, completedScenarios, bookmarks, t } = useSap();

  const primaryModules = [
    {
      title: "SAP MM – Sourcing & Procurement",
      description: "Master Data (Material, BP/Vendor, PIR), Purchasing (PR, PO, Release Strategy), Inventory Mgmt (MIGO, Stock Types), LIV 3-Way Match & SPRO.",
      icon: <Package className="w-7 h-7 text-amber-600" />,
      tag: "Core P2P Domain",
      view: "mm" as const,
      topicCount: MM_TOPICS.length,
      bg: "from-amber-500/10 to-orange-500/10 border-amber-200 hover:border-amber-400",
      btnText: "Explore MM Curriculum"
    },
    {
      title: "SAP EWM – Extended Warehouse Management",
      description: "Full Institute Curriculum: Org Structure, Execution (WT, WO, WOCR), Inbound/Outbound, POSC/LOSC, Deconsolidation, VAS, RF Terminal & Automation.",
      icon: <Warehouse className="w-7 h-7 text-blue-600" />,
      tag: "Full Professional Domain",
      view: "ewm" as const,
      topicCount: EWM_TOPICS.length,
      bg: "from-blue-500/10 to-indigo-500/10 border-blue-200 hover:border-blue-400",
      btnText: "Explore EWM Curriculum"
    },
    {
      title: "SAP MM + EWM Integration Hub",
      description: "End-to-end integration: PR->PO->Inbound Delivery->EWM Putaway, Outbound Waves->PGI, STO Plant-to-Plant, and qRFC SMQ1/SMQ2 troubleshooting.",
      icon: <GitMerge className="w-7 h-7 text-purple-600" />,
      tag: "End-to-End Bridge",
      view: "integration" as const,
      topicCount: "8 Flows",
      bg: "from-purple-500/10 to-pink-500/10 border-purple-200 hover:border-purple-400",
      btnText: "Open Integration Lab"
    }
  ];

  const interactiveSimulators = [
    {
      title: "Movement Type Lab",
      desc: "40+ Movement Types with Debit/Credit T-Accounts and Multi-Industry Challenges.",
      icon: <RotateCw className="w-5 h-5 text-emerald-600" />,
      view: "movement_lab" as const,
      badge: "40+ Codes"
    },
    {
      title: "T-Code & Fiori Explorer",
      desc: "Searchable T-Codes with tables, inputs, outputs & real-world context.",
      icon: <Terminal className="w-5 h-5 text-indigo-600" />,
      view: "tcodes" as const,
      badge: "100+ T-Codes"
    },
    {
      title: "Scenario Simulator",
      desc: "Solve real business problems across Automotive, Pharma, Aerospace & Retail.",
      icon: <Cpu className="w-5 h-5 text-pink-600" />,
      view: "scenarios" as const,
      badge: "Interactive"
    },
    {
      title: "Consultant Simulator",
      desc: "Client discovery interview, master data audit, SPRO diagnosis & executive pitch.",
      icon: <Briefcase className="w-5 h-5 text-yellow-600" />,
      view: "consultant_sim" as const,
      badge: "Pro Level"
    },
    {
      title: "7-Tier Interview Prep",
      desc: "Junior to Principal Architect questions with ideal answers and follow-ups.",
      icon: <GraduationCap className="w-5 h-5 text-blue-700" />,
      view: "interview_prep" as const,
      badge: "150+ Q"
    },
    {
      title: "EWM Monitor Simulator (/MON)",
      desc: "Interactive /SCWM/MON tree for deliveries, tasks, stock quants & queues.",
      icon: <Activity className="w-5 h-5 text-cyan-600" />,
      view: "whse_monitor" as const,
      badge: "Live Tree"
    }
  ];

  const dailyChallenge = SCENARIO_BANK[0];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Institute Banner */}
      <TagSkillsBanner />

      {/* Main Module Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Core SAP Modules
            </h2>
            <p className="text-xs text-slate-500">
              Multi-dimensional 14-point pedagogy: Beginner Explanation → SPRO → Troubleshooting → Consultant Simulation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {primaryModules.map((mod) => (
            <div
              key={mod.view}
              className={`rounded-2xl p-6 bg-gradient-to-br ${mod.bg} border transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                    {mod.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-white/90 text-slate-700 rounded-full border border-slate-200 shadow-sm">
                    {mod.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    setCurrentView(mod.view);
                    setSelectedTopicId(null);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm group"
                >
                  <span>{mod.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Daily Consultant Challenge */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-yellow-100 text-yellow-800 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Daily Consultant Case Study
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {dailyChallenge.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
              Industry: {dailyChallenge.industry.toUpperCase()}
            </span>
            <button
              onClick={() => setCurrentView("scenarios")}
              className="flex items-center space-x-1.5 py-2 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              <span>Solve Scenario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 pt-4 leading-relaxed">
          {dailyChallenge.businessContext}
        </p>
      </div>

      {/* Interactive Labs & Tools Grid */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Interactive Laboratories & Simulators
          </h2>
          <p className="text-xs text-slate-500">
            Practice hands-on tools, terminal simulators, debit/credit ledgers, and live monitor hierarchies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {interactiveSimulators.map((sim, sIdx) => (
            <button
              key={sIdx}
              onClick={() => setCurrentView(sim.view)}
              className="text-left bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-blue-50 transition-colors">
                    {sim.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    {sim.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {sim.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {sim.desc}
                </p>
              </div>

              <div className="pt-3 flex items-center text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                <span>Launch Lab</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
