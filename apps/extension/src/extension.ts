import * as vscode from "vscode";
import { ActivityHeartbeat } from "./features/activityHeartbeat";
import { GutterDecorations } from "./features/gutterDecorations";
import { MemoryStore } from "./features/memoryStore";
import { registerRememberSelectionCommand } from "./features/rememberSelectionCommand";
import { StatusBarTimer } from "./features/statusBarTimer";

let heartbeat: ActivityHeartbeat | undefined;
let statusBar: StatusBarTimer | undefined;
let decorations: GutterDecorations | undefined;

export function activate(context: vscode.ExtensionContext) {
  const memoryStore = new MemoryStore();
  decorations = new GutterDecorations(memoryStore);
  statusBar = new StatusBarTimer();

  registerRememberSelectionCommand(context, memoryStore, decorations);

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      decorations?.refresh(editor);
    }),
    decorations,
    statusBar
  );

  heartbeat = new ActivityHeartbeat({
    workspaceName: vscode.workspace.name ?? "unknown-project",
    onTick: (activeSeconds) => {
      statusBar?.update(activeSeconds);
    },
  });
  heartbeat.start(context);
}

export function deactivate() {
  heartbeat?.stop();
  decorations?.dispose();
  statusBar?.dispose();
}
