"use client";

import { OBEGroup } from "@/components/Admin/types";
import { SemesterSelector } from "@/components/Supervisor/SemesterSelector";
import { DownloadButton } from "@/components/Thesis/DownloadButton";
import { OBEMarksTable } from "@/components/Thesis/OBEMarksTable";
import { useState } from "react";

import { toast } from "sonner";

export default function OBEMarksPage() {
  const [selectedSemester, setSelectedSemester] = useState("Spring 2025-26");
  const [isDownloading, setIsDownloading] = useState(false);

  // Sample data with multiple students per group
  const groups: OBEGroup[] = [
    {
      groupNo: "Thesis [BSCS] G01",
      classId: "BSCS",
      supervisorId: "2401-2401-2",
      supervisorName: "Mr. Supervisor",
      students: [
        {
          studentId: "24-93227-1",
          studentName: "John Doe",
          cos: { co1: 4, co2: 3, co3: 4, co4: 3, co5: 4 },
        },
        {
          studentId: "24-93227-2",
          studentName: "Jane Smith",
          cos: { co1: 3, co2: 4, co3: 3, co4: 4, co5: 3 },
        },
        {
          studentId: "24-93227-3",
          studentName: "Bob Johnson",
          cos: { co1: 2, co2: 3, co3: 2, co4: 3, co5: 2 },
        },
      ],
      submissions: {
        researchProposal: true,
        literatureReview: true,
        methodology: true,
        book: true,
        plagiarismReport: false,
        aiReport: true,
        slide: true,
        poster: true,
        obeMarksheet: false,
      },
    },
    {
      groupNo: "Thesis [BSCS] G02",
      classId: "BSCS",
      supervisorId: "2401-2401-3",
      supervisorName: "Dr. Sarah Johnson",
      students: [
        {
          studentId: "24-93228-1",
          studentName: "Alice Brown",
          cos: { co1: 4, co2: 4, co3: 3, co4: 4, co5: 3 },
        },
        {
          studentId: "24-93228-2",
          studentName: "Charlie Wilson",
          cos: { co1: 3, co2: 3, co3: 4, co4: 3, co5: 4 },
        },
      ],
      submissions: {
        researchProposal: true,
        literatureReview: false,
        methodology: true,
        book: true,
        plagiarismReport: true,
        aiReport: true,
        slide: false,
        poster: true,
        obeMarksheet: true,
      },
    },
  ];

  const handleDownload = async () => {
    setIsDownloading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success("OBE Marks downloaded successfully!");
    setIsDownloading(false);
  };

  const handleDocumentDownload = (groupId: string, documentType: string) => {
    toast.success(`Downloading ${documentType} for ${groupId}...`);
    console.log(`Downloading ${documentType} for group ${groupId}`);
    // Implement actual download logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505]">
      <div className="mx-auto max-w-[95%] px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
            OBE Marks Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and download OBE marks for thesis groups
          </p>
        </div>

        <SemesterSelector
          selectedSemester={selectedSemester}
          onSemesterChange={setSelectedSemester}
        />

        <DownloadButton
          onDownload={handleDownload}
          isDownloading={isDownloading}
        />

        <div className="mt-6">
          <OBEMarksTable
            groups={groups}
            onDownloadDocument={handleDocumentDownload}
          />
        </div>
      </div>
    </div>
  );
}
