import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/businesses/$businessslug/groups/$groupslug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/businesses/groups/groupslug"!</div>
}
