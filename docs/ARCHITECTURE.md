# TinyNest Fire TV — Application Architecture

## 1. Product definition

TinyNest is a child-friendly daily-routine companion for ages 3–8. Children use the TV remote; parents configure routines from a phone-friendly web page in a later phase. The TV app should help a child transition between curated content, learning, movement, wind-down, and an in-app sleep scene.

### Principles
- **Remote first:** all core TV flows must work with D-pad and Select; no TV keyboard should be required.
- **Gentle transitions:** explain what happens next and use countdowns rather than abruptly locking the screen.
- **Parent controlled:** parent-approved themes, schedules, bedtime and study tasks.
- **Privacy by default:** MVP stores only the minimum local preferences/progress; no child photos or voice recordings.
- **Resilient:** local defaults and bundled fallback content keep basic flows usable without Wi-Fi.
- **Honest platform boundary:** the app cannot control other apps or power off the TV; sleep is a dim scene while TinyNest is open.

## 2. MVP routes and responsibilities

| Route | Purpose | MVP behaviour |
|---|---|---|
| Home | Routine dashboard | Current mode, friendly character line, next activity, clear primary action |
| Learn | Study mode | Assigned task list, focus timer, break reminder, completion reward |
| Stories | Story browser/player | Parent-approved themes, local fallback stories, narration if supported |
| Play | Guided play | Short, simple, age-appropriate activities navigable with remote |
| Move | Movement / breathing | Safe, simple movement prompts and calming breathing |
| WindDown | Transition | 10 / 5 / 2 minute notices, then a calm activity |
| SleepScene | Quiet end state | Low-brightness-looking scene, soft visual, fade to black; no claim to turn TV off |
| Settings | TV-side preferences | Basic local preferences and diagnostic information; avoid exposing parent-only controls |

Parent phone pairing, remote web app, backend, AI-generated stories and dashboard are future milestones, not prerequisites for the first TV-only prototype.

## 3. Architecture overview

```text
App.tsx
└── NavigationContainer
    └── LeftHandNav (existing permanent TV drawer)
        ├── Home
        ├── Learn
        ├── Stories
        ├── Play
        ├── Move
        ├── Settings
        └── Mode flows (WindDown / SleepScene)

Feature screens
  ├── shared TV components (focusable cards, headings, progress, mascot)
  ├── domain state (Context + useReducer, introduced when needed)
  ├── local content catalog and fallback stories
  ├── local persistence (AsyncStorage, after state model stabilizes)
  └── schedule / routine engine (local first; API sync later)
```

## 4. Current code vs target architecture

The provided starter uses root-level `App.tsx`, `navigation/`, `screens/`, and `components/`. Preserve these active paths while implementing the first milestone. The new `src/` folders in this archive are an organizational scaffold and are not imported by the app yet.

| Existing file | Keep / evolve into |
|---|---|
| `App.tsx` | App root; later wraps shared providers and navigation |
| `navigation/LeftHandNav.tsx` | TV drawer and route registration; preserve drawer type and header settings |
| `navigation/DrawerContent.tsx` | Focus-aware left rail / route labels |
| `navigation/DrawerItem.tsx` | Reusable focusable drawer item |
| `screens/HomeScreen.tsx` | Home feature screen |
| `screens/MoviesScreen.tsx` | Temporary compatibility screen; later becomes Learn or Stories after route migration |
| `screens/TVShowsScreen.tsx` | Temporary compatibility screen; later becomes Play or Move |
| `screens/SettingsScreen.tsx` | TV-safe settings / diagnostics |
| `components/Header.tsx` | Shared TV page header |
| `app.json` | TinyNest Expo name/slug and TV banner plugin configuration |

Do not delete the starter routes until equivalent TinyNest routes are registered and tested. A safe first change is to rename visible labels and screen content without changing the underlying navigation library.

## 5. Planned folder structure

```text
TinyNest-Fire-TV/
├── App.tsx                         # active app entry (existing)
├── app.json                        # Expo + TV plugin config
├── package.json                    # compatible dependency baseline
├── assets/
│   └── images/                     # app icon / Android TV banner
├── components/                     # existing shared components
│   └── Header.tsx
├── navigation/                     # existing active TV navigation
│   ├── LeftHandNav.tsx
│   ├── DrawerContent.tsx
│   └── DrawerItem.tsx
├── screens/                        # existing active screen modules
│   ├── HomeScreen.tsx
│   ├── MoviesScreen.tsx             # temporary starter route
│   ├── TVShowsScreen.tsx            # temporary starter route
│   └── SettingsScreen.tsx
├── src/                             # planned destination; not wired yet
│   ├── app/                         # providers, app-level composition
│   ├── navigation/                  # typed route names / route params
│   ├── components/tv/               # TV focusable card, rail, button, row
│   ├── features/
│   │   ├── home/                    # home dashboard + model
│   │   ├── learn/                   # tasks, focus timer, completion reward
│   │   ├── stories/                 # story catalog, player, narration adapter
│   │   ├── play/                    # short guided games
│   │   ├── move/                    # movement and breathing activities
│   │   ├── wind-down/               # countdown and transitions
│   │   ├── sleep-scene/              # calm scene and fade state
│   │   └── settings/                # safe TV-side settings
│   ├── state/                       # Context + useReducer; app and routine state
│   ├── data/                        # local activity catalog and fallback stories
│   ├── services/
│   │   ├── storage/                 # AsyncStorage adapter (add when needed)
│   │   ├── schedule/                # local routine evaluator
│   │   └── api/                     # reserved for future parent/backend sync
│   ├── theme/                       # palette, spacing, typography, focus styles
│   ├── types/                       # Activity, Routine, Settings, Progress types
│   └── utils/                       # time formatting and pure helpers
├── docs/
│   ├── ARCHITECTURE.md
│   ├── PROJECT_STRUCTURE.md
│   └── WINDOWS_SETUP.md
└── tests/                           # add focused unit tests as logic is introduced
```

## 6. Data model (TV MVP)

Use TypeScript interfaces because the provided starter is TypeScript-based.

- `Activity`: `id`, `title`, `kind` (`learn | story | play | move | breathe`), `minAge`, `maxAge`, `durationMinutes`, `contentRef`, optional `theme`.
- `Routine`: `id`, `label`, `startTime`, `endTime`, `mode`, `enabled`, optional days of week.
- `ChildPreferences`: `ageBand`, `mascotId`, `approvedStoryThemes`, `soundEnabled` — avoid storing a full birth date or unnecessary identity data.
- `ActivityProgress`: `activityId`, `status`, `startedAt`, optional `completedAt`, optional reward count.
- `ParentSettings` (future pairing/API model): screen-time limit, bedtime, study schedule, assigned task IDs, approved themes.

Store timestamps consistently and keep date/time logic in pure functions so it can be tested separately from screens.

## 7. State boundaries

Start with component-local state for screen-only UI (selected card, timer display). Add Context + `useReducer` for cross-screen app mode, current routine and activity progress when multiple screens need the same values. Keep side effects in services rather than reducers. Reducers should be pure. Do not introduce a backend just to store a demo's first content list.

## 8. TV interaction contract

- Every actionable item has a visible focused state with sufficient contrast.
- Focus order follows the visual layout and never traps the user in a row.
- Home screen opens with one predictable initial focus target.
- Select opens/starts; Back returns to the previous sensible screen or asks before leaving an active routine.
- Avoid small touch-sized controls; use large TV-safe hit areas and readable text.
- Use the existing `react-native-tvos` focus primitives / handlers where compatible; verify behaviour on the emulator rather than assuming web navigation works the same.
- Do not require text entry in the child flow.

## 9. Suggested visual system

- Background: midnight navy `#101827`; surface `#192438`; high-contrast text `#F8FAFC`; muted text `#CBD5E1`.
- Learn accent: `#FFD166`; Stories: `#A78BFA`; Play: `#5EEAD4`; Move: `#FB923C`.
- Use generous spacing, large rounded cards, restrained shadows, and short motion (roughly 150–250 ms); avoid clutter and excessive animation.
- Make focus state stronger than hover state; focus must be visible from a sofa distance.

## 10. Milestones

### M0 — Stabilize starter
1. Confirm the current app builds on the Android TV emulator.
2. Record `node -v`, `npm -v`, Java version, Android SDK path and emulator ID.
3. Keep dependency versions unchanged during architecture work.

### M1 — TinyNest shell
1. Change app name/slug to TinyNest (done in this scaffold).
2. Rename visible drawer labels to Home, Learn, Stories, Play, Move, Settings while retaining the existing drawer component.
3. Implement the Home dashboard and placeholder screens with shared theme constants.
4. Test all routes with remote focus.

### M2 — Local activity experience
1. Add typed local content data and reusable TV cards.
2. Implement Learn task selection and timer; Stories with bundled fallback; Play and Move activities.
3. Add wind-down countdown and sleep scene.

### M3 — Routine persistence
1. Add reducer-based shared mode state.
2. Add AsyncStorage behind a small adapter.
3. Add local schedule evaluation and restart recovery.

### M4 — Parent integration (after TV MVP)
1. Build phone-friendly parent web UI and pairing flow.
2. Add backend only once API contracts are agreed.
3. Poll on a sensible interval, cache the last valid settings, and handle offline state.
4. Keep child data minimal; validate all AI output and always provide prewritten fallback stories.

## 11. Definition of done for the first milestone

- Project still installs and builds using the existing compatible package set.
- App branding says TinyNest.
- Drawer can be operated using only D-pad / Select / Back.
- Home, Learn, Stories, Play, Move and Settings all resolve to a screen.
- Focus styling is visible and initial focus is predictable.
- No claim is made that TinyNest can control other apps or turn off the television.
