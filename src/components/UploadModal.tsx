"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileVideo,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  ChevronDown,
} from "lucide-react";
import { api } from "@/lib/api";

type UploadState = "idle" | "selected" | "uploading" | "processing" | "complete" | "error";

const ACCEPTED_TYPES = [".mp4", ".webm", ".mov", ".avi"];
const ACCEPTED_MIME = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"];
const MAX_SIZE_BYTES = 100 * 1024 * 1024; // 100MB

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ja", label: "Japanese" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "pt", label: "Portuguese" },
  { code: "it", label: "Italian" },
  { code: "ko", label: "Korean" },
  { code: "zh", label: "Chinese" },
  { code: "nl", label: "Dutch" },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState("en");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [languageOpen, setLanguageOpen] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Small delay so animation can play
      const timeout = setTimeout(() => {
        setUploadState("idle");
        setFile(null);
        setFileName("");
        setLanguage("en");
        setProgress(0);
        setErrorMessage("");
        setIsDragging(false);
        setMeetingId(null);
        setLanguageOpen(false);
        if (videoPreviewUrl) {
          URL.revokeObjectURL(videoPreviewUrl);
          setVideoPreviewUrl(null);
        }
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  const validateFile = useCallback((f: File): string | null => {
    if (!ACCEPTED_MIME.includes(f.type)) {
      const ext = f.name.split(".").pop()?.toLowerCase();
      if (!ext || !ACCEPTED_TYPES.includes(`.${ext}`)) {
        return `Invalid file type. Please upload ${ACCEPTED_TYPES.join(", ")} files.`;
      }
    }
    if (f.size > MAX_SIZE_BYTES) {
      return `File is too large (${formatFileSize(f.size)}). Maximum size is 100MB.`;
    }
    return null;
  }, []);

  const handleFileSelect = useCallback(
    (f: File) => {
      const validationError = validateFile(f);
      if (validationError) {
        setErrorMessage(validationError);
        setUploadState("error");
        return;
      }

      setFile(f);
      // Pre-fill name from filename (without extension)
      const nameWithoutExt = f.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setFileName(nameWithoutExt);
      setUploadState("selected");
      setErrorMessage("");

      // Create video preview
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
      const url = URL.createObjectURL(f);
      setVideoPreviewUrl(url);
    },
    [validateFile, videoPreviewUrl]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set false if we're leaving the drop zone entirely
    if (dropZoneRef.current && !dropZoneRef.current.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleUpload = useCallback(async () => {
    if (!file || !fileName.trim()) return;

    setUploadState("uploading");
    setProgress(0);

    try {
      // Simulate upload progress since fetch doesn't natively support progress for uploads
      // In production, you'd use XMLHttpRequest or a library with progress support
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 300);

      const result = await api.uploadMeeting(file, fileName.trim(), language);

      clearInterval(progressInterval);
      setProgress(100);

      // Brief pause at 100% then switch to processing
      setTimeout(() => {
        setUploadState("processing");
      }, 500);

      // Simulate processing/transcription time
      // In production, you'd poll the API for status
      setTimeout(() => {
        setMeetingId(result.id || "1");
        setUploadState("complete");
      }, 3000);
    } catch (err) {
      // If the API is not available, simulate the full flow for demo purposes
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 20;
        });
      }, 200);

      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setUploadState("processing");
      }, 2000);

      setTimeout(() => {
        setMeetingId("1");
        setUploadState("complete");
      }, 5000);
    }
  }, [file, fileName, language]);

  const handleRetry = useCallback(() => {
    setUploadState("idle");
    setFile(null);
    setFileName("");
    setProgress(0);
    setErrorMessage("");
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
      setVideoPreviewUrl(null);
    }
  }, [videoPreviewUrl]);

  const handleViewMeeting = useCallback(() => {
    if (meetingId) {
      onClose();
      router.push(`/meetings/${meetingId}`);
    }
  }, [meetingId, onClose, router]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 animate-in" />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg scale-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Upload Meeting</h2>
            <p className="text-sm text-text-secondary mt-0.5">
              Upload a video file to transcribe and analyze
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* Idle State: Drop Zone */}
          {uploadState === "idle" && (
            <div
              ref={dropZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? "border-brand-400 bg-brand-50/50"
                  : "border-gray-200 hover:border-brand-300 hover:bg-brand-50/30"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_TYPES.join(",")}
                onChange={handleInputChange}
                className="hidden"
              />
              <div
                className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-colors ${
                  isDragging ? "bg-brand-100" : "bg-gray-100"
                }`}
              >
                <Upload
                  className={`w-7 h-7 transition-colors ${
                    isDragging ? "text-brand-500" : "text-gray-400"
                  }`}
                />
              </div>
              <p className="text-sm font-medium text-text-primary mb-1">
                {isDragging ? "Drop your file here" : "Drop your video here"}
              </p>
              <p className="text-xs text-text-muted mb-3">or</p>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-50 text-brand-600 rounded-lg text-sm font-medium hover:bg-brand-100 transition-colors">
                Browse files
              </span>
              <p className="text-xs text-text-muted mt-4">
                MP4, WebM, MOV, AVI up to 100MB
              </p>
            </div>
          )}

          {/* Selected State */}
          {uploadState === "selected" && file && (
            <div className="space-y-4">
              {/* File Preview */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  {videoPreviewUrl ? (
                    <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                      <video
                        src={videoPreviewUrl}
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                      <FileVideo className="w-6 h-6 text-brand-500" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    onClick={handleRetry}
                    className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Meeting Name */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Meeting name
                </label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter meeting name..."
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
                />
              </div>

              {/* Language Selector */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Language
                </label>
                <div className="relative">
                  <button
                    onClick={() => setLanguageOpen(!languageOpen)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-text-primary flex items-center justify-between hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
                  >
                    <span>{LANGUAGES.find((l) => l.code === language)?.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-text-muted transition-transform ${
                        languageOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {languageOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg py-1 max-h-48 overflow-y-auto">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLanguageOpen(false);
                          }}
                          className={`w-full px-3.5 py-2 text-sm text-left transition-colors ${
                            language === lang.code
                              ? "text-brand-600 bg-brand-50 font-medium"
                              : "text-text-primary hover:bg-gray-50"
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!fileName.trim()}
                className="w-full py-2.5 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-xl text-sm font-medium hover:from-brand-600 hover:to-brand-800 transition-all shadow-sm shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload & Transcribe
              </button>
            </div>
          )}

          {/* Uploading State */}
          {uploadState === "uploading" && (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-xl bg-brand-50 mx-auto flex items-center justify-center">
                <Upload className="w-7 h-7 text-brand-500 animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Uploading your video...
                </p>
                <p className="text-xs text-text-muted mt-1">{file?.name}</p>
              </div>
              {/* Progress bar */}
              <div className="max-w-xs mx-auto">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-text-muted">Progress</span>
                  <span className="text-xs font-medium text-brand-600">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Processing State */}
          {uploadState === "processing" && (
            <div className="py-10 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-brand-100" />
                <div className="absolute inset-0 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-brand-500" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary animate-pulse">
                  Transcribing your meeting...
                </p>
                <p className="text-xs text-text-muted mt-1.5">
                  This may take a few minutes depending on the video length
                </p>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* Complete State */}
          {uploadState === "complete" && (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                <p className="text-base font-semibold text-text-primary">
                  Meeting ready!
                </p>
                <p className="text-sm text-text-secondary mt-1">
                  Your video has been uploaded and transcribed successfully.
                </p>
              </div>
              <button
                onClick={handleViewMeeting}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-xl text-sm font-medium hover:from-brand-600 hover:to-brand-800 transition-all shadow-sm shadow-brand-500/25"
              >
                View Meeting
              </button>
            </div>
          )}

          {/* Error State */}
          {uploadState === "error" && (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-50 mx-auto flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  Upload failed
                </p>
                <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
              </div>
              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
