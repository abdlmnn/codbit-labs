import * as vscode from "vscode";
import { IDLE_TIMEOUT_MS } from "../constants";
import type { ActivityStatus } from "../types";

interface ActivityHeartbeatOptions {
  workspaceName: string;
  onTick: (activeSeconds: number, status: ActivityStatus) => void;
}

export class ActivityHeartbeat {
  private activeSeconds = 0;
  private lastInputAt = 0;
  private timer: NodeJS.Timeout | undefined;
  private status: ActivityStatus = "none";

  constructor(private readonly options: ActivityHeartbeatOptions) {}

  public start(context: vscode.ExtensionContext): void {
    context.subscriptions.push(
      vscode.workspace.onDidChangeTextDocument(() => {
        this.markInput();
      }),
      vscode.window.onDidChangeTextEditorSelection(() => {
        this.markInput();
      })
    );

    this.timer = setInterval(() => {
      const now = Date.now();
      const isActive = now - this.lastInputAt <= IDLE_TIMEOUT_MS;
      this.status = isActive ? "active" : "none";

      if (isActive) {
        this.activeSeconds += 1;
      }

      this.options.onTick(this.activeSeconds, this.status);
    }, 1000);
  }

  public stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private markInput(): void {
    this.lastInputAt = Date.now();
  }
}
