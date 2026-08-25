import React from "react";
import { SapProvider, useSap } from "./context/SapContext";
import { AiProvider } from "./context/AiContext";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import { AssistanceModal } from "./components/layout/AssistanceModal";
import { WelcomeScreen } from "./components/layout/WelcomeScreen";
import { SearchModal } from "./components/common/SearchModal";
import { AppearanceModal } from "./components/common/AppearanceModal";
import { AiCopilotDrawer } from "./components/copilot/AiCopilotDrawer";

// Views
import { DashboardView } from "./components/dashboard/DashboardView";
import { MMExplorer } from "./components/learning/MMExplorer";
import { EWMExplorer } from "./components/learning/EWMExplorer";
import { IntegrationExplorer } from "./components/learning/IntegrationExplorer";
import { MovementTypeLab } from "./components/labs/MovementTypeLab";
import { TCodeExplorer } from "./components/labs/TCodeExplorer";
import { SproPathFinder } from "./components/labs/SproPathFinder";
import { ObycLedgerSimulator } from "./components/labs/ObycLedgerSimulator";
import { WarehouseMonitorSim } from "./components/labs/WarehouseMonitorSim";
import { RfTerminalSimulator } from "./components/labs/RfTerminalSimulator";
import { PoscLoscVisualizer } from "./components/labs/PoscLoscVisualizer";
import { ErrorDoctorLab } from "./components/labs/ErrorDoctorLab";
import { ScenarioSimulator } from "./components/simulation/ScenarioSimulator";
import { ConsultantSimulator } from "./components/simulation/ConsultantSimulator";
import { IndustryLabView } from "./components/simulation/IndustryLabView";
import { InterviewPrepView } from "./components/interview/InterviewPrepView";
import { CareerRoadmapView } from "./components/career/CareerRoadmapView";
import { WricefSpecBuilder } from "./components/career/WricefSpecBuilder";
import { FlashcardStudyLab } from "./components/career/FlashcardStudyLab";
import { StudyNotesView } from "./components/career/StudyNotesView";

const AppContent: React.FC = () => {
  const { currentView } = useSap();

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "mm":
        return <MMExplorer />;
      case "ewm":
        return <EWMExplorer />;
      case "integration":
        return <IntegrationExplorer />;
      case "movement_lab":
        return <MovementTypeLab />;
      case "tcodes":
        return <TCodeExplorer />;
      case "spro_guide":
        return <SproPathFinder />;
      case "obyc_sim":
        return <ObycLedgerSimulator />;
      case "whse_monitor":
        return <WarehouseMonitorSim />;
      case "rf_terminal":
        return <RfTerminalSimulator />;
      case "posc_visualizer":
        return <PoscLoscVisualizer />;
      case "error_doctor":
        return <ErrorDoctorLab />;
      case "scenarios":
        return <ScenarioSimulator />;
      case "consultant_sim":
        return <ConsultantSimulator />;
      case "industry_labs":
        return <IndustryLabView />;
      case "interview_prep":
        return <InterviewPrepView />;
      case "career":
        return <CareerRoadmapView />;
      case "wricef_builder":
        return <WricefSpecBuilder />;
      case "flashcards":
        return <FlashcardStudyLab />;
      case "study_notes":
        return <StudyNotesView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Top Navigation */}
      <Header />

      {/* Main Layout Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sidebar */}
        <Sidebar />

        {/* View Main Content */}
        <main className="flex-1 min-w-0 py-6 px-4 sm:px-6 lg:px-8 overflow-y-auto">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Overlays & Modals */}
      <AssistanceModal />
      <WelcomeScreen />
      <SearchModal />
      <AppearanceModal />
      <AiCopilotDrawer />
    </div>
  );
};

export function App() {
  return (
    <SapProvider>
      <AiProvider>
        <AppContent />
      </AiProvider>
    </SapProvider>
  );
}

export default App;
