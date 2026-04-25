"use client";

import { statusColors } from "../Admin/types";

interface StatusBadgeProps {
  status?:
    | "submitted"
    | "action-needed"
    | "resubmitted"
    | "cancelled"
    | "complete"
    | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = (status ?? "").toLowerCase().replaceAll("_", "-");
  const statusConfig =
    statusColors[normalizedStatus as keyof typeof statusColors] ??
    statusColors["action-needed"];
  const StatusIcon = statusConfig.icon;
  const label = (normalizedStatus || "unknown")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}
    >
      <StatusIcon className="h-3 w-3" />
      {label}
    </span>
  );
}
