import { API_SERVICE } from "@/config/axios-config";
import { ThesisGroup, ThesisStatus } from "@/components/Supervisor/types";
import { AxiosError } from "axios";

interface SupervisorGroupStudent {
  studentId: string;
  name: string;
  cgpa: string;
  primaryEmail: string;
  secondaryEmail?: string;
  phoneNo: string;
  creditCompleted: string;
  creditTakeWithThesis?: string;
  researchMethodologyCompleted: "yes" | "no";
}

interface SupervisorGroupResponse {
  id: string;
  semesterId: string;
  classId?: string;
  globalGroupSerial?: string;
  supervisorGroup?: string;
  externalId?: string;
  externalName?: string;
  thesisManagementTeamRemark?: string;
  supervisorRemark?: string;
  supervisorId: string;
  supervisorName: string;
  supervisorEmail: string;
  proposedTitle: string;
  thesisDomain: string;
  shortDescription: string;
  literatureReview?: string;
  projectProposal?: string;
  numberOfStudents: number;
  acceptTerms: boolean;
  students: SupervisorGroupStudent[];
}

export interface CreateSupervisorGroupPayload {
  semesterId: string;
  supervisorId: string;
  supervisorName: string;
  supervisorEmail: string;
  proposedTitle: string;
  thesisDomain: string;
  shortDescription: string;
  literatureReview?: string;
  projectProposal?: string;
  numberOfStudents: number;
  students: SupervisorGroupStudent[];
  acceptTerms: boolean;
}

export interface CreateSupervisorGroupRequest {
  payload: CreateSupervisorGroupPayload;
  literatureReviewFile?: File;
  projectProposalFile?: File;
}

export interface UpdateSupervisorGroupRequest {
  id: string;
  payload: Partial<CreateSupervisorGroupPayload>;
  literatureReviewFile?: File;
  projectProposalFile?: File;
}

export interface UploadGroupEvidenceRequest {
  groupId: string;
  semesterId?: string;
  plagiarismPercentage?: string;
  aiDetectionPercentage?: string;
  files: {
    progressReport?: File;
    finalThesisBook?: File;
    plagiarismReport?: File;
    aiDetectionReport?: File;
    presentationSlide?: File;
    poster?: File;
  };
}

export interface GroupDocument {
  id: string;
  thesisGroupId: string;
  semesterId: string;
  literatureReview?: string | null;
  projectProposal?: string | null;
  progressReport?: string | null;
  finalThesisBook?: string | null;
  plagiarismReport?: string | null;
  aiDetectionReport?: string | null;
  presentationSlide?: string | null;
  poster?: string | null;
  plagiarismPercentage?: number;
  aiDetectionPercentage?: number;
  createdAt?: string;
  updatedAt?: string;
}

const toAppError = (error: unknown) => {
  const axiosError = error as AxiosError<{ message?: string | string[] }>;
  const message = axiosError.response?.data?.message;

  if (Array.isArray(message)) {
    return new Error(message.join(", "));
  }

  if (typeof message === "string") {
    return new Error(message);
  }

  return new Error("Something went wrong. Please try again.");
};

const deriveStatus = (group: SupervisorGroupResponse): ThesisStatus => {
  if (!group.acceptTerms) {
    return "action_needed";
  }

  return "submitted";
};

const toUiGroup = (group: SupervisorGroupResponse): ThesisGroup => ({
  id: group.id,
  semesterId: group.semesterId,
  name: group.proposedTitle,
  domain: group.thesisDomain,
  groupNo: `${group.supervisorGroup ?? "-"} | Global ${group.globalGroupSerial ?? "-"}`,
  status: deriveStatus(group),
});

export const getSupervisorGroupsApi = async (options?: {
  supervisorId?: string;
  semesterId?: string;
}): Promise<ThesisGroup[]> => {
  try {
    const { supervisorId, semesterId } = options ?? {};
    const params: Record<string, string> = {};

    if (supervisorId) {
      params.supervisorId = supervisorId;
    }

    if (semesterId) {
      params.semesterId = semesterId;
    }

    const { data } = await API_SERVICE.get<SupervisorGroupResponse[]>(
      "/supervisor/groups",
      {
        params: Object.keys(params).length ? params : undefined,
      },
    );

    return data.map(toUiGroup);
  } catch (error) {
    throw toAppError(error);
  }
};

export const createSupervisorGroupApi = async (
  request: CreateSupervisorGroupRequest,
): Promise<void> => {
  try {
    const formData = new FormData();
    const { payload, literatureReviewFile, projectProposalFile } = request;

    formData.append("semesterId", payload.semesterId);
    formData.append("supervisorId", payload.supervisorId);
    formData.append("supervisorName", payload.supervisorName);
    formData.append("supervisorEmail", payload.supervisorEmail);
    formData.append("proposedTitle", payload.proposedTitle);
    formData.append("thesisDomain", payload.thesisDomain);
    formData.append("shortDescription", payload.shortDescription);
    formData.append("numberOfStudents", String(payload.numberOfStudents));
    formData.append("acceptTerms", String(payload.acceptTerms));
    formData.append("students", JSON.stringify(payload.students));

    if (literatureReviewFile) {
      formData.append("literatureReview", literatureReviewFile);
    }

    if (projectProposalFile) {
      formData.append("projectProposal", projectProposalFile);
    }

    await API_SERVICE.post("/supervisor/create-group", formData);
  } catch (error) {
    throw toAppError(error);
  }
};

export const updateSupervisorGroupApi = async (
  request: UpdateSupervisorGroupRequest,
): Promise<void> => {
  try {
    const formData = new FormData();
    const { id, payload, literatureReviewFile, projectProposalFile } = request;

    if (payload.semesterId !== undefined) {
      formData.append("semesterId", payload.semesterId);
    }

    if (payload.supervisorId !== undefined) {
      formData.append("supervisorId", payload.supervisorId);
    }

    if (payload.supervisorName !== undefined) {
      formData.append("supervisorName", payload.supervisorName);
    }

    if (payload.supervisorEmail !== undefined) {
      formData.append("supervisorEmail", payload.supervisorEmail);
    }

    if (payload.proposedTitle !== undefined) {
      formData.append("proposedTitle", payload.proposedTitle);
    }

    if (payload.thesisDomain !== undefined) {
      formData.append("thesisDomain", payload.thesisDomain);
    }

    if (payload.shortDescription !== undefined) {
      formData.append("shortDescription", payload.shortDescription);
    }

    if (payload.numberOfStudents !== undefined) {
      formData.append("numberOfStudents", String(payload.numberOfStudents));
    }

    if (payload.acceptTerms !== undefined) {
      formData.append("acceptTerms", String(payload.acceptTerms));
    }

    if (payload.students !== undefined) {
      formData.append("students", JSON.stringify(payload.students));
    }

    if (literatureReviewFile) {
      formData.append("literatureReview", literatureReviewFile);
    }

    if (projectProposalFile) {
      formData.append("projectProposal", projectProposalFile);
    }

    await API_SERVICE.patch(`/supervisor/groups/${id}`, formData);
  } catch (error) {
    throw toAppError(error);
  }
};

export const uploadGroupEvidenceApi = async (
  request: UploadGroupEvidenceRequest,
): Promise<void> => {
  try {
    const formData = new FormData();

    if (request.semesterId) {
      formData.append("semesterId", request.semesterId);
    }

    if (request.plagiarismPercentage) {
      formData.append("plagiarismPercentage", request.plagiarismPercentage);
    }

    if (request.aiDetectionPercentage) {
      formData.append("aiDetectionPercentage", request.aiDetectionPercentage);
    }

    Object.entries(request.files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    await API_SERVICE.post(
      `/supervisor/groups/${request.groupId}/evidences`,
      formData,
    );
  } catch (error) {
    throw toAppError(error);
  }
};

export const getGroupDocumentsApi = async (options: {
  groupId: string;
  semesterId?: string;
}): Promise<GroupDocument | null> => {
  try {
    const params: Record<string, string> = {};
    if (options.semesterId) {
      params.semesterId = options.semesterId;
    }

    const { data } = await API_SERVICE.get<GroupDocument | null>(
      `/supervisor/groups/${options.groupId}/documents`,
      {
        params: Object.keys(params).length ? params : undefined,
      },
    );

    return data;
  } catch (error) {
    throw toAppError(error);
  }
};

export const removeGroupDocumentApi = async (options: {
  groupId: string;
  documentType: string;
  semesterId?: string;
}): Promise<void> => {
  try {
    const params: Record<string, string> = {};
    if (options.semesterId) {
      params.semesterId = options.semesterId;
    }

    await API_SERVICE.delete(
      `/supervisor/groups/${options.groupId}/documents/${options.documentType}`,
      {
        params: Object.keys(params).length ? params : undefined,
      },
    );
  } catch (error) {
    throw toAppError(error);
  }
};
