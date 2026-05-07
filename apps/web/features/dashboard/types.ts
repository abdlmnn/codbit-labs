export interface DayActivity {
  dateLabel: string;
  minutes: number;
}

export interface MemoryItem {
  id: string;
  title: string;
  project: string;
  tag: "bug" | "idea" | "refactor" | "feature";
  createdAt: string;
}

export interface ProjectPulseItem {
  id: string;
  name: string;
  minutesThisWeek: number;
  sessions: number;
  streakDays: number;
}
