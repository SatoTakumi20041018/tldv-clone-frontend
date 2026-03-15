import {
  Meeting,
  TranscriptEntry,
  Highlight,
  MeetingSummary,
  Integration,
  InsightStats,
  Webhook,
  ApiKey,
} from "@/types";

export const mockUser = {
  id: "u1",
  name: "Takumi Sato",
  email: "takumi@example.com",
  avatar: undefined,
  createdAt: "2025-01-15T10:00:00Z",
};

export const mockMeetings: Meeting[] = [
  {
    id: "m1",
    title: "Q1 Product Strategy Review",
    date: "2026-03-14T14:00:00Z",
    duration: 3420,
    platform: "zoom",
    participants: [
      { id: "p1", name: "Takumi Sato", role: "host" },
      { id: "p2", name: "Sarah Chen" },
      { id: "p3", name: "Mike Johnson" },
      { id: "p4", name: "Emily Davis" },
    ],
    status: "completed",
    summaryPreview:
      "Discussed Q1 product roadmap priorities, finalized feature rollout timeline, and assigned ownership for key deliverables.",
    createdAt: "2026-03-14T15:00:00Z",
  },
  {
    id: "m2",
    title: "Engineering Sprint Planning",
    date: "2026-03-13T10:00:00Z",
    duration: 2700,
    platform: "google_meet",
    participants: [
      { id: "p1", name: "Takumi Sato", role: "host" },
      { id: "p5", name: "Alex Rivera" },
      { id: "p6", name: "Jordan Lee" },
    ],
    status: "completed",
    summaryPreview:
      "Sprint backlog groomed and prioritized. Velocity target set at 34 story points. Two tech debt items added.",
    createdAt: "2026-03-13T11:00:00Z",
  },
  {
    id: "m3",
    title: "Client Onboarding - Acme Corp",
    date: "2026-03-12T16:00:00Z",
    duration: 1800,
    platform: "teams",
    participants: [
      { id: "p1", name: "Takumi Sato" },
      { id: "p7", name: "Lisa Wang" },
      { id: "p8", name: "Tom Roberts", role: "host" },
    ],
    status: "completed",
    summaryPreview:
      "Onboarding kickoff for Acme Corp. Covered platform setup, data migration timeline, and training schedule.",
    createdAt: "2026-03-12T17:00:00Z",
  },
  {
    id: "m4",
    title: "Design Review - Dashboard V2",
    date: "2026-03-11T09:30:00Z",
    duration: 2400,
    platform: "zoom",
    participants: [
      { id: "p1", name: "Takumi Sato", role: "host" },
      { id: "p9", name: "Nina Patel" },
      { id: "p10", name: "Chris Yang" },
    ],
    status: "completed",
    summaryPreview:
      "Reviewed dashboard v2 mockups. Approved new analytics widgets. Requested mobile responsive adjustments.",
    createdAt: "2026-03-11T10:30:00Z",
  },
  {
    id: "m5",
    title: "Weekly Team Standup",
    date: "2026-03-10T09:00:00Z",
    duration: 900,
    platform: "google_meet",
    participants: [
      { id: "p1", name: "Takumi Sato", role: "host" },
      { id: "p2", name: "Sarah Chen" },
      { id: "p5", name: "Alex Rivera" },
      { id: "p6", name: "Jordan Lee" },
      { id: "p9", name: "Nina Patel" },
    ],
    status: "completed",
    summaryPreview:
      "Quick status updates from all team members. No blockers reported. Release v2.1 on track.",
    createdAt: "2026-03-10T09:15:00Z",
  },
  {
    id: "m6",
    title: "Investor Update Call",
    date: "2026-03-09T15:00:00Z",
    duration: 3600,
    platform: "zoom",
    participants: [
      { id: "p1", name: "Takumi Sato", role: "host" },
      { id: "p11", name: "David Park" },
      { id: "p12", name: "Rachel Kim" },
    ],
    status: "completed",
    summaryPreview:
      "Presented Q4 metrics and Q1 projections. Investors expressed confidence in growth trajectory. Follow-up scheduled.",
    createdAt: "2026-03-09T16:00:00Z",
  },
  {
    id: "m7",
    title: "API Integration Deep Dive",
    date: "2026-03-15T11:00:00Z",
    duration: 0,
    platform: "zoom",
    participants: [
      { id: "p1", name: "Takumi Sato", role: "host" },
      { id: "p5", name: "Alex Rivera" },
    ],
    status: "scheduled",
    createdAt: "2026-03-08T10:00:00Z",
  },
  {
    id: "m8",
    title: "Marketing Campaign Review",
    date: "2026-03-15T14:00:00Z",
    duration: 0,
    platform: "google_meet",
    participants: [
      { id: "p1", name: "Takumi Sato" },
      { id: "p13", name: "Amanda Foster", role: "host" },
      { id: "p14", name: "Ben Torres" },
    ],
    status: "scheduled",
    createdAt: "2026-03-08T10:00:00Z",
  },
];

export const mockTranscript: TranscriptEntry[] = [
  {
    id: "t1",
    timestamp: 0,
    speaker: "Takumi Sato",
    text: "Alright, let's get started everyone. Thanks for joining the Q1 Product Strategy Review. I want to cover three main topics today: our roadmap priorities, the feature rollout timeline, and ownership assignments.",
  },
  {
    id: "t2",
    timestamp: 25,
    speaker: "Sarah Chen",
    text: "Sounds good. Before we dive in, I wanted to flag that we got the latest user feedback report from the research team. There are some interesting findings that might affect our priorities.",
  },
  {
    id: "t3",
    timestamp: 48,
    speaker: "Takumi Sato",
    text: "Great, let's definitely incorporate that. Can you share the highlights?",
  },
  {
    id: "t4",
    timestamp: 55,
    speaker: "Sarah Chen",
    text: "Sure. The top three user requests are: better search functionality, real-time collaboration features, and improved mobile experience. Search has been the number one request for three consecutive months now.",
  },
  {
    id: "t5",
    timestamp: 82,
    speaker: "Mike Johnson",
    text: "That aligns with what we've been seeing in the support tickets too. Search-related issues make up about 30% of our inbound requests.",
  },
  {
    id: "t6",
    timestamp: 98,
    speaker: "Emily Davis",
    text: "I think we should definitely prioritize the search overhaul. I've been working on some prototypes for an AI-powered search that could significantly improve the experience.",
  },
  {
    id: "t7",
    timestamp: 120,
    speaker: "Takumi Sato",
    text: "That's excellent, Emily. Can you walk us through the prototype next week? For now, let's tentatively slot search as our P0 for Q1.",
  },
  {
    id: "t8",
    timestamp: 140,
    speaker: "Emily Davis",
    text: "Absolutely. I'll prepare a demo. The prototype uses vector search with semantic understanding, so users can search by concept rather than exact keywords.",
  },
  {
    id: "t9",
    timestamp: 165,
    speaker: "Mike Johnson",
    text: "What about the real-time collaboration features? We had several enterprise clients ask for that specifically.",
  },
  {
    id: "t10",
    timestamp: 180,
    speaker: "Takumi Sato",
    text: "Good point. Let's put that as P1. Sarah, can your team scope out the requirements for real-time collab by end of next week?",
  },
  {
    id: "t11",
    timestamp: 198,
    speaker: "Sarah Chen",
    text: "Yes, we can do that. I'll coordinate with the enterprise sales team to get specific requirements from the top requesting clients.",
  },
  {
    id: "t12",
    timestamp: 215,
    speaker: "Takumi Sato",
    text: "Perfect. Now let's talk about the rollout timeline. Emily, what's your estimate for the search overhaul?",
  },
  {
    id: "t13",
    timestamp: 230,
    speaker: "Emily Davis",
    text: "If we start next sprint, I think we can have an MVP ready in 6 weeks. Full rollout with all the bells and whistles would be about 10 weeks.",
  },
  {
    id: "t14",
    timestamp: 252,
    speaker: "Mike Johnson",
    text: "That timeline works. We should also consider a phased rollout. Maybe start with beta users in week 6, then gradually expand.",
  },
  {
    id: "t15",
    timestamp: 270,
    speaker: "Takumi Sato",
    text: "Agreed. Let's plan for a beta launch at week 6, 25% rollout at week 8, and full rollout by week 10. Any concerns with that?",
  },
  {
    id: "t16",
    timestamp: 290,
    speaker: "Sarah Chen",
    text: "No concerns from my side. I'll make sure the support team is briefed and ready for each phase.",
  },
  {
    id: "t17",
    timestamp: 305,
    speaker: "Takumi Sato",
    text: "Great. Let's also assign clear ownership. Emily, you'll lead the search overhaul. Sarah, you've got the real-time collab scoping. Mike, can you own the mobile improvements?",
  },
  {
    id: "t18",
    timestamp: 325,
    speaker: "Mike Johnson",
    text: "Happy to take that on. I'll start with an audit of the current mobile experience and identify the quick wins.",
  },
  {
    id: "t19",
    timestamp: 340,
    speaker: "Takumi Sato",
    text: "Perfect. Let's reconvene next Friday to review progress. I'll send out the meeting notes with all the action items. Thanks everyone!",
  },
  {
    id: "t20",
    timestamp: 358,
    speaker: "Sarah Chen",
    text: "Thanks Takumi. Great session!",
  },
];

export const mockHighlights: Highlight[] = [
  {
    id: "h1",
    timestamp: 55,
    title: "Top User Requests Identified",
    description:
      "Search functionality, real-time collaboration, and mobile experience are the top 3 user requests. Search has been #1 for 3 consecutive months.",
    type: "key_point",
    tags: ["user-research", "priorities"],
  },
  {
    id: "h2",
    timestamp: 82,
    title: "Search Issues in Support Data",
    description:
      "Search-related issues account for approximately 30% of all inbound support requests.",
    type: "key_point",
    tags: ["support", "data"],
  },
  {
    id: "h3",
    timestamp: 120,
    title: "Search Overhaul Prioritized as P0",
    description:
      "AI-powered search with vector/semantic understanding prioritized as the top initiative for Q1.",
    type: "decision",
    tags: ["roadmap", "search"],
  },
  {
    id: "h4",
    timestamp: 180,
    title: "Real-time Collaboration Set as P1",
    description:
      "Real-time collaboration features designated as P1 priority, with requirements gathering to begin immediately.",
    type: "decision",
    tags: ["roadmap", "collaboration"],
  },
  {
    id: "h5",
    timestamp: 252,
    title: "Phased Rollout Plan Approved",
    description:
      "Beta at week 6, 25% rollout at week 8, full rollout by week 10 for the search overhaul.",
    type: "decision",
    tags: ["timeline", "rollout"],
  },
  {
    id: "h6",
    timestamp: 305,
    title: "Ownership Assigned",
    description:
      "Emily: Search overhaul lead. Sarah: Real-time collab scoping. Mike: Mobile improvements.",
    type: "action_item",
    tags: ["ownership", "assignments"],
  },
];

export const mockSummary: MeetingSummary = {
  overview:
    "The Q1 Product Strategy Review covered roadmap priorities based on recent user feedback data. The team aligned on three key initiatives: an AI-powered search overhaul (P0), real-time collaboration features (P1), and mobile experience improvements (P2). A phased rollout plan was established for the search feature, and clear ownership was assigned for all three initiatives.",
  keyPoints: [
    "Search functionality has been the #1 user request for 3 consecutive months",
    "Search-related issues make up 30% of support tickets",
    "AI-powered vector search prototype shows promise for semantic understanding",
    "Enterprise clients specifically requesting real-time collaboration",
    "Phased rollout approach: beta (week 6), 25% (week 8), full (week 10)",
  ],
  decisions: [
    "Search overhaul designated as P0 priority for Q1",
    "Real-time collaboration scoping as P1 priority",
    "Mobile improvements as P2 priority",
    "Phased rollout strategy approved for search feature",
    "Weekly progress review meetings to continue",
  ],
  actionItems: [
    {
      id: "a1",
      text: "Prepare AI search prototype demo for next week",
      assignee: "Emily Davis",
      dueDate: "2026-03-21",
      status: "pending",
    },
    {
      id: "a2",
      text: "Scope real-time collaboration requirements with enterprise clients",
      assignee: "Sarah Chen",
      dueDate: "2026-03-21",
      status: "pending",
    },
    {
      id: "a3",
      text: "Audit current mobile experience and identify quick wins",
      assignee: "Mike Johnson",
      dueDate: "2026-03-19",
      status: "pending",
    },
    {
      id: "a4",
      text: "Send meeting notes with action items to all attendees",
      assignee: "Takumi Sato",
      dueDate: "2026-03-14",
      status: "completed",
    },
    {
      id: "a5",
      text: "Brief support team on search overhaul phases",
      assignee: "Sarah Chen",
      dueDate: "2026-03-20",
      status: "in_progress",
    },
  ],
  nextSteps: [
    "Emily to demo AI search prototype at next Friday's meeting",
    "Sarah to present real-time collab requirements by end of next week",
    "Mike to share mobile audit findings at next standup",
    "Reconvene next Friday for progress review",
  ],
  sentiment: "positive",
};

export const mockIntegrations: Integration[] = [
  {
    id: "int1",
    name: "Zoom",
    description:
      "Automatically record and transcribe your Zoom meetings. Get AI summaries and action items.",
    icon: "zoom",
    category: "communication",
    connected: true,
    status: "active",
    lastSynced: "2026-03-15T08:00:00Z",
  },
  {
    id: "int2",
    name: "Google Meet",
    description:
      "Connect Google Meet to automatically capture and analyze your meetings.",
    icon: "google_meet",
    category: "communication",
    connected: true,
    status: "active",
    lastSynced: "2026-03-14T12:00:00Z",
  },
  {
    id: "int3",
    name: "Microsoft Teams",
    description:
      "Integrate with Teams to record, transcribe, and summarize your meetings automatically.",
    icon: "teams",
    category: "communication",
    connected: false,
  },
  {
    id: "int4",
    name: "HubSpot",
    description:
      "Sync meeting insights and action items directly to your HubSpot CRM contacts and deals.",
    icon: "hubspot",
    category: "crm",
    connected: true,
    status: "active",
    lastSynced: "2026-03-15T07:30:00Z",
  },
  {
    id: "int5",
    name: "Salesforce",
    description:
      "Push meeting summaries, notes, and action items to Salesforce records automatically.",
    icon: "salesforce",
    category: "crm",
    connected: false,
  },
  {
    id: "int6",
    name: "Slack",
    description:
      "Get notified in Slack when meetings are processed. Share summaries to channels.",
    icon: "slack",
    category: "communication",
    connected: true,
    status: "active",
    lastSynced: "2026-03-15T09:00:00Z",
  },
  {
    id: "int7",
    name: "Notion",
    description:
      "Export meeting notes, transcripts, and action items to your Notion workspace.",
    icon: "notion",
    category: "project_management",
    connected: false,
  },
  {
    id: "int8",
    name: "Jira",
    description:
      "Create Jira tickets from meeting action items automatically. Track follow-ups.",
    icon: "jira",
    category: "project_management",
    connected: false,
  },
  {
    id: "int9",
    name: "Google Drive",
    description:
      "Save meeting recordings, transcripts, and summaries to Google Drive folders.",
    icon: "google_drive",
    category: "storage",
    connected: true,
    status: "active",
    lastSynced: "2026-03-14T18:00:00Z",
  },
  {
    id: "int10",
    name: "Dropbox",
    description:
      "Store and organize your meeting recordings and documents in Dropbox.",
    icon: "dropbox",
    category: "storage",
    connected: false,
  },
  {
    id: "int11",
    name: "Asana",
    description:
      "Create Asana tasks from action items. Keep your project management in sync.",
    icon: "asana",
    category: "project_management",
    connected: false,
  },
  {
    id: "int12",
    name: "Linear",
    description:
      "Push action items and engineering tasks from meetings directly to Linear.",
    icon: "linear",
    category: "project_management",
    connected: false,
  },
];

export const mockInsightStats: InsightStats = {
  totalMeetings: 47,
  totalHours: 62.5,
  avgDuration: 42,
  actionItemsCompleted: 38,
  actionItemsPending: 12,
  meetingsPerWeek: [
    { week: "Feb 10", count: 8 },
    { week: "Feb 17", count: 11 },
    { week: "Feb 24", count: 9 },
    { week: "Mar 3", count: 12 },
    { week: "Mar 10", count: 7 },
  ],
  hoursPerWeek: [
    { week: "Feb 10", hours: 10.5 },
    { week: "Feb 17", hours: 14.2 },
    { week: "Feb 24", hours: 11.8 },
    { week: "Mar 3", hours: 16.0 },
    { week: "Mar 10", hours: 10.0 },
  ],
  topTopics: [
    { topic: "Product Roadmap", count: 15 },
    { topic: "Sprint Planning", count: 12 },
    { topic: "Client Onboarding", count: 8 },
    { topic: "Design Review", count: 7 },
    { topic: "Team Updates", count: 5 },
  ],
  talkTimeRatios: [
    { speaker: "Takumi Sato", percentage: 32 },
    { speaker: "Sarah Chen", percentage: 24 },
    { speaker: "Mike Johnson", percentage: 18 },
    { speaker: "Emily Davis", percentage: 15 },
    { speaker: "Others", percentage: 11 },
  ],
};

export const mockWebhooks: Webhook[] = [
  {
    id: "wh1",
    url: "https://hooks.example.com/meeting-complete",
    events: ["meeting.completed", "meeting.transcript_ready"],
    active: true,
    createdAt: "2026-02-01T10:00:00Z",
    lastTriggered: "2026-03-14T15:00:00Z",
  },
  {
    id: "wh2",
    url: "https://api.myapp.com/webhooks/tldv",
    events: ["meeting.completed", "meeting.summary_ready"],
    active: true,
    createdAt: "2026-02-15T14:00:00Z",
    lastTriggered: "2026-03-13T11:00:00Z",
  },
];

export const mockApiKeys: ApiKey[] = [
  {
    id: "ak1",
    name: "Production API Key",
    key: "tldv_prod_sk_••••••••••••4a2f",
    createdAt: "2026-01-10T10:00:00Z",
    lastUsed: "2026-03-15T08:30:00Z",
  },
  {
    id: "ak2",
    name: "Development API Key",
    key: "tldv_dev_sk_••••••••••••7b3c",
    createdAt: "2026-02-20T14:00:00Z",
    lastUsed: "2026-03-14T16:45:00Z",
  },
];
