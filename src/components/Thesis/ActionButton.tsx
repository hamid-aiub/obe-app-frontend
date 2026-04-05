"use client";

import { CheckCircle, XCircle } from "lucide-react";

interface ActionButtonsProps {
  onApprove: () => void;
  onReject: () => void;
  isDisabled?: boolean;
}

export function ActionButtons({
  onApprove,
  onReject,
  isDisabled = false,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onApprove}
        disabled={isDisabled}
        className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CheckCircle className="h-3.5 w-3.5" />
        Submit
      </button>
      <button
        onClick={onReject}
        disabled={isDisabled}
        className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <XCircle className="h-3.5 w-3.5" />
        Reject
      </button>
    </div>
  );
}
