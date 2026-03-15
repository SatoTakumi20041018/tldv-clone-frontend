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
} from "lucide-react";

interface IntegrationCardProps {
  integration: Integration;
  onToggle?: (id: string, connect: boolean) => void;
}

const iconMap: Record<string, { bg: string; text: string }> = {
  zoom: { bg: "bg-blue-100", text: "text-blue-600" },
  google_meet: { bg: "bg-green-100", text: "text-green-600" },
  teams: { bg: "bg-purple-100", text: "text-purple-600" },
  hubspot: { bg: "bg-orange-100", text: "text-orange-600" },
  salesforce: { bg: "bg-blue-100", text: "text-blue-600" },
  slack: { bg: "bg-purple-100", text: "text-purple-600" },
  notion: { bg: "bg-gray-100", text: "text-gray-800" },
  jira: { bg: "bg-blue-100", text: "text-blue-600" },
  google_drive: { bg: "bg-yellow-100", text: "text-yellow-600" },
  dropbox: { bg: "bg-blue-100", text: "text-blue-600" },
  asana: { bg: "bg-rose-100", text: "text-rose-600" },
  linear: { bg: "bg-violet-100", text: "text-violet-600" },
};

function getIcon(iconName: string) {
  switch (iconName) {
    case "zoom":
    case "google_meet":
    case "teams":
      return Video;
    case "slack":
      return MessageSquare;
    case "hubspot":
    case "salesforce":
      return Database;
    case "google_drive":
    case "dropbox":
      return FolderOpen;
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

  return (
    <div role="article" aria-label={integration.name} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>
        {integration.connected && (
          <div className="flex items-center gap-1">
            {integration.status === "active" && (
              <span className="flex items-center gap-1 text-xs text-success font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active
              </span>
            )}
            {integration.status === "error" && (
              <span className="flex items-center gap-1 text-xs text-danger font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                Error
              </span>
            )}
            {integration.status === "inactive" && (
              <span className="flex items-center gap-1 text-xs text-text-muted font-medium">
                <XCircle className="w-3.5 h-3.5" />
                Inactive
              </span>
            )}
          </div>
        )}
      </div>

      <h3 className="font-semibold text-text-primary mb-1">
        {integration.name}
      </h3>
      <p className="text-xs text-text-secondary leading-relaxed mb-4">
        {integration.description}
      </p>

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
        className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
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
