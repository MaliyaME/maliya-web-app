# Repository Guidelines

This repository is a full-stack TypeScript app with an Express API and a Vite/React client. Shared types and database schema live in `shared/` so API and UI stay aligned.

## Project Structure & Module Organization
- `client/` contains the React app (entry at `client/src/main.tsx`, pages in `client/src/pages/`, shared UI in `client/src/components/`).
- `server/` contains the Express server (`server/index.ts`) and API routing (`server/routes.ts`), plus Vite dev middleware wiring.
- `shared/` contains cross-cutting types and Drizzle schema (`shared/schema.ts`, `shared/routes.ts`).
- `script/` holds build tooling (`script/build.ts`); configuration files live at the repo root.

## Build, Test, and Development Commands
```sh
npm run dev    # Starts Express + Vite dev server (API + client)
npm run build  # Runs build pipeline and outputs production bundle
npm run start  # Runs production server from dist/
npm run check  # TypeScript typecheck (no emit)
npm run db:push # Pushes Drizzle schema to PostgreSQL
```

## Coding Style & Naming Conventions
- TypeScript is strict (`tsconfig.json`); prefer typed APIs and avoid `any`.
- Follow local file style (indentation and quotes are mixed); match existing patterns in the touched file.
- React components use `PascalCase` names; hooks are exported as `useX` and live in `client/src/hooks/`.
- Path aliases: `@/` maps to `client/src/`, `@shared/` maps to `shared/`.

## Testing Guidelines
- No automated test runner is configured yet; there is no `npm test` script.
- If you add tests, use a `*.test.ts`/`*.test.tsx` pattern and update scripts accordingly.

## Commit & Pull Request Guidelines
- Recent commits use short, sentence‑case summaries (e.g., “Add marketing pages…”). Keep messages concise and imperative.
- PRs should include a brief summary, testing notes (e.g., `npm run check`), and screenshots for UI changes.

## Configuration & Environment
- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are required for the API to write waitlist entries.
- Ensure the `reg` schema is exposed in Supabase API settings if using PostgREST access.
- Copy `.env.example` to `.env` for local development; `DATABASE_URL` is used for SQL tooling.
- `HOST` is optional; defaults to `127.0.0.1` in development and `0.0.0.0` in production.
- `REUSE_PORT` is optional; set to `true` if your environment supports port reuse.
- `PORT` is optional; defaults to `5000` in `server/index.ts`.
