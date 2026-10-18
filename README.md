# TinyNest — Fire TV MVP

A child-friendly routine companion for Amazon Fire TV / Fire OS, built on the supplied React Native TV starter. The existing React Navigation drawer and TV D-pad navigation have been preserved.

## MVP features in this ZIP

- **Home:** TinyNest welcome screen and shortcuts to Learn, Stories, Play and Move.
- **Learn & Study:** Word Garden / Number Trail / Focus Time choices and a working five-minute focus timer with pause/reset/completion state.
- **Stories:** Three built-in offline stories with page-by-page reading.
- **Play:** A simple four-card memory-match game with move count and replay.
- **Move:** Animal moves, rainbow stretch and a guided breathing toggle.
- **Wind-down:** 10-, 5- and 2-minute countdown presets; after the timer finishes, continue to the sleep scene.
- **Sleep Scene:** Calm in-app night screen with a delayed dim state.
- **Settings:** Demo parent preferences and child age band.
- **TV navigation:** Permanent left drawer, large touch targets, focus styling and Select/Back flows.

## Important scope notes

This is a front-end hackathon MVP. Settings are held in React component state and reset when the app restarts. It does not yet include AsyncStorage persistence, parent-phone pairing, a backend, cloud sync, AI-generated stories, text-to-speech, or actual system-level TV power/screen control. A Fire TV app can only display its sleep scene while the app is open.

## Stack

- Expo SDK 51 baseline
- React 18
- `react-native-tvos` 0.74.x alias
- React Navigation Drawer 6
- React Native Paper icons
- TypeScript

Do not upgrade Expo / React Native versions until the current native build is verified.

## Windows 11 setup

Prerequisites: Node.js/npm, JDK 17, Android Studio with Android SDK/platform tools, and a configured Android TV emulator.

```powershell
node -v
npm -v
java -version
adb devices
```

Open PowerShell in this directory (the folder containing `package.json`):

```powershell
npm install
npm run android
```

For the first build, Gradle may need several minutes to download and compile dependencies. Ensure the Android TV emulator is already running and appears in `adb devices`.

For Metro-only development:

```powershell
npm start
```

If Metro cache causes a stale bundle:

```powershell
npx expo start --clear
```

## TV test checklist

1. Home screen loads without red screen or invalid icon warnings.
2. D-pad focus is visible on cards and drawer entries.
3. Select opens the expected route/activity.
4. Back returns to the previous story flow where applicable.
5. Study timer can start, pause and reset.
6. Story pages advance and finish back to the story list.
7. Memory game can find both pairs and replay.
8. Wind-down timer can be paused and reaches the sleep scene.
9. Settings toggles respond to the remote.

## Existing navigation files

- `navigation/LeftHandNav.tsx` — route registration
- `navigation/DrawerContent.tsx` — collapsible TV drawer and remote handling
- `navigation/DrawerItem.tsx` — focusable drawer entries
- `screens/` — current working screen implementation

The planned `src/` folders are retained as an incremental migration scaffold. The active screens stay in `screens/` to minimize risk to the working starter.
