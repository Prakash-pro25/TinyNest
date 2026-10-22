import {useCallback, useEffect, useRef, useState} from 'react';
import {MODES, WINDOW_TASKS} from '../constants/modes';
import {verifyParentPinWithBackend} from '../services/parentAuth';
import {apiClient, DEFAULT_DEVICE_ID} from '../services/apiClient';

export default function useModeController({playerCommand, lessonTimer}) {
  const [mode, setMode] = useState(MODES.NORMAL);
  const [task, setTask] = useState(WINDOW_TASKS[0]);
  const [lessonMinutes, setLessonMinutes] = useState(15);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [verifyOrigin, setVerifyOrigin] = useState('window');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [lockedUntil, setLockedUntil] = useState(0);
  const [pairingCode, setPairingCode] = useState('');
  const [paired, setPaired] = useState(false);
  const [childName, setChildName] = useState('');
  const [deviceId] = useState(DEFAULT_DEVICE_ID);

  const modeRef = useRef(mode);
  modeRef.current = mode;

  // Initial Device Registration
  useEffect(() => {
    let mounted = true;
    apiClient.registerDevice(deviceId, 'Living Room Fire TV').then(res => {
      if (!mounted || !res.ok || !res.data?.data) {
        return;
      }
      const d = res.data.data;
      setPairingCode(d.pairingCode || '');
      setPaired(Boolean(d.paired));
    });
    return () => {
      mounted = false;
    };
  }, [deviceId]);

  // Periodic Backend Synchronization Loop
  useEffect(() => {
    let mounted = true;
    const syncState = async () => {
      const res = await apiClient.getDeviceState(deviceId);
      if (!mounted || !res.ok || !res.data?.data) {
        return;
      }

      const serverState = res.data.data;
      setPaired(Boolean(serverState.paired));
      if (serverState.childName) {
        setChildName(serverState.childName);
      }
      if (serverState.pairingCode) {
        setPairingCode(serverState.pairingCode);
      }

      const serverMode = serverState.currentMode;
      const current = modeRef.current;

      // Handle server-initiated mode transitions
      if (serverMode && serverMode !== current) {
        if (serverMode === 'sleep-locked' || serverMode === 'sleep-warning') {
          playerCommand('pause');
          setMode(MODES.SLEEP_LOCKED);
        } else if (serverMode === 'window-task') {
          playerCommand('pause');
          if (serverState.activeTask) {
            setTask({
              taskId: serverState.activeTask.taskId,
              title: serverState.activeTask.title || 'Break time',
              detail: serverState.activeTask.detail || 'Take a quick rest.',
              emoji: serverState.activeTask.emoji || '🌿',
            });
          }
          setMode(MODES.WINDOW_TASK);
        } else if (serverMode === 'lesson') {
          if (serverState.activeLesson?.deadline) {
            lessonTimer.syncWithServer(
              serverState.activeLesson.deadline,
              serverState.activeLesson.remainingMs,
            );
            setActiveSessionId(serverState.activeLesson.sessionId);
            setLessonMinutes(serverState.activeLesson.durationMinutes || 15);
            setMode(MODES.LESSON);
            playerCommand('play');
          }
        } else if (serverMode === 'normal') {
          // Parent approved or unlocked from web dashboard
          lessonTimer.clear();
          setPin('');
          setPinError('');
          setMode(MODES.NORMAL);
          playerCommand('play');
        }
      }
    };

    syncState();
    const interval = setInterval(syncState, 2500);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [deviceId, lessonTimer, playerCommand]);

  const beginSleep = useCallback(() => {
    playerCommand('pause');
    setMode(MODES.SLEEP_WARNING);
  }, [playerCommand]);

  const beginWindow = useCallback(() => {
    playerCommand('pause');
    const randomTask =
      WINDOW_TASKS[Math.floor(Math.random() * WINDOW_TASKS.length)];
    setTask(randomTask);
    setMode(MODES.WINDOW_TASK);
  }, [playerCommand]);

  const childCompleteTask = useCallback(async () => {
    if (task?.taskId) {
      await apiClient.completeTask(task.taskId);
    }
    setVerifyOrigin('window');
    setPin('');
    setPinError('');
    setMode(MODES.WINDOW_VERIFY);
  }, [task]);

  const openLessonSetup = useCallback(() => setMode(MODES.LESSON_SETUP), []);

  const beginLesson = useCallback(
    async minutes => {
      setLessonMinutes(minutes);
      playerCommand('play');
      setMode(MODES.LESSON);

      // Persist session to backend
      const res = await apiClient.startLessonSession(deviceId, minutes);
      if (res.ok && res.data?.data) {
        const session = res.data.data;
        setActiveSessionId(session.sessionId);
        lessonTimer.syncWithServer(session.deadline, session.remainingMs);
      } else {
        lessonTimer.start(minutes);
      }
    },
    [deviceId, lessonTimer, playerCommand],
  );

  const lessonComplete = useCallback(async () => {
    playerCommand('pause');
    setMode(MODES.LESSON_COMPLETE);
    if (activeSessionId) {
      await apiClient.completeLessonSession(activeSessionId);
    }
  }, [activeSessionId, playerCommand]);

  const requestVerification = useCallback(origin => {
    setVerifyOrigin(origin);
    setPin('');
    setPinError('');
    setMode(origin === 'lesson' ? MODES.LESSON_VERIFY : MODES.WINDOW_VERIFY);
  }, []);

  const unlockSleep = useCallback(() => {
    setVerifyOrigin('sleep');
    setPin('');
    setPinError('');
    setMode(MODES.WINDOW_VERIFY);
  }, []);

  const enterDigit = useCallback(
    async digit => {
      const now = Date.now();
      if (now < lockedUntil) {
        setPinError(
          `Please wait ${Math.ceil((lockedUntil - now) / 1000)} seconds.`,
        );
        return;
      }

      setPinError('');
      const next = (pin + digit).slice(0, 4);
      setPin(next);

      if (next.length === 4) {
        // Authenticate with server
        const result = await verifyParentPinWithBackend(next, deviceId);
        if (result.verified) {
          setPin('');
          setPinError('');
          setLockedUntil(0);
          lessonTimer.clear();
          setMode(MODES.NORMAL);
          playerCommand('play');
        } else {
          setPin('');
          setPinError(result.message || 'That PIN did not match. Try again.');
          if (result.locked) {
            setLockedUntil(now + 30000);
          }
        }
      }
    },
    [deviceId, lessonTimer, lockedUntil, pin, playerCommand],
  );

  const cancelVerification = useCallback(() => {
    setPin('');
    setPinError('');
    if (verifyOrigin === 'sleep') {
      setMode(MODES.SLEEP_LOCKED);
    } else if (verifyOrigin === 'lesson') {
      setMode(MODES.LESSON_COMPLETE);
    } else {
      setMode(MODES.WINDOW_TASK);
    }
  }, [verifyOrigin]);

  return {
    mode,
    setMode,
    task,
    lessonMinutes,
    beginSleep,
    beginWindow,
    childCompleteTask,
    openLessonSetup,
    beginLesson,
    lessonComplete,
    requestVerification,
    unlockSleep,
    pin,
    pinError,
    enterDigit,
    clearPin: () => {
      setPin('');
      setPinError('');
    },
    backspacePin: () => setPin(v => v.slice(0, -1)),
    cancelVerification,
    pairingCode,
    paired,
    childName,
  };
}
