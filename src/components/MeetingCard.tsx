"use client";

import Link from "next/link";
import { Meeting } from "@/types";
import { Clock, Users, Calendar, Video, Monitor, Smartphone } from "lucide-react";

function formatDuration(seconds: number): string {
  if (seconds === 0) return "--";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function PlatformIcon({ platform }: { platform: Meeting["platform"] }) {
  const iconMap: Record<string, { color: string; label: string }> = {
    zoom: { color: "text-blue-500", label: "Zoom" },
    google_meet: { color: "text-green-500", label: "Meet" },
    teams: { color: "text-purple-500", label: "Teams" },
    other: { color: "text-gray-500", label: "Other" },
  };

  const config = iconMap[platform] || iconMap.other;

  return (
    <div className={`flex items-center gap-1.5 ${config.color}`}>
      <Video className="w-3.5 h-3.5" aria-hidden="true" />
      <span className="text-xs font-medium">{config.label}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: Meeting["status"] }) {
  const styles: Record<string, string> = {
    completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
    processing: "bg-yellow-50 text-yellow-600 border-yellow-200",
    scheduled: "bg-blue-50 text-blue-600 border-blue-200",
    live: "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {status === "live" && (
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
      )}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

interface MeetingCardProps {
  meeting: Meeting;
  variant?: "card" | "list";
}

export default function MeetingCard({
  meeting,
  variant = "card",
}: MeetingCardProps) {
  const participantAvatars = meeting.participants.slice(0, 4);
  const remainingCount = Math.max(0, meeting.participants.length - 4);

  if (variant === "list") {
    return (
      <Link href={`/meetings/${meeting.id}`}>
        <div role="article" aria-label={meeting.title} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-200 transition-all duration-200 cursor-pointer">
          <div className="flex items-center gap-4">
            {/* Platform & Status */}
            <div className="flex flex-col items-center gap-2 w-16">
              <PlatformIcon platform={meeting.platform} />
              <StatusBadge status={meeting.status} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary truncate">
                {meeting.title}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(meeting.date)} at {formatTime(meeting.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDuration(meeting.duration)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {meeting.participants.length}
                </span>
              </div>
              {meeting.summaryPreview && (
                <p className="text-xs text-text-muted mt-1.5 line-clamp-1">
                  {meeting.summaryPreview}
                </p>
              )}
            </div>

            {/* Participants */}
            <div className="hidden md:flex items-center -space-x-2">
              {participantAvatars.map((p) => (
                <div
                  key={p.id}
                  className="w-7 h-7 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-medium border-2 border-white"
                  title={p.name}
                >
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              ))}
              {remainingCount > 0 && (
                <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-medium border-2 border-white">
                  +{remainingCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/meetings/${meeting.id}`}>
      <div role="article" aria-label={meeting.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-200 transition-all duration-200 cursor-pointer h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <PlatformIcon platform={meeting.platform} />
          <StatusBadge status={meeting.status} />
        </div>

        {/* Title */}
        <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
          {meeting.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-text-secondary mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(meeting.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(meeting.duration)}
          </span>
        </div>

        {/* Summary preview */}
        {meeting.summaryPreview && (
          <p className="text-xs text-text-muted line-clamp-2 mb-3 flex-1">
            {meeting.summaryPreview}
          </p>
        )}

        {/* Participants */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <div className="flex items-center -space-x-2">
            {participantAvatars.map((p) => (
              <div
                key={p.id}
                className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px] font-medium border-2 border-white"
                title={p.name}
              >
                {p.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[10px] font-medium border-2 border-white">
                +{remainingCount}
              </div>
            )}
          </div>
          <span className="text-xs text-text-muted">
            {meeting.participants.length} participants
          </span>
        </div>
      </div>
    </Link>
  );
}
