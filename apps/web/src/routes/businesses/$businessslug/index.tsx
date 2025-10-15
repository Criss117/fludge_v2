import { HomeScreen } from "@/core/businesses/presentation/screens/home.screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/businesses/$businessslug/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { businessslug } = Route.useParams();

  return <HomeScreen businessSlug={businessslug} />;
}
