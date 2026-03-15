export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: number; // in seconds
  platform: "zoom" | "google_meet" | "teams" | "other";
  participants: Participant[];
  status: "completed" | "processing" | "scheduled" | "live";
  summaryPreview?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
}

export interface Participant {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  role?: "host" | "participant";
}

export interface TranscriptEntry {
  id: string;
  timestamp: number; // in seconds
  speaker: string;
  speakerAvatar?: string;
  text: string;
}

export interface Highlight {
  id: string;
  timestamp: number;
  title: string;
  description: string;
  type: "key_point" | "decision" | "action_item" | "question" | "topic";
  tags?: string[];
}

export interface MeetingSummary {
  overview: string;
  keyPoints: string[];
  decisions: string[];
  actionItems: ActionItem[];
  nextSteps: string[];
  sentiment?: "positive" | "neutral" | "negative";
}

export interface ActionItem {
  id: string;
  text: string;
  assignee?: string;
  dueDate?: string;
  status: "pending" | "in_progress" | "completed";
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "crm" | "communication" | "project_management" | "storage";
  connected: boolean;
  status?: "active" | "inactive" | "error";
  lastSynced?: string;
}

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  createdAt: string;
  lastTriggered?: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}

export interface InsightStats {
  totalMeetings: number;
  totalHours: number;
  avgDuration: number;
  actionItemsCompleted: number;
  actionItemsPending: number;
  meetingsPerWeek: { week: string; count: number }[];
  hoursPerWeek: { week: string; hours: number }[];
  topTopics: { topic: string; count: number }[];
  talkTimeRatios: { speaker: string; percentage: number }[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
