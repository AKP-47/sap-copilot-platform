import React, { createContext, useContext, useState } from "react";
import { SupportedLanguage } from "../data/translations";

export type AiPersona = 
  | "SAP Solution Architect"
  | "MM Lead Consultant"
  | "EWM Senior Architect"
  | "Certification Coach"
  | "Mock Interviewer";

export interface ChatMessage {
  id: string;
  sender: "user" | "copilot" | "system";
  persona?: AiPersona;
  text: string;
  timestamp: string;
  sapObjects?: string[];
  tcodes?: string[];
  suggestedPrompts?: string[];
}

interface AiContextType {
  messages: ChatMessage[];
  activePersona: AiPersona;
  setActivePersona: (persona: AiPersona) => void;
  isThinkFirstMode: boolean;
  setIsThinkFirstMode: (mode: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  isGenerating: boolean;
  sendMessage: (query: string, lang?: SupportedLanguage) => Promise<void>;
  clearChat: () => void;
}

const AiContext = createContext<AiContextType | undefined>(undefined);

export const AiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePersona, setActivePersona] = useState<AiPersona>("SAP Solution Architect");
  const [isThinkFirstMode, setIsThinkFirstMode] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem("sap_copilot_gemini_key") || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "copilot",
      persona: "SAP Solution Architect",
      text: "👋 Welcome to **TagSkills SAP Copilot**! I am your AI Enterprise Consultant & Career Mentor.\n\nAsk me anything about **SAP MM**, **SAP EWM**, **Integration Flows**, **SPRO paths**, **Movement Types (e.g. 101, 122, 261, 311)**, or paste an **Error Code (e.g. M7021, /SCWM/UI_TODET002, SMQ2 queue hangs)** for instant Root Cause Analysis.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      suggestedPrompts: [
        "Explain Movement Type 101 accounting impact",
        "How does POSC work in EWM?",
        "Debug error M7021 deficit of unrestricted stock",
        "How does MM 101 integrate with EWM Inbound Delivery?"
      ]
    }
  ]);

  const generateHeuristicResponse = (query: string): { text: string; tcodes?: string[]; sapObjects?: string[] } => {
    const socraticPrefix = isThinkFirstMode 
      ? `💡 **Think Like a Consultant (Socratic Exploration):**\n\n*Before looking at the technical SAP transaction or table, consider:*\n1. **Business Trigger:** What physical event on the plant or warehouse floor creates this operational need?\n2. **Stakeholders:** Who is financially accountable if this document or transaction is delayed or posted incorrectly?\n\n---\n\n`
      : "";
    const q = query.toLowerCase();
    
    if (q.includes("101") || q.includes("goods receipt") || q.includes("gr/ir")) {
      return {
        text: socraticPrefix + `### 📦 Goods Receipt (Movement Type 101) Analysis\n\n**Business Function:** Posts incoming materials from vendor or production order into valuated inventory.\n\n#### Financial & Accounting Impact:\n- **Debit:** Raw Material Inventory Asset Account (\`Transaction Key BSX\`)\n- **Credit:** GR/IR Clearing Account (\`Transaction Key WRX\`)\n- *Price Variance (if PO Price <> Standard Price S):* Debited or Credited to \`PRD\` account.\n\n#### Key Tables Updated:\n- \`MKPF\` (Material Doc Header) & \`MSEG\` (Material Doc Item)\n- \`BKPF\` / \`BSEG\` (Financial Ledger)\n- \`EKBE\` (PO History with VGABE = 1)\n\n💡 **Consultant Tip:** In an EWM-managed plant, posting GR does not update MM directly via MIGO; instead, it is received in Inbound Delivery (\`/SCWM/PRDI\`) and replicates back to MM via qRFC / PPF action!`,
        tcodes: ["MIGO", "ME21N", "MIRO", "MMBE"],
        sapObjects: ["MSEG", "MKPF", "BKPF", "BSEG", "EKBE", "MARA", "MARD"]
      };
    }
    
    if (q.includes("posc") || q.includes("losc") || q.includes("storage control")) {
      return {
        text: socraticPrefix + `### ⚙️ EWM Process-Oriented vs Layout-Oriented Storage Control\n\n#### 1. POSC (Process-Oriented Storage Control)\n- **Definition:** Directs multi-step business handling (e.g., \`Unload (IB01) -> Deconsolidate (IB02) -> Quality Inspection (IB03) -> Final Putaway (IB04)\`).\n- **Execution:** Handles state machine progression where confirming one step automatically creates the Warehouse Task for the next work center.\n- **Key Table:** \`/SCWM/TPROCS\`\n\n#### 2. LOSC (Layout-Oriented Storage Control)\n- **Definition:** Directs physical travel routing dictated by physical facility constraints (e.g., High-Bay Aisle -> Conveyor Pick Point CP01 -> Elevator -> Staging Bay).\n\n💡 **Consultant Architecture Insight:** When designing POSC for an automotive client, always ensure Work Centers in \`/SCWM/TWORKC\` have distinct Inbound and Outbound bins configured to prevent task generation locks!`,
        tcodes: ["/SCWM/PRDI", "/SCWM/DCONS", "/SCWM/PACK", "/SCWM/MON"],
        sapObjects: ["/SCWM/TPROCS", "/SCWM/TSTEP", "/SCWM/ORDIM_O", "/SCWM/HUHDR"]
      };
    }

    if (q.includes("m7021") || q.includes("deficit") || q.includes("unrestricted")) {
      return {
        text: socraticPrefix + `### 🚨 Error Diagnostic: M7021 (Deficit of SL Unrestricted-use stock)\n\n#### 🔍 Root Cause Analysis (RCA):\nAttempted to issue, transfer, or reverse stock when physical or book inventory in table \`MARD\` is less than the transaction quantity.\n\n#### 🛠️ Step-by-Step Resolution:\n1. **Check Real-Time Stock:** Execute \`MMBE\` for Material + Plant + Storage Location.\n2. **Inspect Material History:** Execute \`MB51\` to verify if another user recently posted Goods Issue (201/261) or Transfer Posting (311).\n3. **Quality / Blocked Stock:** If stock exists in Quality Inspection (QI), release it via \`QA11\` or \`MIGO 321\`.\n4. **Line-Side Negative Stock:** For fast-paced assembly lines, consider enabling Negative Stock allowance in SPRO (\`OMJ1\`) to prevent shop-floor line halts.`,
        tcodes: ["MMBE", "MB51", "MB52", "MIGO", "OMJ1"],
        sapObjects: ["MARD", "MSEG", "MARC"]
      };
    }

    return {
      text: socraticPrefix + `### 💡 SAP Consultant Advisory\n\n**Your Query:** "${query}"\n\n**Consultant Perspective:**\nIn SAP S/4HANA enterprise architecture, all logistics events are interconnected. Master data (Material Master \`MARA/MARC\`, Business Partner \`BUT000\`, Warehouse Product \`/SCWM/MAT1\`) governs transactional execution (PR/PO, Inbound Delivery, Warehouse Tasks), which automatically drives accounting valuation (\`OBYC\`) and real-time inventory synchronization via qRFC.\n\nWould you like me to drill into the exact **SPRO configuration path**, **Table structure**, **Accounting entry**, or generate a **Mock Interview Question** on this topic?`,
      tcodes: ["SPRO", "MM03", "/SCWM/MON"],
      sapObjects: ["MARA", "MARC", "EKKO", "/SCWM/AQUA"]
    };
  };

  const sendMessage = async (query: string) => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);

    setTimeout(() => {
      const response = generateHeuristicResponse(query);
      const copilotMsg: ChatMessage = {
        id: "copilot-" + Date.now(),
        sender: "copilot",
        persona: activePersona,
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        tcodes: response.tcodes,
        sapObjects: response.sapObjects,
        suggestedPrompts: [
          "Explain related SPRO configuration",
          "Give me an interview scenario on this",
          "What tables are updated in background?"
        ]
      };
      setMessages(prev => [...prev, copilotMsg]);
      setIsGenerating(false);
    }, 600);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "msg-welcome",
        sender: "copilot",
        persona: activePersona,
        text: "Chat cleared! How can I assist your SAP MM & EWM learning journey today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  return (
    <AiContext.Provider
      value={{
        messages,
        activePersona,
        setActivePersona,
        isThinkFirstMode,
        setIsThinkFirstMode,
        apiKey,
        setApiKey,
        isGenerating,
        sendMessage,
        clearChat
      }}
    >
      {children}
    </AiContext.Provider>
  );
};

export const useAi = () => {
  const context = useContext(AiContext);
  if (!context) throw new Error("useAi must be used within an AiProvider");
  return context;
};
