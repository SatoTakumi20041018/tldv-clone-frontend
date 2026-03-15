"use client";

import { useState } from "react";
import StatsCard from "@/components/StatsCard";
import {
  GraduationCap,
  Mic,
  HelpCircle,
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  Play,
  Clock,
  Calendar,
  ChevronDown,
  User,
  Target,
  MessageCircle,
  BarChart3,
} from "lucide-react";

// --- Mock Data ---

interface SalesRep {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  metrics: {
    talkListenRatio: number; // percentage of talk time
    questionFrequency: number; // questions per meeting
    fillerWordRate: number; // filler words per minute
    objectionHandling: number; // score 0-100
    overallScore: number;
  };
  trend: "up" | "down" | "stable";
  meetingsThisPeriod: number;
}

interface CoachingMoment {
  id: string;
  repName: string;
  meetingTitle: string;
  timestamp: string;
  type: "positive" | "improvement" | "critical";
  category: "objection" | "question" | "filler" | "talk_ratio" | "closing";
  description: string;
  tip: string;
  date: string;
}

interface WeeklyTrend {
  week: string;
  talkRatio: number;
  questionFreq: number;
  fillerRate: number;
  objectionScore: number;
}

const mockReps: SalesRep[] = [
  {
    id: "rep1",
    name: "Sarah Chen",
    role: "Senior AE",
    metrics: {
      talkListenRatio: 42,
      questionFrequency: 8.2,
      fillerWordRate: 1.4,
      objectionHandling: 85,
      overallScore: 88,
    },
    trend: "up",
    meetingsThisPeriod: 14,
  },
  {
    id: "rep2",
    name: "Mike Johnson",
    role: "Account Executive",
    metrics: {
      talkListenRatio: 58,
      questionFrequency: 5.1,
      fillerWordRate: 3.2,
      objectionHandling: 62,
      overallScore: 64,
    },
    trend: "down",
    meetingsThisPeriod: 11,
  },
  {
    id: "rep3",
    name: "Emily Davis",
    role: "SDR",
    metrics: {
      talkListenRatio: 48,
      questionFrequency: 7.5,
      fillerWordRate: 2.1,
      objectionHandling: 74,
      overallScore: 76,
    },
    trend: "up",
    meetingsThisPeriod: 18,
  },
  {
    id: "rep4",
    name: "Alex Rivera",
    role: "Account Executive",
    metrics: {
      talkListenRatio: 52,
      questionFrequency: 6.3,
      fillerWordRate: 2.8,
      objectionHandling: 71,
      overallScore: 70,
    },
    trend: "stable",
    meetingsThisPeriod: 9,
  },
];

const mockCoachingMoments: CoachingMoment[] = [
  {
    id: "cm1",
    repName: "Mike Johnson",
    meetingTitle: "Discovery Call - Acme Corp",
    timestamp: "12:34",
    type: "critical",
    category: "talk_ratio",
    description:
      "Mike spoke for 4 minutes straight without pausing for prospect input. The prospect disengaged and gave short responses afterward.",
    tip: "Use the 30-second rule: after speaking for 30 seconds, ask a question to re-engage the prospect.",
    date: "2026-03-14",
  },
  {
    id: "cm2",
    repName: "Sarah Chen",
    meetingTitle: "Negotiation - TechStart Inc",
    timestamp: "23:15",
    type: "positive",
    category: "objection",
    description:
      'Handled the "too expensive" objection by reframing value around ROI, using specific customer success data points.',
    tip: "Great technique! Consider documenting this approach for the team playbook.",
    date: "2026-03-14",
  },
  {
    id: "cm3",
    repName: "Emily Davis",
    meetingTitle: "Cold Outreach - DataFlow",
    timestamp: "05:20",
    type: "improvement",
    category: "question",
    description:
      "Asked 3 closed-ended questions in a row. Open-ended questions would have uncovered deeper pain points.",
    tip: 'Replace "Do you have this problem?" with "Tell me about your experience with..."',
    date: "2026-03-13",
  },
  {
    id: "cm4",
    repName: "Alex Rivera",
    meetingTitle: "Demo - CloudNine Solutions",
    timestamp: "18:42",
    type: "improvement",
    category: "filler",
    description:
      'Used "um" and "basically" 12 times during the product demo section, reducing perceived confidence.',
    tip: "Practice pausing instead of filling silence. A brief pause sounds more confident than filler words.",
    date: "2026-03-13",
  },
  {
    id: "cm5",
    repName: "Sarah Chen",
    meetingTitle: "Follow-up - Enterprise Deal",
    timestamp: "31:08",
    type: "positive",
    category: "closing",
    description:
      "Confidently asked for next steps and secured a follow-up meeting with the decision maker within the same call.",
    tip: "Excellent closing technique. The direct ask led to a concrete next step.",
    date: "2026-03-12",
  },
  {
    id: "cm6",
    repName: "Mike Johnson",
    meetingTitle: "Quarterly Review - BigRetail",
    timestamp: "08:55",
    type: "critical",
    category: "objection",
    description:
      'When the prospect raised concerns about implementation time, Mike dismissed it with "it\'s not that bad" instead of addressing the concern.',
    tip: "Acknowledge the concern first, then provide evidence: \"I understand that concern. Our typical implementation takes X weeks, and here's how we support you...\"",
    date: "2026-03-12",
  },
];

const mockWeeklyTrends: WeeklyTrend[] = [
  { week: "Feb 17", talkRatio: 54, questionFreq: 5.8, fillerRate: 2.9, objectionScore: 68 },
  { week: "Feb 24", talkRatio: 52, questionFreq: 6.2, fillerRate: 2.6, objectionScore: 70 },
  { week: "Mar 3", talkRatio: 50, questionFreq: 6.8, fillerRate: 2.3, objectionScore: 73 },
  { week: "Mar 10", talkRatio: 49, questionFreq: 7.0, fillerRate: 2.2, objectionScore: 75 },
];

// --- Helper ---

function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-600";
  if (score >= 65) return "text-yellow-600";
  return "text-red-500";
}

function getScoreBg(score: number): string {
  if (score >= 80) return "bg-emerald-50";
  if (score >= 65) return "bg-yellow-50";
  return "bg-red-50";
}

function getTalkRatioColor(ratio: number): string {
  // Ideal is 40-50% talk
  if (ratio >= 40 && ratio <= 50) return "text-emerald-600";
  if (ratio >= 35 && ratio <= 55) return "text-yellow-600";
  return "text-red-500";
}

const momentTypeConfig = {
  positive: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", label: "Great Example" },
  improvement: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", label: "Opportunity" },
  critical: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", label: "Needs Attention" },
};

const categoryIcons: Record<string, typeof Mic> = {
  objection: Shield,
  question: HelpCircle,
  filler: MessageCircle,
  talk_ratio: Mic,
  closing: Target,
};

// --- Component ---

export default function CoachingPage() {
  const [selectedRep, setSelectedRep] = useState<string | null>(null);

  const filteredMoments = selectedRep
    ? mockCoachingMoments.filter((m) => m.repName === mockReps.find((r) => r.id === selectedRep)?.name)
    : mockCoachingMoments;

  // Team averages
  const teamAvg = {
    talkRatio: Math.round(mockReps.reduce((s, r) => s + r.metrics.talkListenRatio, 0) / mockReps.length),
    questions: +(mockReps.reduce((s, r) => s + r.metrics.questionFrequency, 0) / mockReps.length).toFixed(1),
    fillerRate: +(mockReps.reduce((s, r) => s + r.metrics.fillerWordRate, 0) / mockReps.length).toFixed(1),
    objectionScore: Math.round(mockReps.reduce((s, r) => s + r.metrics.objectionHandling, 0) / mockReps.length),
  };

  const maxTrendTalkRatio = Math.max(...mockWeeklyTrends.map((t) => t.talkRatio));
  const maxTrendObjScore = Math.max(...mockWeeklyTrends.map((t) => t.objectionScore));

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">AI Coaching Hub</h1>
        <p className="text-text-secondary text-sm mt-1">
          AI-powered performance insights and coaching moments for your sales team.
        </p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Avg. Talk Ratio"
          value={`${teamAvg.talkRatio}%`}
          icon={Mic}
          color="brand"
          subtitle="Ideal: 40-50%"
        />
        <StatsCard
          title="Avg. Questions/Meeting"
          value={teamAvg.questions}
          icon={HelpCircle}
          color="blue"
          trend={{ value: 12, label: "vs last month" }}
        />
        <StatsCard
          title="Avg. Filler Words/Min"
          value={teamAvg.fillerRate}
          icon={AlertTriangle}
          color="orange"
          trend={{ value: -8, label: "vs last month" }}
        />
        <StatsCard
          title="Avg. Objection Score"
          value={`${teamAvg.objectionScore}/100`}
          icon={Shield}
          color="green"
          trend={{ value: 5, label: "vs last month" }}
        />
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Talk Ratio Trend */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Mic className="w-5 h-5 text-brand-500" />
            <h2 className="font-semibold text-text-primary">Talk Ratio Trend</h2>
            <span className="text-xs text-text-muted ml-auto">Team average</span>
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {mockWeeklyTrends.map((week) => (
              <div key={week.week} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-text-primary">
                  {week.talkRatio}%
                </span>
                <div
                  className="w-full relative bg-gray-100 rounded-t-lg overflow-hidden"
                  style={{ height: "160px" }}
                >
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-brand-500 to-brand-400 rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${(week.talkRatio / maxTrendTalkRatio) * 100}%`,
                    }}
                  />
                  {/* Ideal zone indicator */}
                  <div
                    className="absolute w-full border-t-2 border-dashed border-emerald-400"
                    style={{ bottom: `${(45 / maxTrendTalkRatio) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-text-muted whitespace-nowrap">
                  {week.week}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 justify-center">
            <div className="w-6 border-t-2 border-dashed border-emerald-400" />
            <span className="text-[10px] text-text-muted">Ideal zone (45%)</span>
          </div>
        </div>

        {/* Objection Handling Trend */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h2 className="font-semibold text-text-primary">Objection Handling Trend</h2>
            <span className="text-xs text-text-muted ml-auto">Team average</span>
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {mockWeeklyTrends.map((week) => (
              <div key={week.week} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-text-primary">
                  {week.objectionScore}
                </span>
                <div
                  className="w-full relative bg-gray-100 rounded-t-lg overflow-hidden"
                  style={{ height: "160px" }}
                >
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${(week.objectionScore / maxTrendObjScore) * 100}%`,
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

      {/* Sales Rep Performance Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 p-6 pb-4">
          <BarChart3 className="w-5 h-5 text-brand-500" />
          <h2 className="font-semibold text-text-primary">Rep Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-gray-100">
                <th className="text-left text-xs font-semibold text-text-muted px-6 py-3 uppercase tracking-wider">
                  Rep
                </th>
                <th className="text-center text-xs font-semibold text-text-muted px-4 py-3 uppercase tracking-wider">
                  Talk Ratio
                </th>
                <th className="text-center text-xs font-semibold text-text-muted px-4 py-3 uppercase tracking-wider">
                  Questions/Mtg
                </th>
                <th className="text-center text-xs font-semibold text-text-muted px-4 py-3 uppercase tracking-wider">
                  Filler Words/Min
                </th>
                <th className="text-center text-xs font-semibold text-text-muted px-4 py-3 uppercase tracking-wider">
                  Objection Score
                </th>
                <th className="text-center text-xs font-semibold text-text-muted px-4 py-3 uppercase tracking-wider">
                  Overall
                </th>
                <th className="text-center text-xs font-semibold text-text-muted px-4 py-3 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {mockReps.map((rep) => (
                <tr
                  key={rep.id}
                  onClick={() => setSelectedRep(selectedRep === rep.id ? null : rep.id)}
                  className={`border-t border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors ${
                    selectedRep === rep.id ? "bg-brand-50/30" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-brand-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{rep.name}</p>
                        <p className="text-xs text-text-muted">{rep.role} &middot; {rep.meetingsThisPeriod} meetings</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-sm font-semibold ${getTalkRatioColor(rep.metrics.talkListenRatio)}`}>
                      {rep.metrics.talkListenRatio}%
                    </span>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1 max-w-[80px] mx-auto">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          rep.metrics.talkListenRatio >= 40 && rep.metrics.talkListenRatio <= 50
                            ? "bg-emerald-500"
                            : rep.metrics.talkListenRatio >= 35 && rep.metrics.talkListenRatio <= 55
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${rep.metrics.talkListenRatio}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-sm font-semibold ${rep.metrics.questionFrequency >= 7 ? "text-emerald-600" : rep.metrics.questionFrequency >= 5 ? "text-yellow-600" : "text-red-500"}`}>
                      {rep.metrics.questionFrequency}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-sm font-semibold ${rep.metrics.fillerWordRate <= 1.5 ? "text-emerald-600" : rep.metrics.fillerWordRate <= 2.5 ? "text-yellow-600" : "text-red-500"}`}>
                      {rep.metrics.fillerWordRate}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${getScoreBg(rep.metrics.objectionHandling)} ${getScoreColor(rep.metrics.objectionHandling)}`}>
                      {rep.metrics.objectionHandling}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${getScoreBg(rep.metrics.overallScore)} ${getScoreColor(rep.metrics.overallScore)}`}>
                      {rep.metrics.overallScore}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {rep.trend === "up" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                        <TrendingUp className="w-3.5 h-3.5" /> Improving
                      </span>
                    )}
                    {rep.trend === "down" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-500">
                        <TrendingDown className="w-3.5 h-3.5" /> Declining
                      </span>
                    )}
                    {rep.trend === "stable" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-text-muted">
                        &mdash; Stable
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coaching Moments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-500" />
            <h2 className="font-semibold text-text-primary text-lg">Coaching Moments</h2>
          </div>
          {selectedRep && (
            <button
              onClick={() => setSelectedRep(null)}
              className="text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
              Show all reps
            </button>
          )}
        </div>
        <p className="text-sm text-text-muted mb-4">
          AI-identified clips that present learning opportunities.
          {selectedRep && (
            <span className="text-brand-600 font-medium">
              {" "}Filtered to: {mockReps.find((r) => r.id === selectedRep)?.name}
            </span>
          )}
        </p>

        <div className="space-y-4">
          {filteredMoments.map((moment) => {
            const config = momentTypeConfig[moment.type];
            const CategoryIcon = categoryIcons[moment.category] || MessageCircle;

            return (
              <div
                key={moment.id}
                className={`rounded-xl border ${config.border} ${config.bg} p-5 transition-all hover:shadow-sm`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${config.text} bg-white/60`}>
                        <CategoryIcon className="w-3 h-3" />
                        {config.label}
                      </span>
                      <span className="text-xs text-text-muted">
                        {moment.repName}
                      </span>
                      <span className="text-xs text-text-muted">&middot;</span>
                      <span className="text-xs text-text-muted">
                        {moment.meetingTitle}
                      </span>
                    </div>

                    <p className="text-sm text-text-primary leading-relaxed mb-2">
                      {moment.description}
                    </p>

                    <div className="flex items-start gap-2 bg-white/50 rounded-lg p-3">
                      <GraduationCap className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-text-secondary leading-relaxed">
                        <span className="font-semibold text-brand-600">AI Tip:</span>{" "}
                        {moment.tip}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center gap-2 flex-shrink-0">
                    <button className="inline-flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg text-sm font-medium text-text-secondary hover:text-brand-600 hover:bg-brand-50 transition-colors border border-gray-200">
                      <Play className="w-3.5 h-3.5" />
                      <span>{moment.timestamp}</span>
                    </button>
                    <span className="text-[10px] text-text-muted">
                      {new Date(moment.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredMoments.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-text-primary mb-1">No coaching moments</h3>
            <p className="text-sm text-text-muted">
              No coaching moments found for this rep. Try selecting a different team member.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
