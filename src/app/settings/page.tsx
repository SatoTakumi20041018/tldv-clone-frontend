"use client";

import { useState } from "react";
import {
  User,
  Key,
  Webhook,
  Users,
  Bell,
  Mic,
  Copy,
  Check,
  Plus,
  Trash2,
  Shield,
  Globe,
  Eye,
  EyeOff,
} from "lucide-react";
import { mockUser, mockWebhooks, mockApiKeys } from "@/lib/mockData";

type SettingsTab =
  | "profile"
  | "api_keys"
  | "webhooks"
  | "team"
  | "notifications"
  | "recording";

const settingsTabs: { id: SettingsTab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "api_keys", label: "API Keys", icon: Key },
  { id: "webhooks", label: "Webhooks", icon: Webhook },
  { id: "team", label: "Team", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "recording", label: "Recording", icon: Mic },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary text-sm mt-1">
          Manage your account preferences and configurations.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar nav */}
        <nav className="md:w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2 space-y-1">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-brand-50 text-brand-600"
                      : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "api_keys" && <ApiKeysSettings />}
          {activeTab === "webhooks" && <WebhooksSettings />}
          {activeTab === "team" && <TeamSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "recording" && <RecordingSettings />}
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">Profile</h2>
        <p className="text-sm text-text-secondary mt-1">
          Update your personal information.
        </p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center">
          <span className="text-white text-xl font-semibold">{initials}</span>
        </div>
        <div>
          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-text-secondary hover:border-gray-300 transition-colors">
            Change photo
          </button>
          <p className="text-xs text-text-muted mt-1">
            JPG, PNG or GIF. Max 2MB.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Full name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          Timezone
        </label>
        <select className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white">
          <option>Asia/Tokyo (UTC+9)</option>
          <option>America/New_York (UTC-5)</option>
          <option>America/Los_Angeles (UTC-8)</option>
          <option>Europe/London (UTC+0)</option>
        </select>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-medium hover:bg-brand-600 transition-colors shadow-sm">
          Save Changes
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-text-secondary hover:border-gray-300 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

function ApiKeysSettings() {
  const [keys] = useState(mockApiKeys);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  const handleCopy = (id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              API Keys
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Manage API keys for programmatic access.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors">
            <Plus className="w-4 h-4" />
            Generate Key
          </button>
        </div>

        <div className="space-y-3">
          {keys.map((key) => (
            <div
              key={key.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-text-muted" />
                  <span className="text-sm font-medium text-text-primary">
                    {key.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <code className="text-xs text-text-secondary font-mono bg-white px-2 py-0.5 rounded border border-gray-200">
                    {showKey[key.id]
                      ? "tldv_prod_sk_abc123def456gh789ij012kl345mn678"
                      : key.key}
                  </code>
                  <button
                    onClick={() =>
                      setShowKey((prev) => ({
                        ...prev,
                        [key.id]: !prev[key.id],
                      }))
                    }
                    className="text-text-muted hover:text-text-primary"
                  >
                    {showKey[key.id] ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-text-muted mt-1">
                  Created{" "}
                  {new Date(key.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {key.lastUsed &&
                    ` | Last used ${new Date(key.lastUsed).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleCopy(key.id, key.key)}
                  className="p-2 rounded-lg hover:bg-white text-text-muted hover:text-text-primary transition-colors"
                >
                  {copiedId === key.id ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button className="p-2 rounded-lg hover:bg-red-50 text-text-muted hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WebhooksSettings() {
  const [webhooks] = useState(mockWebhooks);
  const [showForm, setShowForm] = useState(false);
  const [newUrl, setNewUrl] = useState("");

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Webhooks
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Configure webhook endpoints for real-time event notifications.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Webhook
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Endpoint URL
                </label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://api.example.com/webhooks"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Events
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "meeting.completed",
                    "meeting.transcript_ready",
                    "meeting.summary_ready",
                    "meeting.started",
                  ].map((event) => (
                    <label
                      key={event}
                      className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 cursor-pointer hover:border-brand-300 transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5 rounded text-brand-500 focus:ring-brand-500"
                      />
                      <span className="text-xs text-text-secondary">
                        {event}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors">
                  Create Webhook
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {webhooks.map((webhook) => (
            <div
              key={webhook.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-text-muted" />
                  <code className="text-sm text-text-primary font-mono truncate">
                    {webhook.url}
                  </code>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${webhook.active ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"}`}
                  >
                    {webhook.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex flex-wrap gap-1">
                    {webhook.events.map((event) => (
                      <span
                        key={event}
                        className="bg-white px-2 py-0.5 rounded text-[10px] text-text-muted border border-gray-100"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
                {webhook.lastTriggered && (
                  <p className="text-xs text-text-muted mt-1">
                    Last triggered:{" "}
                    {new Date(webhook.lastTriggered).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                )}
              </div>
              <button className="p-2 rounded-lg hover:bg-red-50 text-text-muted hover:text-red-500 transition-colors ml-4">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamSettings() {
  const teamMembers = [
    {
      id: "1",
      name: "Takumi Sato",
      email: "takumi@example.com",
      role: "Owner",
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@example.com",
      role: "Admin",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Member",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Team Management
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Invite and manage team members.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors">
          <Plus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Invite form */}
      <div className="flex items-center gap-2">
        <input
          type="email"
          placeholder="Enter email address"
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300"
        />
        <select className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white">
          <option>Member</option>
          <option>Admin</option>
        </select>
        <button className="px-4 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-medium hover:bg-brand-600 transition-colors">
          Send Invite
        </button>
      </div>

      {/* Members list */}
      <div className="space-y-2">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-sm font-semibold">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {member.name}
                </p>
                <p className="text-xs text-text-muted">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  member.role === "Owner"
                    ? "bg-brand-50 text-brand-600"
                    : member.role === "Admin"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {member.role}
              </span>
              {member.role !== "Owner" && (
                <button className="text-text-muted hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationSettings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [meetingComplete, setMeetingComplete] = useState(true);
  const [transcriptReady, setTranscriptReady] = useState(true);
  const [summaryReady, setSummaryReady] = useState(true);
  const [actionItemReminder, setActionItemReminder] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">
          Notification Preferences
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          Choose how and when you want to be notified.
        </p>
      </div>

      <div className="space-y-4">
        <ToggleItem
          title="Email Notifications"
          description="Receive notifications via email"
          icon={Bell}
          enabled={emailNotifs}
          onToggle={() => setEmailNotifs(!emailNotifs)}
        />
        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm font-medium text-text-primary mb-3">
            Event Notifications
          </p>
          <div className="space-y-3 ml-2">
            <ToggleItem
              title="Meeting Completed"
              description="Notified when a meeting recording is processed"
              enabled={meetingComplete}
              onToggle={() => setMeetingComplete(!meetingComplete)}
            />
            <ToggleItem
              title="Transcript Ready"
              description="Notified when transcript generation is complete"
              enabled={transcriptReady}
              onToggle={() => setTranscriptReady(!transcriptReady)}
            />
            <ToggleItem
              title="Summary Ready"
              description="Notified when AI summary is available"
              enabled={summaryReady}
              onToggle={() => setSummaryReady(!summaryReady)}
            />
            <ToggleItem
              title="Action Item Reminders"
              description="Daily reminders for pending action items"
              enabled={actionItemReminder}
              onToggle={() => setActionItemReminder(!actionItemReminder)}
            />
            <ToggleItem
              title="Weekly Digest"
              description="Weekly summary of your meeting activity"
              enabled={weeklyDigest}
              onToggle={() => setWeeklyDigest(!weeklyDigest)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-medium hover:bg-brand-600 transition-colors shadow-sm">
          Save Preferences
        </button>
      </div>
    </div>
  );
}

function RecordingSettings() {
  const [autoRecord, setAutoRecord] = useState(true);
  const [autoTranscribe, setAutoTranscribe] = useState(true);
  const [autoSummarize, setAutoSummarize] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">
          Recording Preferences
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          Configure how your meetings are recorded and processed.
        </p>
      </div>

      <div className="space-y-4">
        <ToggleItem
          title="Auto-Record Meetings"
          description="Automatically start recording when a meeting begins"
          icon={Mic}
          enabled={autoRecord}
          onToggle={() => setAutoRecord(!autoRecord)}
        />
        <ToggleItem
          title="Auto-Transcribe"
          description="Automatically generate transcripts after recording"
          enabled={autoTranscribe}
          onToggle={() => setAutoTranscribe(!autoTranscribe)}
        />
        <ToggleItem
          title="Auto-Summarize"
          description="Automatically generate AI summaries with key points and action items"
          enabled={autoSummarize}
          onToggle={() => setAutoSummarize(!autoSummarize)}
        />
      </div>

      <div className="border-t border-gray-100 pt-4">
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          Transcription Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white"
        >
          <option value="en">English</option>
          <option value="ja">Japanese</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="pt">Portuguese</option>
          <option value="zh">Chinese (Mandarin)</option>
          <option value="ko">Korean</option>
        </select>
        <p className="text-xs text-text-muted mt-1.5">
          The primary language spoken in your meetings for optimal transcription
          accuracy.
        </p>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          Recording Quality
        </label>
        <div className="flex items-center gap-3">
          {["Standard", "High", "Ultra"].map((quality) => (
            <button
              key={quality}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                quality === "High"
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-gray-50 text-text-secondary border border-gray-200 hover:border-gray-300"
              }`}
            >
              {quality}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-medium hover:bg-brand-600 transition-colors shadow-sm">
          Save Preferences
        </button>
      </div>
    </div>
  );
}

function ToggleItem({
  title,
  description,
  icon: Icon,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  icon?: typeof User;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-text-muted">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-text-primary">{title}</p>
          <p className="text-xs text-text-muted">{description}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? "bg-brand-500" : "bg-gray-200"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}
