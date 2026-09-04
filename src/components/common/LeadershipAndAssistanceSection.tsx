import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Quote, Sparkles, UserCheck, Crown, ArrowUpRight, Sparkle } from "lucide-react";
import { LEADERSHIP_PROFILE } from "../../data/contacts";
import { InteractiveExecutivePortrait } from "./InteractiveExecutivePortrait";
import { useSap } from "../../context/SapContext";

export const LeadershipAndAssistanceSection: React.FC = () => {
  const { setCurrentView } = useSap();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device & Reduced Motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(!window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  // Cinematic Intersection Observer Entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Subtle 3D Depth on Cursor Movement (Desktop Only, Max 1.2deg)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -1.0;
    const rotateY = ((x - centerX) / centerX) * 1.0;

    setTilt({ rotateX, rotateY });
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  return (
    <section 
      ref={sectionRef} 
      className="w-full relative select-none"
      aria-label="Leadership and Mentorship Showcase"
    >
      {/* ============================================================ */}
      {/* LAYER 1: OUTER EXECUTIVE CONTAINER                            */}
      {/* ============================================================ */}
      <div className={`relative rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden bg-gradient-to-b from-slate-950 via-[#0b1120] to-slate-950 border border-slate-800/80 shadow-2xl transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}>
        
        {/* Soft Ambient Radial Lights (Warm Amber + Royal Blue) */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-amber-500/[0.07] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/[0.06] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8 max-w-6xl mx-auto">
          
          {/* Section Header with Micro-Interaction Tooltip */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              {/* Interactive Badge with Discovery Tooltip */}
              <div className="relative inline-block">
                <button
                  type="button"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onFocus={() => setShowTooltip(true)}
                  onBlur={() => setShowTooltip(false)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-wider transition-colors duration-200 cursor-default focus:outline-none"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>LEADERSHIP & MENTORSHIP</span>
                </button>

                {/* Floating Discovery Tooltip */}
                <div className={`absolute left-0 bottom-full mb-2 px-3 py-1.5 bg-slate-900 text-amber-200 text-xs font-semibold rounded-lg shadow-xl border border-amber-400/30 whitespace-nowrap pointer-events-none transition-all duration-300 ease-out ${
                  showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                }`}>
                  <span>"Learn. Practice. Prepare. Become Job-Ready."</span>
                  <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-slate-900" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2.5 tracking-tight flex items-center">
                <span>Meet Our CEO & Mentor</span>
                <Sparkles className="w-5 h-5 ml-2.5 text-amber-400 shrink-0" />
              </h2>
            </div>

            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400 font-medium pb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>TagSkills Enterprise Mentorship</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* LAYER 2: EXECUTIVE CARD WITH 3D CURSOR INTERACTION           */}
          {/* ============================================================ */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: !isTouchDevice && isHovered
                ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
                : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
              transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out"
            }}
            className="relative bg-slate-900/90 rounded-2xl sm:rounded-3xl border border-slate-700/80 hover:border-amber-400/40 p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden group"
          >
            {/* Subtle Cursor-Following Radial Glow (Desktop) */}
            {!isTouchDevice && isHovered && (
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100"
                style={{
                  background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.05), transparent 70%)`
                }}
              />
            )}

            {/* ============================================================ */}
            {/* LAYER 3: IMAGE + EDITORIAL INFORMATION COMPOSITION          */}
            {/* ============================================================ */}
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-10">
              
              {/* LEFT: ULTIMATE INTERACTIVE 3D EXECUTIVE PORTRAIT */}
              <InteractiveExecutivePortrait />

              {/* RIGHT: EDITORIAL TYPOGRAPHY & MENTORSHIP CALLOUTS */}
              <div className="flex-1 flex flex-col justify-between space-y-6 text-left w-full">
                
                {/* Header Profile Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 bg-amber-400/15 text-amber-400 rounded-lg border border-amber-400/30">
                      <UserCheck className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                      TAGSKILLS FOUNDER & VISIONARY
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight pt-1">
                    {LEADERSHIP_PROFILE.name}
                  </h3>
                  
                  <p className="text-sm sm:text-base font-semibold text-amber-300/90 tracking-wide">
                    {LEADERSHIP_PROFILE.role}
                  </p>
                </div>

                {/* Leadership Mentor Quote */}
                <div className="relative bg-slate-950/75 hover:bg-slate-950/90 p-5 sm:p-6 rounded-2xl border-l-2 border-l-amber-400 border border-slate-800/80 text-slate-200 shadow-inner transition-colors duration-300">
                  <Quote className="w-6 h-6 text-amber-400/40 absolute top-4 left-4 -scale-x-100 pointer-events-none" />
                  <p className="text-xs sm:text-sm lg:text-base text-slate-200 italic leading-relaxed pl-7 sm:pl-8">
                    "{LEADERSHIP_PROFILE.quote}"
                  </p>
                </div>

                {/* Mentorship CTA Row */}
                <div className="pt-2 border-t border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
                      Direct WhatsApp Mentorship
                    </span>
                    <div className="text-base sm:text-lg font-mono font-bold text-amber-400">
                      {LEADERSHIP_PROFILE.phone}
                    </div>
                  </div>

                  {/* Primary CTA Button (WhatsApp Only) */}
                  <a
                    href={LEADERSHIP_PROFILE.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 py-3 px-6 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/35 hover:-translate-y-0.5 transition-all duration-200 group/btn"
                  >
                    <MessageSquare className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                    <span>WhatsApp Prashun</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                  </a>
                </div>

                {/* Subtle Official Footer Tag */}
                <div className="pt-1 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                    <span>Official TagSkills Leadership & Career Mentorship</span>
                  </div>
                  <button
                    onClick={() => setCurrentView("about_creator")}
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    About the Creator (Akshat Pandey) ➔
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
