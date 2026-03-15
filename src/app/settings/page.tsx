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
  Globe,
  Eye,
  EyeOff,
  FileText,
  ChevronDown,
  Shield,
  Pencil,
  Mail,
  Hash,
  Crown,
} from "lucide-react";
import { mockUser, mockWebhooks, mockApiKeys } from "@/lib/mockData";

type SettingsTab =
  | "profile"
  | "api_keys"
  | "webhooks"
  | "team"
  | "notifications"
  | "recording"
  | "templates";

const settingsTabs: { id: SettingsTab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Personal Settings", icon: User },
  { id: "recording", label: "Recording", icon: Mic },
  { id: "api_keys", label: "API Keys", icon: Key },
  { id: "webhooks", label: "Webhooks", icon: Webhook },
  { id: "team", label: "Team Management", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "templates", label: "Templates", icon: FileText },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary text-sm mt-1">
          Manage your account preferences and configurations.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar nav - vertical tabs on left */}
        <nav className="md:w-60 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2 space-y-0.5 md:sticky md:top-6">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-brand-50 text-brand-600"
                      : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content panel on right */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "api_keys" && <ApiKeysSettings />}
          {activeTab === "webhooks" && <WebhooksSettings />}
          {activeTab === "team" && <TeamSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "recording" && <RecordingSettings />}
          {activeTab === "templates" && <TemplatesSettings />}
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   Profile / Personal Settings
   ============================================================= */

function ProfileSettings() {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Asia/Tokyo");

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6">
      {/* Profile card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Profile</h2>
          <p className="text-sm text-text-secondary mt-1">
            Update your personal information and preferences.
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

        {/* Name & Email */}
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

        {/* Language & Timezone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white"
            >
              <option value="en">English</option>
              <option value="ja">Japanese</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="pt">Portuguese</option>
              <option value="it">Italian</option>
              <option value="ko">Korean</option>
              <option value="zh">Chinese (Simplified)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Time zone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white"
            >
              <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
              <option value="America/New_York">America/New_York (UTC-5)</option>
              <option value="America/Chicago">America/Chicago (UTC-6)</option>
              <option value="America/Denver">America/Denver (UTC-7)</option>
              <option value="America/Los_Angeles">
                America/Los_Angeles (UTC-8)
              </option>
              <option value="Europe/London">Europe/London (UTC+0)</option>
              <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
              <option value="Europe/Berlin">Europe/Berlin (UTC+1)</option>
              <option value="Asia/Shanghai">Asia/Shanghai (UTC+8)</option>
              <option value="Asia/Seoul">Asia/Seoul (UTC+9)</option>
              <option value="Australia/Sydney">Australia/Sydney (UTC+11)</option>
            </select>
          </div>
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
    </div>
  );
}

/* =============================================================
   Recording Preferences
   ============================================================= */

function RecordingSettings() {
  const [autoRecord, setAutoRecord] = useState(true);
  const [autoTranscribe, setAutoTranscribe] = useState(true);
  const [autoSummarize, setAutoSummarize] = useState(true);
  const [recordingLanguage, setRecordingLanguage] = useState("en");
  const [selectedQuality, setSelectedQuality] = useState("High");

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
          Default Recording Language
        </label>
        <select
          value={recordingLanguage}
          onChange={(e) => setRecordingLanguage(e.target.value)}
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
          <option value="it">Italian</option>
          <option value="nl">Dutch</option>
          <option value="ru">Russian</option>
          <option value="ar">Arabic</option>
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
              onClick={() => setSelectedQuality(quality)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                quality === selectedQuality
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-gray-50 text-text-secondary border border-gray-200 hover:border-gray-300"
              }`}
            >
              {quality}
            </button>
          ))}
        </div>
        <p className="text-xs text-text-muted mt-1.5">
          Higher quality increases file size and processing time.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-medium hover:bg-brand-600 transition-colors shadow-sm">
          Save Preferences
        </button>
      </div>
    </div>
  );
}

/* =============================================================
   API Keys
   ============================================================= */

function ApiKeysSettings() {
  const [keys] = useState(mockApiKeys);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [showGenerateForm, setShowGenerateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");

  const handleCopy = (id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Plan notice */}
      <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 flex items-start gap-3">
        <Shield className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-brand-700">
            Available on Business plan
          </p>
          <p className="text-xs text-brand-600 mt-0.5">
            API keys allow programmatic access to your tl;dv data. Manage your
            keys carefully and never share them publicly.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              API Keys
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Manage API keys for programmatic access to the tl;dv API.
            </p>
          </div>
          <button
            onClick={() => setShowGenerateForm(!showGenerateForm)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Generate New API Key
          </button>
        </div>

        {/* Generate key form */}
        {showGenerateForm && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Key Name
                </label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Production API Key"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors">
                  Generate Key
                </button>
                <button
                  onClick={() => {
                    setShowGenerateForm(false);
                    setNewKeyName("");
                  }}
                  className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Key list */}
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
                  title="Copy key"
                >
                  {copiedId === key.id ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-red-50 text-text-muted hover:text-red-500 transition-colors"
                  title="Revoke key"
                >
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

/* =============================================================
   Webhooks
   ============================================================= */

function WebhooksSettings() {
  const [webhooks, setWebhooks] = useState(mockWebhooks);
  const [showForm, setShowForm] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newEventAction, setNewEventAction] = useState("MeetingReady");
  const [newHeaderConfig, setNewHeaderConfig] = useState("");

  const handleToggleWebhook = (id: string) => {
    setWebhooks((prev) =>
      prev.map((wh) =>
        wh.id === id ? { ...wh, active: !wh.active } : wh
      )
    );
  };

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
            Configure new Webhook
          </button>
        </div>

        {/* New webhook form */}
        {showForm && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Event Action
                </label>
                <select
                  value={newEventAction}
                  onChange={(e) => setNewEventAction(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white"
                >
                  <option value="MeetingReady">MeetingReady</option>
                  <option value="TranscriptReady">TranscriptReady</option>
                </select>
              </div>
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
                <p className="text-xs text-text-muted mt-1">
                  Must be an HTTPS endpoint.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Header Config{" "}
                  <span className="text-text-muted font-normal">(optional)</span>
                </label>
                <textarea
                  value={newHeaderConfig}
                  onChange={(e) => setNewHeaderConfig(e.target.value)}
                  placeholder={'{"Authorization": "Bearer your-token"}'}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white font-mono"
                />
                <p className="text-xs text-text-muted mt-1">
                  JSON object with custom headers to include in webhook
                  requests.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors">
                  Create Webhook
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setNewUrl("");
                    setNewHeaderConfig("");
                  }}
                  className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Webhook list */}
        <div className="space-y-3">
          {webhooks.map((webhook) => (
            <div
              key={webhook.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-text-muted flex-shrink-0" />
                  <code className="text-sm text-text-primary font-mono truncate">
                    {webhook.url}
                  </code>
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
              <div className="flex items-center gap-3 ml-4">
                {/* Status toggle */}
                <button
                  onClick={() => handleToggleWebhook(webhook.id)}
                  className="flex items-center gap-1.5"
                  title={webhook.active ? "Disable webhook" : "Enable webhook"}
                >
                  <span
                    className={`text-xs font-medium ${webhook.active ? "text-emerald-600" : "text-gray-400"}`}
                  >
                    {webhook.active ? "Active" : "Inactive"}
                  </span>
                  <div
                    className={`relative w-9 h-5 rounded-full transition-colors ${webhook.active ? "bg-emerald-500" : "bg-gray-200"}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${webhook.active ? "translate-x-4" : "translate-x-0"}`}
                    />
                  </div>
                </button>
                <button className="p-2 rounded-lg hover:bg-red-50 text-text-muted hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {webhooks.length === 0 && (
            <div className="text-center py-8 text-text-muted">
              <Webhook className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No webhooks configured yet.</p>
              <p className="text-xs mt-1">
                Click &quot;Configure new Webhook&quot; to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   Team Management
   ============================================================= */

function TeamSettings() {
  const [teamName, setTeamName] = useState("Takumi's Team");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");

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
    <div className="space-y-6">
      {/* Team name */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Team Settings
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Manage your team name and workspace preferences.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Team name
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-all"
          />
        </div>
        <div>
          <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-medium hover:bg-brand-600 transition-colors shadow-sm">
            Update Team Name
          </button>
        </div>
      </div>

      {/* Members */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Members
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Invite and manage team members.
            </p>
          </div>
          <span className="text-xs text-text-muted bg-gray-50 px-2.5 py-1 rounded-full">
            {teamMembers.length} members
          </span>
        </div>

        {/* Invite form */}
        <div className="flex items-center gap-2">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Enter email address"
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300"
          />
          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white"
          >
            <option>Member</option>
            <option>Admin</option>
          </select>
          <button className="px-4 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-medium hover:bg-brand-600 transition-colors whitespace-nowrap">
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
                    {member.role === "Owner" && (
                      <Crown className="w-3.5 h-3.5 text-amber-500 inline ml-1.5 -mt-0.5" />
                    )}
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
                  <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-text-secondary bg-white outline-none focus:ring-2 focus:ring-brand-500/20">
                    <option>Member</option>
                    <option>Admin</option>
                  </select>
                )}
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
    </div>
  );
}

/* =============================================================
   Notification Settings
   ============================================================= */

function NotificationSettings() {
  // Email notifications
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [emailMeetingComplete, setEmailMeetingComplete] = useState(true);
  const [emailTranscriptReady, setEmailTranscriptReady] = useState(true);
  const [emailSummaryReady, setEmailSummaryReady] = useState(true);
  const [emailActionItemReminder, setEmailActionItemReminder] = useState(false);
  const [emailWeeklyDigest, setEmailWeeklyDigest] = useState(true);

  // Slack notifications
  const [slackEnabled, setSlackEnabled] = useState(true);
  const [slackMeetingComplete, setSlackMeetingComplete] = useState(true);
  const [slackSummaryReady, setSlackSummaryReady] = useState(true);
  const [slackActionItems, setSlackActionItems] = useState(false);

  // In-app notifications
  const [inAppEnabled, setInAppEnabled] = useState(true);
  const [inAppMeetingStarting, setInAppMeetingStarting] = useState(true);
  const [inAppRecordingComplete, setInAppRecordingComplete] = useState(true);
  const [inAppMentions, setInAppMentions] = useState(true);
  const [inAppTeamUpdates, setInAppTeamUpdates] = useState(false);

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Mail className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-text-primary">
              Email Notifications
            </h2>
            <p className="text-sm text-text-secondary mt-0.5">
              Receive notifications via email.
            </p>
          </div>
          <button
            onClick={() => setEmailNotifs(!emailNotifs)}
            className={`relative w-11 h-6 rounded-full transition-colors ${emailNotifs ? "bg-brand-500" : "bg-gray-200"}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${emailNotifs ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>

        {emailNotifs && (
          <div className="space-y-3 ml-11 pt-2 border-t border-gray-100">
            <ToggleItem
              title="Meeting Completed"
              description="Notified when a meeting recording is processed"
              enabled={emailMeetingComplete}
              onToggle={() => setEmailMeetingComplete(!emailMeetingComplete)}
            />
            <ToggleItem
              title="Transcript Ready"
              description="Notified when transcript generation is complete"
              enabled={emailTranscriptReady}
              onToggle={() => setEmailTranscriptReady(!emailTranscriptReady)}
            />
            <ToggleItem
              title="Summary Ready"
              description="Notified when AI summary is available"
              enabled={emailSummaryReady}
              onToggle={() => setEmailSummaryReady(!emailSummaryReady)}
            />
            <ToggleItem
              title="Action Item Reminders"
              description="Daily reminders for pending action items"
              enabled={emailActionItemReminder}
              onToggle={() =>
                setEmailActionItemReminder(!emailActionItemReminder)
              }
            />
            <ToggleItem
              title="Weekly Digest"
              description="Weekly summary of your meeting activity"
              enabled={emailWeeklyDigest}
              onToggle={() => setEmailWeeklyDigest(!emailWeeklyDigest)}
            />
          </div>
        )}
      </div>

      {/* Slack Notifications */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
            <Hash className="w-4 h-4 text-purple-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-text-primary">
              Slack Notifications
            </h2>
            <p className="text-sm text-text-secondary mt-0.5">
              Get notified in your Slack workspace.
            </p>
          </div>
          <button
            onClick={() => setSlackEnabled(!slackEnabled)}
            className={`relative w-11 h-6 rounded-full transition-colors ${slackEnabled ? "bg-brand-500" : "bg-gray-200"}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${slackEnabled ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>

        {slackEnabled && (
          <div className="space-y-3 ml-11 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 bg-emerald-50 rounded-lg px-3 py-2 text-xs text-emerald-700">
              <Check className="w-3.5 h-3.5" />
              Connected to <span className="font-medium">#meetings</span>{" "}
              channel
            </div>
            <ToggleItem
              title="Meeting Completed"
              description="Post to Slack when a meeting is done processing"
              enabled={slackMeetingComplete}
              onToggle={() =>
                setSlackMeetingComplete(!slackMeetingComplete)
              }
            />
            <ToggleItem
              title="Summary Ready"
              description="Share AI summary in Slack channel"
              enabled={slackSummaryReady}
              onToggle={() => setSlackSummaryReady(!slackSummaryReady)}
            />
            <ToggleItem
              title="Action Items"
              description="Post action items to assigned members via DM"
              enabled={slackActionItems}
              onToggle={() => setSlackActionItems(!slackActionItems)}
            />
          </div>
        )}
      </div>

      {/* In-App Notifications */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
            <Bell className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-text-primary">
              In-App Notifications
            </h2>
            <p className="text-sm text-text-secondary mt-0.5">
              Notification preferences within tl;dv.
            </p>
          </div>
          <button
            onClick={() => setInAppEnabled(!inAppEnabled)}
            className={`relative w-11 h-6 rounded-full transition-colors ${inAppEnabled ? "bg-brand-500" : "bg-gray-200"}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${inAppEnabled ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>

        {inAppEnabled && (
          <div className="space-y-3 ml-11 pt-2 border-t border-gray-100">
            <ToggleItem
              title="Meeting Starting Soon"
              description="Remind you 5 minutes before a scheduled meeting"
              enabled={inAppMeetingStarting}
              onToggle={() =>
                setInAppMeetingStarting(!inAppMeetingStarting)
              }
            />
            <ToggleItem
              title="Recording Complete"
              description="Notify when meeting recording finishes processing"
              enabled={inAppRecordingComplete}
              onToggle={() =>
                setInAppRecordingComplete(!inAppRecordingComplete)
              }
            />
            <ToggleItem
              title="Mentions"
              description="Notify when someone mentions you in notes or comments"
              enabled={inAppMentions}
              onToggle={() => setInAppMentions(!inAppMentions)}
            />
            <ToggleItem
              title="Team Updates"
              description="Notify about new team members and role changes"
              enabled={inAppTeamUpdates}
              onToggle={() => setInAppTeamUpdates(!inAppTeamUpdates)}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-medium hover:bg-brand-600 transition-colors shadow-sm">
          Save Preferences
        </button>
      </div>
    </div>
  );
}

/* =============================================================
   Templates
   ============================================================= */

interface Template {
  id: string;
  name: string;
  description: string;
  category: "built_in" | "custom";
  type: "summary" | "prompt";
  content: string;
  isDefault?: boolean;
}

const builtInTemplates: Template[] = [
  {
    id: "tpl_general",
    name: "General",
    description:
      "A general-purpose template that captures key points, decisions, and action items.",
    category: "built_in",
    type: "summary",
    content:
      "Summarize the meeting including: overview, key discussion points, decisions made, action items with owners, and next steps.",
    isDefault: true,
  },
  {
    id: "tpl_meddic",
    name: "MEDDIC",
    description:
      "Sales qualification framework: Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion.",
    category: "built_in",
    type: "summary",
    content:
      "Analyze this sales call using the MEDDIC framework:\n- Metrics: What quantifiable measures of value were discussed?\n- Economic Buyer: Who has the authority to approve the purchase?\n- Decision Criteria: What criteria will be used to evaluate solutions?\n- Decision Process: What is the process for making a purchase decision?\n- Identify Pain: What pain points were identified?\n- Champion: Who is the internal advocate for the solution?",
  },
  {
    id: "tpl_bant",
    name: "BANT",
    description:
      "Sales framework: Budget, Authority, Need, Timeline.",
    category: "built_in",
    type: "summary",
    content:
      "Analyze this sales call using the BANT framework:\n- Budget: What is the prospect's budget for this solution?\n- Authority: Who is the decision-maker?\n- Need: What specific needs or pain points were discussed?\n- Timeline: What is the expected timeline for implementation?",
  },
  {
    id: "tpl_sprint",
    name: "Sprint Planning",
    description:
      "Capture sprint goals, backlog items, capacity, and commitments.",
    category: "built_in",
    type: "summary",
    content:
      "Summarize this sprint planning meeting:\n- Sprint Goal\n- User stories discussed and estimated\n- Team capacity and velocity\n- Commitments and risks\n- Carryover items from previous sprint",
  },
  {
    id: "tpl_standup",
    name: "Daily Standup",
    description:
      "Per-person summary of yesterday, today, and blockers.",
    category: "built_in",
    type: "summary",
    content:
      "For each participant, summarize:\n- What they completed yesterday\n- What they plan to do today\n- Any blockers or dependencies\n\nAlso note any team-wide announcements or decisions.",
  },
  {
    id: "tpl_interview",
    name: "Interview Scorecard",
    description:
      "Structured evaluation template for candidate interviews.",
    category: "built_in",
    type: "summary",
    content:
      "Evaluate this interview:\n- Candidate strengths discussed\n- Areas of concern\n- Technical skill assessment\n- Cultural fit indicators\n- Key questions asked and quality of answers\n- Interviewer recommendation signals",
  },
];

function TemplatesSettings() {
  const [templates] = useState<Template[]>([
    ...builtInTemplates,
    {
      id: "tpl_custom_1",
      name: "Customer Success Check-in",
      description: "Template for quarterly customer success review calls.",
      category: "custom",
      type: "prompt",
      content:
        "Analyze this customer check-in call and extract:\n- Customer health signals (positive/negative)\n- Feature requests or feedback\n- Upsell/cross-sell opportunities\n- Risk indicators\n- Action items for CSM",
    },
  ]);
  const [activeFilter, setActiveFilter] = useState<"all" | "built_in" | "custom">("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateDesc, setNewTemplateDesc] = useState("");
  const [newTemplateType, setNewTemplateType] = useState<"summary" | "prompt">("summary");
  const [newTemplateContent, setNewTemplateContent] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredTemplates = templates.filter(
    (t) => activeFilter === "all" || t.category === activeFilter
  );

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Templates
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Meeting summary templates and custom AI prompt templates.
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Template
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 mb-4 bg-gray-50 rounded-lg p-1 w-fit">
          {(
            [
              { id: "all", label: "All" },
              { id: "built_in", label: "Built-in" },
              { id: "custom", label: "Custom" },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeFilter === filter.id
                  ? "bg-white text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Create template form */}
        {showCreateForm && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-text-primary mb-3">
              New Custom Template
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    placeholder="e.g., Weekly Retro"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Type
                  </label>
                  <select
                    value={newTemplateType}
                    onChange={(e) =>
                      setNewTemplateType(e.target.value as "summary" | "prompt")
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white"
                  >
                    <option value="summary">Meeting Summary</option>
                    <option value="prompt">Custom AI Prompt</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Description
                </label>
                <input
                  type="text"
                  value={newTemplateDesc}
                  onChange={(e) => setNewTemplateDesc(e.target.value)}
                  placeholder="Brief description of what this template does"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Prompt / Instructions
                </label>
                <textarea
                  value={newTemplateContent}
                  onChange={(e) => setNewTemplateContent(e.target.value)}
                  placeholder="Enter the AI prompt or summary instructions..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-text-primary placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 bg-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors">
                  Create Template
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewTemplateName("");
                    setNewTemplateDesc("");
                    setNewTemplateContent("");
                  }}
                  className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Template list */}
        <div className="space-y-2">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="border border-gray-100 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedId(
                    expandedId === template.id ? null : template.id
                  )
                }
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      template.category === "built_in"
                        ? "bg-brand-50 text-brand-500"
                        : "bg-emerald-50 text-emerald-500"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-text-primary">
                        {template.name}
                      </span>
                      {template.isDefault && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-brand-50 text-brand-600">
                          Default
                        </span>
                      )}
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          template.type === "summary"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-purple-50 text-purple-600"
                        }`}
                      >
                        {template.type === "summary"
                          ? "Summary"
                          : "AI Prompt"}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5 truncate">
                      {template.description}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-text-muted transition-transform flex-shrink-0 ml-2 ${
                    expandedId === template.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedId === template.id && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <pre className="mt-3 p-3 bg-gray-50 rounded-lg text-xs text-text-secondary font-mono whitespace-pre-wrap leading-relaxed">
                    {template.content}
                  </pre>
                  <div className="flex items-center gap-2 mt-3">
                    {template.category === "custom" && (
                      <>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-text-secondary hover:border-gray-300 transition-colors">
                          <Pencil className="w-3 h-3" />
                          Edit
                        </button>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </>
                    )}
                    {!template.isDefault && (
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-text-secondary hover:border-brand-300 hover:text-brand-600 transition-colors">
                        Set as Default
                      </button>
                    )}
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-text-secondary hover:border-gray-300 transition-colors">
                      <Copy className="w-3 h-3" />
                      Duplicate
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredTemplates.length === 0 && (
            <div className="text-center py-8 text-text-muted">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No templates found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   Shared Components
   ============================================================= */

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
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${enabled ? "bg-brand-500" : "bg-gray-200"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}
