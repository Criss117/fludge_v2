import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/core/shared/components/ui/sidebar";

import { BusinessSwitcher } from "./business-switcher";
import { BusinessSidebarFooter } from "./footer";
import { NavMain } from "./nav-main";
import { NavSettings } from "./nav-settings";
import type { BusinessDetail } from "@fludge/entities/business.entity";

interface Props {
  currentBusiness: BusinessDetail;
}

export function BusinessSidebar({ currentBusiness }: Props) {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <BusinessSwitcher currentBusiness={currentBusiness} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain currentBusiness={currentBusiness} />
        <NavSettings currentBusiness={currentBusiness} />
      </SidebarContent>
      <SidebarFooter>
        <BusinessSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
