import React, { useState } from "react";
import { useOwnerAuth } from "../../context/OwnerAuthContext";
import { OwnerDashboardView } from "./OwnerDashboardView";
import { OwnerLoginView } from "./OwnerLoginView";
import { AccessDeniedView } from "./AccessDeniedView";

export const OwnerRouteGuard: React.FC = () => {
  const { isOwnerAuthenticated, ownerUser, authLoading } = useOwnerAuth();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono font-bold text-slate-500">
          Verifying Owner Credentials with Backend...
        </span>
      </div>
    );
  }

  // If authenticated as owner, render dashboard
  if (isOwnerAuthenticated && ownerUser?.role === "OWNER") {
    return <OwnerDashboardView />;
  }

  // If user explicitly clicked "Owner Authentication" or is directly on the owner route
  return <OwnerLoginView />;
};
