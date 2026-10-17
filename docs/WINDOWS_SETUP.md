# Windows 11 setup — TinyNest Fire TV

This guide follows the uploaded Amazon Fire TV React Native starter. Commands below use PowerShell. The project currently uses Expo 51 / React Native TV 0.74-era dependencies, so first get the baseline running before upgrading anything.

## 1. Requirements

- Windows 11 64-bit.
- Node.js and npm available in PowerShell.
- JDK 17 recommended for this older Android/Gradle toolchain. Confirm with `java -version`.
- Android Studio with Android SDK, Platform-Tools, Android Emulator and an Android TV system image.
- Android TV emulator created in Device Manager, or a real Fire TV / Android TV device with developer debugging enabled.
- Enough disk space for Android Studio, SDK, emulator images and Gradle caches; exact size depends on selected SDKs and images.

## 2. Open the project

Extract the ZIP to a short path, for example:

```text
E:\Program\TinyNest-Fire-TV
```

Open that exact folder in VS Code. Open a PowerShell terminal in the project root (the folder containing `package.json`).

## 3. Check tools

```powershell
node -v
npm -v
java -version
where.exe node
where.exe npm
```

If `npm` fails in CMD but works in PowerShell, continue using PowerShell while repairing PATH/npm separately; avoid reinstalling packages repeatedly.

## 4. Android SDK environment

In Android Studio, open **SDK Manager** and note the Android SDK Location. Common default:

```text
$env:LOCALAPPDATA\Android\Sdk
```

For the current PowerShell session, set the actual location if different:

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:Path += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator"
adb --version
emulator -list-avds
```

To make variables permanent, use Windows **Environment Variables** settings, then close and reopen VS Code. Do not add a trailing slash or quote marks as part of the stored variable value.

## 5. Create/start an Android TV emulator

1. Android Studio → **More Actions** → **Virtual Device Manager** (or Device Manager).
2. Create a TV device profile (for example, a Television / Android TV profile) and install a compatible system image.
3. Start the emulator and wait until its home screen is ready.
4. Verify it is visible:

```powershell
adb devices
```

An emulator normally appears with an ID like `emulator-5554`. If multiple devices are connected, note the correct ID.

## 6. Install dependencies and run

Use the package manager that matches your working project. The starter ZIP includes `package-lock.json`, so npm is the simplest initial option:

```powershell
npm install
npm run android
```

The first Android build can take several minutes while Gradle downloads dependencies. Later builds are usually faster. Keep the terminal open and wait for the install/launch result.

If a device selection is required, use the device ID supported by the Expo CLI in your installed version, or disconnect other emulators/devices and retry.

## 7. Remote / focus test checklist

- [ ] Drawer opens and remains visible as expected.
- [ ] Up / Down changes focused item predictably.
- [ ] Left / Right moves between drawer and screen content without focus loss.
- [ ] Select activates the highlighted item.
- [ ] Back returns to a sensible previous state.
- [ ] Initial focus is visible on launch.
- [ ] Text and controls are readable from a sofa distance.
- [ ] No child workflow requires typing.

## 8. Troubleshooting

### `adb` is not recognized

Check that the Android SDK `platform-tools` directory is installed and added to PATH. Open a new terminal after changing Environment Variables.

### `emulator -list-avds` returns nothing

Create a TV virtual device in Android Studio Device Manager and download its system image.

### Build fails after a dependency upgrade

Restore the baseline dependency versions first. Do not upgrade Expo, React Native TV, Reanimated, navigation and Gradle together. Fix one compatibility layer at a time.

### Gradle says Java version is unsupported

Run `java -version` and confirm `JAVA_HOME` points to the intended JDK 17 installation. Close/reopen VS Code after environment changes.

### Build is slow or disk space is low

The first build downloads Gradle and Android dependencies. Keep the project and SDK on a drive with sufficient free space, avoid running multiple emulators simultaneously, and do not delete Gradle/SDK caches while a build is running. Stop a build with `Ctrl+C` in its terminal if needed.

### The app builds but remote focus is broken

Test the existing starter navigation before adding custom focus logic. Preserve `navigation/DrawerContent.tsx`, `navigation/DrawerItem.tsx`, and their TV focus/event handling while changing screen content incrementally.

## 9. Baseline notes

The supplied package manifest lists Expo `~51.0.13`, React `18.2.0`, `react-native` aliased to `react-native-tvos@~0.74.2-0`, React Navigation 6, and Reanimated `3.10.1`. This architecture scaffold does not attempt to update those packages. The app has not been built by this document-generation step; verify the build on your own Windows environment.
