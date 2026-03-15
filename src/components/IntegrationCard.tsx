"use client";

import { Integration } from "@/types";
import {
  Video,
  MessageSquare,
  Database,
  FolderOpen,
  Kanban,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  Zap,
  FileText,
  CalendarDays,
  Users,
  Gamepad2,
  LayoutGrid,
  Columns3,
  MousePointerClick,
  PenLine,
  Table2,
  Presentation,
  Mail,
  Leaf,
} from "lucide-react";

interface IntegrationCardProps {
  integration: Integration;
  onToggle?: (id: string, connect: boolean) => void;
}

const iconMap: Record<string, { bg: string; text: string }> = {
  zoom: { bg: "bg-blue-100", text: "text-blue-600" },
  google_meet: { bg: "bg-green-100", text: "text-green-600" },
  teams: { bg: "bg-indigo-100", text: "text-indigo-600" },
  hubspot: { bg: "bg-orange-100", text: "text-orange-600" },
  salesforce: { bg: "bg-sky-100", text: "text-sky-600" },
  pipedrive: { bg: "bg-emerald-100", text: "text-emerald-600" },
  slack: { bg: "bg-purple-100", text: "text-purple-600" },
  discord: { bg: "bg-indigo-100", text: "text-indigo-500" },
  notion: { bg: "bg-gray-100", text: "text-gray-800" },
  trello: { bg: "bg-blue-100", text: "text-blue-500" },
  asana: { bg: "bg-rose-100", text: "text-rose-600" },
  linear: { bg: "bg-violet-100", text: "text-violet-600" },
  jira: { bg: "bg-blue-100", text: "text-blue-600" },
  monday: { bg: "bg-amber-100", text: "text-amber-600" },
  clickup: { bg: "bg-fuchsia-100", text: "text-fuchsia-600" },
  google_drive: { bg: "bg-yellow-100", text: "text-yellow-600" },
  dropbox: { bg: "bg-blue-100", text: "text-blue-600" },
  zapier: { bg: "bg-orange-100", text: "text-orange-500" },
  google_docs: { bg: "bg-blue-100", text: "text-blue-500" },
  google_calendar: { bg: "bg-green-100", text: "text-green-600" },
  outlook_calendar: { bg: "bg-sky-100", text: "text-sky-600" },
  greenhouse: { bg: "bg-green-100", text: "text-green-700" },
  miro: { bg: "bg-yellow-100", text: "text-yellow-600" },
  airtable: { bg: "bg-teal-100", text: "text-teal-600" },
};

const categoryLabels: Record<string, string> = {
  video_conferencing: "Video Conferencing",
  crm: "CRM",
  communication: "Communication",
  project_management: "Project Management",
  storage: "Storage",
  automation: "Automation",
  note_taking: "Note Taking",
  calendar: "Calendar",
  hr_recruitment: "HR & Recruitment",
};

function getIcon(iconName: string) {
  switch (iconName) {
    case "zoom":
    case "google_meet":
    case "teams":
      return Video;
    case "slack":
      return MessageSquare;
    case "discord":
      return Gamepad2;
    case "hubspot":
    case "salesforce":
      return Database;
    case "pipedrive":
      return Users;
    case "google_drive":
    case "dropbox":
      return FolderOpen;
    case "zapier":
      return Zap;
    case "google_docs":
      return FileText;
    case "google_calendar":
    case "outlook_calendar":
      return CalendarDays;
    case "greenhouse":
      return Leaf;
    case "trello":
      return Columns3;
    case "monday":
      return LayoutGrid;
    case "clickup":
      return MousePointerClick;
    case "notion":
      return PenLine;
    case "miro":
      return Presentation;
    case "airtable":
      return Table2;
    case "linear":
      return Kanban;
    case "jira":
    case "asana":
      return Kanban;
    default:
      return Kanban;
  }
}

export default function IntegrationCard({
  integration,
  onToggle,
}: IntegrationCardProps) {
  const Icon = getIcon(integration.icon);
  const colors = iconMap[integration.icon] || {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };
  const categoryLabel = categoryLabels[integration.category] || integration.category;

  return (
    <div
      role="article"
      aria-label={integration.name}
      className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>
        <div className="flex items-center gap-2">
          {integration.connected && integration.status === "active" && (
            <span className="flex items-center gap-1 text-xs text-success font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Active
            </span>
          )}
          {integration.connected && integration.status === "error" && (
            <span className="flex items-center gap-1 text-xs text-danger font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              Error
            </span>
          )}
          {integration.connected && integration.status === "inactive" && (
            <span className="flex items-center gap-1 text-xs text-text-muted font-medium">
              <XCircle className="w-3.5 h-3.5" />
              Inactive
            </span>
          )}
        </div>
      </div>

      <h3 className="font-semibold text-text-primary mb-1">
        {integration.name}
      </h3>
      <p className="text-xs text-text-secondary leading-relaxed mb-3 flex-1">
        {integration.description}
      </p>

      <div className="mb-3">
        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-text-muted">
          {categoryLabel}
        </span>
      </div>

      {integration.lastSynced && (
        <p className="text-xs text-text-muted mb-3">
          Last synced:{" "}
          {new Date(integration.lastSynced).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      )}

      <button
        onClick={() => onToggle?.(integration.id, !integration.connected)}
        className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 mt-auto
          ${
            integration.connected
              ? "bg-gray-100 text-text-secondary hover:bg-red-50 hover:text-red-600"
              : "bg-brand-500 text-white hover:bg-brand-600 shadow-sm"
          }
        `}
      >
        {integration.connected ? (
          "Disconnect"
        ) : (
          <>
            Connect
            <ExternalLink className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </div>
  );
}
