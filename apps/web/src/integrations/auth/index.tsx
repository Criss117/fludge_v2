import { authActions } from "@/core/shared/lib/api";
import { PermissionsProvider } from "@fludge/react-auth/permissions.provider";
import {
  AuthProvider,
  type StorageAdapter,
} from "@fludge/react-auth/auth.provider";

interface Props {
  children: React.ReactNode;
}

const storageAdapter: StorageAdapter = {
  getItem: (key: string) => localStorage.getItem(key),
  setItem: (key: string, value: string) => localStorage.setItem(key, value),
  removeItem: (key: string) => localStorage.removeItem(key),
};

export function Auth({ children }: Props) {
  return (
    <AuthProvider
      authActions={authActions}
      storage={storageAdapter}
      PendingComponent={<div>Loading...</div>}
    >
      <PermissionsProvider>{children}</PermissionsProvider>
    </AuthProvider>
  );
}
