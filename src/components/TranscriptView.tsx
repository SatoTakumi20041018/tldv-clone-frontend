"use client";

import { useState, useRef, useEffect } from "react";
import { TranscriptEntry } from "@/types";
import { Search, Download, Copy, Check } from "lucide-react";

interface TranscriptViewProps {
  transcript: TranscriptEntry[];
  currentTime?: number;
  onTimestampClick?: (timestamp: number) => void;
}

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const speakerColors: Record<string, string> = {};
const colorPalette = [
  "text-brand-500",
  "text-emerald-500",
  "text-orange-500",
  "text-blue-500",
  "text-pink-500",
  "text-violet-500",
  "text-cyan-500",
  "text-rose-500",
];
const bgPalette = [
  "bg-brand-100",
  "bg-emerald-100",
  "bg-orange-100",
  "bg-blue-100",
  "bg-pink-100",
  "bg-violet-100",
  "bg-cyan-100",
  "bg-rose-100",
];

function getSpeakerColor(speaker: string, type: "text" | "bg" = "text") {
  if (!speakerColors[speaker]) {
    const idx = Object.keys(speakerColors).length % colorPalette.length;
    speakerColors[speaker] = String(idx);
  }
  const idx = parseInt(speakerColors[speaker]);
  return type === "text" ? colorPalette[idx] : bgPalette[idx];
}

export default function TranscriptView({
  transcript,
  currentTime = 0,
  onTimestampClick,
}: TranscriptViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const activeRef = useRef<HTMLDivElement>(null);

  const filteredTranscript = searchQuery
    ? transcript.filter(
        (entry) =>
          entry.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.speaker.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transcript;

  // Find current active entry
  const activeEntryIdx = transcript.findIndex((entry, idx) => {
    const nextEntry = transcript[idx + 1];
    return (
      currentTime >= entry.timestamp &&
      (!nextEntry || currentTime < nextEntry.timestamp)
    );
  });

  useEffect(() => {
    if (activeRef.current && !searchQuery) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeEntryIdx, searchQuery]);

  const handleCopyAll = () => {
    const text = transcript
      .map(
        (e) =>
          `[${formatTimestamp(e.timestamp)}] ${e.speaker}: ${e.text}`
      )
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search & actions */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-100">
        <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-text-primary placeholder-gray-400 outline-none w-full"
          />
        </div>
        <button
          onClick={handleCopyAll}
          className="p-2 rounded-lg hover:bg-gray-50 text-text-secondary transition-colors"
          title="Copy transcript"
        >
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Transcript entries */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {filteredTranscript.map((entry, idx) => {
          const isActive =
            !searchQuery &&
            transcript.indexOf(entry) === activeEntryIdx;
          const initials = entry.speaker
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          return (
            <div
              key={entry.id}
              ref={isActive ? activeRef : undefined}
              className={`flex gap-3 p-2.5 rounded-lg transition-all duration-200 cursor-pointer group
                ${isActive ? "bg-brand-50 border border-brand-200" : "hover:bg-gray-50"}
              `}
              onClick={() => onTimestampClick?.(entry.timestamp)}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${getSpeakerColor(entry.speaker, "bg")} ${getSpeakerColor(entry.speaker, "text")}`}
              >
                {initials}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className={`text-sm font-semibold ${getSpeakerColor(entry.speaker)}`}
                  >
                    {entry.speaker}
                  </span>
                  <button
                    className="text-xs text-text-muted hover:text-brand-500 font-mono transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTimestampClick?.(entry.timestamp);
                    }}
                  >
                    {formatTimestamp(entry.timestamp)}
                  </button>
                </div>
                <p className="text-sm text-text-primary leading-relaxed">
                  {searchQuery ? (
                    <HighlightText text={entry.text} query={searchQuery} />
                  ) : (
                    entry.text
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;

  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
