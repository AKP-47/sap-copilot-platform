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

export const AboutCreatorSection: React.FC<{ isEmbedded?: boolean }> = ({ isEmbedded = false }) => {
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
    <section id="about-creator" className="space-y-8 scroll-mt-20">
      
      {/* Section Header (if embedded) */}
      {isEmbedded && (
        <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/80 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Platform Creator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            About the Creator
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Meet the person behind TagSkills SAP Copilot
          </p>
        </div>
      )}

      {/* Main Two-Column Master Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Prominent Professional Photograph (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Actual Creator Photograph Container */}
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden shadow-md border border-slate-200/80 dark:border-slate-700/80 bg-slate-900">
              <img
                src="/images/akshat-pandey.jpeg"
                alt="Akshat Pandey — Creator and Developer of TagSkills SAP Copilot"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-white space-y-0.5">
                <div className="text-sm font-extrabold text-white flex items-center justify-between">
                  <span>Akshat Pandey</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                    Creator
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium leading-tight">
                  Creator & Developer of TagSkills SAP Copilot
                </p>
              </div>
            </div>

            {/* Quick Badges Below Photo */}
            <div className="pt-3 px-1 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Designed & Built for Next-Gen SAP Consultants</span>
              </div>
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Structured with TagSkills Practical Curriculum</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Dedicated to Clear, Accessible Education</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-3">
              <button
                onClick={() => setCurrentView("mm")}
                className="w-full py-2.5 px-4 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Explore SAP Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Key Quote Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1 shadow-sm">
            <Quote className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <p className="italic leading-relaxed font-semibold">
              "Knowledge becomes valuable when you can use it."
            </p>
          </div>
        </div>

        {/* Right Column: Narrative, Vision, Philosophy & Personal Message (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Bio Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Akshat Pandey</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                Creator & Developer of TagSkills SAP Copilot
              </h3>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                TagSkills SAP Copilot was created with a simple idea: SAP should not feel impossible to learn.
              </p>
              <p>
                I wanted to build a platform where learners can understand SAP through simple explanations, real business situations, step-by-step learning, and practical problem solving.
              </p>
              <p>
                The goal is not just to help someone remember SAP terms, but to help them understand why SAP works the way it does — and eventually think like a consultant.
              </p>
              <p>
                TagSkills SAP Copilot is built to make that journey clearer, more practical, and more approachable.
              </p>
            </div>
          </div>

          {/* Vision & Why I Built TagSkills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* My Vision */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                MY VISION
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Clear, Practical & Accessible
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
                I wanted to bring those ideas together in one place and explain them in a way that feels understandable from the beginning.
              </p>
            </div>

          </div>

          {/* Learning Philosophy Visual Flow */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-lg space-y-5">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                OUR LEARNING PHILOSOPHY
              </span>
              <h4 className="text-lg font-bold text-white mt-0.5">
                The TagSkills Progression Method
              </h4>
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

    </section>
  );
};

export const AboutCreatorView: React.FC = () => {
  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto animate-fadeIn">
      <PageHeader
        badge="Creator & Purpose"
        badgeColor="bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"
        title="About the Creator"
        description="Meet the person behind TagSkills SAP Copilot"
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

      <AboutCreatorSection isEmbedded={false} />
    </div>
  );
};
