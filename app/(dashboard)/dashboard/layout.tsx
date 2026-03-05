"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/dashboard",
    label: "Overview",
  },
  {
    href: "/dashboard/template-builder",
    label: "Template Builder",
  },
  {
    href: "/dashboard/bulk-generation",
    label: "Bulk Generation",
  },
  {
    href: "/dashboard/ai-content",
    label: "AI Content",
  },
  {
    href: "/dashboard/keyword-importer",
    label: "Keyword Importer",
  },
  {
    href: "/dashboard/sitemap",
    label: "Sitemap",
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-muted/50 p-6">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-base font-medium hover:bg-primary/10 hover:text-primary transition",
                pathname === item.href
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}