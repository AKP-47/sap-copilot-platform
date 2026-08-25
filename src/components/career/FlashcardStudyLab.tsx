import React, { useState } from "react";
import { FLASHCARDS_DATA } from "../../data/flashcardsBank";
import { Bookmark, RotateCw, ArrowRight, ArrowLeft } from "lucide-react";

export const FlashcardStudyLab: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const card = FLASHCARDS_DATA[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % FLASHCARDS_DATA.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + FLASHCARDS_DATA.length) % FLASHCARDS_DATA.length);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-emerald-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-sm">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Spaced Repetition & Quick Recall
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              SAP MM & EWM Flashcard Study Lab
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Test and solidify your SAP knowledge through interactive flashcards. Flip to reveal explanations, key tables, and takeaways.
        </p>
      </div>

      {/* Flashcard Area */}
      <div className="flex flex-col items-center space-y-4">
        <div
          onClick={() => setIsFlipped(prev => !prev)}
          className="w-full max-w-xl min-h-[260px] bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl cursor-pointer hover:border-emerald-400 transition-all flex flex-col justify-between select-none"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>{card.module} • {card.category}</span>
            <span>Card {currentIndex + 1} of {FLASHCARDS_DATA.length} (Click to Flip)</span>
          </div>

          <div className="text-center py-6">
            {!isFlipped ? (
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {card.frontQuestion}
              </h3>
            ) : (
              <div className="space-y-3 animate-in fade-in duration-200">
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-mono">
                  {card.backAnswer}
                </p>
                <div className="p-2 bg-emerald-50 text-emerald-900 rounded-lg text-xs font-bold">
                  💡 Takeaway: {card.keyTakeaway}
                </div>
              </div>
            )}
          </div>

          <div className="text-center text-xs text-slate-400">
            {isFlipped ? "Showing Answer" : "Showing Question"}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrev}
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFlipped(prev => !prev)}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
          >
            Flip Card
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
