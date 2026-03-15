"use client";

import { MeetingSummary } from "@/types";
import {
  FileText,
  Star,
  CircleDot,
  CheckSquare,
  ArrowRight,
  ThumbsUp,
  Minus,
  ThumbsDown,
  Circle,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface SummaryViewProps {
  summary: MeetingSummary;
}

export default function SummaryView({ summary }: SummaryViewProps) {
  const sentimentConfig = {
    positive: {
      icon: ThumbsUp,
      label: "Positive",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    neutral: {
      icon: Minus,
      label: "Neutral",
      color: "text-gray-600",
      bg: "bg-gray-50",
    },
    negative: {
      icon: ThumbsDown,
      label: "Negative",
      color: "text-red-600",
      bg: "bg-red-50",
    },
  };

  const sentiment = summary.sentiment
    ? sentimentConfig[summary.sentiment]
    : null;

  return (
    <div className="p-4 space-y-5 overflow-y-auto h-full">
      {/* Overview */}
      <div className="bg-gradient-to-r from-brand-50 to-blue-50 rounded-xl p-4 border border-brand-100">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-brand-500" />
          <h3 className="font-semibold text-text-primary text-sm">Overview</h3>
          {sentiment && (
            <div
              className={`ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sentiment.bg} ${sentiment.color}`}
            >
              <sentiment.icon className="w-3 h-3" />
              {sentiment.label}
            </div>
          )}
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          {summary.overview}
        </p>
      </div>

      {/* Key Points */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-yellow-500" />
          <h3 className="font-semibold text-text-primary text-sm">
            Key Points
          </h3>
          <span className="text-xs text-text-muted bg-gray-100 rounded-full px-2 py-0.5">
            {summary.keyPoints.length}
          </span>
        </div>
        <ul className="space-y-2">
          {summary.keyPoints.map((point, idx) => (
            <li key={idx} className="flex gap-2.5 text-sm text-text-secondary">
              <div className="w-5 h-5 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center flex-shrink-0 text-xs font-semibold mt-0.5">
                {idx + 1}
              </div>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Decisions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CircleDot className="w-4 h-4 text-brand-500" />
          <h3 className="font-semibold text-text-primary text-sm">
            Decisions Made
          </h3>
          <span className="text-xs text-text-muted bg-gray-100 rounded-full px-2 py-0.5">
            {summary.decisions.length}
          </span>
        </div>
        <ul className="space-y-2">
          {summary.decisions.map((decision, idx) => (
            <li
              key={idx}
              className="flex gap-2.5 text-sm text-text-secondary bg-brand-50/50 p-2.5 rounded-lg"
            >
              <CircleDot className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{decision}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Items */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckSquare className="w-4 h-4 text-emerald-500" />
          <h3 className="font-semibold text-text-primary text-sm">
            Action Items
          </h3>
          <span className="text-xs text-text-muted bg-gray-100 rounded-full px-2 py-0.5">
            {summary.actionItems.length}
          </span>
        </div>
        <div className="space-y-2">
          {summary.actionItems.map((item) => {
            const statusConfig = {
              pending: {
                icon: Circle,
                color: "text-gray-400",
                label: "Pending",
              },
              in_progress: {
                icon: Clock,
                color: "text-yellow-500",
                label: "In Progress",
              },
              completed: {
                icon: CheckCircle2,
                color: "text-emerald-500",
                label: "Done",
              },
            };
            const status = statusConfig[item.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  item.status === "completed"
                    ? "bg-emerald-50/50 border-emerald-100"
                    : "bg-white border-gray-100"
                }`}
              >
                <StatusIcon
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${status.color}`}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm ${item.status === "completed" ? "line-through text-text-muted" : "text-text-primary"}`}
                  >
                    {item.text}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    {item.assignee && (
                      <span className="text-xs text-text-secondary bg-gray-100 rounded-full px-2 py-0.5">
                        {item.assignee}
                      </span>
                    )}
                    {item.dueDate && (
                      <span className="text-xs text-text-muted">
                        Due:{" "}
                        {new Date(item.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                    <span
                      className={`text-xs font-medium ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Steps */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ArrowRight className="w-4 h-4 text-blue-500" />
          <h3 className="font-semibold text-text-primary text-sm">
            Next Steps
          </h3>
        </div>
        <ul className="space-y-2">
          {summary.nextSteps.map((step, idx) => (
            <li
              key={idx}
              className="flex gap-2.5 text-sm text-text-secondary"
            >
              <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
