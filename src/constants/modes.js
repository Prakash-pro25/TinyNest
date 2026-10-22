export const MODES = Object.freeze({
  NORMAL: 'normal',
  SLEEP_WARNING: 'sleep-warning',
  SLEEP_LOCKED: 'sleep-locked',
  WINDOW_TASK: 'window-task',
  WINDOW_VERIFY: 'window-verify',
  LESSON_SETUP: 'lesson-setup',
  LESSON: 'lesson',
  LESSON_COMPLETE: 'lesson-complete',
  LESSON_VERIFY: 'lesson-verify',
});
export const LESSON_DURATIONS = [15, 20, 30];
export const WINDOW_TASKS = [
  {
    emoji: '💧',
    title: 'Drink some water',
    detail: 'Take a little break and drink a glass of water.',
  },
  {
    emoji: '🧸',
    title: 'Tidy your toys',
    detail: 'Put a few toys back in their place.',
  },
  {
    emoji: '🌟',
    title: 'Stretch like a star',
    detail: 'Stand up, stretch gently, and take a deep breath.',
  },
  {
    emoji: '🪥',
    title: 'Brush your teeth',
    detail: 'Ask a grown-up if it is time to brush your teeth.',
  },
];
