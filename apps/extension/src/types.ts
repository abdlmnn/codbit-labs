import type { ActivityHeartBeat, MemoryEntry } from "@codbit/types";

export type ActivityStatus = ActivityHeartBeat["status"];

export interface AnchoredMemoryEntry extends MemoryEntry {
  uri: string;
}
