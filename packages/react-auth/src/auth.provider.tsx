import { createContext, use, useEffect, useState, type ReactNode } from "react";
import type { UserDetail } from "@fludge/entities/user.entity";
import type { SignInRootUserSchema } from "@fludge/entities/schemas/sign-in-root-user.schema";
import { AuthActions } from "@fludge/api-utils/actions/auth.actions";

export type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "error";

export interface StorageAdapter {
  getItem: (key: string) => Promise<string | null> | string | null;
  setItem: (key: string, value: string) => Promise<void> | void;
  removeItem: (key: string) => Promise<void> | void;
}

interface AuthProviderProps {
  children: ReactNode;
  PendingComponent: ReactNode;
  authActions: AuthActions;
  storage: StorageAdapter;
  storageKey?: string;
}

interface ContextData {
  status: AuthStatus;
  user: UserDetail | null;
  accessToken: string | null;
  error: string | null;
}

interface ContextActions {
  signInRootUser: (
    data: SignInRootUserSchema,
    actions?: { onSuccess?: (jwt: string, user: UserDetail) => void }
  ) => Promise<void>;
  signOut: () => Promise<void>;
  getProfile: () => Promise<UserDetail | undefined>;
  // isTokenExpired: () => boolean;
  // getTokenExpiration: () => Date | null;
}

const AuthContext = createContext<(ContextData & ContextActions) | null>(null);

export function useAuth() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export function AuthProvider({
  children,
  authActions,
  storage,
  storageKey = "fludge-access-token",
  PendingComponent,
}: AuthProviderProps) {
  const [isPending, setIsPending] = useState(true);
  const [user, setUser] = useState<UserDetail | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>("unauthenticated");
  const [error, setError] = useState<string | null>(null);

  const signInRootUser = async (
    data: SignInRootUserSchema,
    actions?: { onSuccess?: (jwt: string, user: UserDetail) => void }
  ) => {
    setStatus("loading");
    setError(null);

    const response = await authActions.signIn(data);

    if (response.error || !response.data) {
      setError(response.error || "Error desconocido");
      setStatus("error");
      return;
    }

    const { user, jwt } = response.data;

    // Validar que el token no esté expirado
    // if (isTokenExpired(jwt)) {
    //   setError("Token expirado recibido del servidor");
    //   setStatus("error");
    //   return;
    // }

    try {
      await storage.setItem(storageKey, jwt);
    } catch (storageError) {
      console.error("Error al guardar token en storage:", storageError);
    }

    setUser(user);
    setAccessToken(jwt);
    setStatus("authenticated");
    actions?.onSuccess?.(jwt, user);
  };

  const signOut = async () => {
    try {
      await storage.removeItem(storageKey);
    } catch (err) {
      console.error("Error eliminando token de storage:", err);
    }

    setUser(null);
    setAccessToken(null);
    setStatus("unauthenticated");
    setError(null);
  };

  const getProfile = async (token?: string) => {
    const response = await authActions.getProfile(token);

    if (response.error || !response.data) {
      setError(response.error || "Error al obtener perfil");
      setStatus("error");
      return;
    }

    setUser(response.data);
    setStatus("authenticated");
    return response.data;
  };

  useEffect(() => {
    if (user && status === "authenticated") {
      setIsPending(false);
      return;
    }

    const init = async () => {
      const jwt = await storage.getItem(storageKey);

      if (!jwt) return;

      const response = await getProfile(jwt);

      if (!response) return;

      setUser(response);
      setAccessToken(jwt);
      setStatus("authenticated");
    };

    init().finally(() => setIsPending(false));
  }, []);

  if (isPending) {
    return <>{PendingComponent}</>;
  }

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        accessToken,
        error,
        signOut,
        signInRootUser,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
