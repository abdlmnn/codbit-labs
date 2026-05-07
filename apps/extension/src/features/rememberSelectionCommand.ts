import * as vscode from "vscode";
import type { MemoryEntry } from "@codbit/types";
import { EXTENSION_ID } from "../constants";
import type { AnchoredMemoryEntry } from "../types";
import { MemoryStore } from "./memoryStore";
import { GutterDecorations } from "./gutterDecorations";

function buildMemoryEntry(editor: vscode.TextEditor, note: string): AnchoredMemoryEntry {
  const selection = editor.selection;
  const selectedText = editor.document.getText(selection);
  const lineNumber = selection.start.line + 1;
  const now = new Date().toISOString();

  const baseEntry: MemoryEntry = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    projectId: vscode.workspace.name ?? "unknown-project",
    content: note,
    filePath: editor.document.uri.fsPath,
    lineNumber,
    codeSnippet: selectedText || undefined,
    createdAt: now,
  };

  return {
    ...baseEntry,
    uri: editor.document.uri.toString(),
  };
}

export function registerRememberSelectionCommand(
  context: vscode.ExtensionContext,
  store: MemoryStore,
  decorations: GutterDecorations
): void {
  const disposable = vscode.commands.registerCommand(`${EXTENSION_ID}.rememberSelection`, async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.selection.isEmpty) {
      void vscode.window.showInformationMessage("Highlight some code first, then use Remember this...");
      return;
    }

    const note = await vscode.window.showInputBox({
      prompt: "Remember this...",
      placeHolder: "What should future-you remember here?",
      ignoreFocusOut: true,
    });

    if (!note || note.trim().length === 0) {
      return;
    }

    const entry = buildMemoryEntry(editor, note.trim());
    store.add(entry);
    decorations.refresh(editor);

    void vscode.window.showInformationMessage("Memory saved for this code line.");
  });

  context.subscriptions.push(disposable);
}
