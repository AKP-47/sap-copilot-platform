import React from "react";
import { LearningLevel } from "../../types/sap";

export const LevelBadge: React.FC<{ level: LearningLevel; className?: string }> = ({ level, className = "" }) => {
  const styles: Record<LearningLevel, { bg: string; text: string; label: string }> = {
    BEGINNER: { bg: "bg-emerald-100 border-emerald-300", text: "text-emerald-800", label: "Beginner" },
    INTERMEDIATE: { bg: "bg-blue-100 border-blue-300", text: "text-blue-800", label: "Intermediate" },
    ADVANCED: { bg: "bg-indigo-100 border-indigo-300", text: "text-indigo-800", label: "Advanced" },
    PROFESSIONAL: { bg: "bg-purple-100 border-purple-300", text: "text-purple-800", label: "Professional" },
    CONSULTANT: { bg: "bg-amber-100 border-amber-300", text: "text-amber-900", label: "Consultant" },
    PROJECT: { bg: "bg-teal-100 border-teal-300", text: "text-teal-900", label: "Project Architecture" },
    INTERVIEW: { bg: "bg-rose-100 border-rose-300", text: "text-rose-800", label: "Interview" }
  };

  const current = styles[level] || styles.BEGINNER;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${current.bg} ${current.text} ${className}`}>
      {current.label}
    </span>
  );
};
