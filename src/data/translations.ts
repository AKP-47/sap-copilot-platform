export type SupportedLanguage = "en" | "hi" | "de" | "es" | "fr" | "te" | "ta" | "mr";

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  poweredBy: string;
  startLearning: string;
  visitTagSkills: string;
  dashboard: string;
  mmModule: string;
  ewmModule: string;
  integrationModule: string;
  movementTypes: string[];
  tcodes: string;
  scenarios: string;
  consultantSim: string;
  interviewPrep: string;
  needAssistance: string;
  searchPlaceholder: string;
  consultantThinking: string;
  realWorldScenario: string;
  troubleshooting: string;
  levelBeginner: string;
  levelIntermediate: string;
  levelProfessional: string;
  levelConsultant: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: "SAP Copilot",
    tagline: "Intelligent SAP MM & EWM Learning, Simulation & Career Assistant",
    poweredBy: "Powered by TagSkills",
    startLearning: "Start Learning",
    visitTagSkills: "Visit TagSkills",
    dashboard: "Dashboard",
    mmModule: "SAP MM (Sourcing & Procurement)",
    ewmModule: "SAP EWM (Warehouse Management)",
    integrationModule: "MM + EWM Integration",
    movementTypes: ["Movement Types Lab"],
    tcodes: "T-Code & Fiori Explorer",
    scenarios: "Scenario Simulator",
    consultantSim: "Consultant Simulator",
    interviewPrep: "Interview Preparation",
    needAssistance: "Need Assistance?",
    searchPlaceholder: "Search 101, WPT, POSC, MM01, GR/IR, Purchase Order, /SCWM/MON...",
    consultantThinking: "Consultant-Level Thinking",
    realWorldScenario: "Real-World Business Scenario",
    troubleshooting: "Troubleshooting & RCA",
    levelBeginner: "Beginner",
    levelIntermediate: "Intermediate",
    levelProfessional: "Professional",
    levelConsultant: "Consultant"
  },
  hi: {
    appName: "SAP Copilot",
    tagline: "बुद्धिमान SAP MM और EWM लर्निंग, सिमुलेशन और करियर सहायक",
    poweredBy: "TagSkills द्वारा संचालित",
    startLearning: "सीखना शुरू करें",
    visitTagSkills: "TagSkills वेबसाइट पर जाएं",
    dashboard: "डैशबोर्ड",
    mmModule: "SAP MM (खरीद और सामग्री प्रबंधन)",
    ewmModule: "SAP EWM (वेयरहाउस प्रबंधन)",
    integrationModule: "MM + EWM एकीकरण",
    movementTypes: ["मूवमेंट प्रकार लैब"],
    tcodes: "T-Code और Fiori एक्सप्लोरर",
    scenarios: "परिदृश्य सिम्युलेटर",
    consultantSim: "सलाहकार सिम्युलेटर",
    interviewPrep: "साक्षात्कार की तैयारी",
    needAssistance: "सहायता चाहिए?",
    searchPlaceholder: "खोजें 101, WPT, POSC, MM01, GR/IR, Purchase Order, /SCWM/MON...",
    consultantThinking: "कंसल्टेंट-स्तरीय सोच",
    realWorldScenario: "वास्तविक व्यावसायिक परिदृश्य",
    troubleshooting: "समस्या निवारण और RCA",
    levelBeginner: "शुरुआती",
    levelIntermediate: "मध्यवर्ती",
    levelProfessional: "पेशेवर",
    levelConsultant: "कंसल्टेंट"
  },
  de: {
    appName: "SAP Copilot",
    tagline: "Intelligente SAP MM & EWM Lern-, Simulations- und Karriereplattform",
    poweredBy: "Unterstützt von TagSkills",
    startLearning: "Lernen beginnen",
    visitTagSkills: "TagSkills besuchen",
    dashboard: "Dashboard",
    mmModule: "SAP MM (Materialwirtschaft)",
    ewmModule: "SAP EWM (Lagerverwaltung)",
    integrationModule: "MM + EWM Integration",
    movementTypes: ["Bewegungsarten-Labor"],
    tcodes: "Transaktionscode-Explorer",
    scenarios: "Szenario-Simulator",
    consultantSim: "Berater-Simulator",
    interviewPrep: "Interview-Vorbereitung",
    needAssistance: "Brauchen Sie Hilfe?",
    searchPlaceholder: "Suchen Sie 101, WPT, POSC, MM01, GR/IR, Wareneingang...",
    consultantThinking: "Berater-Denkweise",
    realWorldScenario: "Praxisszenario",
    troubleshooting: "Fehlerbehebung & RCA",
    levelBeginner: "Anfänger",
    levelIntermediate: "Fortgeschritten",
    levelProfessional: "Professionell",
    levelConsultant: "Berater"
  },
  es: {
    appName: "SAP Copilot",
    tagline: "Plataforma Inteligente de Aprendizaje y Simulación SAP MM & EWM",
    poweredBy: "Desarrollado por TagSkills",
    startLearning: "Empezar a Aprender",
    visitTagSkills: "Visitar TagSkills",
    dashboard: "Panel de Control",
    mmModule: "SAP MM (Gestión de Materiales)",
    ewmModule: "SAP EWM (Gestión de Almacenes)",
    integrationModule: "Integración MM + EWM",
    movementTypes: ["Laboratorio de Clases de Movimiento"],
    tcodes: "Explorador de Transacciones",
    scenarios: "Simulador de Escenarios",
    consultantSim: "Simulador de Consultor",
    interviewPrep: "Preparación de Entrevistas",
    needAssistance: "¿Necesita Ayuda?",
    searchPlaceholder: "Buscar 101, WPT, POSC, MM01, GR/IR, Pedido...",
    consultantThinking: "Pensamiento Nivel Consultor",
    realWorldScenario: "Escenario Empresarial Real",
    troubleshooting: "Solución de Problemas y RCA",
    levelBeginner: "Principiante",
    levelIntermediate: "Intermedio",
    levelProfessional: "Profesional",
    levelConsultant: "Consultor"
  },
  fr: {
    appName: "SAP Copilot",
    tagline: "Plateforme Intelligente d'Apprentissage et de Simulation SAP MM & EWM",
    poweredBy: "Propulsé par TagSkills",
    startLearning: "Commencer l'apprentissage",
    visitTagSkills: "Visiter TagSkills",
    dashboard: "Tableau de bord",
    mmModule: "SAP MM (Gestion des Articles)",
    ewmModule: "SAP EWM (Gestion des Entrepôts)",
    integrationModule: "Intégration MM + EWM",
    movementTypes: ["Laboratoire des Types de Mouvement"],
    tcodes: "Explorateur de Codes Transaction",
    scenarios: "Simulateur de Scénarios",
    consultantSim: "Simulateur de Consultant",
    interviewPrep: "Préparation aux Entretiens",
    needAssistance: "Besoin d'aide ?",
    searchPlaceholder: "Rechercher 101, WPT, POSC, MM01, Entrée de marchandises...",
    consultantThinking: "Raisonnement de Consultant",
    realWorldScenario: "Scénario d'Entreprise Réel",
    troubleshooting: "Dépannage & RCA",
    levelBeginner: "Débutant",
    levelIntermediate: "Intermédiaire",
    levelProfessional: "Professionnel",
    levelConsultant: "Consultant"
  },
  te: {
    appName: "SAP Copilot",
    tagline: "ఇంటెలిజెంట్ SAP MM & EWM లెర్నింగ్, సిమ్యులేషన్ మరియు కెరీర్ అసిస్టెంట్",
    poweredBy: "TagSkills ద్వారా అందించబడింది",
    startLearning: "నేర్చుకోవడం ప్రారంభించండి",
    visitTagSkills: "TagSkills సందర్శించండి",
    dashboard: "డాష్‌బోర్డ్",
    mmModule: "SAP MM (మెటీరియల్స్ మేనేజ్‌మెంట్)",
    ewmModule: "SAP EWM (వేర్‌హౌస్ మేనేజ్‌మెంట్)",
    integrationModule: "MM + EWM ఇంటిగ్రేషన్",
    movementTypes: ["మూవ్‌మెంట్ టైప్స్ ల్యాబ్"],
    tcodes: "T-Code & Fiori ఎక్స్‌ప్లోరర్",
    scenarios: "సినారియో సిమ్యులేటర్",
    consultantSim: "కన్సల్టెంట్ సిమ్యులేటర్",
    interviewPrep: "ఇంటర్వ్యూ ప్రిపరేషన్",
    needAssistance: "సహాయం కావాలా?",
    searchPlaceholder: "వెతకండి 101, WPT, POSC, MM01, GR/IR, Purchase Order...",
    consultantThinking: "కన్సల్టెంట్-స్థాయి ఆలోచన",
    realWorldScenario: "రియల్-వరల్డ్ బిజినెస్ సినారియో",
    troubleshooting: "ట్రబుల్షూటింగ్ & RCA",
    levelBeginner: "ప్రారంభ స్థాయి",
    levelIntermediate: "మధ్యస్థ స్థాయి",
    levelProfessional: "ప్రొఫెషనల్",
    levelConsultant: "కన్సల్టెంట్"
  },
  ta: {
    appName: "SAP Copilot",
    tagline: "அறிவார்ந்த SAP MM & EWM கற்றல் மற்றும் தொழில்முறை உதவியாளர்",
    poweredBy: "TagSkills மூலம் இயக்கப்படுகிறது",
    startLearning: "கற்க தொடங்குங்கள்",
    visitTagSkills: "TagSkills பார்வையிடவும்",
    dashboard: "முகப்பு",
    mmModule: "SAP MM (பொருள் மேலாண்மை)",
    ewmModule: "SAP EWM (கிடங்கு மேலாண்மை)",
    integrationModule: "MM + EWM ஒருங்கிணைப்பு",
    movementTypes: ["இயக்க வகைகள் ஆய்வகம்"],
    tcodes: "T-Code & Fiori எக்ஸ்ப்ளோரர்",
    scenarios: "சூழ்நிலை சிமுலேட்டர்",
    consultantSim: "ஆலோசகர் சிமுலேட்டர்",
    interviewPrep: "நேர்காணல் தயாரிப்பு",
    needAssistance: "உதவி தேவையா?",
    searchPlaceholder: "தேடுங்கள் 101, WPT, POSC, MM01, GR/IR...",
    consultantThinking: "ஆலோசகர் அளவிலான சிந்தனை",
    realWorldScenario: "நிஜ உலக வணிக சூழ்நிலை",
    troubleshooting: "சிக்கல் தீர்க்கும் முறை",
    levelBeginner: "தொடக்க நிலை",
    levelIntermediate: "இடைநிலை",
    levelProfessional: "தொழில்முறை",
    levelConsultant: "ஆலோசகர்"
  },
  mr: {
    appName: "SAP Copilot",
    tagline: "बुद्धिमान SAP MM आणि EWM शिक्षण, सिम्युलेशन आणि करिअर सहाय्यक",
    poweredBy: "TagSkills द्वारे समर्थित",
    startLearning: "शिकणे सुरू करा",
    visitTagSkills: "TagSkills ला भेट द्या",
    dashboard: "डॅशबोर्ड",
    mmModule: "SAP MM (साहित्य व्यवस्थापन)",
    ewmModule: "SAP EWM (वेअरहाऊस व्यवस्थापन)",
    integrationModule: "MM + EWM एकत्रीकरण",
    movementTypes: ["मूव्हमेंट प्रकार लॅब"],
    tcodes: "T-Code आणि Fiori एक्सप्लोरर",
    scenarios: "परिदृश्य सिम्युलेटर",
    consultantSim: "सल्लागार सिम्युलेटर",
    interviewPrep: "मुलाखत तयारी",
    needAssistance: "मदत हवी आहे का?",
    searchPlaceholder: "शोधा 101, WPT, POSC, MM01, GR/IR, Purchase Order...",
    consultantThinking: "सल्लागार-स्तरीय विचार",
    realWorldScenario: "वास्तविक व्यावसायिक परिदृश्य",
    troubleshooting: "समस्या निवारण आणि RCA",
    levelBeginner: "नवशिक्या",
    levelIntermediate: "मध्यम",
    levelProfessional: "व्यावसायिक",
    levelConsultant: "सल्लागार"
  }
};
