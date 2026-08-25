import React, { useState, useEffect, useRef } from "react";
import { Crown, Sparkles } from "lucide-react";
import prashunImage from "../../assets/prashun-shetty.png";

export const InteractiveExecutivePortrait: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [pixelMouse, setPixelMouse] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);
  const [scrollParallax, setScrollParallax] = useState(0);

  // Detect Touch / Reduced Motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(!window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  // Subtle Scroll Parallax (Max 8px)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (rect.top + rect.height / 2 - windowHeight / 2) / (windowHeight / 2);
        setScrollParallax(Math.max(-8, Math.min(8, progress * 8)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3D Tilt, Magnetic Pull & Light Follower
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normY = (y / rect.height - 0.5) * 2; // -1 to 1

    setMouse({ x: normX, y: normY });
    setPixelMouse({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setSweepKey(prev => prev + 1); // Trigger single border sweep animation
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouse({ x: 0, y: 0 });
  };

  // Click Micro-Interaction (800ms Spring Scale to 1.03)
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 800);
  };

  // Calculations
  const rotX = isHovered && !isTouch ? -mouse.y * 5 : 0;
  const rotY = isHovered && !isTouch ? mouse.x * 5 : 0;
  const transX = isHovered && !isTouch ? mouse.x * 5 : 0;
  const transY = isHovered && !isTouch ? mouse.y * 5 + scrollParallax : scrollParallax;

  const shadowX = -mouse.x * 16;
  const shadowY = -mouse.y * 16 + 20;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        perspective: "1000px"
      }}
      className="w-full sm:w-[280px] md:w-[300px] lg:w-[320px] shrink-0 flex justify-center cursor-pointer select-none relative group"
    >
      {/* LAYER 1: AMBIENT GLOW BACKDROP (Moves 12px Parallax) */}
      <div
        style={{
          transform: isHovered && !isTouch
            ? `translate3d(${mouse.x * 12}px, ${mouse.y * 12}px, -20px)`
            : "translate3d(0, 0, -20px)",
          transition: isHovered ? "transform 0.15s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
        className="absolute inset-0 -m-4 rounded-3xl bg-gradient-to-tr from-blue-600/15 via-amber-500/10 to-amber-400/20 blur-2xl pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* LAYER 2: 3D FLOATING OUTER FRAME (Moves 8px, Rotates 5deg) */}
      <div
        style={{
          transform: `translate3d(${transX}px, ${transY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${isClicked ? 1.03 : 1})`,
          boxShadow: isHovered
            ? `${shadowX}px ${shadowY}px 35px -5px rgba(0, 0, 0, 0.8), 0 0 25px rgba(245, 158, 11, 0.18)`
            : "0 18px 30px -8px rgba(0, 0, 0, 0.6), 0 0 15px rgba(245, 158, 11, 0.08)",
          transition: isHovered
            ? "transform 0.12s ease-out, box-shadow 0.2s ease-out"
            : "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s ease-out"
        }}
        className="relative w-full rounded-2xl overflow-hidden bg-slate-950 p-1 border-2 border-amber-400/40 group-hover:border-amber-400/80 ring-1 ring-amber-400/20 transition-colors duration-300"
      >
        
        {/* LIGHT FOLLOWER: Dynamic Virtual Light Source (Follows Mouse over Frame) */}
        {!isTouch && isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-200"
            style={{
              background: `radial-gradient(280px circle at ${pixelMouse.x}px ${pixelMouse.y}px, rgba(245, 158, 11, 0.15), transparent 70%)`
            }}
          />
        )}

        {/* BORDER LIGHT SWEEP (Animates on Entry along outer border) */}
        <div 
          key={sweepKey}
          className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl border border-amber-400/30"
        >
          {isHovered && (
            <div className="absolute inset-0 border-2 border-amber-300/80 rounded-2xl animate-border-sweep" />
          )}
        </div>

        {/* LAYER 3: FLOATING "FOUNDER & CEO" BADGE (Moves 10px Independent Parallax) */}
        <div
          style={{
            transform: isHovered && !isTouch
              ? `translate3d(${mouse.x * 10}px, ${mouse.y * 10}px, 20px)`
              : "translate3d(0, 0, 0)",
            transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className="absolute top-3.5 left-3.5 z-30 flex items-center space-x-1.5 px-3 py-1 bg-slate-950/85 backdrop-blur-md rounded-md border border-amber-400/50 text-amber-300 text-[10px] font-mono font-bold tracking-wider uppercase shadow-xl"
        >
          <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>FOUNDER & CEO</span>
        </div>

        {/* LAYER 4: EXACT UNTOUCHED PRASHUN SHETTY PHOTOGRAPH (Moves 4px Parallax) */}
        <div
          style={{
            transform: isHovered && !isTouch
              ? `translate3d(${mouse.x * 4}px, ${mouse.y * 4}px, 0)`
              : "translate3d(0, 0, 0)",
            transition: isHovered ? "transform 0.15s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className="w-full h-auto rounded-xl overflow-hidden bg-slate-900"
        >
          <img
            src={prashunImage || "/prashun-shetty.png"}
            alt="Prashun Shetty, Founder and CEO of TagSkills"
            className="w-full h-auto object-contain block rounded-xl transform-gpu transition-transform duration-300"
          />
        </div>

        {/* Subtle Outer Frame Inner Edge Highlight */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/5" />
      </div>

      {/* DISCOVER INDICATOR: "Explore →" (Follows Cursor Softly) */}
      {!isTouch && isHovered && (
        <div
          style={{
            left: `${pixelMouse.x + 16}px`,
            top: `${pixelMouse.y - 12}px`,
            transition: "opacity 0.2s ease-out, transform 0.1s ease-out"
          }}
          className="absolute pointer-events-none z-40 px-2 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider rounded shadow-lg border border-amber-300 opacity-90 flex items-center space-x-1"
        >
          <span>Explore</span>
          <Sparkles className="w-2.5 h-2.5" />
        </div>
      )}
    </div>
  );
};
