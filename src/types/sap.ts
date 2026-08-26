// Domain & System Types for SAP Copilot Platform

export type ModuleType = "MM" | "EWM" | "INTEGRATION";

export type LearningLevel = "BEGINNER" | "INTERMEDIATE" | "PROFESSIONAL" | "CONSULTANT" | "INTERVIEW";

export type IndustryKey = string;

export interface IndustryInfo {
  id: IndustryKey;
  name: string;
  icon: string;
  tagline: string;
  businessDrivers: string[];
  keyChallenges: string[];
  mmNuances: string[];
  ewmNuances: string[];
  sampleProcess: string;
}

export interface SapPedagogy {
  beginnerExplanation: string;
  formalDefinition: string;
  whyUsed: string[];
  howItWorks: string[];
  stepByStepProcess: {
    stepNumber: number;
    title: string;
    description: string;
    sapAction: string;
    tcode?: string;
    tablesUpdated?: string[];
  }[];
  sapObjectsInvolved: {
    objectType: string;
    name: string;
    description: string;
  }[];
  relatedTcodes: string[];
  fioriApps?: {
    appId: string;
    appName: string;
    fioriRole: string;
  }[];
  relatedTables: {
    tableName: string;
    description: string;
    keyFields: string[];
  }[];
  configurationPerspective: {
    sproPath: string;
    criticalSettings: string[];
    mandatoryPrerequisites: string[];
    commonPitfalls: string[];
  };
  realWorldBusinessExample: {
    companyContext: string;
    scenario: string;
    businessOutcome: string;
  };
  industryExamples: Record<IndustryKey, string>;
  scenarioQuestion: {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  troubleshootingScenarios: {
    errorOrIssue: string;
    errorCode?: string;
    rootCause: string;
    solutionSteps: string[];
  }[];
  interviewQuestions: {
    tier: "Basic" | "Intermediate" | "Advanced" | "Scenario" | "Configuration" | "Troubleshooting" | "Consultant";
    question: string;
    keyPoints: string[];
    sampleAnswer: string;
  }[];
  consultantChallenge: {
    title: string;
    clientRequirement: string;
    architecturalOptions: {
      optionName: string;
      pros: string[];
      cons: string[];
      recommendationLevel: "Recommended" | "Alternative" | "Not Advised";
    }[];
    recommendedApproach: string;
  };
}

export interface ConfigurationViewData {
  prerequisites: string[];
  configObjects: string[];
  determinationLogic: string[];
  assignmentSteps: string[];
  executionSteps: string[];
  testingProcedure: string[];
  troubleshooting: string[];
}

export interface ProcessDiagramData {
  title: string;
  nodes: {
    id: string;
    label: string;
    system: string;
    tcode?: string;
    linkedTopicId?: string;
    description?: string;
  }[];
}

export interface SapTopic {
  id: string;
  module: ModuleType;
  category: string;
  subcategory?: string;
  title: string;
  subtitle: string;
  level: LearningLevel;
  tags: string[];
  pedagogy: SapPedagogy;
  relatedTopics?: string[];
  ewmMonitorNode?: string;
  configurationView?: ConfigurationViewData;
  processDiagram?: ProcessDiagramData;
}

export interface MovementTypeEntry {
  code: string;
  description: string;
  businessPurpose: string;
  whenUsed: string;
  stockImpact: {
    sourceStockType?: string;
    targetStockType?: string;
    quantityEffect: string;
  };
  accountingImpact: {
    isFinancialPosting: boolean;
    debitAccount?: string;
    creditAccount?: string;
    transactionKeys?: string[];
    valueImpact?: string;
  };
  relatedProcess: string;
  relatedTcodes: string[];
  visualFlow: string[];
  industryScenarios: {
    industry: IndustryKey;
    scenarioText: string;
    challengeQuestion: string;
    options: string[];
    correctIndex: number;
    consultantReasoning: string;
  }[];
  interviewQuestions: string[];
}

export interface TCodeEntry {
  tcode: string;
  fioriAppId?: string;
  fioriAppName?: string;
  name: string;
  module: ModuleType;
  category: string;
  purpose: string;
  whenToUse: string;
  requiredInputs: string[];
  expectedOutputs: string[];
  relatedProcess: string;
  relatedTcodes: string[];
  tablesAffected: string[];
  realWorldScenario: string;
  interviewQuestion: string;
  interviewAnswer: string;
}

export interface IntegrationFlow {
  id: string;
  title: string;
  processType: "Inbound Procurement" | "Outbound Sales" | "Stock Transport Order" | "Subcontracting" | "Consignment" | "Scrapping & Posting Change" | "Physical Inventory" | "Returns";
  businessContext: string;
  integrationPoint: string;
  documentFlow: {
    sequence: number;
    stage: string;
    system: "MM" | "EWM" | "Integration Core (qRFC/CIF/PPF)";
    documentType: string;
    tcode: string;
    teamAction: string;
    tablesUpdated: string[];
  }[];
  mmPerspective: {
    responsibilities: string[];
    documents: string[];
    criticalTcodes: string[];
  };
  ewmPerspective: {
    responsibilities: string[];
    documents: string[];
    criticalTcodes: string[];
  };
  queueAndInterfaces: {
    queueType: "SMQ1 (Outbound)" | "SMQ2 (Inbound)" | "PPF Action" | "Direct S/4HANA Call";
    functionModuleOrEvent: string;
    commonQueueErrors: string[];
    resolution: string;
  };
  commonErrorsAndTroubleshooting: {
    problem: string;
    systemIdentified: "MM" | "EWM" | "RFC Queue";
    rootCause: string;
    fixAction: string;
  }[];
}

export interface ScenarioProblem {
  id: string;
  title: string;
  module: ModuleType;
  industry: IndustryKey;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  businessContext: string;
  clientRequirement: string;
  stages: {
    stageNumber: number;
    stageTitle: string;
    questionPrompt: string;
    options: {
      id: string;
      text: string;
      sapImpact: string;
      isOptimal: boolean;
      scoreWeight: number;
      feedback: string;
    }[];
  }[];
  overallSolution: {
    correctApproach: string;
    sapReasoning: string;
    businessReasoning: string;
    missedConceptsWarning: string[];
    consultantTakeaway: string;
    recommendedRevisionTopics: string[];
  };
}

export interface ConsultantCase {
  id: string;
  title: string;
  clientName: string;
  industry: IndustryKey;
  module: ModuleType;
  clientContext: string;
  problemStatement: string;
  businessImpact: string;
  stage1Discovery: {
    instructions: string;
    questionOptions: {
      id: string;
      question: string;
      whyImportant: string;
      isCritical: boolean;
    }[];
  };
  stage2MasterDataAudit: {
    instructions: string;
    dataObjectsToCheck: {
      object: string;
      tcode: string;
      table: string;
      criticalField: string;
      issueFound: string;
    }[];
  };
  stage3SproDiagnosis: {
    instructions: string;
    configOptions: {
      id: string;
      path: string;
      settingName: string;
      proposedFix: string;
      isCorrectPath: boolean;
    }[];
  };
  stage4TestingAndCutover: {
    testScenarios: string[];
    cutoverPrerequisites: string[];
  };
  stage5ExecutivePitch: {
    executiveSummary: string;
    roiJustification: string;
    riskMitigation: string;
  };
}

export interface InterviewItem {
  id: string;
  module: ModuleType;
  category: string;
  tier: "Basic" | "Intermediate" | "Advanced" | "Scenario" | "Configuration" | "Troubleshooting" | "Consultant";
  question: string;
  idealAnswer: string;
  keyPhrasesExpected: string[];
  consultantThinkingTip: string;
  followUpQuestions: string[];
  difficultyScore: number;
}

export interface SproNode {
  id: string;
  title: string;
  module: ModuleType;
  tcodeShortcut?: string;
  path: string[];
  purpose: string;
  keyTables: string[];
  criticalFields: string[];
  bestPracticeTip: string;
  dependencies: string[];
}

export interface ErrorDoctorItem {
  id: string;
  errorCode: string;
  title: string;
  module: ModuleType;
  messageText: string;
  typicalTrigger: string;
  rootCauseAnalysis: string;
  stepByStepFix: string[];
  tcodesToCheck: string[];
  sproPathToVerify?: string;
}

export interface FlashcardItem {
  id: string;
  category: string;
  module: ModuleType;
  frontQuestion: string;
  backAnswer: string;
  keyTakeaway: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface AssistanceContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  callLink: string;
  whatsappLink: string;
  email?: string;
  avatarBg?: string;
}

export interface LeadershipProfile {
  name: string;
  role: string;
  quote: string;
  phone: string;
  whatsappLink: string;
  image: string;
}

export interface UserNote {
  id: string;
  topicId?: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
}
