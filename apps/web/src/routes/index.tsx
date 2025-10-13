import { Button } from "@/core/shared/components/ui/button";
import { api } from "@/core/shared/lib/api";
import { useAuth } from "@fludge/react-auth/auth.provider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();

  const signIn = () => {
    auth.signInRootUser(
      {
        email: "cristian@fludge.dev",
        password: "holiwiss",
      },
      {
        onSuccess: (jwt) => {
          api.applyAuthInterceptor(jwt);
        },
      }
    );
  };

  return (
    <div>
      <p>{auth.accessToken}</p>
      <Button onClick={signIn} disabled={auth.status === "loading"}>
        Sign in {auth.status === "loading" && "loading..."}
      </Button>
    </div>
  );
}
