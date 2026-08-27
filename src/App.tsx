import { UserAuthProvider } from "./context/UserAuthContext";
import { UserAuthModal } from "./components/auth/UserAuthModal";
import { trackEvent, trackPageView } from "./utils/telemetryTracker";
import { OwnerAuthProvider } from "./context/OwnerAuthContext";
import { OwnerRouteGuard } from "./components/admin/OwnerRouteGuard";
import { AdaptiveMasteryView } from "./components/adaptive/AdaptiveMasteryView";
import { BusinessSapReasoningView } from "./components/reasoning/BusinessSapReasoningView";
import { EnterpriseConnectionMap } from "./components/consultant/EnterpriseConnectionMap";
import { ImpactSimulator } from "./components/consultant/ImpactSimulator";
import { ConsultantInvestigationView } from "./components/consultant/ConsultantInvestigationView";
import { ConceptDnaView } from "./components/consultant/ConceptDnaView";
import { KnowledgeMapView } from "./components/consultant/KnowledgeMapView";
import { ConsultantPassportView } from "./components/consultant/ConsultantPassportView";
import { BeginnerFoundationsView } from "./components/foundations/BeginnerFoundationsView";
import React from "react";
import { SapProvider, useSap } from "./context/SapContext";
import { AiProvider } from "./context/AiContext";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import { MobileNavBar } from "./components/layout/MobileNavBar";
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
  const { currentView, setCurrentView } = useSap();

  React.useEffect(() => {
    // Fire real session start
    trackEvent("SESSION_START");

    // Heartbeat every 2.5 minutes for active user tracking
    const heartbeatInterval = setInterval(() => {
      trackEvent("SESSION_HEARTBEAT");
    }, 2.5 * 60 * 1000);

    return () => clearInterval(heartbeatInterval);
  }, []);

  React.useEffect(() => {
    if (currentView !== "owner_analytics") {
      trackPageView(`/${currentView}`, `View: ${currentView}`);
    }
  }, [currentView]);

  React.useEffect(() => {
    // Check initial URL pathname, search query, or hash for /admin or /owner
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (
      path === "/admin" || 
      path === "/owner" || 
      search.includes("view=admin") || 
      search.includes("view=owner") ||
      hash.includes("/admin") ||
      hash.includes("/owner")
    ) {
      setCurrentView("owner_analytics");
    }
  }, [setCurrentView]);

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "owner_analytics":
        return <OwnerRouteGuard />;
      case "foundations":
        return <BeginnerFoundationsView />;
      case "adaptive_mastery":
        return <AdaptiveMasteryView />;
      case "business_reasoning":
        return <BusinessSapReasoningView />;
      case "enterprise_map":
        return <EnterpriseConnectionMap />;
      case "impact_sim":
        return <ImpactSimulator />;
      case "investigation":
        return <ConsultantInvestigationView />;
      case "concept_dna":
        return <ConceptDnaView />;
      case "knowledge_map":
        return <KnowledgeMapView />;
      case "passport":
        return <ConsultantPassportView />;
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200 pb-16 md:pb-0">
      {/* Top Navigation */}
      <Header />

      {/* Main Layout Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8">
        {/* Sidebar */}
        <Sidebar />

        {/* View Main Content */}
        <main className="flex-1 min-w-0 py-5 sm:py-6 px-2 sm:px-6 lg:px-8 overflow-y-auto">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNavBar />

      {/* Overlays & Modals */}
      <AssistanceModal />
      <WelcomeScreen />
      <SearchModal />
      <AppearanceModal />
      <AiCopilotDrawer />
      <UserAuthModal />
    </div>
  );
};

export function App() {
  return (
    <OwnerAuthProvider>
      <UserAuthProvider>
        <SapProvider>
          <AiProvider>
            <AppContent />
          </AiProvider>
        </SapProvider>
      </UserAuthProvider>
    </OwnerAuthProvider>
  );
}

export default App;
