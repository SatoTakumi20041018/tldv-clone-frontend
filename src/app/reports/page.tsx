"use client";

import { useState } from "react";
import StatsCard from "@/components/StatsCard";
import {
  BarChart3,
  FileText,
  Plus,
  Calendar,
  Video,
  TrendingUp,
  ChevronRight,
  Sparkles,
  ShoppingCart,
  MessageSquare,
  Users,
  Zap,
  Clock,
  ArrowUpRight,
  Filter,
} from "lucide-react";

// --- Mock Data ---

const reportTypes = [
  {
    id: "sales",
    label: "Sales Performance",
    icon: ShoppingCart,
    description: "Win rates, objection patterns, and deal progression across calls",
    color: "from-brand-500 to-indigo-600",
  },
  {
    id: "product",
    label: "Product Feedback",
    icon: MessageSquare,
    description: "Feature requests, pain points, and sentiment from customer meetings",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "customer",
    label: "Customer Insights",
    icon: Users,
    description: "Customer needs, competitive mentions, and satisfaction trends",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "productivity",
    label: "Team Productivity",
    icon: Zap,
    description: "Meeting efficiency, action item completion, and time allocation",
    color: "from-orange-500 to-amber-600",
  },
];

interface Report {
  id: string;
  title: string;
  type: "sales" | "product" | "customer" | "productivity";
  dateRange: string;
  meetingsAnalyzed: number;
  generatedAt: string;
  status: "completed" | "generating";
  keyFindings: string[];
}

const mockReports: Report[] = [
  {
    id: "r1",
    title: "Q1 Sales Performance Overview",
    type: "sales",
    dateRange: "Jan 1 - Mar 15, 2026",
    meetingsAnalyzed: 34,
    generatedAt: "2026-03-15T08:00:00Z",
    status: "completed",
    keyFindings: [
      "Win rate improved 12% compared to Q4",
      'Top objection: "Budget constraints" mentioned in 67% of lost deals',
      "Average deal cycle shortened by 5 days",
    ],
  },
  {
    id: "r2",
    title: "February Product Feedback Digest",
    type: "product",
    dateRange: "Feb 1 - Feb 28, 2026",
    meetingsAnalyzed: 18,
    generatedAt: "2026-03-01T10:00:00Z",
    status: "completed",
    keyFindings: [
      "Search functionality is the #1 requested feature (mentioned in 14 meetings)",
      "Mobile experience complaints increased 20% month-over-month",
      "Positive sentiment around new dashboard widgets",
    ],
  },
  {
    id: "r3",
    title: "Customer Insights - Enterprise Segment",
    type: "customer",
    dateRange: "Feb 15 - Mar 14, 2026",
    meetingsAnalyzed: 22,
    generatedAt: "2026-03-14T14:00:00Z",
    status: "completed",
    keyFindings: [
      "3 enterprise prospects mentioned competitor X as alternative",
      "Data security and SSO are top procurement requirements",
      "Average NPS score from meeting sentiment: 8.2/10",
    ],
  },
  {
    id: "r4",
    title: "Weekly Team Productivity Report",
    type: "productivity",
    dateRange: "Mar 10 - Mar 14, 2026",
    meetingsAnalyzed: 12,
    generatedAt: "2026-03-14T18:00:00Z",
    status: "completed",
    keyFindings: [
      "38% of meeting time was spent on status updates (could be async)",
      "Action item completion rate: 76%",
      "Average meeting length decreased 8 min vs. previous week",
    ],
  },
  {
    id: "r5",
    title: "March Sales Pipeline Analysis",
    type: "sales",
    dateRange: "Mar 1 - Mar 15, 2026",
    meetingsAnalyzed: 15,
    generatedAt: "2026-03-15T09:30:00Z",
    status: "generating",
    keyFindings: [],
  },
];

const typeConfig: Record<string, { label: string; bg: string; text: string; icon: typeof FileText }> = {
  sales: { label: "Sales Performance", bg: "bg-brand-50", text: "text-brand-600", icon: ShoppingCart },
  product: { label: "Product Feedback", bg: "bg-emerald-50", text: "text-emerald-600", icon: MessageSquare },
  customer: { label: "Customer Insights", bg: "bg-blue-50", text: "text-blue-600", icon: Users },
  productivity: { label: "Team Productivity", bg: "bg-orange-50", text: "text-orange-600", icon: Zap },
};

// --- Component ---

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showNewReportModal, setShowNewReportModal] = useState(false);

  const filteredReports = selectedType
    ? mockReports.filter((r) => r.type === selectedType)
    : mockReports;

  const completedReports = mockReports.filter((r) => r.status === "completed").length;
  const totalMeetingsAnalyzed = mockReports
    .filter((r) => r.status === "completed")
    .reduce((sum, r) => sum + r.meetingsAnalyzed, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">AI Reports</h1>
          <p className="text-text-secondary text-sm mt-1">
            Generate cross-meeting insights powered by AI.
          </p>
        </div>
        <button
          onClick={() => setShowNewReportModal(!showNewReportModal)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-500 text-white rounded-xl font-medium text-sm hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20"
        >
          <Plus className="w-4 h-4" />
          Generate New Report
        </button>
      </div>

      {/* New Report Type Selector (toggled) */}
      {showNewReportModal && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-in">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-brand-500" />
            <h2 className="font-semibold text-text-primary">Choose Report Type</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTypes.map((rt) => {
              const Icon = rt.icon;
              return (
                <button
                  key={rt.id}
                  onClick={() => setShowNewReportModal(false)}
                  className="group text-left p-4 rounded-xl border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${rt.color} flex items-center justify-center mb-3`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-medium text-sm text-text-primary group-hover:text-brand-600 transition-colors">
                    {rt.label}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    {rt.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Reports"
          value={mockReports.length}
          icon={FileText}
          color="brand"
          trend={{ value: 25, label: "vs last month" }}
        />
        <StatsCard
          title="Meetings Analyzed"
          value={totalMeetingsAnalyzed}
          icon={Video}
          color="blue"
          trend={{ value: 18, label: "vs last month" }}
        />
        <StatsCard
          title="Completed"
          value={completedReports}
          icon={BarChart3}
          color="green"
          subtitle={`${mockReports.length - completedReports} in progress`}
        />
        <StatsCard
          title="Avg. Meetings/Report"
          value={Math.round(totalMeetingsAnalyzed / (completedReports || 1))}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-text-secondary">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
        <button
          onClick={() => setSelectedType(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            selectedType === null
              ? "bg-brand-500 text-white shadow-sm"
              : "bg-gray-100 text-text-secondary hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {reportTypes.map((rt) => (
          <button
            key={rt.id}
            onClick={() => setSelectedType(selectedType === rt.id ? null : rt.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedType === rt.id
                ? "bg-brand-500 text-white shadow-sm"
                : "bg-gray-100 text-text-secondary hover:bg-gray-200"
            }`}
          >
            {rt.label}
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => {
          const config = typeConfig[report.type];
          const TypeIcon = config.icon;
          const isGenerating = report.status === "generating";

          return (
            <div
              key={report.id}
              className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 ${
                isGenerating ? "opacity-75" : ""
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Left content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
                    >
                      <TypeIcon className="w-3 h-3" />
                      {config.label}
                    </span>
                    {isGenerating && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                        Generating...
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-text-primary text-lg mb-1">
                    {report.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {report.dateRange}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Video className="w-3.5 h-3.5" />
                      {report.meetingsAnalyzed} meetings
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(report.generatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Key Findings */}
                  {report.keyFindings.length > 0 && (
                    <div className="space-y-1.5">
                      {report.keyFindings.map((finding, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-text-secondary"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-brand-400 mt-0.5 flex-shrink-0" />
                          <span>{finding}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right action */}
                {!isGenerating && (
                  <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors flex-shrink-0">
                    View Full Report
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state if filtered to 0 */}
      {filteredReports.length === 0 && (
        <div className="text-center py-16">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-text-primary mb-1">No reports found</h3>
          <p className="text-sm text-text-muted">
            No reports match the selected filter. Try a different category.
          </p>
        </div>
      )}
    </div>
  );
}
