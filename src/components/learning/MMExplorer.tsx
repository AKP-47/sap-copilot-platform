import React, { useState } from "react";
import { useSap } from "../../context/SapContext";
import { MM_TOPICS } from "../../data/mmTopics";
import { TopicDetailView } from "./TopicDetailView";
import { LevelBadge } from "../common/LevelBadge";
import { PageHeader } from "../common/PageHeader";
import { Package, ArrowRight, Bookmark, Search } from "lucide-react";

export const MMExplorer: React.FC = () => {
  const { selectedTopicId, setSelectedTopicId, bookmarks, toggleBookmark } = useSap();
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const levels = [
    { id: "All", label: "All Levels", count: MM_TOPICS.length },
    { id: "BEGINNER", label: "Level 1: Beginner", count: MM_TOPICS.filter(t => t.level === "BEGINNER").length },
    { id: "INTERMEDIATE", label: "Level 2: Intermediate", count: MM_TOPICS.filter(t => t.level === "INTERMEDIATE").length },
    { id: "ADVANCED", label: "Level 3: Advanced", count: MM_TOPICS.filter(t => t.level === "ADVANCED").length },
    { id: "CONSULTANT", label: "Level 4 & 5: Consultant & Project", count: MM_TOPICS.filter(t => t.level === "CONSULTANT" || t.level === "PROJECT").length }
  ];

  const categories = ["All", "Foundations", "Master Data", "Procurement", "Inventory Management", "Configuration", "FI Integration", "Invoicing", "Troubleshooting", "Consulting", "Cloud Transformation", "Project Implementation", "Data Migration", "RICEFW", "Documentation", "Integration"];

  const filteredTopics = MM_TOPICS.filter((topic) => {
    const matchesLevel = selectedLevel === "All" || 
      topic.level === selectedLevel || 
      (selectedLevel === "CONSULTANT" && (topic.level === "CONSULTANT" || topic.level === "PROJECT"));
    const matchesCategory = selectedCategory === "All" || topic.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      topic.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesCategory && matchesSearch;
  });

  const activeTopic = MM_TOPICS.find(t => t.id === selectedTopicId);

  if (activeTopic) {
    return <TopicDetailView topic={activeTopic} onBack={() => setSelectedTopicId(null)} />;
  }

  return (
    <div className="space-y-6 pb-12">
      
      {/* Standardized Page Header with Breadcrumbs & Learning Outcomes */}
      <PageHeader
        badge="TagSkills SAP S/4HANA MM Consultant Curriculum"
        badgeColor="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-800"
        title="SAP S/4HANA MM – Sourcing & Procurement"
        description="Comprehensive 5-level curriculum covering Enterprise Structure, Master Data, P2P Lifecycle, Outline Agreements, Flexible Workflow, Pricing Procedures, Batch Management, MRP Live, Special Procurement, OBYC Account Determination, MIRO 3-Way Match, SPRO Customizing, RCA Troubleshooting, RISE/GROW Cloud ERP, SAP Activate Implementation, Data Migration (LTMC), RICEFW FSDs, and MM+EWM Deep Integration."
        breadcrumbs={[
          { label: "Learn SAP", view: "mm" },
          { label: "SAP MM (Sourcing & Procurement)" }
        ]}
        learningOutcomes={[
          "Level 1: Enterprise Structure & Master Data (Material, BP, PIR)",
          "Level 2: Pricing, Workflows, MRP Live & Special Procurement",
          "Level 3: SPRO Customizing & Cross-Module RCA Troubleshooting",
          "Level 4: Consultant Problem-Solving & RISE/GROW Cloud ERP",
          "Level 5: SAP Activate, LTMC Migration, RICEFW FSDs & EWM Hub"
        ]}
      />

      {/* 5-Level Progressive Learning Level Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => setSelectedLevel(lvl.id)}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-bold shrink-0 transition-all border-b-2 flex items-center gap-1.5 ${
              selectedLevel === lvl.id
                ? "border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20"
                : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>{lvl.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              selectedLevel === lvl.id ? "bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            }`}>
              {lvl.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 29 MM topics, t-codes, tables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-3 py-1.5 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((topic) => {
          const isBookmarked = bookmarks.includes(topic.id);
          return (
            <div
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                    {topic.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <LevelBadge level={topic.level} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(topic.id);
                      }}
                      className="text-slate-400 hover:text-amber-500 p-1"
                      title={isBookmarked ? "Remove bookmark" : "Bookmark topic"}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-500 text-amber-500" : ""}`} />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                  {topic.subtitle}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {topic.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
