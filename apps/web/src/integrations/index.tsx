import { Router } from "./router";
import { TanstackQuery } from "./ts-query";
import { Auth } from "./auth";
import { Toaster } from "@/core/shared/components/ui/sonner";

export function Integrations() {
  return (
    <Auth>
      <TanstackQuery>
        <Router />
        <Toaster />
      </TanstackQuery>
    </Auth>
  );
}
