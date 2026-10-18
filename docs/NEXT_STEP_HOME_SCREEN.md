# TinyNest Milestone 1 — Home screen and TV navigation

## Implemented in this starter

- Replaced the placeholder Home screen with a TinyNest-branded home dashboard.
- Added four large activity cards: Learn, Stories, Play and Move.
- Added first-pass activity landing screens with D-pad focus highlights.
- Updated the existing React Navigation drawer to route to Home, Learn, Stories, Play, Move and Settings.
- Preserved the original TV-oriented drawer implementation and dependency versions.
- No backend, AI calls, accounts, network requirements or child data collection were added.

## Important status

The activity screens are UI scaffolds. Their cards are intentionally previews and do not yet launch working lessons, stories, games, timers or motion activities. The schedule engine, wind-down countdown, sleep scene, persistent progress and parent pairing are future milestones.

## Windows 11 run instructions

Open PowerShell in the project root (the folder containing `package.json`):

```powershell
node -v
npm -v
java -version
adb devices
npm install
npm run android
```

Start an Android TV emulator in Android Studio Device Manager before running `adb devices`. Keep the project's Expo 51 / React Native TV 0.74 dependency versions unchanged until the first native build succeeds. The first Gradle build can take several minutes.

If this is being applied to an existing working TinyNest folder, copy the changed `screens` and `navigation` files into a backup/branch first rather than overwriting the only working copy.

## Remote-control QA checklist

- [ ] Home opens by default.
- [ ] The Learn card receives initial focus.
- [ ] D-pad movement visibly highlights cards.
- [ ] Select opens each corresponding activity screen.
- [ ] Drawer entries navigate to the matching screen.
- [ ] Back returns according to expected navigation behavior.
- [ ] Focus remains visible and controls remain usable at TV resolution.
