"use client";

import {
  Video,
  Clock,
  CheckSquare,
  AlertCircle,
  Calendar,
  ArrowRight,
  Plus,
  TrendingUp,
} from "lucide-react";
import StatsCard from "@/components/StatsCard";
import MeetingCard from "@/components/MeetingCard";
import { mockMeetings, mockUser } from "@/lib/mockData";

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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Welcome back, {mockUser.name.split(" ")[0]}
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Here&apos;s what&apos;s happening with your meetings today.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-medium hover:bg-brand-600 transition-colors shadow-sm shadow-brand-500/25 w-fit">
          <Plus className="w-4 h-4" />
          Import Meeting
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Meetings"
          value={completedMeetings.length}
          icon={Video}
          color="brand"
          trend={{ value: 12, label: "vs last month" }}
          subtitle="This month"
        />
        <StatsCard
          title="Hours Recorded"
          value={`${totalHours.toFixed(1)}h`}
          icon={Clock}
          color="blue"
          trend={{ value: 8, label: "vs last month" }}
          subtitle="Total recording time"
        />
        <StatsCard
          title="Action Items"
          value={23}
          icon={CheckSquare}
          color="green"
          subtitle="5 completed this week"
          trend={{ value: -3, label: "vs last week" }}
        />
        <StatsCard
          title="Pending Follow-ups"
          value={7}
          icon={AlertCircle}
          color="orange"
          subtitle="3 due today"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent meetings */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Recent Meetings
            </h2>
            <a
              href="/meetings"
              className="text-sm text-brand-500 hover:text-brand-600 font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="space-y-3">
            {recentMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                variant="list"
              />
            ))}
          </div>
        </div>

        {/* Upcoming meetings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Upcoming
            </h2>
            <Calendar className="w-4 h-4 text-text-muted" />
          </div>
          <div className="space-y-3">
            {scheduledMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
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
                    <div className="flex items-center gap-1 mt-2">
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
                      {meeting.participants.length > 3 && (
                        <span className="text-[10px] text-text-muted ml-1">
                          +{meeting.participants.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
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

          {/* Quick insights */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">
                Quick Insights
              </h2>
              <TrendingUp className="w-4 h-4 text-text-muted" />
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-secondary">
                    Meetings this week
                  </span>
                  <span className="font-semibold text-text-primary">7</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-brand-500 h-1.5 rounded-full"
                    style={{ width: "70%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-secondary">Talk time ratio</span>
                  <span className="font-semibold text-text-primary">32%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full"
                    style={{ width: "32%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-secondary">
                    Action items completed
                  </span>
                  <span className="font-semibold text-text-primary">
                    76%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-yellow-500 h-1.5 rounded-full"
                    style={{ width: "76%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
