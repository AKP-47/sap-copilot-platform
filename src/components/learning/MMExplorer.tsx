import React, { useState } from "react";
import { useSap } from "../../context/SapContext";
import { MM_TOPICS } from "../../data/mmTopics";
import { TopicDetailView } from "./TopicDetailView";
import { LevelBadge } from "../common/LevelBadge";
import { PageHeader } from "../common/PageHeader";
import { Package, ArrowRight, Bookmark, Search } from "lucide-react";

export const MMExplorer: React.FC = () => {
  const { selectedTopicId, setSelectedTopicId, bookmarks, toggleBookmark } = useSap();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Master Data", "Procurement", "Inventory Management", "Logistics Invoice Verification", "Enterprise Structure"];

  const filteredTopics = MM_TOPICS.filter((topic) => {
    const matchesCategory = selectedCategory === "All" || topic.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      topic.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeTopic = MM_TOPICS.find(t => t.id === selectedTopicId);

  if (activeTopic) {
    return <TopicDetailView topic={activeTopic} onBack={() => setSelectedTopicId(null)} />;
  }

  return (
    <div className="space-y-6 pb-12">
      
      {/* Standardized Page Header with Breadcrumbs & Learning Outcomes */}
      <PageHeader
        badge="Procure-to-Pay (P2P) Curriculum"
        badgeColor="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-800"
        title="SAP MM – Sourcing & Procurement"
        description="Comprehensive curriculum covering Enterprise Structure, Master Data (Material, BP, PIR), Purchasing (PR, PO, Release Strategies), Inventory Management (MIGO 101/261/311), LIV 3-Way Match, OBYC Account Determination, and SPRO Customizing."
        breadcrumbs={[
          { label: "Learn SAP", view: "mm" },
          { label: "SAP MM (Sourcing & Procurement)" }
        ]}
        learningOutcomes={[
          "Enterprise Structure & Plant Setup",
          "Material Master & Business Partner (BP)",
          "Purchasing PR ➔ PO & Release Strategy",
          "MIGO Goods Receipt & Movement Types",
          "MIRO 3-Way Invoice Match & OBYC Postings"
        ]}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {categories.map((cat) => (
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
            placeholder="Search MM topics..."
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
