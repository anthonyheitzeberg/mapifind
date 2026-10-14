# Mapifind

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
src/
  theme/                # Color/spacing/typography design tokens
  components/           # Reusable themed UI primitives (Button, Card, ScreenContainer)
  navigation/           # Auth stack + Main bottom-tab navigator
  screens/
    auth/               # Login / SignUp placeholders
    main/                # Map / Paths / Zones / Profile placeholders
  lib/
    supabase.ts         # Supabase client singleton (env-driven, safe fallback)
```

## Roadmap (phased)

- **Phase 0 — Setup** ✅: Expo + TypeScript scaffold, Mapbox/Supabase/navigation
  deps installed and configured, env var pattern, linting/formatting, this
  README.
- **Phase 1 — Theme + navigation shell** ✅: Green/white theme tokens, Auth +
  Main tab navigation shell, themed UI primitives, Supabase client singleton.
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
