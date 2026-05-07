# Codbit Server

Phase 3 backend for Codbit.

## Setup

1. Copy `.env.example` to `.env`.
2. Install dependencies from repo root.
3. Run Prisma:
   - `pnpm --filter server prisma:generate`
   - `pnpm --filter server prisma:push`
4. Start server:
   - `pnpm --filter server dev`

## Auth

All `/sync/*` endpoints require:

- Header: `x-api-key: <CODBIT_API_KEY>`

## Endpoints

- `POST /sync/heartbeat`
- `POST /sync/memory`
- `GET /sync/history?projectName=<name>&limit=20`
