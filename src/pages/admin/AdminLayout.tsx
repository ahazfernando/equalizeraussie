"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import AdminLoginPage from "@/pages/admin/AdminLogin"; // Adjust path if needed

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Caravans", href: "/admin/caravans" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Quotes", href: "/admin/quotes" },
  { label: "Brochures", href: "/admin/brochures" },
  { label: "Inquiries", href: "/admin/inquiries" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Blogs", href: "/admin/blogs" },
  { label: "Finance", href: "/admin/finance" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  // If exactly on /admin → show only the login page
  if (pathname === "/admin") {
    return <AdminLoginPage />;
  }

  // For all other /admin/* routes → show sidebar + protected layout
  const currentPage = navItems.find((i) => i.href === pathname)?.label || "Dashboard";

  return (
    <div className="dark min-h-screen bg-background">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:bg-card dark:border-border">
            <div className="flex items-center gap-2 px-4 flex-1">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/admin/dashboard" className="text-foreground">Admin</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-foreground">{currentPage}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:p-8 md:pt-4 bg-background">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}