# TinyNest

**Tagline:** *A cozy TV companion that guides kids from play to study to sleep, without the screen-time fights.*

## Inspiration
Most TV parental controls just block or cut off the screen. That abrupt ending is where the meltdowns and arguments happen, and parents end up as the bad guy. We wanted the TV to help kids *transition* through the day, not just lock them out. The family's biggest screen is usually passive, so we asked: what if it behaved like a friendly guide instead?

## What it does
TinyNest turns a Fire TV into a gentle daily-routine companion for children, controlled by parents from their phones.

**For kids (on the TV, using only the remote):**
- Watch curated content inside the app, with a friendly character who chats and reminds them of what's next
- **Study mode:** the TV switches to study time with a focus timer, break reminders, and tasks the parent assigned, ending with a small reward
- **Wind-down:** a gentle countdown (10, 5, and 2 minutes), then a calm breathing activity or an AI-generated bedtime story with narration
- **Sleep scene:** the screen dims to a quiet night scene with soft sound and fades out

**For parents (on a phone, no install needed):**
- Set screen-time limits, bedtime, and study schedules
- Assign study tasks and set reminders
- Choose the character, story themes, and the child's age level
- Start the wind-down instantly with one tap
- See a simple dashboard of screen time used and routines completed

## How it works
The TV is always in one mode based on the time and the parent's rules:

A schedule engine drives this flow, and each mode has its own screens. The parent pairs their phone with the TV once using a 6-digit code shown on screen. After that, the TV checks for updated settings every few seconds and keeps a local copy, so routines keep running if Wi-Fi drops.

## How we built it
- **TV app:** React Native TV with Expo, React Navigation, and Context with useReducer for state, running on Fire OS
- **Parent web app:** a mobile-friendly React web page
- **Backend:** Node.js, Express, MongoDB Atlas, Mongoose, and Zod for validation
- **AI:** a language model writes age-appropriate stories and the character's lines, with text-to-speech for narration, plus pre-written fallback stories
- **Tooling:** Amazon Devices Builder Tools with our AI coding assistant, tested on the Android TV emulator

## Design choices for kids and families
- Everything on the TV works with a D-pad: large text, clear focus highlights, and no typing
- All input happens on the parent's phone
- We collect minimal data: no child photos, no voice recordings, and only an age band and preferences
- Parents stay in control, and stories use only parent-approved themes

## An honest limitation
A Fire TV app can only control the screen while it is open. TinyNest can't interrupt other apps like Netflix, and it can't power off the TV. Kids watch content inside TinyNest, and "sleep" means our app shows a dim sleep scene and fades to black. We designed around this limit rather than hiding it.

## Challenges we're tackling
- Designing smooth navigation using only a remote
- Keeping the TV and parent's phone in sync with a simple, reliable method
- Making AI stories safe and age-appropriate, with fallbacks if the connection fails
- Building a polished experience within the hackathon's time limit

## Architecture

| Part | Technology | Role |
|---|---|---|
| TV app | React Native TV (Expo), React Navigation, Context + useReducer, AsyncStorage, Axios | Kids' screen: character, study mode, wind-down, sleep scene |
| Parent web app | Small React web app (mobile-friendly) | Settings, schedules, dashboard |
| Backend | Node.js, Express, MongoDB Atlas, Mongoose, Zod | Stores settings and routines, calls the AI service |
| Hosting | GitHub, Render | Source code and API deployment |
| Pairing | 6-digit code shown on the TV | Links the parent's phone to the TV once |
| Sync | TV polls the backend every 10 to 15 seconds | Picks up settings changes, local caching if Wi-Fi drops |

**Database collections:** parentAccounts, childProfiles, routines, activityProgress, stories, parentSettings (kept minimal for child privacy).

## Scope

| Priority | Features |
|---|---|
| Must have | Pairing, schedule engine, wind-down with story and sleep scene, parent settings page |
| Should have | Study mode, mascot with spoken lines, basic dashboard |
| Skip for now | Multiple children, analytics, large content library, advanced accounts |

## Built with
React Native, Expo, React Navigation, Node.js, Express, MongoDB Atlas, Mongoose, Zod, Render, Fire OS, Android TV emulator, Amazon Devices Builder Tools