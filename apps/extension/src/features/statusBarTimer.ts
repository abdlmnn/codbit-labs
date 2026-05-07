import * as vscode from "vscode";
import { EXTENSION_ID, STATUS_BAR_COLOR } from "../constants";
import { formatDuration } from "../utils/formatDuration";

export class StatusBarTimer {
  private readonly item: vscode.StatusBarItem;

  constructor() {
    this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    this.item.name = `${EXTENSION_ID}.timer`;
    this.item.color = STATUS_BAR_COLOR;
    this.item.tooltip = "Codbit active coding timer";
    this.item.text = `$(watch) ${formatDuration(0)}`;
  }

  public update(totalActiveSeconds: number): void {
    this.item.text = `$(watch) ${formatDuration(totalActiveSeconds)}`;
    this.item.show();
  }

  public dispose(): void {
    this.item.dispose();
  }
}
