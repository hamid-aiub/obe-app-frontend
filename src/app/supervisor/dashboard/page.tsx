// app/supervisor/dashboard/page.tsx
"use client";

import { DeadlinesAlert } from "@/components/Supervisor/DeadlinesAlert";
import { DashboardHeader } from "@/components/Supervisor/Header";
import { SemesterSelector } from "@/components/Supervisor/SemesterSelector";
import { SupervisorNote } from "@/components/Supervisor/SupervisorNote";
import { ThesisGroupCard } from "@/components/Supervisor/ThesisGroupCard";
import { useThesisGroups } from "@/hooks/useThesisGroup";
import { useRouter } from "next/navigation";

export default function SupervisorDashboard() {
  const { groups, selectedSemester, handleViewDetails, handleSemesterChange } =
    useThesisGroups();

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#040404]">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <DashboardHeader
          title="Supervisor Thesis Dashboard"
          description="Manage and monitor your thesis groups"
        />

        <div className="flex justify-between">
          <SemesterSelector
            selectedSemester={selectedSemester}
            onSemesterChange={handleSemesterChange}
          />
          <div>
            <button
              className="flex h-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5 px-6 hover:bg-gray-100 dark:hover:bg-white/10"
              onClick={() => router.push("/supervisor/create-group")}
            >
              <span className="text-sm font-medium text-black dark:text-white px-2">
                + Add Group
              </span>
            </button>
          </div>
        </div>

        <DeadlinesAlert />

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <ThesisGroupCard
              key={group.id}
              group={group}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        <SupervisorNote />
      </div>
    </div>
  );
}
