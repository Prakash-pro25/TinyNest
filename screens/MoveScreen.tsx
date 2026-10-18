import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-paper';
const moves = [
  {
    title: 'Animal Moves',
    icon: 'paw-outline',
    emoji: '🐰',
    detail:
      'Hop like a bunny, stretch like a cat, then stand tall like a giraffe.',
    accent: '#FB923C',
  },
  {
    title: 'Rainbow Stretch',
    icon: 'weather-sunset',
    emoji: '🌈',
    detail:
      'Reach up high, stretch gently to each side, and relax your shoulders.',
    accent: '#BCA4FF',
  },
  {
    title: 'Calm Breathing',
    icon: 'weather-windy',
    emoji: '🌬️',
    detail: 'Breathe in slowly as the flower opens. Breathe out as it closes.',
    accent: '#5EEAD4',
  },
];
export default function MoveScreen() {
  const [selected, setSelected] = useState(0);
  const [breathing, setBreathing] = useState(false);
  const [phase, setPhase] = useState('Ready');
  const [cycles, setCycles] = useState(0);
  useEffect(() => {
    if (!breathing) return undefined;
    setPhase('Breathe in');
    const timer = setInterval(() => {
      setPhase(old => {
        if (old === 'Breathe in') return 'Breathe out';
        setCycles(v => v + 1);
        return 'Breathe in';
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [breathing]);
  const item = moves[selected];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Icon source="human-child" size={31} color="#FB923C" />
          </View>
          <View>
            <Text style={styles.kicker}>STRETCH, BREATHE AND MOVE</Text>
            <Text style={styles.title}>Move & Feel Good</Text>
            <Text style={styles.subtitle}>Little movements, happy bodies.</Text>
          </View>
        </View>
        <View style={styles.choiceRow}>
          {moves.map((move, index) => (
            <TouchableOpacity
              key={move.title}
              hasTVPreferredFocus={index === 0}
              onFocus={() => {
                setSelected(index);
                setBreathing(false);
              }}
              onPress={() => {
                setSelected(index);
                setBreathing(false);
              }}
              activeOpacity={1}
              style={[
                styles.choice,
                selected === index && styles.choiceFocused,
              ]}>
              <Text style={styles.choiceEmoji}>{move.emoji}</Text>
              <Text style={styles.choiceTitle}>{move.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.activityPanel}>
          <View style={styles.activityCopy}>
            <Text style={styles.kicker}>YOUR MOVEMENT BREAK</Text>
            <Text style={styles.panelTitle}>{item.title}</Text>
            <Text style={styles.detail}>{item.detail}</Text>
            {selected === 2 ? (
              <>
                <Text style={styles.breathPhase}>
                  {breathing ? phase : 'Ready to breathe?'}
                </Text>
                <Text style={styles.cycleText}>Breathing rounds: {cycles}</Text>
                <TouchableOpacity
                  hasTVPreferredFocus={false}
                  onPress={() => setBreathing(v => !v)}
                  style={styles.primaryButton}
                  activeOpacity={1}>
                  <Icon
                    source={breathing ? 'pause' : 'play'}
                    size={18}
                    color="#102033"
                  />
                  <Text style={styles.primaryText}>
                    {breathing ? 'Pause breathing' : 'Start breathing'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                hasTVPreferredFocus={false}
                onPress={() =>
                  setPhase(
                    phase === 'Ready'
                      ? 'Great job! Take a gentle stretch.'
                      : 'Ready',
                  )
                }
                style={styles.primaryButton}
                activeOpacity={1}>
                <Icon source="check-circle-outline" size={18} color="#102033" />
                <Text style={styles.primaryText}>
                  {phase === 'Ready' ? 'I tried it!' : 'Do it again'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.bigEmoji}>
            <Text style={{fontSize: 78}}>
              {selected === 2 && breathing
                ? phase === 'Breathe in'
                  ? '🌸'
                  : '🌼'
                : item.emoji}
            </Text>
            <Text style={styles.visualHint}>
              {selected === 2 && breathing
                ? 'Slow and steady'
                : 'Move safely with a grown-up'}
            </Text>
          </View>
        </View>
        <Text style={styles.footer}>
          SAFETY FIRST • Keep enough space around you and stop if anything feels
          uncomfortable.
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#101827'},
  content: {
    flex: 1,
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 34,
    paddingLeft: 82,
  },
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 22},
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 19,
    backgroundColor: '#3A2B25',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 17,
  },
  kicker: {
    color: '#8DA1B9',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.6,
  },
  title: {color: '#FFF', fontSize: 29, fontWeight: '900', marginTop: 3},
  subtitle: {color: '#B8C6D8', fontSize: 12, marginTop: 4},
  choiceRow: {flexDirection: 'row', gap: 12},
  choice: {
    flex: 1,
    backgroundColor: '#182638',
    borderRadius: 16,
    padding: 15,
    borderWidth: 3,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  choiceFocused: {borderColor: '#FFF', backgroundColor: '#213349'},
  choiceEmoji: {fontSize: 32},
  choiceTitle: {color: '#FFF', fontSize: 13, fontWeight: '800', marginTop: 7},
  activityPanel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2A3C',
    borderRadius: 22,
    padding: 24,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#2A3D50',
  },
  activityCopy: {flex: 1, paddingRight: 15},
  panelTitle: {color: '#FFF', fontSize: 25, fontWeight: '900', marginTop: 9},
  detail: {
    color: '#B8C6D8',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
    maxWidth: 390,
  },
  breathPhase: {
    color: '#5EEAD4',
    fontSize: 21,
    fontWeight: '900',
    marginTop: 14,
  },
  cycleText: {color: '#8DA1B9', fontSize: 11, marginTop: 5, marginBottom: 12},
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#5EEAD4',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 17,
  },
  primaryText: {color: '#102033', fontSize: 12, fontWeight: '900'},
  bigEmoji: {width: 210, alignItems: 'center', justifyContent: 'center'},
  visualHint: {
    color: '#8DA1B9',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    color: '#70859E',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
    marginTop: 15,
  },
});
