import type { DayActivity, MemoryItem, ProjectPulseItem } from "./types";

export const activityData: DayActivity[] = [
  { dateLabel: "Mon", minutes: 42 },
  { dateLabel: "Tue", minutes: 95 },
  { dateLabel: "Wed", minutes: 130 },
  { dateLabel: "Thu", minutes: 70 },
  { dateLabel: "Fri", minutes: 165 },
  { dateLabel: "Sat", minutes: 25 },
  { dateLabel: "Sun", minutes: 88 },
];

export const memoryItems: MemoryItem[] = [
  {
    id: "m1",
    title: "Retry sync endpoint when network drops mid-request",
    project: "codbit-server",
    tag: "bug",
    createdAt: "2026-05-06",
  },
  {
    id: "m2",
    title: "Add scoped filters for memory board by repo + date",
    project: "codbit-web",
    tag: "feature",
    createdAt: "2026-05-05",
  },
  {
    id: "m3",
    title: "Split VS Code extension services by heartbeat/decorations",
    project: "codbit-extension",
    tag: "refactor",
    createdAt: "2026-05-04",
  },
  {
    id: "m4",
    title: "Heatmap tooltip with exact minutes for each day",
    project: "codbit-web",
    tag: "idea",
    createdAt: "2026-05-03",
  },
];

export const projectPulse: ProjectPulseItem[] = [
  { id: "p1", name: "codbit-extension", minutesThisWeek: 418, sessions: 14, streakDays: 5 },
  { id: "p2", name: "codbit-server", minutesThisWeek: 267, sessions: 8, streakDays: 3 },
  { id: "p3", name: "codbit-web", minutesThisWeek: 356, sessions: 11, streakDays: 4 },
];
