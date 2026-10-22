# TINYNEST — INTEGRATED ECOSYSTEM GUIDE

**TinyNest** is an integrated child routine, focus, and screen-time management platform designed for Android TV / Fire TV, orchestrated by a centralized Node.js REST API, and controlled by a real-time Parent Web Dashboard.

```text
hackproject/
├── tinynest-backend/           # Node.js / Express 5 / Mongoose 9 REST API
├── tinynest-parent-web-main/   # React 19 / Vite 8 Parent Web Dashboard
└── TinyNest-Fire-TV/           # React Native TV / Expo SDK 51 TV Application
```

---

## 1. ARCHITECTURE OVERVIEW

```text
                  +--------------------------------+
                  |      Parent Web Dashboard      |
                  |     (React 19 / Vite 8)        |
                  +--------------------------------+
                                  |
                                  | HTTPS / REST (Bearer JWT Auth)
                                  v
                  +--------------------------------+
                  |      TinyNest Backend API      |
                  |      (Express 5 / Node.js)     |
                  +--------------------------------+
                          |              |
           Mongoose / ORM |              | Authoritative State Engine
                          v              v (Sleep, Window, Lesson, PIN)
                 +---------------+       |
                 | MongoDB Store |       | REST State Polling (2.5s)
                 | (Local/Atlas) |       v
                 +---------------+   +-----------------------------+
                                     |    Fire TV / Android TV     |
                                     | (Embedded YouTube Player,   |
                                     |  TV Remote D-Pad Overlays)  |
                                     +-----------------------------+
```

---

## 2. PREREQUISITES (WINDOWS 11)

- **Node.js**: v20.x or higher (`node -v`)
- **Package Manager**: npm v10+ (`npm -v`)
- **Java Development Kit**: OpenJDK 17 (`java -version`, `javac -version`)
- **Android SDK**: Android API 34+ and platform tools (`adb version`), typically at `C:\Users\<username>\AppData\Local\Android\Sdk`
- **Database**: MongoDB running locally on `mongodb://127.0.0.1:27017/tinynest` or MongoDB Atlas cluster

---

## 3. PROJECT-BY-PROJECT SETUP & LAUNCH

### 3.1 TinyNest Backend (`tinynest-backend/`)

1. Navigate to the backend directory:
   ```powershell
   cd tinynest-backend
   ```
2. Configure environment variables (if `.env` does not already exist):
   ```powershell
   copy .env.example .env
   ```
3. Start the server:
   ```powershell
   npm start
   ```
   *The server automatically connects to MongoDB (with automatic fallback to local MongoDB `127.0.0.1:27017` if Atlas IP is restricted) and listens on `http://localhost:5000`.*
4. Run automated tests:
   ```powershell
   npm test
   ```

### 3.2 Parent Web Dashboard (`tinynest-parent-web-main/`)

1. Navigate to the web directory:
   ```powershell
   cd tinynest-parent-web-main
   ```
2. Configure environment variables:
   ```powershell
   copy .env.example .env
   ```
   *Contains `VITE_API_URL=http://localhost:5000/api` and `VITE_USE_MOCK=false`.*
3. Start the development server:
   ```powershell
   npm run dev
   ```
   *Opens at `http://localhost:5173`.*
4. Build for production:
   ```powershell
   npm run build
   ```

### 3.3 Fire TV / Android TV App (`TinyNest-Fire-TV/`)

1. Navigate to the Fire TV directory:
   ```powershell
   cd TinyNest-Fire-TV
   ```
2. Configure environment variables:
   ```powershell
   copy .env.example .env
   ```
3. Launch Expo Metro bundler:
   ```powershell
   npx expo start
   ```
4. Run on Android TV emulator or device:
   ```powershell
   npm run android
   ```
5. Run lint checks:
   ```powershell
   npm run lint
   ```

---

## 4. NETWORK RULES & EMULATOR CONNECTIVITY

| Client | Backend Base URL | Target Device | Notes |
| :--- | :--- | :--- | :--- |
| **Parent Web** | `http://localhost:5000/api` | Web Browser | Connects via Windows localhost |
| **Android TV Emulator** | `http://10.0.2.2:5000/api` | `Television_720p` / AVD | `10.0.2.2` routes to Windows host |
| **Physical Fire TV** | `http://<LAN_IP>:5000/api` | Physical Fire TV Stick | Replace `<LAN_IP>` with machine's Wi-Fi IP |

> **IMPORTANT**: Inside an Android emulator, `localhost` points to the emulator itself, not Windows. Always use `10.0.2.2` when connecting from the Android emulator.

---

## 5. COMPLETE END-TO-END FLOWS

### Flow 1: Device Registration & Pairing
1. Fire TV launches. If not paired, the top header prominently displays:
   `PAIRING CODE: 482910`
2. Parent opens Web Dashboard at `http://localhost:5173`.
3. Parent signs in (or creates account with 4-digit PIN, default `2468`).
4. Parent navigates to `Connect TV`, enters the 6-digit code shown on the TV and child name.
5. Backend pairs the device; TV immediately reflects: `PARENT-SUPERVISED • Leo`.

### Flow 2: Sleep Mode (Bedtime Lock)
1. Parent clicks **"Start Sleep"** on the Web Dashboard.
2. TV pauses playback immediately and plays a 5.2s gentle bedtime transition.
3. TV enters a locked black screen (`Good night`).
4. Child remote Back button cannot dismiss or bypass the lock.
5. Unlocking requires entering the 4-digit parent PIN (or parent clicking "Back to normal" on web).
6. 3 incorrect attempts trigger a 30-second lockout.

### Flow 3: Window Mode (Routine Break Task)
1. Parent clicks **"Start Health Break"** on Web Dashboard (or child selects Window mode on TV).
2. Embedded player pauses; TV displays break task (e.g. `💧 Drink some water`).
3. Child clicks **"I'M DONE — ASK A PARENT"**.
4. TV enters verification waiting state (`window-verify`). Playback remains restricted.
5. Parent Web Dashboard updates to show:
   `WAITING FOR YOUR OK • Drink some water, finished?`
6. Parent clicks **"Confirm"**. TV unlocks immediately and video resumes.

### Flow 4: Lesson Mode (Focus Timer)
1. Parent or TV starts a 15, 20, or 30-minute lesson.
2. Deadline is calculated and persisted on the backend (`deadline = Date.now() + durationMs`).
3. If TV app restarts or is backgrounded, timer recalculates accurately from backend deadline.
4. When timer reaches 00:00, playback pauses and displays `Great learning! Lesson complete`.
5. Screen remains restricted until parent verifies via PIN or Web Dashboard.

---

## 6. VERIFICATION COMMAND MATRIX

| Project | Check | Command | Result |
| :--- | :--- | :--- | :--- |
| **Backend** | API Test Suite | `cd tinynest-backend && npm test` | **PASS** (7/7 tests passed) |
| **Backend** | Health Endpoint | `GET /api/health` | **PASS** (`status: "OK", database: "connected"`) |
| **Web** | Lint Check | `cd tinynest-parent-web-main && npm run lint` | **PASS** (0 errors) |
| **Web** | Production Build | `cd tinynest-parent-web-main && npm run build` | **PASS** (Built in 218ms) |
| **Fire TV** | ESLint & Prettier | `cd TinyNest-Fire-TV && npm run lint` | **PASS** (0 errors) |
| **Fire TV** | Expo Bundling | `cd TinyNest-Fire-TV && npx expo export` | **PASS** (Android 566 modules) |

---

## 7. TROUBLESHOOTING GUIDE

- **Port Conflicts**:
  - Backend uses port `5000`. Kill rogue node processes: `Get-Process node | Stop-Process -Force`.
  - Web uses port `5173`.
  - Metro bundler uses port `8081`.
- **Database Connection Failure**:
  - The backend includes automatic fallback to local MongoDB (`mongodb://127.0.0.1:27017/tinynest`). Ensure MongoDB Windows Service is running: `Get-Service MongoDB`.
- **CORS Error**:
  - In development, the backend automatically allows any `localhost` origin and requests without origin (emulator / mobile).
- **YouTube Playback in Emulator**:
  - Ensure emulator has active internet access. If video fails, click the focusable "TRY AGAIN" button on screen.
