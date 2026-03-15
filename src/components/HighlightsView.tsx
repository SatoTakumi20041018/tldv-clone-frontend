"use client";

import { Highlight } from "@/types";
import {
  Star,
  CheckSquare,
  CircleDot,
  MessageCircle,
  Hash,
  Clock,
} from "lucide-react";

interface HighlightsViewProps {
  highlights: Highlight[];
  onTimestampClick?: (timestamp: number) => void;
}

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const typeConfig: Record<
  Highlight["type"],
  { icon: typeof Star; label: string; color: string; bg: string }
> = {
  key_point: {
    icon: Star,
    label: "Key Point",
    color: "text-yellow-600",
    bg: "bg-yellow-50 border-yellow-200",
  },
  decision: {
    icon: CircleDot,
    label: "Decision",
    color: "text-brand-600",
    bg: "bg-brand-50 border-brand-200",
  },
  action_item: {
    icon: CheckSquare,
    label: "Action Item",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
  },
  question: {
    icon: MessageCircle,
    label: "Question",
    color: "text-orange-600",
    bg: "bg-orange-50 border-orange-200",
  },
  topic: {
    icon: Hash,
    label: "Topic",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
  },
};

export default function HighlightsView({
  highlights,
  onTimestampClick,
}: HighlightsViewProps) {
  // Group by type
  const grouped = highlights.reduce(
    (acc, h) => {
      if (!acc[h.type]) acc[h.type] = [];
      acc[h.type].push(h);
      return acc;
    },
    {} as Record<string, Highlight[]>
  );

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full">
      {/* Summary count */}
      <div className="flex items-center gap-4 pb-3 border-b border-gray-100">
        {Object.entries(typeConfig).map(([type, config]) => {
          const count = grouped[type]?.length || 0;
          if (count === 0) return null;
          const Icon = config.icon;
          return (
            <div
              key={type}
              className="flex items-center gap-1.5 text-xs text-text-secondary"
            >
              <Icon className={`w-3.5 h-3.5 ${config.color}`} />
              <span>
                {count} {config.label}
                {count !== 1 ? "s" : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-gray-100" />

        <div className="space-y-3">
          {highlights.map((highlight) => {
            const config = typeConfig[highlight.type];
            const Icon = config.icon;

            return (
              <div
                key={highlight.id}
                className={`relative flex gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-sm ${config.bg}`}
                onClick={() => onTimestampClick?.(highlight.timestamp)}
              >
                {/* Icon */}
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-white ${config.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-text-primary">
                      {highlight.title}
                    </h4>
                    <button
                      className="flex items-center gap-1 text-xs text-text-muted hover:text-brand-500 font-mono flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTimestampClick?.(highlight.timestamp);
                      }}
                    >
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(highlight.timestamp)}
                    </button>
                  </div>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    {highlight.description}
                  </p>
                  {highlight.tags && highlight.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {highlight.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-white/80 text-text-secondary font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
