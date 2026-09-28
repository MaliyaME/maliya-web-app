# Repository Guidelines

This repository is a static Vite/React marketing site for Maliya, deployed to Vercel. There is no backend server or API.

## Project Structure & Module Organization
- `client/` contains the React app (entry at `client/src/main.tsx`, pages in `client/src/pages/`, shared UI in `client/src/components/`, static files in `client/public/`).
- `supabase/migrations/` records the retired waitlist table (`reg.waitlist_signups`), which still holds past signups; nothing in this repo reads or writes it.
- `vercel.json` defines the build output, SPA rewrite, security headers, and asset caching; configuration files live at the repo root.

## Build, Test, and Development Commands
```sh
npm run dev      # Starts the Vite dev server
npm run build    # Builds the static site to dist/public
npm run preview  # Serves the production build locally
npm run check    # TypeScript typecheck (no emit)
```

## Coding Style & Naming Conventions
- TypeScript is strict (`tsconfig.json`); prefer typed APIs and avoid `any`.
- Follow local file style (indentation and quotes are mixed); match existing patterns in the touched file.
- React components use `PascalCase` names; hooks are exported as `useX` and live in `client/src/hooks/`.
- Path aliases: `@/` maps to `client/src/`.

## Testing Guidelines
- No automated test runner is configured yet; there is no `npm test` script.
- If you add tests, use a `*.test.ts`/`*.test.tsx` pattern and update scripts accordingly.

## Commit & Pull Request Guidelines
- Recent commits use short, sentence‑case summaries (e.g., “Add marketing pages…”). Keep messages concise and imperative.
- PRs should include a brief summary, testing notes (e.g., `npm run check`), and screenshots for UI changes.

## Configuration & Environment
- No environment variables are required to develop, build, or deploy the site.
- Changes to `vercel.json` headers (especially `Content-Security-Policy`) must allow any new external origin the site loads from.
