// app/supervisor/dashboard/hooks/useThesisGroups.ts
import { mockGroups } from "@/components/Supervisor/constants";
import { ThesisGroup } from "@/components/Supervisor/types";
import { useState } from "react";

export function useThesisGroups() {
  const [groups, setGroups] = useState<ThesisGroup[]>(mockGroups);
  const [selectedSemester, setSelectedSemester] = useState("spring-2026");

  const handleViewDetails = (groupId: string) => {
    // TODO: Implement navigation or modal
    console.log("View details for group:", groupId);
  };

  const handleSemesterChange = (semester: string) => {
    setSelectedSemester(semester);
    // TODO: Fetch groups for selected semester
  };

  return {
    groups,
    selectedSemester,
    handleViewDetails,
    handleSemesterChange,
  };
}
