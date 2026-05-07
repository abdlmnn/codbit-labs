import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { getHistory, saveHeartbeat, saveMemory } from "../services/syncService.js";

export const syncRoutes = Router();

syncRoutes.post("/heartbeat", asyncHandler(async (req, res) => {
  const { timestamp, durationMinutes, status, projectName } = req.body ?? {};
  if (!timestamp || typeof durationMinutes !== "number" || !status || !projectName) {
    return res.status(400).json({ error: "Invalid heartbeat payload" });
  }

  const session = await saveHeartbeat({ timestamp, durationMinutes, status, projectName });
  return res.status(201).json({ ok: true, sessionId: session.id });
}));

syncRoutes.post("/memory", asyncHandler(async (req, res) => {
  const { content, filePath, lineNumber, codeSnippet, projectName, tag } = req.body ?? {};
  if (!content || !filePath || typeof lineNumber !== "number" || !projectName) {
    return res.status(400).json({ error: "Invalid memory payload" });
  }

  const memory = await saveMemory({
    content,
    filePath,
    lineNumber,
    codeSnippet,
    projectName,
    tag,
  });
  return res.status(201).json({ ok: true, memoryId: memory.id });
}));

syncRoutes.get("/history", asyncHandler(async (req, res) => {
  const projectName = req.query.projectName;
  const limit = Number(req.query.limit ?? "20");
  if (typeof projectName !== "string" || !projectName) {
    return res.status(400).json({ error: "projectName query param is required" });
  }

  const history = await getHistory(projectName, Number.isNaN(limit) ? 20 : limit);
  return res.json({ ok: true, items: history });
}));
