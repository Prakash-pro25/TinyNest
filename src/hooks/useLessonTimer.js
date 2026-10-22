import {useCallback, useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

export default function useLessonTimer(onComplete) {
  const [deadline, setDeadline] = useState(null);
  const [remainingMs, setRemainingMs] = useState(0);
  const completedRef = useRef(false);

  const start = useCallback(minutes => {
    completedRef.current = false;
    const end = Date.now() + minutes * 60000;
    setDeadline(end);
    setRemainingMs(minutes * 60000);
    return end;
  }, []);

  const syncWithServer = useCallback((serverDeadline, serverRemainingMs) => {
    if (!serverDeadline) {
      return;
    }
    completedRef.current = false;
    setDeadline(serverDeadline);
    const calculated = Math.max(0, serverDeadline - Date.now());
    setRemainingMs(calculated > 0 ? calculated : serverRemainingMs || 0);
  }, []);

  const clear = useCallback(() => {
    completedRef.current = false;
    setDeadline(null);
    setRemainingMs(0);
  }, []);

  useEffect(() => {
    if (!deadline) {
      return undefined;
    }

    const tick = () => {
      const next = Math.max(0, deadline - Date.now());
      setRemainingMs(next);
      if (next <= 0 && !completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    };

    tick();
    const interval = setInterval(tick, 500);
    const sub = AppState.addEventListener('change', state => {
      if (state === 'active') {
        tick();
      }
    });

    return () => {
      clearInterval(interval);
      sub.remove();
    };
  }, [deadline, onComplete]);

  return {deadline, remainingMs, start, syncWithServer, clear};
}
