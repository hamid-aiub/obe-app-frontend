"use client";

import { SidebarNav } from "@/components/sidebar-nav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPublicShellRoute =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/authenticate") ||
    pathname.startsWith("/forgot-password");

  // Public routes (landing page, auth pages)
  if (isPublicShellRoute) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white text-black dark:bg-[#040404] dark:text-white transition-colors duration-300">
        <header className="theme-nav sticky top-0 z-50">
          <div
            className="mx-auto flex w-full items-center justify-between py-4"
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center border border-neutral-300 bg-transparent text-[10px] font-bold tracking-[0.18em] text-black dark:border-white/10 dark:text-white">
                LOGO
              </div>
              <span className="text-[20px] font-medium tracking-tight text-black dark:text-white">
                FST
              </span>
            </div>

            <nav className="flex items-center gap-8 text-[15px] font-medium text-neutral-500 dark:text-white/50">
              <Link
                href="/"
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                Home
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>

        <main className="theme-shell relative flex flex-1 overflow-hidden">
          <div className="theme-grid pointer-events-none absolute inset-0 opacity-40" />
          <div
            className="relative z-10 mx-auto flex w-full flex-1 flex-col"
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            {children}
          </div>
        </main>
      </div>
    );
  }

  // Authenticated routes with sidebar
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-[#040404]">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#050505]">
          <div className="flex h-16 items-center border-b border-gray-200 dark:border-white/10 px-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center border border-neutral-300 bg-transparent text-[8px] font-bold tracking-[0.18em] text-black dark:border-white/10 dark:text-white">
                LOGO
              </div>
              <span className="text-lg font-medium tracking-tight text-black dark:text-white">
                FST
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SidebarNav />
          </div>
        </aside>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#050505] md:hidden"
        >
          <Menu className="h-5 w-5 text-black dark:text-white" />
        </button>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed left-0 top-0 z-50 h-full w-64 transform animate-in slide-in-from-left duration-300 md:hidden">
              <div className="flex h-full flex-col bg-white dark:bg-[#050505] shadow-xl">
                <div className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-white/10 px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center border border-neutral-300 bg-transparent text-[8px] font-bold tracking-[0.18em] text-black dark:border-white/10 dark:text-white">
                      LOGO
                    </div>
                    <span className="text-lg font-medium tracking-tight text-black dark:text-white">
                      FST
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-white/10"
                  >
                    <X className="h-5 w-5 text-black dark:text-white" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <SidebarNav />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <header
            className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white dark:border-white/10 dark:bg-[#050505]"
            style={{ paddingLeft: "1rem", paddingRight: "2rem" }}
          >
            <h1 className="text-lg font-medium text-black dark:text-white">
              {getPageTitle(pathname)}
            </h1>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="flex h-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5 px-6">
                <span className="text-sm font-medium text-black dark:text-white px-4">
                  Md Hamid Uddin
                </span>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div style={{ padding: "1.5rem" }}>{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function getPageTitle(pathname: string): string {
  if (pathname === "/") return "Home";
  const path = pathname.split("/")[1];
  const titles: Record<string, string> = {
    dashboard: "Dashboard",
    students: "Students",
    courses: "Courses",
    obe: "OBE Framework",
    reports: "Reports",
    messages: "Messages",
    settings: "Settings",
    help: "Help Center",
  };
  return titles[path] || "Dashboard";
}
