"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import AdminLayout from "@/pages/admin/AdminLayout";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Force dark theme for admin dashboard
    setTheme("dark");
  }, [setTheme]);

  return <AdminLayout>{children}</AdminLayout>;
}

