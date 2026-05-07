import type { AnchoredMemoryEntry } from "../types";

export class MemoryStore {
  private readonly entriesByUri = new Map<string, AnchoredMemoryEntry[]>();

  public add(entry: AnchoredMemoryEntry): void {
    const existing = this.entriesByUri.get(entry.uri) ?? [];
    existing.push(entry);
    this.entriesByUri.set(entry.uri, existing);
  }

  public getByUri(uri: string): AnchoredMemoryEntry[] {
    return this.entriesByUri.get(uri) ?? [];
  }
}
