// app/supervisor/dashboard/components/ThesisGroupCard.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { statusConfig } from "./constants";
import { ThesisGroup } from "./types";

interface ThesisGroupCardProps {
  group: ThesisGroup;
  onViewDetails: (groupId: string) => void;
}

export function ThesisGroupCard({
  group,
  onViewDetails,
}: ThesisGroupCardProps) {
  const status = statusConfig[group.status];
  const StatusIcon = status.icon;
  const router = useRouter();
  const getStatusBadge = () => {
    return (
      <Badge
        variant="secondary"
        className={`gap-1.5 px-2 py-0.5 text-xs font-normal ${status.className}`}
      >
        <StatusIcon className="h-3 w-3" />
        {status.label}
      </Badge>
    );
  };

  return (
    <Card className="group relative overflow-hidden border border-gray-200 bg-gradient-to-br from-white to-gray-50/50 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:from-[#050505] dark:to-[#030303]">
      {/* Decorative gradient line on top */}
      <div
        className={`absolute top-0 left-0 h-0.5 w-full transition-all duration-300 ${
          group.status === "submitted"
            ? "bg-gradient-to-r from-green-500 to-emerald-500"
            : group.status === "action_needed"
              ? "bg-gradient-to-r from-red-500 to-rose-500"
              : "bg-gradient-to-r from-gray-400 to-gray-500"
        }`}
      />

      <CardHeader className="pb-1 pt-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {group.name}
            </h3>
            {group.domain ? (
              <div className="mt-1 space-y-0">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Domain:{" "}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {group.domain}
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {group.groupNo}
                </p>
              </div>
            ) : (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                No domain set
              </p>
            )}
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-0">
        <div className="flex items-center justify-end border-t border-gray-100 pt-2 dark:border-gray-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/supervisor/upload-evidence")}
            className="h-7 gap-1.5 px-2 text-xs text-gray-600 transition-all duration-200 hover:gap-2 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <Upload className="h-3 w-3" />
            <span className="text-xs font-medium">Upload Evidence</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(group.id)}
            className="h-7 gap-1.5 px-2 text-xs text-gray-600 transition-all duration-200 hover:gap-2 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <Eye className="h-3 w-3" />
            <span className="text-xs font-medium">View Details</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
