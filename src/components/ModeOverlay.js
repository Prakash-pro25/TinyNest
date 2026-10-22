import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MODES} from '../constants/modes';
import {theme} from '../styles/theme';
import SleepOverlay from './SleepOverlay';
import WindowTaskOverlay from './WindowTaskOverlay';
import LessonTimerOverlay from './LessonTimerOverlay';
import ParentVerification from './ParentVerification';
import LockedScreen from './LockedScreen';

export default function ModeOverlay({
  controller,
  remainingMs,
  onChooseDuration,
  onStopLesson,
}) {
  const {mode} = controller;

  if (mode === MODES.NORMAL) {
    return null;
  }
  if (mode === MODES.SLEEP_WARNING) {
    return <SleepOverlay />;
  }
  if (mode === MODES.SLEEP_LOCKED) {
    return <LockedScreen onUnlock={controller.unlockSleep} />;
  }

  if (mode === MODES.WINDOW_TASK) {
    return (
      <WindowTaskOverlay
        task={controller.task}
        onDone={() => controller.childCompleteTask()}
      />
    );
  }

  if (mode === MODES.WINDOW_VERIFY || mode === MODES.LESSON_VERIFY) {
    return (
      <ParentVerification
        pin={controller.pin}
        error={controller.pinError}
        onDigit={controller.enterDigit}
        onClear={controller.clearPin}
        onBackspace={controller.backspacePin}
        onCancel={controller.cancelVerification}
      />
    );
  }

  if (mode === MODES.LESSON_SETUP) {
    return (
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.emoji}>📚✨</Text>
          <Text style={styles.heading}>Choose learning time</Text>
          <Text style={styles.copy}>Pick a short, focused lesson.</Text>
          <View style={styles.durations}>
            {[15, 20, 30].map((n, i) => (
              <Pressable
                key={n}
                focusable
                hasTVPreferredFocus={i === 0}
                onPress={() => onChooseDuration(n)}
                style={({focused}) => [
                  styles.durationBtn,
                  focused && styles.focused,
                ]}>
                <Text style={styles.durationText}>{n} MIN</Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            focusable
            onPress={() => controller.setMode(MODES.NORMAL)}
            style={({focused}) => [
              styles.cancelBtn,
              focused && styles.focused,
            ]}>
            <Text style={styles.cancelText}>CANCEL</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (mode === MODES.LESSON) {
    return (
      <LessonTimerOverlay remainingMs={remainingMs} onStop={onStopLesson} />
    );
  }

  if (mode === MODES.LESSON_COMPLETE) {
    return (
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.emoji}>📚⭐</Text>
          <Text style={styles.heading}>Great learning!</Text>
          <Text style={styles.copy}>
            Your {controller.lessonMinutes}-minute lesson is complete.
          </Text>
          <Text style={styles.hint}>
            Ask a parent before starting another routine.
          </Text>
          <Pressable
            focusable
            hasTVPreferredFocus
            onPress={() => controller.requestVerification('lesson')}
            style={({focused}) => [
              styles.actionBtn,
              focused && styles.focused,
            ]}>
            <Text style={styles.actionText}>PARENT VERIFICATION</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7,12,24,0.97)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '82%',
    maxWidth: 760,
    alignItems: 'center',
    padding: 30,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  emoji: {
    fontSize: 58,
    marginBottom: 12,
  },
  heading: {
    color: theme.colors.text,
    fontSize: 29,
    fontWeight: '900',
    textAlign: 'center',
  },
  copy: {
    color: theme.colors.muted,
    fontSize: 17,
    textAlign: 'center',
    marginTop: 12,
  },
  durations: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 26,
  },
  durationBtn: {
    backgroundColor: theme.colors.mint,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 28,
  },
  durationText: {
    color: '#08211F',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  focused: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    transform: [{scale: 1.05}],
  },
  hint: {
    color: theme.colors.muted,
    fontSize: 13,
    marginTop: 20,
    textAlign: 'center',
  },
  actionBtn: {
    backgroundColor: theme.colors.mint,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 24,
  },
  actionText: {
    color: '#08211F',
    fontWeight: '900',
    letterSpacing: 1,
    fontSize: 14,
  },
  cancelBtn: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  cancelText: {
    color: theme.colors.muted,
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 1,
  },
});
