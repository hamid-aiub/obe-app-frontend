"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, FileText, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const uploadEvidenceSchema = z.object({
  midTermEvidence: z.any().optional(),
  progressReport: z.any().optional(),
  finalThesisBook: z
    .any()
    .refine((file) => file?.size <= 100 * 1024 * 1024, "Max file size is 100MB")
    .optional(),
  plagiarismReport: z
    .any()
    .refine((file) => file?.size <= 100 * 1024 * 1024, "Max file size is 100MB")
    .optional(),
  plagiarismPercentage: z
    .string()
    .regex(/^(?:[0-9]|[1-9][0-9]|100)?$/, "Must be between 0-100")
    .refine(
      (val) => !val || parseInt(val) <= 19,
      "Plagiarism percentage must be 19% or less",
    )
    .optional(),
  aiDetectionReport: z
    .any()
    .refine((file) => file?.size <= 100 * 1024 * 1024, "Max file size is 100MB")
    .optional(),
  aiDetectionPercentage: z
    .string()
    .regex(/^(?:[0-9]|[1-9][0-9]|100)?$/, "Must be between 0-100")
    .refine(
      (val) => !val || parseInt(val) <= 15,
      "AI Detection percentage must be 15% or less",
    )
    .optional(),
  presentationSlide: z
    .any()
    .refine((file) => file?.size <= 50 * 1024 * 1024, "Max file size is 50MB")
    .optional(),
  poster: z.any().optional(),
});

type UploadEvidenceData = z.infer<typeof uploadEvidenceSchema>;

export default function UploadEvidencePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UploadEvidenceData>({
    resolver: zodResolver(uploadEvidenceSchema),
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles((prev) => ({ ...prev, [fieldName]: file }));
      setValue(fieldName as any, file);
    }
  };

  const onSubmit = async (data: UploadEvidenceData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Uploaded Data:", data);
    console.log("Uploaded Files:", uploadedFiles);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const getFileIcon = (fileName: string) => {
    if (fileName?.endsWith(".pdf")) return "📄";
    if (fileName?.endsWith(".pptx") || fileName?.endsWith(".ppt")) return "📊";
    if (
      fileName?.endsWith(".jpg") ||
      fileName?.endsWith(".png") ||
      fileName?.endsWith(".jpeg")
    )
      return "🖼️";
    return "📎";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505]">
      {/* Header */}

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            Upload Evidence
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Submit your thesis evidence and required documents
          </p>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <p className="text-green-700 dark:text-green-300">
                  Evidence uploaded successfully!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Progress Report */}
          <div className="rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-6">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Midterm Evidence
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Progress Report{" "}
                <span className="text-xs text-gray-500">(PDF, max 100 MB)</span>
              </label>
              <div className="flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Upload className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span>Browse...</span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "finalThesisBook")}
                  />
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {uploadedFiles.finalThesisBook?.name || "No file chosen"}
                </span>
              </div>
              {errors.finalThesisBook && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.finalThesisBook.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Final Term Evidence */}
          <div className="rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Final Term Evidence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Final Thesis Book */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Final Thesis Book{" "}
                  <span className="text-xs text-gray-500">
                    (PDF, max 100 MB)
                  </span>
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Upload className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>Browse...</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "finalThesisBook")}
                    />
                  </label>
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {uploadedFiles.finalThesisBook?.name || "No file chosen"}
                  </span>
                </div>
                {errors.finalThesisBook && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.finalThesisBook.message as string}
                  </p>
                )}
              </div>

              {/* Plagiarism Report */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Plagiarism Report{" "}
                  <span className="text-xs text-gray-500">
                    (PDF, max 100MB)
                  </span>
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Upload className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>Browse...</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "plagiarismReport")}
                    />
                  </label>
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {uploadedFiles.plagiarismReport?.name || "No file chosen"}
                  </span>
                </div>
                {errors.plagiarismReport && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.plagiarismReport.message as string}
                  </p>
                )}
              </div>

              {/* AI Detection Report */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AI Detection Report{" "}
                  <span className="text-xs text-gray-500">
                    (PDF, max 100MB)
                  </span>
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Upload className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>Browse...</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "aiDetectionReport")}
                    />
                  </label>
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {uploadedFiles.aiDetectionReport?.name || "No file chosen"}
                  </span>
                </div>
                {errors.aiDetectionReport && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.aiDetectionReport.message as string}
                  </p>
                )}
              </div>

              {/* Presentation Slide */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Presentation Slide{" "}
                  <span className="text-xs text-gray-500">
                    (PDF/PPTX, max 50MB)
                  </span>
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Upload className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>Browse...</span>
                    <input
                      type="file"
                      accept=".pdf,.pptx,.ppt"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "presentationSlide")}
                    />
                  </label>
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {uploadedFiles.presentationSlide?.name || "No file chosen"}
                  </span>
                </div>
                {errors.presentationSlide && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.presentationSlide.message as string}
                  </p>
                )}
              </div>

              {/* Poster */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Poster{" "}
                  <span className="text-xs text-gray-500">
                    (PDF or Image, 30x48 inches)
                  </span>
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Upload className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>Browse...</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "poster")}
                    />
                  </label>
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {uploadedFiles.poster?.name || "No file chosen"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              {/* Plagiarism Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Plagiarism Percentage{" "}
                  <span className="text-xs text-red-600">(max 19%)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    {...register("plagiarismPercentage")}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] px-4 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    placeholder="Enter percentage"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">
                    %
                  </span>
                </div>
                {errors.plagiarismPercentage && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.plagiarismPercentage.message}
                  </p>
                )}
              </div>
              {/* AI Detection Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AI Detection Percentage{" "}
                  <span className="text-xs text-red-600">(max 15%)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    {...register("aiDetectionPercentage")}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] px-4 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    placeholder="Enter percentage"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">
                    %
                  </span>
                </div>
                {errors.aiDetectionPercentage && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.aiDetectionPercentage.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-black dark:bg-white px-6 py-3 text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Uploading..." : "Upload Evidence"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Thesis Management System
          </p>
        </div>
      </div>
    </div>
  );
}
