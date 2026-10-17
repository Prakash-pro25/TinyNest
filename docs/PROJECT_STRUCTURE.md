# Project structure and migration guide

## Why this layout

The supplied sample is a small, root-level TypeScript app. A feature-first `src/` layout is proposed for future growth, but **do not move the current files yet**. The root-level `navigation/` and `screens/` are the active implementation and must remain the source of truth until migration is done route-by-route.

## Planned `src/` layout

```text
src/
├── app/                 # providers and app composition
├── navigation/          # route names, route parameter types
├── components/tv/       # TV-focused reusable controls
├── features/
│   ├── home/
│   ├── learn/
│   ├── stories/
│   ├── play/
│   ├── move/
│   ├── wind-down/
│   ├── sleep-scene/
│   └── settings/
├── state/               # Context + useReducer, introduced when needed
├── data/                # local catalog and fallback story content
├── services/
│   ├── storage/         # persistence adapter
│   ├── schedule/        # schedule engine
│   └── api/             # future parent/backend sync
├── theme/               # palette, spacing, typography, focus styles
├── types/               # domain TypeScript types
└── utils/               # pure helpers
```

## Folder contracts

| Folder | Put here | Keep out |
|---|---|---|
| `features/<name>` | Screen, feature-specific components, hooks and model | Cross-feature general UI |
| `components/tv` | Focusable card, TV button, horizontal row, mascot panel | API calls and routine business logic |
| `state` | Reducers, actions, shared app mode state | UI styling and network requests |
| `data` | Static/local activity and fallback story definitions | Secrets or API credentials |
| `services/storage` | AsyncStorage wrapper and serialization | Direct UI rendering |
| `services/schedule` | Pure time/routine evaluation | Navigation calls |
| `services/api` | Future API client and DTO mapping | Direct component state mutation |
| `theme` | Tokens and shared focus styles | Per-screen content data |
| `types` | Reusable domain contracts | Runtime side effects |

## Suggested feature module pattern

```text
features/learn/
├── LearnScreen.tsx
├── components/
│   ├── TaskCard.tsx
│   └── FocusTimer.tsx
├── hooks/
│   └── useFocusTimer.ts
├── learn.data.ts
└── learn.types.ts
```

Do not create every file at once. Add a module when a feature is implemented. This prevents an empty architecture from obscuring the working starter.

## Safe migration sequence

1. Keep `App.tsx`, `navigation/`, `screens/`, and `components/` active.
2. Rename screen labels and contents in place, preserving `LeftHandNav` and the drawer focus logic.
3. Add `src/theme/` and `src/types/` first; these can be imported without changing navigation.
4. Implement one feature (Home) and verify the TV build.
5. Move a screen only when its import path and route are updated in the same change and the emulator test passes.
6. Remove old starter route names only after all replacements are registered and tested.
