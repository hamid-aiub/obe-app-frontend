// app/supervisor/dashboard/types/index.ts
export type ThesisStatus =
  | "not_submitted"
  | "submitted"
  | "action_needed"
  | "completed"
  | "completed";

export interface ThesisGroup {
  id: string;
  semesterId?: string;
  name: string;
  domain: string;
  groupNo: string;
  status: ThesisStatus;
}

export interface StatusConfig {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
}
