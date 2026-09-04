import React from "react";
import { useSap } from "../../context/SapContext";
import { PageHeader } from "../common/PageHeader";
import { 
  Code2, 
  Sparkles, 
  Compass, 
  BookOpen, 
  ArrowRight, 
  Heart, 
  CheckCircle2, 
  Lightbulb, 
  Target, 
  Layers, 
  Cpu, 
  GraduationCap, 
  Quote 
} from "lucide-react";

export const AboutCreatorView: React.FC = () => {
  const { setCurrentView } = useSap();

  const learningSteps = [
    { step: "LEARN", label: "Grasp the core idea first", icon: <BookOpen className="w-4 h-4" /> },
    { step: "UNDERSTAND", label: "See why businesses need it", icon: <Lightbulb className="w-4 h-4" /> },
    { step: "PRACTICE", label: "Work through real situations", icon: <Cpu className="w-4 h-4" /> },
    { step: "SOLVE", label: "Diagnose problems & find fixes", icon: <Target className="w-4 h-4" /> },
    { step: "EXPLAIN", label: "Articulate consultant reasoning", icon: <GraduationCap className="w-4 h-4" /> },
    { step: "BECOME READY", label: "Build genuine career confidence", icon: <CheckCircle2 className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto animate-fadeIn">
      
      {/* Standard Page Header */}
      <PageHeader
        badge="Creator & Purpose"
        badgeColor="bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"
        title="About the Creator"
        description="Meet the person behind TagSkills SAP Copilot."
        breadcrumbs={[
          { label: "Platform", view: "dashboard" },
          { label: "About the Creator" }
        ]}
        learningOutcomes={[
          "Understand why TagSkills SAP Copilot was built",
          "Discover our core step-by-step learning philosophy",
          "A personal message of encouragement for your SAP journey"
        ]}
      />

      {/* Main Profile & Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Creator Identity Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-center relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Creator Photo / Monogram Placeholder */}
            <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-1 shadow-xl border border-slate-700/60 flex items-center justify-center">
              <div className="w-full h-full rounded-[22px] bg-slate-900 flex flex-col items-center justify-center text-white space-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-amber-400/20" />
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-amber-400 font-mono">
                  AP
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                  Creator
                </span>
              </div>
            </div>

            {/* Name & Title */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Akshat Pandey
              </h2>
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                Creator & Developer of TagSkills SAP Copilot
              </p>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            <div className="space-y-2 text-left text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Architected & Built for SAP Learners</span>
              </div>
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Designed with TagSkills Practical Curriculum</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Dedicated to Student Success</span>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2">
              <button
                onClick={() => setCurrentView("mm")}
                className="w-full py-2.5 px-4 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Start Learning Today</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Quote Pill */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <Quote className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <p className="italic leading-relaxed font-medium">
              "Knowledge becomes valuable when you can use it."
            </p>
          </div>
        </div>

        {/* Right Column: Narrative, Vision & Philosophy (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Story Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>The Story Behind TagSkills SAP Copilot</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
              "SAP should not feel impossible to learn."
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                Hi, I'm Akshat Pandey, the creator of TagSkills SAP Copilot.
              </p>
              <p>
                I created this platform with a simple idea: <strong>SAP should not feel impossible to learn.</strong>
              </p>
              <p>
                Many learners come across SAP through complicated terms, large amounts of information and very little connection to real business situations. I wanted to create something different.
              </p>
              <p>
                TagSkills SAP Copilot is designed to help learners understand SAP step by step — starting with simple ideas, connecting them to real business situations, and then gradually moving toward practical SAP knowledge, problem-solving and consultant thinking.
              </p>
              <p>
                My goal is not just to help someone memorize SAP. I want learners to understand what they are learning, know why it matters, practise it, and become confident enough to use and explain their knowledge.
              </p>
            </div>
          </div>

          {/* 2-Column Cards: Vision & Why I Built It */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* My Vision */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                MY VISION
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Clear, Practical & Accessible to All
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                To make SAP learning clear, practical and accessible to anyone who is willing to learn.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                Whether you are a college student, a fresher, a working professional or someone completely new to SAP, you should have a place where you can start, learn at your own pace and grow.
              </p>
            </div>

            {/* Why I Built TagSkills */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                PURPOSE
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Why I Built TagSkills
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Learning SAP can sometimes feel overwhelming. There are many terms, processes, transactions and business concepts to understand.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                I wanted to bring those ideas together in one place and explain them in a way that feels understandable from the beginning. The platform starts with the basics and gradually takes learners toward real situations, questions, problem-solving and professional thinking.
              </p>
            </div>

          </div>

          {/* Learning Philosophy Visual Flow */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-lg space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  OUR LEARNING PHILOSOPHY
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  The TagSkills Progression Method
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {learningSteps.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-800/80 border border-slate-700/70 p-3 rounded-xl text-center space-y-1.5 flex flex-col items-center justify-between"
                >
                  <div className="p-1.5 bg-slate-900 text-amber-400 rounded-lg">
                    {item.icon}
                  </div>
                  <span className="text-xs font-black tracking-wide text-white">
                    {item.step}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
              <span className="text-xs font-semibold text-amber-300">
                "Knowledge becomes valuable when you can use it."
              </span>
            </div>
          </div>

          {/* Personal Message to Learners */}
          <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 rounded-3xl p-6 sm:p-7 border border-amber-300/40 dark:border-amber-800/50 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-amber-500 text-white rounded-xl shadow-sm">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  PERSONAL ENCOURAGEMENT
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  A Message from Akshat
                </h4>
              </div>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
              <p>
                You don't have to know SAP before you start. You just need the willingness to learn.
              </p>
              <p>
                Some topics will be easy. Some will take more effort. Some questions will challenge you. That's completely normal.
              </p>
              <div className="p-3.5 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-amber-200 dark:border-amber-900/60 text-slate-900 dark:text-slate-100 font-medium space-y-1">
                <p>• Learn one concept at a time.</p>
                <p>• Understand why it works.</p>
                <p>• Practise it.</p>
                <p>• Make mistakes.</p>
                <p>• Try again.</p>
              </div>
              <p className="font-semibold text-slate-900 dark:text-white pt-1">
                With consistent effort, you can go much further than you initially think.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
