import React from "react";
import { useSap, AppView } from "../../context/SapContext";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  view?: AppView;
  topicId?: string | null;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  const { setCurrentView, setSelectedTopicId } = useSap();

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 overflow-x-auto py-1 whitespace-nowrap"
    >
      {/* Home / Dashboard Link */}
      <button
        onClick={() => {
          setCurrentView("dashboard");
          setSelectedTopicId(null);
        }}
        className="flex items-center hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 py-0.5"
        title="Go to Dashboard"
      >
        <Home className="w-3.5 h-3.5 mr-1" />
        <span className="hidden sm:inline">Dashboard</span>
      </button>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => {
                  if (item.view) setCurrentView(item.view);
                  if (item.topicId !== undefined) setSelectedTopicId(item.topicId);
                }}
                className="hover:text-slate-900 dark:hover:text-white transition-colors truncate max-w-[150px] focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 py-0.5"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
