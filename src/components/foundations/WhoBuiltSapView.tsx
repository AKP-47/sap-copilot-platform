import React from "react";
import { PageHeader } from "../common/PageHeader";
import { WhoBuiltSapSection } from "./WhoBuiltSapSection";

export const WhoBuiltSapView: React.FC = () => {
  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto animate-fadeIn">
      <PageHeader
        badge="Origin & History"
        badgeColor="bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"
        title="Who Built SAP?"
        description="A vision. Five engineers. A new way to run business."
        breadcrumbs={[
          { label: "Platform", view: "dashboard" },
          { label: "Beginner Academy", view: "foundations" },
          { label: "Who Built SAP?" }
        ]}
        learningOutcomes={[
          "Understand how five former IBM engineers founded SAP in 1972",
          "Discover why standard real-time software revolutionized global commerce",
          "Explore the 50-year architectural journey from R/2 mainframes to S/4HANA Cloud"
        ]}
      />

      <WhoBuiltSapSection isEmbedded={false} />
    </div>
  );
};
