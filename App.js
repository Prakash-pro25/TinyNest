import React, {useCallback, useEffect, useRef} from 'react';
import {BackHandler, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import EmbeddedYouTubePlayer from './src/components/EmbeddedYouTubePlayer';
import ModeControls from './src/components/ModeControls';
import ModeOverlay from './src/components/ModeOverlay';
import {MODES} from './src/constants/modes';
import {controlPlayer} from './src/services/playerController';
import {theme} from './src/styles/theme';
import useLessonTimer from './src/hooks/useLessonTimer';
import useModeController from './src/hooks/useModeController';

export default function App() {
  const playerRef = useRef(null);
  const sleepTimer = useRef(null);
  const controllerRef = useRef(null);

  const playerCommand = useCallback(
    action => controlPlayer(playerRef, action),
    [],
  );

  const lessonTimer = useLessonTimer(() =>
    controllerRef.current?.lessonComplete(),
  );

  const controller = useModeController({playerCommand, lessonTimer});
  controllerRef.current = controller;

  const {mode, setMode} = controller;

  // Sleep warning transition timer (5.2 seconds bedtime animation)
  useEffect(() => {
    if (mode === MODES.SLEEP_WARNING) {
      sleepTimer.current = setTimeout(() => {
        playerCommand('stop');
        setMode(MODES.SLEEP_LOCKED);
      }, 5200);
      return () => clearTimeout(sleepTimer.current);
    }
    return undefined;
  }, [mode, setMode, playerCommand]);

  // TV remote Back button handling: prevents bypassing locked screens or restrictions
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (controller.mode !== MODES.NORMAL) {
        if (controller.mode === MODES.LESSON) {
          playerCommand('pause');
        }
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [controller.mode, playerCommand]);

  const stopLesson = () => {
    playerCommand('pause');
    controller.requestVerification('lesson');
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar hidden />
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>TinyNest</Text>
          <Text style={styles.tagline}>LITTLE ROUTINES. BIG GROWTH.</Text>
        </View>
        <View style={styles.headerRight}>
          {!controller.paired && controller.pairingCode ? (
            <View style={styles.pairingBadge}>
              <Text style={styles.pairingLabel}>PAIRING CODE:</Text>
              <Text style={styles.pairingCode}>{controller.pairingCode}</Text>
            </View>
          ) : null}
          <View style={styles.live}>
            <View style={styles.dot} />
            <Text style={styles.liveText}>
              {controller.paired
                ? `PARENT-SUPERVISED • ${controller.childName || 'PAIRED'}`
                : 'PARENT-SUPERVISED'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.playerWrap}>
        <EmbeddedYouTubePlayer ref={playerRef} />
      </View>

      <ModeControls
        onSleep={controller.beginSleep}
        onWindow={controller.beginWindow}
        onLesson={controller.openLessonSetup}
      />

      <Text style={styles.footer}>
        Use your TV remote to choose a mode • TinyNest stays on this screen
      </Text>

      <ModeOverlay
        controller={controller}
        remainingMs={lessonTimer.remainingMs}
        onChooseDuration={controller.beginLesson}
        onStopLesson={stopLesson}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 28,
    paddingTop: 14,
    paddingBottom: 12,
  },
  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brand: {
    color: theme.colors.text,
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  tagline: {
    color: theme.colors.subtle,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 2,
  },
  pairingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#352512',
    borderWidth: 1,
    borderColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
  },
  pairingLabel: {
    color: '#FCD34D',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  pairingCode: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  live: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#2A665D',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: '#102722',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: theme.colors.mint,
  },
  liveText: {
    color: '#B5F7E8',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  playerWrap: {
    flex: 1,
    minHeight: 180,
  },
  footer: {
    color: '#62728A',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
    letterSpacing: 0.4,
  },
});
