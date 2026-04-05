"use client";

import { ThesisGroup } from "@/components/Admin/types";
import { FilterSection } from "@/components/Thesis/FilterSelection";
import { SearchBar } from "@/components/Thesis/SearchBar";
import { ThesisTable } from "@/components/Thesis/ThesisTable";
import { useThesisGroups } from "@/hooks/useThesisGroup";
import { useState } from "react";
import { toast } from "sonner";

export default function ThesisGroupManagementPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [downloading, setDownloading] = useState(false);

  const { groups, selectedSemester, handleViewDetails, handleSemesterChange } =
    useThesisGroups();

  const [thesisGroups, setThesisGroups] = useState<ThesisGroup[]>([
    {
      id: "01",
      classId: "Thesis BSCS",
      groupNo: "G01",
      supervisorId: "2401-2400-2",
      supervisorName: "Mr. Supervisor",
      extId: "24-91332-1",
      students: [
        { id: "24-91332-1", name: "Student 1" },
        { id: "24-91332-2", name: "Student 2" },
        { id: "24-91332-3", name: "Student 3" },
        { id: "24-91332-4", name: "Student 4" },
      ],
      status: "submitted",
      registrationStatus: "completed",
      remark: "Need revision",
      thesisMgmtRemark: "",
      isEdited: false,
    },
    {
      id: "02",
      classId: "Thesis BSCS",
      groupNo: "G02",
      supervisorId: "2401-2400-3",
      supervisorName: "Dr. Smith",
      extId: "24-91333-1",
      students: [
        { id: "24-91333-1", name: "Student 3" },
        { id: "24-91333-2", name: "Student 4" },
        { id: "24-91333-3", name: "Student 5" },
      ],
      status: "complete",
      registrationStatus: "completed",
      remark: "Excellent work",
      thesisMgmtRemark: "Approved",
      isEdited: false,
    },
    {
      id: "03",
      classId: "Thesis BSCS",
      groupNo: "G03",
      supervisorId: "2401-2400-4",
      supervisorName: "Prof. Johnson",
      extId: "24-91334-1",
      students: [
        { id: "24-91334-1", name: "Student 6" },
        { id: "24-91334-2", name: "Student 7" },
      ],
      status: "action-needed",
      registrationStatus: "pending",
      remark: "Missing documents",
      thesisMgmtRemark: "Need resubmission",
      isEdited: false,
    },
  ]);

  const filters = [
    { label: "Submitted", value: "submitted", count: 12 },
    { label: "Action Needed", value: "action-needed", count: 3 },
    { label: "Resubmitted", value: "resubmitted", count: 5 },
    { label: "Cancelled", value: "cancelled", count: 2 },
    { label: "Complete", value: "complete", count: 8 },
  ];

  const toggleFilter = (filterValue: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterValue)
        ? prev.filter((f) => f !== filterValue)
        : [...prev, filterValue],
    );
  };

  const handleUpdateGroup = (
    groupId: string,
    field: keyof ThesisGroup,
    value: string,
  ) => {
    setThesisGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? { ...group, [field]: value, isEdited: true }
          : group,
      ),
    );
  };

  const handleSubmit = async (groupId: string) => {
    const group = thesisGroups.find((g) => g.id === groupId);
    if (!group) return;

    // Simulate API call
    toast.loading(`Submitting group ${group.groupNo}...`);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setThesisGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, status: "complete" as const, isEdited: false }
          : g,
      ),
    );

    toast.success(`Group ${group.groupNo} has been submitted successfully!`);
    console.log("Submitting group:", group);
  };

  const handleReject = async (groupId: string) => {
    const group = thesisGroups.find((g) => g.id === groupId);
    if (!group) return;

    // Simulate API call
    toast.loading(`Rejecting group ${group.groupNo}...`);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setThesisGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, status: "action-needed" as const, isEdited: false }
          : g,
      ),
    );

    toast.error(`Group ${group.groupNo} has been rejected.`);
    console.log("Rejecting group:", group);
  };

  const filteredGroups = thesisGroups.filter((group) => {
    if (selectedFilters.length > 0 && !selectedFilters.includes(group.status)) {
      return false;
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        group.classId.toLowerCase().includes(searchLower) ||
        group.groupNo.toLowerCase().includes(searchLower) ||
        group.supervisorName.toLowerCase().includes(searchLower) ||
        group.students.some((s) => s.name.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  const handleDownload = async () => {
    setDownloading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Downloading with filters:", selectedFilters);
    toast.success("File downloaded successfully!");
    setDownloading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505]">
      <div className="mx-auto max-w-[95%] px-4 py-8">
        <FilterSection
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterToggle={toggleFilter}
          onDownload={handleDownload}
          downloading={downloading}
        />

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <ThesisTable
          groups={filteredGroups}
          onUpdateGroup={handleUpdateGroup}
          onSubmit={handleSubmit}
          onReject={handleReject}
        />
      </div>
    </div>
  );
}
