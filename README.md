# Mapifind 🗺️

Mapifind is a Strava-like path recording and replay app with custom, labeled
geofence **zones** (e.g. "Zone 12") — built for hikers, farmers, and tourism
use cases that need both GPS trail tracking and meaningful, named areas on a
map.

## Tech stack

- **React Native** via **Expo** (Dev Client / prebuild workflow — **not** Expo
  Go, since the Mapbox native SDK requires custom native modules).
- **TypeScript**.
- **Maps**: [`@rnmapbox/maps`](https://github.com/rnmapbox/maps) (Mapbox
  native SDK), chosen over Google Maps primarily for cost reasons.
- **Navigation**: [`@react-navigation/native`](https://reactnavigation.org/)
  with native-stack + bottom-tabs.
- **State**: [Zustand](https://github.com/pmndrs/zustand).
- **Data fetching/caching**: [`@tanstack/react-query`](https://tanstack.com/query).
- **Backend**: [Supabase](https://supabase.com/) (Postgres + PostGIS + Auth)
  for accounts and cloud sync of paths/zones, via `@supabase/supabase-js`.
- **Local offline buffer**: `expo-sqlite` (scaffolded now; full offline-first
  sync logic is future work — see Roadmap).
- **Background location**: `expo-location` + `expo-task-manager`.
- **Push notifications**: `expo-notifications`.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example env file and fill in real values:

```bash
cp .env.example .env
```

| Variable                        | Description                                                                                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MAPBOX_ACCESS_TOKEN`           | Mapbox **public** access token (`pk.*`), used at runtime to render maps/styles. Create one at [account.mapbox.com/access-tokens](https://account.mapbox.com/access-tokens/). |
| `MAPBOX_DOWNLOAD_TOKEN`         | Mapbox **secret** downloads token (`sk.*` with `Downloads:Read` scope), used only during native builds to fetch the Mapbox SDK. Created at the same URL.                     |
| `EXPO_PUBLIC_SUPABASE_URL`      | Your Supabase project URL (Project Settings → API).                                                                                                                          |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public API key (Project Settings → API).                                                                                                                  |

`.env` is git-ignored — never commit real secrets. If these variables are
missing, the app still boots: Mapbox config falls back to empty strings and
the Supabase client logs a console warning and uses local placeholder values
instead of crashing.

### 3. Prebuild native projects

Because `@rnmapbox/maps` ships native code, this project uses **Continuous
Native Generation** — the `ios/` and `android/` folders are generated, not
committed. Generate them with:

```bash
npx expo prebuild
```

### 4. Run on a device/simulator via a dev client build

**Expo Go will not work** for this app — Mapbox's native module isn't part of
the Expo Go runtime. Instead, build and install a custom dev client:

```bash
npx expo run:ios      # or
npx expo run:android
```

Once the dev client is installed, iterate with:

```bash
npx expo start
```

### Useful scripts

```bash
npm run lint         # ESLint
npm run lint:fix      # ESLint with autofix
npm run format        # Prettier --write
npm run format:check  # Prettier --check
npm run typecheck     # tsc --noEmit
```

## Project structure

```
app.config.ts          # Expo config (Mapbox plugin, env-driven secrets)
App.tsx                # App root: providers + navigation
eas.json                # EAS Build profiles (development/preview/production)
.github/workflows/      # CI (lint/typecheck) + EAS build automation
src/
  theme/                # Color/spacing/typography design tokens
  components/           # Reusable themed UI primitives (Button, Card, ScreenContainer, SectionHeader, StatBlock)
  navigation/           # Auth stack + Main bottom-tab navigator
  screens/
    auth/               # Login / SignUp placeholders
    main/                # Map / Paths / Zones / Profile placeholders
  lib/
    supabase.ts         # Supabase client singleton (env-driven, safe fallback)
```

## Design system

The UI takes cues from two apps the team likes:

- **Asana mobile** for layout: soft, generously-rounded cards with subtle
  shadows (no hard borders), pill-shaped buttons, minimal white headers with
  a bold in-content page title instead of a colored app bar, and muted
  uppercase section labels grouping related content.
- **Apple Health** for typography: the platform system font (San Francisco on
  iOS / Roboto on Android — no custom font bundling needed), an oversized
  bold "large title" at the top of each screen, and a "big number, small
  caption" pattern (see the new `StatBlock` component) for stats like
  distance, duration, and pace.

Brand color stays green + green-shades + white (see `src/theme/theme.ts`).

## Branching strategy & releases

- **`develop`** — the active working branch. All day-to-day commits/PRs
  target this branch. Every push here triggers an automatic Android preview
  build (see CI/CD below) so testers always have the latest build.
- **`main`** — production. Only updated by merging `develop` into `main` when
  a set of changes is ready to ship. Production builds/store submissions are
  triggered manually from `main` (see CI/CD below) — never automatically.

Typical flow: branch off `develop` → PR back into `develop` → CI
(lint/typecheck) must pass → merge → preview build auto-builds → when ready
to release, open a PR from `develop` into `main` → merge → manually run the
production build workflow.

## CI/CD

Two GitHub Actions concerns, in `.github/workflows/`:

1. **`ci.yml`** — runs `npm run lint` + `npm run typecheck` on every push and
   PR to `develop`/`main`. No account setup required; runs out of the box.
2. **`eas-preview.yml`** — on every push to `develop`, builds an installable
   Android APK (EAS "preview" profile, internal distribution — no Google
   Play review needed) and posts the install link in the workflow run's job
   summary. This is how a non-technical tester (e.g. a friend) always gets
   the latest build — see **[FRIEND_TESTING.md](./FRIEND_TESTING.md)** for
   the install steps you can forward to them.
3. **`eas-production.yml`** — manually triggered (Actions tab → "Run
   workflow") from `main` only, to build (and optionally submit to the app
   store) a production release. Intentionally not automatic.

### One-time EAS/Expo setup required

The build workflows need an Expo account and a repo secret:

1. Create a free account at [expo.dev](https://expo.dev) if you don't have
   one.
2. Run `npx eas-cli@latest login` locally once, then
   `npx eas-cli@latest build:configure` from the project root — this links
   the repo to an Expo project (writes a project ID into the Expo config).
3. Generate a personal access token at
   [expo.dev → Account settings → Access tokens](https://expo.dev/accounts/[your-account]/settings/access-tokens).
4. In this GitHub repo: **Settings → Secrets and variables → Actions → New
   repository secret**, name it `EXPO_TOKEN`, paste the token.

iOS preview/production builds aren't wired up yet — Apple's internal
distribution requires an active Apple Developer Program membership
($99/year). Once you have one, add an iOS job to `eas-preview.yml` and flesh
out `ios` build settings in `eas.json`.

## Roadmap (phased)

- **Phase 0 — Setup** ✅: Expo + TypeScript scaffold, Mapbox/Supabase/navigation
  deps installed and configured, env var pattern, linting/formatting, this
  README.
- **Phase 1 — Theme + navigation shell** ✅: Green/white theme tokens, Asana +
  Apple Health-inspired design system, Auth + Main tab navigation shell,
  themed UI primitives, Supabase client singleton, GitHub CI/CD + EAS preview
  builds for tester distribution.
- **Phase 2 — Auth**: Real Supabase email/password (and/or OAuth) sign-in,
  session persistence, and gating the Main tabs behind an authenticated
  session.
- **Phase 3 — Data model**: Supabase/PostGIS schema for users, paths (GPS
  track points), and zones (named geofence polygons/circles), plus
  `expo-sqlite` offline buffering and sync.
- **Phase 4 — Path recording**: Foreground + background GPS tracking via
  `expo-location`/`expo-task-manager`, live map drawing, start/pause/stop
  controls, and saving completed paths.
- **Phase 5 — Path replay**: Animated playback of a recorded path on the map,
  with scrubbing and stats (distance, duration, elevation if available).
- **Phase 6 — Zones**: Creating, labeling, editing, and geofencing custom
  zones (e.g. "Zone 12"), with entry/exit notifications via
  `expo-notifications`.
- **Phase 7 — Polish**: Offline-first conflict resolution, sharing/export,
  performance tuning, and app store submission (EAS Build/Submit).

## Manual setup still required

- Create a **Mapbox** account and generate a public access token and a secret
  downloads token (see table above).
- Create a **Supabase** project and copy its URL + anon key into `.env`.
- Run `npx expo prebuild` and a dev client build at least once before running
  on a physical device or simulator.
- Create a free **Expo** account, run `eas login` + `eas build:configure`
  once, and add an `EXPO_TOKEN` repo secret (see CI/CD section above) so the
  automatic preview builds work.
