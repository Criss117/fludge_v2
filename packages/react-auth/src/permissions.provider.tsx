import { createContext, use, useState } from "react";
import { useAuth } from "./auth.provider";
import type { BusinessDetail } from "@fludge/entities/business.entity";
import type { Permission } from "@fludge/entities/permissions.entity";
import { checkUserPermissions } from "./check-user-permission";
import { UserDetail } from "@fludge/entities/user.entity";

interface Context {
  currentBusiness: BusinessDetail | null;
  user: UserDetail | null;
  initState: (user: UserDetail, currentBusiness: BusinessDetail) => void;
  userHasPermissions: (...permissions: Permission[]) => boolean;
  checkUserPermissions(
    user: UserDetail,
    requiredPermissions: Permission[]
  ): boolean;
}

const PermissionsContext = createContext<Context | null>(null);

export function usePermissions() {
  const context = use(PermissionsContext);

  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }

  return context;
}

export function PermissionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [currentBusiness, setCurrentBusiness] = useState<BusinessDetail | null>(
    null
  );

  const initState = (user: UserDetail, currentBusiness: BusinessDetail) => {
    setCurrentBusiness(currentBusiness);
    setUser(user);
  };

  const userHasPermissions = (...permissions: Permission[]) => {
    if (!user) return false;

    if (!currentBusiness) {
      return false;
    }

    if (user.isRoot && currentBusiness.rootUserId === user.id) {
      return true;
    }

    return checkUserPermissions(user, permissions);
  };

  return (
    <PermissionsContext.Provider
      value={{
        currentBusiness,
        user,
        initState,
        userHasPermissions,
        checkUserPermissions,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
}
