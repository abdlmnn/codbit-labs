import * as vscode from "vscode";
import { MemoryStore } from "./memoryStore";

export class GutterDecorations {
  private readonly decorationType: vscode.TextEditorDecorationType;

  constructor(private readonly store: MemoryStore) {
    this.decorationType = vscode.window.createTextEditorDecorationType({
      isWholeLine: true,
      overviewRulerLane: vscode.OverviewRulerLane.Left,
      overviewRulerColor: "rgba(142, 197, 255, 0.9)",
      gutterIconSize: "contain",
      before: {
        contentText: "●",
        color: "#8ec5ff",
        margin: "0 8px 0 0",
      },
    });
  }

  public refresh(editor: vscode.TextEditor | undefined): void {
    if (!editor) {
      return;
    }

    const entries = this.store.getByUri(editor.document.uri.toString());
    const decorations = entries.map((entry) => {
      const line = Math.max(0, entry.lineNumber - 1);
      const range = new vscode.Range(line, 0, line, 0);
      return {
        range,
        hoverMessage: `$(note) ${entry.content}`,
      };
    });

    editor.setDecorations(this.decorationType, decorations);
  }

  public dispose(): void {
    this.decorationType.dispose();
  }
}
