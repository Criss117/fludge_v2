import { Link, useLocation } from "@tanstack/react-router";
import {
  Building2Icon,
  ChartColumnStackedIcon,
  HandCoins,
  Home,
  SquareChartGantt,
  Users2Icon,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/core/shared/components/ui/sidebar";
import { cn } from "@/core/shared/lib/utils";
import type { BusinessDetail } from "@fludge/entities/business.entity";

interface Props {
  currentBusiness: BusinessDetail;
}

const mainItems = [
  {
    title: "Inicio",
    icon: Home,
    href: "/businesses/$businessslug",
  },
  {
    title: "Clientes",
    icon: Users2Icon,
    href: "/businesses/$businessslug/clients",
  },
  {
    title: "Productos",
    icon: SquareChartGantt,
    href: "/businesses/$businessslug/products",
  },
  {
    title: "Categorias",
    icon: ChartColumnStackedIcon,
    href: "/businesses/$businessslug/categories",
  },
  {
    title: "Proveedores",
    icon: Building2Icon,
    href: "/businesses/$businessslug/providers",
  },
  {
    title: "Ventas",
    icon: HandCoins,
    href: "/businesses/$businessslug/sales",
  },
] as const;

export function NavMain({ currentBusiness }: Props) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {mainItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                className={cn(
                  item.href.replace("$id", currentBusiness.id) ===
                    location.pathname && "bg-sidebar-accent"
                )}
              >
                <Link
                  to={item.href}
                  params={{ businessslug: currentBusiness.slug }}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
