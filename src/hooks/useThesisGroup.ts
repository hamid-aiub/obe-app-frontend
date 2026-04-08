// app/supervisor/dashboard/hooks/useThesisGroups.ts
import { ThesisGroup } from "@/components/Supervisor/types";
import { getSupervisorGroupsApi } from "@/resources/thesis-group/api";
import { getSemestersApi, Semester } from "@/resources/semester/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

interface SemesterOption {
  value: string;
  label: string;
}

export function useThesisGroups() {
  const [selectedSemester, setSelectedSemester] = useState("");

  const semestersQuery = useQuery({
    queryKey: ["semesters"],
    queryFn: getSemestersApi,
  });

  const semesterOptions = useMemo<SemesterOption[]>(
    () =>
      (semestersQuery.data ?? []).map((semester) => ({
        value: semester.id,
        label: semester.semesterName,
      })),
    [semestersQuery.data],
  );

  useEffect(() => {
    if (!selectedSemester && semesterOptions.length > 0) {
      setSelectedSemester(semesterOptions[0].value);
    }
  }, [selectedSemester, semesterOptions]);

  const groupsQuery = useQuery({
    queryKey: ["supervisor-groups", selectedSemester],
    queryFn: () => getSupervisorGroupsApi({ semesterId: selectedSemester }),
    enabled: Boolean(selectedSemester),
  });

  const handleViewDetails = (groupId: string) => {
    // TODO: Implement navigation or modal
    console.log("View details for group:", groupId);
  };

  const handleSemesterChange = (semester: string) => {
    setSelectedSemester(semester);
  };

  const groups = groupsQuery.data ?? [];
  const semesters = semestersQuery.data ?? [];
  const selectedSemesterData = useMemo<Semester | null>(
    () =>
      semesters.find((semester) => semester.id === selectedSemester) ?? null,
    [semesters, selectedSemester],
  );
  const selectedSemesterLabel =
    selectedSemesterData?.semesterName ?? "the selected semester";
  const isLoading = semestersQuery.isLoading || groupsQuery.isLoading;
  const error =
    (groupsQuery.error instanceof Error ? groupsQuery.error.message : null) ||
    (semestersQuery.error instanceof Error
      ? semestersQuery.error.message
      : null);

  return {
    groups,
    semesters: semesterOptions,
    selectedSemesterData,
    selectedSemesterLabel,
    selectedSemester,
    isLoading,
    error,
    reloadGroups: groupsQuery.refetch,
    handleViewDetails,
    handleSemesterChange,
  };
}
