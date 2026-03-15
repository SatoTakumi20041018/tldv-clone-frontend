"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Share2,
  Download,
  Users,
  Calendar,
  Clock,
  Video,
  FileText,
  Star,
  Lightbulb,
  StickyNote,
} from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import TranscriptView from "@/components/TranscriptView";
import HighlightsView from "@/components/HighlightsView";
import SummaryView from "@/components/SummaryView";
import {
  mockMeetings,
  mockTranscript,
  mockHighlights,
  mockSummary,
} from "@/lib/mockData";

type TabId = "transcript" | "highlights" | "summary" | "notes";

const tabs: { id: TabId; label: string; icon: typeof FileText }[] = [
  { id: "transcript", label: "Transcript", icon: FileText },
  { id: "highlights", label: "Highlights", icon: Star },
  { id: "summary", label: "Summary", icon: Lightbulb },
  { id: "notes", label: "Notes", icon: StickyNote },
];

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function MeetingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("transcript");
  const [seekTo, setSeekTo] = useState<number | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState(0);
  const [notes, setNotes] = useState("");

  const meeting = mockMeetings.find((m) => m.id === params.id);

  const handleTimestampClick = useCallback((timestamp: number) => {
    setSeekTo(timestamp);
    setCurrentTime(timestamp);
  }, []);

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  if (!meeting) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-2">
            Meeting not found
          </h2>
          <p className="text-sm text-text-secondary mb-4">
            The meeting you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push("/meetings")}
            className="text-brand-500 hover:text-brand-600 font-medium text-sm"
          >
            Back to meetings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <div className="flex-1">
          <h1 className="text-xl font-bold text-text-primary">
            {meeting.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-text-secondary">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(meeting.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(meeting.duration)}
            </span>
            <span className="flex items-center gap-1">
              <Video className="w-3 h-3" />
              {meeting.platform === "google_meet"
                ? "Google Meet"
                : meeting.platform.charAt(0).toUpperCase() +
                  meeting.platform.slice(1)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {meeting.participants.length} participants
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-text-secondary hover:border-gray-300 transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-text-secondary hover:border-gray-300 transition-colors">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Participants */}
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm">
        <Users className="w-4 h-4 text-text-muted" />
        <span className="text-xs font-medium text-text-secondary mr-2">
          Participants:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {meeting.participants.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-1.5 bg-gray-50 rounded-full px-2.5 py-1"
            >
              <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[9px] font-semibold">
                {p.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span className="text-xs text-text-primary">{p.name}</span>
              {p.role === "host" && (
                <span className="text-[9px] bg-brand-100 text-brand-600 rounded px-1 font-medium">
                  Host
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content: Video + Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Video player */}
        <div className="space-y-4">
          <VideoPlayer
            duration={meeting.duration}
            onTimeUpdate={handleTimeUpdate}
            seekTo={seekTo}
          />
        </div>

        {/* Right: Tabbed panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col h-[500px] lg:h-auto">
          {/* Tab bar */}
          <div className="flex border-b border-gray-100 px-1 pt-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px
                    ${
                      activeTab === tab.id
                        ? "text-brand-500 border-brand-500 bg-brand-50/50"
                        : "text-text-secondary border-transparent hover:text-text-primary hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === "transcript" && (
              <TranscriptView
                transcript={mockTranscript}
                currentTime={currentTime}
                onTimestampClick={handleTimestampClick}
              />
            )}
            {activeTab === "highlights" && (
              <HighlightsView
                highlights={mockHighlights}
                onTimestampClick={handleTimestampClick}
              />
            )}
            {activeTab === "summary" && (
              <SummaryView summary={mockSummary} />
            )}
            {activeTab === "notes" && (
              <div className="p-4 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-text-primary">
                    Meeting Notes
                  </h3>
                  <span className="text-xs text-text-muted">
                    Auto-saved
                  </span>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Start typing your notes here...

You can use this space to capture your thoughts, follow-ups, or anything else from this meeting."
                  className="flex-1 w-full resize-none bg-gray-50 rounded-xl p-4 text-sm text-text-primary placeholder-gray-400 outline-none border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-all leading-relaxed"
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-text-muted">
                    {notes.length} characters
                  </span>
                  <button className="px-3 py-1.5 bg-brand-500 text-white rounded-lg text-xs font-medium hover:bg-brand-600 transition-colors">
                    Save Notes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
