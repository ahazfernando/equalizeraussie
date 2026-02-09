"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Caravan, Calendar, Star, DollarSign, LogOut, FileText, FileQuestion, BookOpen, MessageSquare, Shield, Mail } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Caravan, label: "Caravans", href: "/admin/caravans" },
  { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
  { icon: FileQuestion, label: "Quotes", href: "/admin/quotes" },
  { icon: BookOpen, label: "Brochures", href: "/admin/brochures" },
  { icon: MessageSquare, label: "Inquiries", href: "/admin/inquiries" },
  { icon: Star, label: "Reviews", href: "/admin/reviews" },
  { icon: FileText, label: "Blogs", href: "/admin/blogs" },
  { icon: DollarSign, label: "Finance", href: "/admin/finance" },
  { icon: Shield, label: "Warranty", href: "/admin/warranty" },
  { icon: Mail, label: "Newsletter", href: "/admin/newsletter" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="inset" className="bg-black border-r border-gray-800">
      <SidebarHeader className="bg-black border-b border-gray-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-heading font-bold text-xl">E</span>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-heading font-bold text-white">Equalizer RV</span>
            <span className="text-xs text-gray-400">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="text-gray-300 hover:bg-gray-800 hover:text-white data-[active=true]:bg-gray-800 data-[active=true]:text-white"
                  >
                    <Link href={item.href}>
                      <item.icon className="text-gray-300" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-black border-t border-gray-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Exit Admin" className="text-gray-300 hover:bg-gray-800 hover:text-white">
              <Link href="/">
                <LogOut />
                <span>Exit Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

