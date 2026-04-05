"use client";

import { registrationColors } from "../Admin/types";

interface RegistrationBadgeProps {
  status: "completed" | "pending";
}

export function RegistrationBadge({ status }: RegistrationBadgeProps) {
  return (
    <span
      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${registrationColors[status].bg} ${registrationColors[status].text}`}
    >
      {status === "completed" ? "Completed" : "Pending"}
    </span>
  );
}
