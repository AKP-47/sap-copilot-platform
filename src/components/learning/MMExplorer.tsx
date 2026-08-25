import React, { useState } from "react";
import { useSap } from "../../context/SapContext";
import { MM_TOPICS } from "../../data/mmTopics";
import { TopicDetailView } from "./TopicDetailView";
import { LevelBadge } from "../common/LevelBadge";
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
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-2xl p-6 border border-amber-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-amber-600 text-white rounded-xl shadow-sm">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Procure-to-Pay (P2P) Curriculum
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              SAP MM – Materials Management / Sourcing & Procurement
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Comprehensive curriculum covering Master Data (Material, BP, PIR), Sourcing & POs, Release Strategies, Inventory Management (MIGO 101/102/122/201/261/311), LIV 3-Way Match, OBYC Account Determination, and SPRO Customizing.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search MM topics..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
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
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {topic.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <LevelBadge level={topic.level} />
                    <button
                      onClick={() => toggleBookmark(topic.id)}
                      className={`p-1 rounded transition-colors ${
                        isBookmarked ? "text-amber-500" : "text-slate-300 hover:text-slate-500"
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {topic.subtitle}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {topic.tags.slice(0, 4).map((t, idx) => (
                    <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  14 Pedagogy Points
                </span>
                <button
                  onClick={() => setSelectedTopicId(topic.id)}
                  className="flex items-center space-x-1 text-xs font-bold text-amber-700 hover:text-amber-800"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
