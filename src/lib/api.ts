import {
  AuthResponse,
  Meeting,
  MeetingSummary,
  TranscriptEntry,
  Highlight,
  Integration,
  Webhook,
  PaginatedResponse,
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006";

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
      }
    } else {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
      }
    }
  }

  getToken(): string | null {
    if (this.token) return this.token;
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
    }
    return this.token;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `API Error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  // Auth
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    this.setToken(res.token);
    return res;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    this.setToken(res.token);
    return res;
  }

  async getMe() {
    return this.request<{ user: AuthResponse["user"] }>("/api/auth/me");
  }

  logout() {
    this.setToken(null);
  }

  // Meetings
  async getMeetings(
    page = 1,
    limit = 10,
    search?: string
  ): Promise<PaginatedResponse<Meeting>> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (search) params.set("search", search);
    return this.request<PaginatedResponse<Meeting>>(
      `/api/v1/meetings?${params}`
    );
  }

  async getMeeting(id: string): Promise<Meeting> {
    return this.request<Meeting>(`/api/v1/meetings/${id}`);
  }

  async getTranscript(meetingId: string): Promise<TranscriptEntry[]> {
    return this.request<TranscriptEntry[]>(
      `/api/v1/meetings/${meetingId}/transcript`
    );
  }

  async getHighlights(meetingId: string): Promise<Highlight[]> {
    return this.request<Highlight[]>(
      `/api/v1/meetings/${meetingId}/highlights`
    );
  }

  async getSummary(meetingId: string): Promise<MeetingSummary> {
    return this.request<MeetingSummary>(
      `/api/v1/meetings/${meetingId}/summary`
    );
  }

  async importMeeting(data: {
    url?: string;
    file?: File;
    platform: string;
  }): Promise<Meeting> {
    return this.request<Meeting>("/api/v1/meetings/import", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async uploadMeeting(
    file: File,
    name: string,
    language: string
  ): Promise<{ id: string }> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("language", language);

    const token = this.getToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    // Don't set Content-Type — browser sets it with boundary for FormData

    const response = await fetch(`${API_BASE}/api/v1/meetings/upload`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Upload failed");
    }

    return response.json();
  }

  // Integrations
  async getIntegrations(): Promise<Integration[]> {
    return this.request<Integration[]>("/api/v1/integrations");
  }

  async toggleIntegration(id: string, connect: boolean): Promise<Integration> {
    return this.request<Integration>(`/api/v1/integrations`, {
      method: "POST",
      body: JSON.stringify({ id, action: connect ? "connect" : "disconnect" }),
    });
  }

  // Webhooks
  async getWebhooks(): Promise<Webhook[]> {
    return this.request<Webhook[]>("/api/v1/webhooks");
  }

  async createWebhook(data: {
    url: string;
    events: string[];
  }): Promise<Webhook> {
    return this.request<Webhook>("/api/v1/webhooks", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Ask AI about a meeting
  async askMeetingAI(
    meetingId: string,
    question: string
  ): Promise<{ answer: string; relevantTimestamps: number[] }> {
    return this.request<{ answer: string; relevantTimestamps: number[] }>(
      `/api/v1/meetings/${meetingId}/ask`,
      {
        method: "POST",
        body: JSON.stringify({ question }),
      }
    );
  }

  // Generate AI report
  async generateReport(
    meetingIds: string[],
    reportType: string
  ): Promise<{ id: string; title: string; content: string; meetingIds: string[]; reportType: string }> {
    return this.request<{ id: string; title: string; content: string; meetingIds: string[]; reportType: string }>(
      `/api/v1/reports/generate`,
      {
        method: "POST",
        body: JSON.stringify({ meetingIds, reportType }),
      }
    );
  }
}

export const api = new ApiClient();
