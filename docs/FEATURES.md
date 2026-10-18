# TinyNest implemented MVP feature map

| Screen | Implemented behavior | Notes |
|---|---|---|
| Home | Activity cards navigate to Learn, Stories, Play and Move; wind-down shortcut | Existing drawer navigation preserved |
| Learn | Three task choices; five-minute timer; start/pause/reset; completion reward | Timer is session-only |
| Stories | Three built-in stories; choose a story; next-page and finish flow | Text only; narration is not implemented |
| Play | Memory match with two pairs; move counter; replay | A small proof-of-concept game |
| Move | Select movement prompts; breathing mode toggles inhale/exhale guidance | No camera or motion sensing |
| Wind-down | 10-, 5-, and 2-minute countdown presets; pause/resume; go to sleep scene | Timer runs only while this screen/app is active |
| Sleep Scene | Calm night screen and delayed dimmed background | Does not power off TV or control other apps |
| Settings | Toggle demo preferences; choose age band | Preferences reset when app restarts |

## Next implementation milestones

1. Test remote navigation on the target Fire TV / Android TV emulator.
2. Add AsyncStorage for settings and progress persistence.
3. Add a protected parent setup flow and local pairing-code screen.
4. Build and deploy the parent web dashboard and backend only after the TV MVP is stable.
5. Add narrated stories with approved offline fallback content.
