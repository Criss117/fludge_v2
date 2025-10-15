import { createRouter, RouterProvider } from "@tanstack/react-router";
import type { UserDetail } from "@fludge/entities/user.entity";
import { routeTree } from "../../routeTree.gen";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@fludge/react-auth/auth.provider";

export interface RouterContext {
  user: UserDetail | null;
  queryClient: ReturnType<typeof useQueryClient> | null;
}

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <div>404</div>,
  context: {
    user: null,
    queryClient: null,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function Router() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return (
    <RouterProvider
      router={router}
      context={{
        user,
        queryClient,
      }}
    />
  );
}
