export interface MemoryEntry {
  id: string;
  projectId: string;
  content: string;
  filePath: string;
  lineNumber: number;
  codeSnippet?: string;
  createdAt: string;
}

export interface ActivityHeartBeat {
  timestamp: number;
  durationMinutes: number;
  status: "active" | "none";
  projectName: string;
}

export interface UserStats {
  totalMinutesToday: number;
  unfinishedThoughts: number;
}
