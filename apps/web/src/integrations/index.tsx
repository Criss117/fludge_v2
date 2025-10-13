import { Router } from "./router";
import { TanstackQuery } from "./ts-query";
import { Auth } from "./auth";

export function Integrations() {
  return (
    <Auth>
      <TanstackQuery>
        <Router />
      </TanstackQuery>
    </Auth>
  );
}
