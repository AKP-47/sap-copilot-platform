import React, { createContext, useContext, useState, useEffect } from "react";
import { LearningLevel, ModuleType, SapTopic, UserNote } from "../types/sap";
import { SupportedLanguage, TRANSLATIONS } from "../data/translations";
import { MM_TOPICS } from "../data/mmTopics";
import { EWM_TOPICS } from "../data/ewmTopics";
import { INTEGRATION_FLOWS } from "../data/integrationFlows";

export type AppView = 
  | "dashboard"
  | "mm"
  | "ewm"
  | "integration"
  | "movement_lab"
  | "tcodes"
  | "scenarios"
  | "consultant_sim"
  | "interview_prep"
  | "industry_labs"
  | "spro_guide"
  | "obyc_sim"
  | "whse_monitor"
  | "rf_terminal"
  | "posc_visualizer"
  | "error_doctor"
  | "wricef_builder"
  | "flashcards"
  | "study_notes"
  | "career";

interface SapContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedTopicId: string | null;
  setSelectedTopicId: (id: string | null) => void;
  learningLevel: LearningLevel;
  setLearningLevel: (level: LearningLevel) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  bookmarks: string[];
  toggleBookmark: (topicId: string) => void;
  completedScenarios: string[];
  markScenarioCompleted: (scenarioId: string, score: number) => void;
  scenarioScores: Record<string, number>;
  notes: UserNote[];
  addNote: (note: Omit<UserNote, "id" | "createdAt">) => void;
  deleteNote: (noteId: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAssistanceOpen: boolean;
  setIsAssistanceOpen: (open: boolean) => void;
  isWelcomeOpen: boolean;
  setIsWelcomeOpen: (open: boolean) => void;
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  t: typeof TRANSLATIONS["en"];
  allTopics: SapTopic[];
  selectedTopic: SapTopic | undefined;
}

const SapContext = createContext<SapContextType | undefined>(undefined);

export const SapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>("dashboard");
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [learningLevel, setLearningLevel] = useState<LearningLevel>("BEGINNER");
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("sap_copilot_bookmarks");
      return saved ? JSON.parse(saved) : ["mm-material-master", "ewm-posc-losc"];
    } catch {
      return ["mm-material-master", "ewm-posc-losc"];
    }
  });
  const [completedScenarios, setCompletedScenarios] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("sap_copilot_completed_scen");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [scenarioScores, setScenarioScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("sap_copilot_scen_scores");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [notes, setNotes] = useState<UserNote[]>(() => {
    try {
      const saved = localStorage.getItem("sap_copilot_notes");
      return saved ? JSON.parse(saved) : [
        {
          id: "note-1",
          topicId: "mm-material-master",
          title: "Important: OMS2 Quantity vs Value updating",
          content: "Remember to always verify MENGU and WERTU in OMS2 whenever extending a new plant in enterprise structure.",
          createdAt: new Date().toISOString(),
          tags: ["MM", "SPRO", "Cutover"]
        }
      ];
    } catch {
      return [];
    }
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAssistanceOpen, setIsAssistanceOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(() => {
    return !localStorage.getItem("sap_welcome_seen");
  });
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("sap_copilot_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("sap_copilot_completed_scen", JSON.stringify(completedScenarios));
  }, [completedScenarios]);

  useEffect(() => {
    localStorage.setItem("sap_copilot_scen_scores", JSON.stringify(scenarioScores));
  }, [scenarioScores]);

  useEffect(() => {
    localStorage.setItem("sap_copilot_notes", JSON.stringify(notes));
  }, [notes]);

  const toggleBookmark = (topicId: string) => {
    setBookmarks(prev => 
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const markScenarioCompleted = (scenarioId: string, score: number) => {
    if (!completedScenarios.includes(scenarioId)) {
      setCompletedScenarios(prev => [...prev, scenarioId]);
    }
    setScenarioScores(prev => ({ ...prev, [scenarioId]: Math.max(prev[scenarioId] || 0, score) }));
  };

  const addNote = (note: Omit<UserNote, "id" | "createdAt">) => {
    const newNote: UserNote = {
      ...note,
      id: "note-" + Date.now(),
      createdAt: new Date().toISOString()
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const allTopics: SapTopic[] = [...MM_TOPICS, ...EWM_TOPICS];
  const selectedTopic = allTopics.find(t => t.id === selectedTopicId);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <SapContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedTopicId,
        setSelectedTopicId,
        learningLevel,
        setLearningLevel,
        language,
        setLanguage,
        bookmarks,
        toggleBookmark,
        completedScenarios,
        markScenarioCompleted,
        scenarioScores,
        notes,
        addNote,
        deleteNote,
        isSearchOpen,
        setIsSearchOpen,
        isAssistanceOpen,
        setIsAssistanceOpen,
        isWelcomeOpen,
        setIsWelcomeOpen,
        isCopilotOpen,
        setIsCopilotOpen,
        t,
        allTopics,
        selectedTopic
      }}
    >
      {children}
    </SapContext.Provider>
  );
};

export const useSap = () => {
  const context = useContext(SapContext);
  if (!context) throw new Error("useSap must be used within a SapProvider");
  return context;
};
