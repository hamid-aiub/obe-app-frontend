"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarDays,
  ChevronDown,
  DockIcon,
  FileText,
  Group,
  LayoutDashboard,
  Shield,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

interface SubMenuItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

interface MenuItem {
  title: string;
  href?: string;
  icon: React.ReactNode;
  submenu?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Supervisor",
    icon: <UserCog className="h-4 w-4" />,
    submenu: [
      {
        title: "Dashboard",
        href: "/supervisor/dashboard",
        icon: <LayoutDashboard className="h-3 w-3" />,
      },
      {
        title: "Groups",
        href: "/supervisor/groups",
        icon: <Group className="h-3 w-3" />,
      },
      {
        title: "Documents",
        href: "/supervisor/documents",
        icon: <FileText className="h-3 w-3" />,
      },
    ],
  },
  {
    title: "Admin",
    icon: <Shield className="h-4 w-4" />,
    submenu: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: <LayoutDashboard className="h-3 w-3" />,
      },
      {
        title: "Semester",
        href: "/admin/semester",
        icon: <CalendarDays className="h-3 w-3" />,
      },
      {
        title: "Groups",
        href: "/admin/thesis-groups",
        icon: <Group className="h-3 w-3" />,
      },
      {
        title: "Documents",
        href: "/admin/documents",
        icon: <DockIcon className="h-3 w-3" />,
      },
      {
        title: "Approval Requests",
        href: "/admin/approval-requests",
        icon: <AlertTriangle className="h-3 w-3" />,
      },
    ],
  },
];

export function SidebarNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({
    Supervisor: true,
    Admin: true,
  });

  const toggleSubmenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <nav className={cn("flex flex-col gap-1 p-3", className)}>
      {menuItems.map((item) => {
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isOpen = openMenus[item.title];
        const isSubmenuActive =
          hasSubmenu && item.submenu?.some((sub) => isActive(sub.href));

        if (hasSubmenu) {
          return (
            <div key={item.title} className="flex flex-col">
              <button
                onClick={() => toggleSubmenu(item.title)}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                  // Light mode styles
                  "hover:bg-gray-100",
                  // Dark mode styles
                  "dark:hover:bg-gray-100 dark:hover:text-gray-900",
                  "dark:text-white",
                  // Always show default color for main menu (no active background)
                  "text-gray-700 dark:text-white",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 dark:text-white">
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-600 dark:text-white"
                >
                  <ChevronDown className="h-3 w-3" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {item.submenu?.map((subitem) => (
                        <Link
                          key={subitem.href}
                          href={subitem.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                            // Light mode styles
                            "hover:bg-gray-100",
                            // Dark mode styles
                            "dark:hover:bg-gray-100 dark:hover:text-gray-900",
                            "dark:text-white",
                            // Active state - only for submenu items
                            isActive(subitem.href) &&
                              "bg-gray-100 text-gray-900 dark:bg-gray-100 dark:text-gray-900",
                            // Non-active state
                            !isActive(subitem.href) &&
                              "text-gray-700 dark:text-white",
                          )}
                        >
                          <span
                            className={cn(
                              "transition-colors",
                              isActive(subitem.href)
                                ? "text-gray-900 dark:text-gray-900"
                                : "text-gray-600 dark:text-white",
                            )}
                          >
                            {subitem.icon}
                          </span>
                          <span>{subitem.title}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        return (
          <Link
            key={item.title}
            href={item.href!}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
              // Light mode styles
              "hover:bg-gray-100",
              // Dark mode styles
              "dark:hover:bg-gray-100 dark:hover:text-gray-900",
              "dark:text-white",
              // Always show default color for main menu items
              "text-gray-700 dark:text-white",
            )}
          >
            <span className="text-gray-600 dark:text-white">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
