import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";
import { CheckCircle2, Sparkles } from "lucide-react";

interface PageHeaderProps {
  badge?: string;
  badgeColor?: string;
  title: string;
  description: string;
  learningOutcomes?: string[];
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  badgeColor = "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  title,
  description,
  learningOutcomes,
  breadcrumbs,
  actions
}) => {
  return (
    <div className="mb-6 space-y-3 bg-white dark:bg-slate-900/90 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* Breadcrumbs */}
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

      {/* Title & Actions Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          {badge && (
            <span className={`inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md border ${badgeColor}`}>
              {badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {description}
          </p>
        </div>

        {actions && (
          <div className="flex items-center space-x-2 shrink-0">
            {actions}
          </div>
        )}
      </div>

      {/* "WHAT YOU'LL LEARN" Checklist Tags */}
      {learningOutcomes && learningOutcomes.length > 0 && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1.5 shrink-0" />
            <span>What You'll Learn & Practice</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {learningOutcomes.map((outcome, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5" />
                <span>{outcome}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
