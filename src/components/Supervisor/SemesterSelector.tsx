// app/supervisor/dashboard/components/SemesterSelector.tsx

import { semesters } from "./constants";

interface SemesterSelectorProps {
  selectedSemester: string;
  onSemesterChange: (value: string) => void;
}

export function SemesterSelector({
  selectedSemester,
  onSemesterChange,
}: SemesterSelectorProps) {
  return (
    <div className="mb-6">
      <select
        value={selectedSemester}
        onChange={(e) => onSemesterChange(e.target.value)}
        className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-[#050505] dark:text-white"
      >
        {semesters.map((semester: any) => (
          <option key={semester.value} value={semester.value}>
            {semester.label}
          </option>
        ))}
      </select>
    </div>
  );
}
