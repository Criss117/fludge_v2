import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/businesses/$businessslug/groups/create')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/businesses/$businessslug/groups/create"!</div>
}
