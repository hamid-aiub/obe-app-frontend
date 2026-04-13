"use client";

import { motion } from "framer-motion";
import { ThesisGroup } from "../Admin/types";
import { ActionButtons } from "./ActionButton";
import { EditableField } from "./EditableCell";
import { RegistrationBadge } from "./registration-badge";
import { StatusBadge } from "./status-badge";
import { StudentsList } from "./studentList";

interface ThesisTableRowProps {
  group: ThesisGroup;
  onUpdateGroup: (
    groupId: string,
    field: keyof ThesisGroup,
    value: string,
  ) => void;
  onSubmit: (groupId: string) => void;
  onReject: (groupId: string) => void;
}

export function ThesisTableRow({
  group,
  onUpdateGroup,
  onSubmit,
  onReject,
}: ThesisTableRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${
        group.isEdited ? "bg-green-50/50 dark:bg-green-900/5" : ""
      }`}
    >
      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-[#0a0a0a] z-10">
        {group.id}
      </td>

      {/* Class ID - Editable */}
      <td className="px-4 py-3">
        <EditableField
          value={group.classId}
          onSave={(value) => onUpdateGroup(group.id, "classId", value)}
          isEdited={group.isEdited}
        />
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

      {/* External ID - Editable */}
      <td className="px-4 py-3">
        <EditableField
          value={group.extId}
          onSave={(value) => onUpdateGroup(group.id, "extId", value)}
          isEdited={group.isEdited}
        />
      </td>

      <td className="px-4 py-3">
        <StudentsList students={group.students} type="id" />
      </td>

      <td className="px-4 py-3">
        <StudentsList students={group.students} type="name" />
      </td>

      {/* Thesis Mgmt Remark - Editable */}
      <td className="px-4 py-3">
        <EditableField
          value={group.thesisMgmtRemark}
          onSave={(value) => onUpdateGroup(group.id, "thesisMgmtRemark", value)}
          placeholder="Add remark..."
          isEdited={group.isEdited}
        />
      </td>

      <td className="px-4 py-3">
        <StatusBadge status={group.status} />
      </td>

      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
        {group.remark}
      </td>

      <td className="px-4 py-3">
        <RegistrationBadge status={group.registrationStatus} />
      </td>

      <td className="px-4 py-3">
        <ActionButtons
          onApprove={() => onSubmit(group.id)}
          onReject={() => onReject(group.id)}
          status={group.status}
        />
      </td>
    </motion.tr>
  );
}
