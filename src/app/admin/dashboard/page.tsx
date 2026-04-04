"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface ThesisGroup {
  id: string;
  classId: string;
  groupNo: string;
  supervisorId: string;
  supervisorName: string;
  extId: string;
  students: {
    id: string;
    name: string;
  }[];
  status:
    | "submitted"
    | "action-needed"
    | "resubmitted"
    | "cancelled"
    | "complete";
  registrationStatus: "completed" | "pending";
  action: string;
  remark: string;
}

const statusColors = {
  submitted: {
    bg: "bg-blue-100 dark:bg-blue-900/20",
    text: "text-blue-700 dark:text-blue-400",
    icon: Clock,
  },
  "action-needed": {
    bg: "bg-red-100 dark:bg-red-900/20",
    text: "text-red-700 dark:text-red-400",
    icon: AlertCircle,
  },
  resubmitted: {
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
    text: "text-yellow-700 dark:text-yellow-400",
    icon: RefreshCw,
  },
  cancelled: {
    bg: "bg-gray-100 dark:bg-gray-900/20",
    text: "text-gray-700 dark:text-gray-400",
    icon: XCircle,
  },
  complete: {
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-700 dark:text-green-400",
    icon: CheckCircle,
  },
};

const registrationColors = {
  completed: {
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-700 dark:text-green-400",
  },
  pending: {
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
    text: "text-yellow-700 dark:text-yellow-400",
  },
};

export default function ThesisGroupManagementPage() {
  const [selectedSemester, setSelectedSemester] = useState("Spring 2025-26");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSemesterDropdownOpen, setIsSemesterDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const semesters = ["Spring 2025-26", "Fall 2025-26", "Summer 2025-26"];

  const filters = [
    { label: "Submitted", value: "submitted", count: 12 },
    { label: "Action Needed", value: "action-needed", count: 3 },
    { label: "Resubmitted", value: "resubmitted", count: 5 },
    { label: "Cancelled", value: "cancelled", count: 2 },
    { label: "Complete", value: "complete", count: 8 },
  ];

  const thesisGroups: ThesisGroup[] = [
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
      ],
      status: "submitted",
      registrationStatus: "completed",
      action: "Reject",
      remark: "Need revision",
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
      action: "Accept",
      remark: "Excellent work",
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
      action: "Review",
      remark: "Missing documents",
    },
  ];

  const toggleFilter = (filterValue: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterValue)
        ? prev.filter((f) => f !== filterValue)
        : [...prev, filterValue],
    );
  };

  const filteredGroups = thesisGroups.filter((group) => {
    // Filter by status
    if (selectedFilters.length > 0 && !selectedFilters.includes(group.status)) {
      return false;
    }

    // Filter by search term
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
    setDownloading(false);
  };

  const getStatusBadge = (status: ThesisGroup["status"]) => {
    const StatusIcon = statusColors[status].icon;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[status].bg} ${statusColors[status].text}`}
      >
        <StatusIcon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Select Semester Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Semester
          </label>
          <div className="relative">
            <button
              onClick={() => setIsSemesterDropdownOpen(!isSemesterDropdownOpen)}
              className="w-full md:w-64 flex items-center justify-between rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] px-4 py-2 text-black dark:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            >
              <span>{selectedSemester}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isSemesterDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isSemesterDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-full md:w-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] shadow-lg z-20"
                >
                  {semesters.map((semester) => (
                    <button
                      key={semester}
                      onClick={() => {
                        setSelectedSemester(semester);
                        setIsSemesterDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {semester}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white mb-1">
                Download Thesis Group File using the following filters
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select status filters to download specific groups
              </p>
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <button
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  {selectedFilters.length > 0 && (
                    <span className="ml-1 rounded-full bg-black dark:bg-white px-2 py-0.5 text-xs text-white dark:text-black">
                      {selectedFilters.length}
                    </span>
                  )}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isFilterDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isFilterDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] shadow-lg z-20"
                    >
                      <div className="p-2">
                        {filters.map((filter) => (
                          <label
                            key={filter.value}
                            className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedFilters.includes(filter.value)}
                                onChange={() => toggleFilter(filter.value)}
                                className="rounded border-gray-300 dark:border-gray-600"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {filter.label}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              ({filter.count})
                            </span>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center gap-2 rounded-lg bg-black dark:bg-white px-6 py-2 text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                {downloading ? "Downloading..." : "Download"}
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {selectedFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedFilters.map((filter) => {
                const filterLabel = filters.find(
                  (f) => f.value === filter,
                )?.label;
                return (
                  <span
                    key={filter}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs text-gray-700 dark:text-gray-300"
                  >
                    {filterLabel}
                    <button
                      onClick={() => toggleFilter(filter)}
                      className="ml-1 hover:text-red-600 dark:hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by class ID, group no, supervisor, or student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] pl-10 pr-4 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>
        </div>

        {/* Thesis Groups Table */}
        <div className="rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-[#050505] border-b border-gray-200 dark:border-white/10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">
                    Class ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">
                    Group No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">
                    Supervisor Id
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">
                    Supervisor Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">
                    Ext Id
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">
                    Students ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">
                    Students Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">
                    Thesis Mgmt Team Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">
                    Supervisor Registration
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">
                    Remark
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">
                    Completed
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {filteredGroups.map((group) => (
                  <motion.tr
                    key={group.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {group.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {group.classId}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {group.groupNo}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {group.supervisorId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {group.supervisorName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {group.extId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="space-y-1">
                        {group.students.map((student, idx) => (
                          <div key={idx}>{student.id}</div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="space-y-1">
                        {group.students.map((student, idx) => (
                          <div key={idx}>{student.name}</div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(group.status)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${registrationColors[group.registrationStatus].bg} ${registrationColors[group.registrationStatus].text}`}
                      >
                        {group.registrationStatus === "completed"
                          ? "Completed"
                          : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm">
                        {group.action}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {group.remark}
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                No thesis groups found
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Try adjusting your filters or search term
              </p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {filters.map((filter) => (
            <div
              key={filter.value}
              className="rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-4"
            >
              <div className="text-2xl font-bold text-black dark:text-white">
                {filter.count}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {filter.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
