import React, { useState } from "react";
import { useSap } from "../../context/SapContext";
import { useAi, AiPersona } from "../../context/AiContext";
import { X, Send, Sparkles, Trash2, Bot, User } from "lucide-react";

export const AiCopilotDrawer: React.FC = () => {
  const { isCopilotOpen, setIsCopilotOpen } = useSap();
  const { messages, sendMessage, isGenerating, activePersona, setActivePersona, clearChat } = useAi();
  const [inputText, setInputText] = useState("");

  if (!isCopilotOpen) return null;

  const handleSend = async () => {
    if (!inputText.trim() || isGenerating) return;
    const txt = inputText;
    setInputText("");
    await sendMessage(txt);
  };

  const personas: AiPersona[] = [
    "SAP Solution Architect",
    "MM Lead Consultant",
    "EWM Senior Architect",
    "Certification Coach",
    "Mock Interviewer"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-sm font-bold">TagSkills SAP Copilot</h3>
              <p className="text-[10px] text-slate-400">Enterprise AI Consultant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={clearChat} className="text-slate-400 hover:text-white p-1 rounded" title="Clear Chat">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={() => setIsCopilotOpen(false)} className="text-slate-400 hover:text-white p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Persona Switcher */}
        <div className="p-2.5 bg-slate-800 text-white flex items-center space-x-1.5 overflow-x-auto text-[11px]">
          {personas.map((p) => (
            <button
              key={p}
              onClick={() => setActivePersona(p)}
              className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-colors ${
                activePersona === p ? "bg-blue-600 text-white font-bold" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === "user" ? "bg-slate-900 text-white" : "bg-blue-600 text-white"
              }`}>
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                msg.sender === "user"
                  ? "bg-slate-900 text-white rounded-tr-none"
                  : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200"
              }`}>
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.suggestedPrompts && (
                  <div className="mt-3 pt-2 border-t border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Suggested Prompts:</span>
                    {msg.suggestedPrompts.map((sp, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(sp)}
                        className="block w-full text-left p-1 text-[11px] text-blue-700 hover:underline"
                      >
                        • {sp}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 italic">
              <Sparkles className="w-4 h-4 animate-spin text-blue-600" />
              <span>Analyzing SAP business logic...</span>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-3 border-t border-slate-200 bg-white flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about MM, EWM, SPRO, or paste error codes..."
            className="flex-1 p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isGenerating}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
