"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart,
  BookOpen,
  Calendar,
  ChevronDown,
  FileText,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
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
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Supervisor Dashboard",
    href: "/supervisor/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Students",
    icon: <Users className="h-4 w-4" />,
    submenu: [
      {
        title: "All Students",
        href: "/students",
        icon: <Users className="h-3 w-3" />,
      },
      {
        title: "Enrollment",
        href: "/students/enrollment",
        icon: <FileText className="h-3 w-3" />,
      },
      {
        title: "Attendance",
        href: "/students/attendance",
        icon: <Calendar className="h-3 w-3" />,
      },
      {
        title: "Performance",
        href: "/students/performance",
        icon: <BarChart className="h-3 w-3" />,
      },
    ],
  },
  {
    title: "Courses",
    icon: <BookOpen className="h-4 w-4" />,
    submenu: [
      {
        title: "All Courses",
        href: "/courses",
        icon: <BookOpen className="h-3 w-3" />,
      },
      {
        title: "Course Outline",
        href: "/courses/outline",
        icon: <FileText className="h-3 w-3" />,
      },
      {
        title: "Assignments",
        href: "/courses/assignments",
        icon: <FileText className="h-3 w-3" />,
      },
      {
        title: "Grading",
        href: "/courses/grading",
        icon: <BarChart className="h-3 w-3" />,
      },
    ],
  },
  {
    title: "OBE Framework",
    icon: <BarChart className="h-4 w-4" />,
    submenu: [
      {
        title: "Program Outcomes",
        href: "/obe/program-outcomes",
        icon: <BarChart className="h-3 w-3" />,
      },
      {
        title: "Course Outcomes",
        href: "/obe/course-outcomes",
        icon: <FileText className="h-3 w-3" />,
      },
      {
        title: "Assessment Mapping",
        href: "/obe/assessment",
        icon: <FileText className="h-3 w-3" />,
      },
      {
        title: "Achievement Report",
        href: "/obe/reports",
        icon: <BarChart className="h-3 w-3" />,
      },
    ],
  },
  {
    title: "Reports",
    icon: <FileText className="h-4 w-4" />,
    submenu: [
      {
        title: "Analytics",
        href: "/reports/analytics",
        icon: <BarChart className="h-3 w-3" />,
      },
      {
        title: "Accreditation",
        href: "/reports/accreditation",
        icon: <FileText className="h-3 w-3" />,
      },
      {
        title: "Department Reports",
        href: "/reports/department",
        icon: <FileText className="h-3 w-3" />,
      },
    ],
  },
  {
    title: "Messages",
    href: "/messages",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    title: "Help",
    href: "/help",
    icon: <HelpCircle className="h-4 w-4" />,
  },
];

export function SidebarNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({});

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
        const isItemActive = item.href ? isActive(item.href) : false;

        if (hasSubmenu) {
          const isSubmenuActive = item.submenu?.some((sub) =>
            isActive(sub.href),
          );

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
                  // Active state
                  (isItemActive || isSubmenuActive) &&
                    "bg-gray-100 text-gray-900 dark:bg-gray-100 dark:text-gray-900",
                  // Non-active state
                  !(isItemActive || isSubmenuActive) &&
                    "text-gray-700 dark:text-white",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "transition-colors",
                      isItemActive || isSubmenuActive
                        ? "text-gray-900 dark:text-gray-900"
                        : "text-gray-600 dark:text-white",
                    )}
                  >
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "transition-colors",
                    isItemActive || isSubmenuActive
                      ? "text-gray-900 dark:text-gray-900"
                      : "text-gray-600 dark:text-white",
                  )}
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
                            "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all",
                            // Light mode styles
                            "hover:bg-gray-100",
                            // Dark mode styles
                            "dark:hover:bg-gray-100 dark:hover:text-gray-900",
                            "dark:text-white",
                            // Active state
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
              // Active state
              isItemActive &&
                "bg-gray-100 text-gray-900 dark:bg-gray-100 dark:text-gray-900",
              // Non-active state
              !isItemActive && "text-gray-700 dark:text-white",
            )}
          >
            <span
              className={cn(
                "transition-colors",
                isItemActive
                  ? "text-gray-900 dark:text-gray-900"
                  : "text-gray-600 dark:text-white",
              )}
            >
              {item.icon}
            </span>
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
