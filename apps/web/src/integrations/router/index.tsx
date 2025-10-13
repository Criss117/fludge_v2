import { createRouter, RouterProvider } from "@tanstack/react-router";
import type { UserDetail } from "@fludge/entities/user.entity";
import { routeTree } from "../../routeTree.gen";
import type { useQueryClient } from "@tanstack/react-query";

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
  return (
    <RouterProvider
      router={router}
      context={{
        user: null,
        queryClient: null,
      }}
    />
  );
}
