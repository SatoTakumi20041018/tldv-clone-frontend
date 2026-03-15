"use client";

import { mockInsightStats } from "@/lib/mockData";
import StatsCard from "@/components/StatsCard";
import {
  Video,
  Clock,
  CheckSquare,
  AlertCircle,
  TrendingUp,
  BarChart3,
  PieChart,
  Hash,
} from "lucide-react";

export default function InsightsPage() {
  const stats = mockInsightStats;

  const maxMeetingsPerWeek = Math.max(...stats.meetingsPerWeek.map((w) => w.count));
  const maxHoursPerWeek = Math.max(...stats.hoursPerWeek.map((w) => w.hours));
  const maxTopicCount = Math.max(...stats.topTopics.map((t) => t.count));

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Insights</h1>
        <p className="text-text-secondary text-sm mt-1">
          Analytics and trends across all your meetings.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Meetings"
          value={stats.totalMeetings}
          icon={Video}
          color="brand"
          trend={{ value: 15, label: "vs last month" }}
        />
        <StatsCard
          title="Total Hours"
          value={`${stats.totalHours}h`}
          icon={Clock}
          color="blue"
          trend={{ value: 8, label: "vs last month" }}
        />
        <StatsCard
          title="Items Completed"
          value={stats.actionItemsCompleted}
          icon={CheckSquare}
          color="green"
          subtitle={`${stats.actionItemsPending} pending`}
        />
        <StatsCard
          title="Avg Duration"
          value={`${stats.avgDuration}m`}
          icon={TrendingUp}
          color="orange"
          trend={{ value: -5, label: "vs last month" }}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meetings per week - bar chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-brand-500" />
            <h2 className="font-semibold text-text-primary">
              Meetings Per Week
            </h2>
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {stats.meetingsPerWeek.map((week) => (
              <div
                key={week.week}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <span className="text-xs font-semibold text-text-primary">
                  {week.count}
                </span>
                <div className="w-full relative bg-gray-100 rounded-t-lg overflow-hidden" style={{ height: '160px' }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-brand-500 to-brand-400 rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${(week.count / maxMeetingsPerWeek) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-text-muted whitespace-nowrap">
                  {week.week}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hours per week - bar chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-blue-500" />
            <h2 className="font-semibold text-text-primary">
              Hours Per Week
            </h2>
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {stats.hoursPerWeek.map((week) => (
              <div
                key={week.week}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <span className="text-xs font-semibold text-text-primary">
                  {week.hours}h
                </span>
                <div className="w-full relative bg-gray-100 rounded-t-lg overflow-hidden" style={{ height: '160px' }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${(week.hours / maxHoursPerWeek) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-text-muted whitespace-nowrap">
                  {week.week}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending topics */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Hash className="w-5 h-5 text-emerald-500" />
            <h2 className="font-semibold text-text-primary">
              Trending Topics
            </h2>
          </div>
          <div className="space-y-4">
            {stats.topTopics.map((topic, idx) => (
              <div key={topic.topic}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-semibold">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {topic.topic}
                    </span>
                  </div>
                  <span className="text-xs text-text-muted">
                    {topic.count} mentions
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 ml-7">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(topic.count / maxTopicCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Talk time ratios */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-violet-500" />
            <h2 className="font-semibold text-text-primary">
              Talk Time Distribution
            </h2>
          </div>

          {/* Visual pie-like representation */}
          <div className="flex items-center gap-8">
            <div className="relative w-40 h-40 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {(() => {
                  const colors = [
                    "#5E5ADB",
                    "#10b981",
                    "#f59e0b",
                    "#3b82f6",
                    "#9ca3af",
                  ];
                  let cumulative = 0;
                  return stats.talkTimeRatios.map((speaker, idx) => {
                    const dashArray = `${speaker.percentage * 2.83} ${283 - speaker.percentage * 2.83}`;
                    const dashOffset = -(cumulative * 2.83);
                    cumulative += speaker.percentage;
                    return (
                      <circle
                        key={speaker.speaker}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={colors[idx % colors.length]}
                        strokeWidth="10"
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        className="transition-all duration-500"
                      />
                    );
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-bold text-text-primary">
                    {stats.talkTimeRatios.length}
                  </p>
                  <p className="text-[10px] text-text-muted">speakers</p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              {stats.talkTimeRatios.map((speaker, idx) => {
                const colors = [
                  "bg-brand-500",
                  "bg-emerald-500",
                  "bg-yellow-500",
                  "bg-blue-500",
                  "bg-gray-400",
                ];
                return (
                  <div
                    key={speaker.speaker}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-primary truncate">
                          {speaker.speaker}
                        </span>
                        <span className="text-sm font-semibold text-text-primary ml-2">
                          {speaker.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Action items tracker */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-500" />
            <h2 className="font-semibold text-text-primary">
              Action Items Tracker
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-text-secondary">
                Completed ({stats.actionItemsCompleted})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-xs text-text-secondary">
                Pending ({stats.actionItemsPending})
              </span>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
          <div className="flex h-full">
            <div
              className="bg-emerald-500 h-full flex items-center justify-center text-white text-xs font-semibold transition-all duration-500"
              style={{
                width: `${(stats.actionItemsCompleted / (stats.actionItemsCompleted + stats.actionItemsPending)) * 100}%`,
              }}
            >
              {Math.round(
                (stats.actionItemsCompleted /
                  (stats.actionItemsCompleted + stats.actionItemsPending)) *
                  100
              )}
              %
            </div>
            <div
              className="bg-yellow-500 h-full flex items-center justify-center text-white text-xs font-semibold transition-all duration-500"
              style={{
                width: `${(stats.actionItemsPending / (stats.actionItemsCompleted + stats.actionItemsPending)) * 100}%`,
              }}
            >
              {Math.round(
                (stats.actionItemsPending /
                  (stats.actionItemsCompleted + stats.actionItemsPending)) *
                  100
              )}
              %
            </div>
          </div>
        </div>
        <p className="text-xs text-text-muted mt-2">
          {stats.actionItemsCompleted} of{" "}
          {stats.actionItemsCompleted + stats.actionItemsPending} action items
          completed across all meetings
        </p>
      </div>
    </div>
  );
}
