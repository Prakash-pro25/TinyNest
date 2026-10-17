# TinyNest — Fire TV app

*A cozy TV companion that guides kids from play to study to sleep, without the screen-time fights.*

This project begins from Amazon's `hello-world-fire-tv-react-native` sample. The existing React Native TV drawer and D-pad-aware drawer components are preserved as the working navigation layer. The `src/` tree is a planned feature architecture scaffold; it is not wired into the app yet. Keep using the current root-level `App.tsx`, `navigation/`, and `screens/` until each migration step is implemented and tested.

## MVP scope (TV first)

1. Home: show current mode, friendly mascot message, and the next activity.
2. Learn / Study: parent-assigned tasks, focus timer, break reminder, small completion reward.
3. Stories: curated or locally bundled stories, parent-approved themes, narration when available.
4. Play: age-appropriate guided play activities.
5. Move: simple movement and breathing activities that work with the remote.
6. Wind-down: 10 / 5 / 2-minute transition reminders, then a calm activity.
7. Sleep scene: dim, quiet scene and fade-out while TinyNest remains open.
8. Parent controls (later milestone): pairing code, schedule, limits, bedtime, and a small progress summary.

## Important platform limitation

TinyNest can only guide screen time while TinyNest itself is open. It cannot interrupt other apps such as Netflix or power off the TV. In the MVP, “sleep” is an in-app dim scene and fade to black.

## Current working entry points

- `App.tsx` — wraps the app in `NavigationContainer`.
- `navigation/LeftHandNav.tsx` — permanent left drawer and route registration.
- `navigation/DrawerContent.tsx` and `navigation/DrawerItem.tsx` — TV-oriented drawer/focus behavior.
- `screens/` — existing starter screens; replace their content incrementally.
- `app.json` — Expo TV plugin and TV banner configuration.

## Target feature architecture

See [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) for the folder tree and migration map, [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the app design, and [`docs/WINDOWS_SETUP.md`](docs/WINDOWS_SETUP.md) for Windows 11 setup and run commands.

## Run on Windows 11

Use the same package manager already used successfully in your local project. From PowerShell in this folder:

```powershell
npm install
adb devices
npm run android
```

Start an Android TV emulator first, or connect a compatible device with USB debugging enabled. Detailed setup and troubleshooting: [`docs/WINDOWS_SETUP.md`](docs/WINDOWS_SETUP.md).

## Baseline compatibility

This starter uses Expo `~51.0.13`, React `18.2.0`, `react-native-tvos` `~0.74.2-0`, React Navigation Drawer `6.x`, and Reanimated `3.10.1`. Keep this baseline stable while the current build is verified. Do not upgrade Expo / React Native / TV packages as part of a folder-only refactor.

## Development rule

Make small, testable changes. After each navigation or focus change, run the app on the Android TV emulator and verify Up / Down / Left / Right / Select / Back with a remote or emulator controls.
