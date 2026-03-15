"use client";

import {
  Video,
  Clock,
  ArrowRight,
  Plus,
  FolderOpen,
  Film,
  Sparkles,
  Play,
  Calendar,
  FileText,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import MeetingCard from "@/components/MeetingCard";
import { mockMeetings, mockUser } from "@/lib/mockData";

const mockFolders = [
  { id: "1", name: "Sales Calls", count: 12, color: "bg-blue-500" },
  { id: "2", name: "Product Syncs", count: 8, color: "bg-emerald-500" },
  { id: "3", name: "Customer Interviews", count: 5, color: "bg-orange-500" },
  { id: "4", name: "Team Standups", count: 22, color: "bg-purple-500" },
];

const mockClips = [
  {
    id: "1",
    title: "Key pricing discussion",
    meetingTitle: "Sales Pipeline Review",
    duration: "1:24",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "Feature demo feedback",
    meetingTitle: "Product Demo - Enterprise",
    duration: "0:45",
    timestamp: "Yesterday",
  },
  {
    id: "3",
    title: "Q2 goals alignment",
    meetingTitle: "Quarterly Planning",
    duration: "2:10",
    timestamp: "2 days ago",
  },
];

const mockReports = [
  {
    id: "1",
    title: "Weekly Sales Summary",
    description: "AI-generated overview of 5 sales calls this week. Win rate: 60%, avg deal size up 15%.",
    generatedAt: "Today, 9:00 AM",
    meetingCount: 5,
    type: "recurring" as const,
  },
  {
    id: "2",
    title: "Customer Feedback Digest",
    description: "Top themes from 3 customer interviews: onboarding flow, mobile app requests, pricing concerns.",
    generatedAt: "Yesterday, 5:00 PM",
    meetingCount: 3,
    type: "one-time" as const,
  },
  {
    id: "3",
    title: "Sprint Retrospective Insights",
    description: "Key blockers identified across 2 sprint meetings. Team velocity trending upward.",
    generatedAt: "Mar 12, 2026",
    meetingCount: 2,
    type: "recurring" as const,
  },
];

export default function DashboardPage() {
  const completedMeetings = mockMeetings.filter(
    (m) => m.status === "completed"
  );
  const scheduledMeetings = mockMeetings.filter(
    (m) => m.status === "scheduled"
  );
  const recentMeetings = completedMeetings.slice(0, 4);

  const totalHours =
    completedMeetings.reduce((acc, m) => acc + m.duration, 0) / 3600;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Welcome back, {mockUser.name.split(" ")[0]}
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Here&apos;s what&apos;s happening with your meetings today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-xl text-sm font-medium hover:from-brand-600 hover:to-brand-800 transition-all shadow-sm shadow-brand-500/25 w-fit">
            <Sparkles className="w-4 h-4" />
            Ask tl;dv AI
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-text-primary border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors w-fit">
            <Plus className="w-4 h-4" />
            Import Meeting
          </button>
        </div>
      </div>

      {/* Quick Insights - Meeting-specific, not generic stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
              <Video className="w-4.5 h-4.5 text-brand-500" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">This week</p>
              <p className="text-lg font-bold text-text-primary">
                7 meetings
              </p>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-2">
            2 more than last week
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4.5 h-4.5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Time recorded</p>
              <p className="text-lg font-bold text-text-primary">
                {totalHours.toFixed(1)}h
              </p>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-2">
            Avg {(totalHours / Math.max(completedMeetings.length, 1) * 60).toFixed(0)} min per meeting
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4.5 h-4.5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Action items</p>
              <p className="text-lg font-bold text-text-primary">
                3 pending
              </p>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-2">
            5 completed this week
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4.5 h-4.5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Coming up</p>
              <p className="text-lg font-bold text-text-primary">
                {scheduledMeetings.length} today
              </p>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-2">
            Next in 2 hours
          </p>
        </div>
      </div>

      {/* Recent Meetings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Recent Meetings
          </h2>
          <Link
            href="/meetings"
            className="text-sm text-brand-500 hover:text-brand-600 font-medium flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} variant="list" />
          ))}
        </div>
      </div>

      {/* Two-column: Upcoming Meetings + Folders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5 text-text-muted" />
              Upcoming Meetings
            </h2>
          </div>
          <div className="space-y-3">
            {scheduledMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary truncate">
                      {meeting.title}
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {new Date(meeting.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(meeting.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center -space-x-1.5">
                        {meeting.participants.slice(0, 3).map((p) => (
                          <div
                            key={p.id}
                            className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[9px] font-medium border border-white"
                            title={p.name}
                          >
                            {p.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        ))}
                      </div>
                      <span className="text-[11px] text-text-muted">
                        {meeting.participants.length} participants
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-brand-500 font-medium bg-brand-50 px-2.5 py-1 rounded-full flex-shrink-0">
                    {meeting.platform === "zoom"
                      ? "Zoom"
                      : meeting.platform === "google_meet"
                        ? "Meet"
                        : meeting.platform === "teams"
                          ? "Teams"
                          : "Other"}
                  </span>
                </div>
              </div>
            ))}

            {scheduledMeetings.length === 0 && (
              <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm text-center">
                <Calendar className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-text-secondary">
                  No upcoming meetings
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Folders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-text-muted" />
              Folders
            </h2>
            <button className="text-sm text-brand-500 hover:text-brand-600 font-medium flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" />
              New Folder
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockFolders.map((folder) => (
              <Link
                key={folder.id}
                href="/meetings"
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all group cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${folder.color}/10 flex items-center justify-center mb-3`}
                >
                  <FolderOpen
                    className={`w-5 h-5 ${folder.color.replace("bg-", "text-")}`}
                  />
                </div>
                <h3 className="text-sm font-semibold text-text-primary group-hover:text-brand-500 transition-colors truncate">
                  {folder.name}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  {folder.count} meetings
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Two-column: Recent Clips + AI Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clips */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <Film className="w-5 h-5 text-text-muted" />
              Recent Clips
            </h2>
            <Link
              href="/meetings"
              className="text-sm text-brand-500 hover:text-brand-600 font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockClips.map((clip) => (
              <div
                key={clip.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all group cursor-pointer overflow-hidden flex"
              >
                {/* Clip thumbnail */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 w-28 flex-shrink-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                    <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                  </div>
                  <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                    {clip.duration}
                  </span>
                </div>
                <div className="p-3 flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary truncate group-hover:text-brand-500 transition-colors">
                    {clip.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5 truncate">
                    {clip.meetingTitle}
                  </p>
                  <p className="text-[10px] text-text-muted mt-1.5">
                    {clip.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Reports Widget */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-text-muted" />
              AI Reports
            </h2>
            <button className="text-sm text-brand-500 hover:text-brand-600 font-medium flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" />
              New Report
            </button>
          </div>
          <div className="space-y-3">
            {mockReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-brand-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-text-primary truncate group-hover:text-brand-500 transition-colors">
                        {report.title}
                      </h3>
                      {report.type === "recurring" && (
                        <span className="text-[10px] text-brand-500 bg-brand-50 px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
                          Recurring
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">
                      {report.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[11px] text-text-muted flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {report.meetingCount} meetings
                      </span>
                      <span className="text-[11px] text-text-muted">
                        {report.generatedAt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
