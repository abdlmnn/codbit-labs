import { env } from "../config/env.js";

export function apiKeyAuth(req, res, next) {
  const headerValue = req.header("x-api-key");

  if (!headerValue || headerValue !== env.apiKey) {
    return res.status(401).json({ error: "Unauthorized: invalid API key" });
  }

  return next();
}
