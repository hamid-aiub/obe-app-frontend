"use client";

import { statusColors } from "../Admin/types";

interface StatusBadgeProps {
  status:
    | "submitted"
    | "action-needed"
    | "resubmitted"
    | "cancelled"
    | "complete";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const StatusIcon = statusColors[status].icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[status].bg} ${statusColors[status].text}`}
    >
      <StatusIcon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
