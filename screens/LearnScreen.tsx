import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-paper';

const tasks = [
  {
    title: 'Word Garden',
    detail:
      'Say the word, then think of something that begins with the same sound.',
    icon: 'flower-outline',
    color: '#FFD166',
  },
  {
    title: 'Number Trail',
    detail:
      'Count five things you can see around you. Can you count backwards too?',
    icon: 'numeric',
    color: '#5EEAD4',
  },
  {
    title: 'Focus Time',
    detail:
      'Take a calm study moment. Sit comfortably and finish one small task.',
    icon: 'timer-outline',
    color: '#BCA4FF',
  },
];
const STUDY_SECONDS = 5 * 60;
const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

export default function LearnScreen() {
  const [selected, setSelected] = useState(0);
  const [seconds, setSeconds] = useState(STUDY_SECONDS);
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    if (!running || complete) return undefined;
    const timer = setInterval(
      () => setSeconds(value => Math.max(0, value - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [running, complete]);
  useEffect(() => {
    if (seconds === 0) {
      setRunning(false);
      setComplete(true);
    }
  }, [seconds]);
  const task = tasks[selected];
  const reset = () => {
    setRunning(false);
    setComplete(false);
    setSeconds(STUDY_SECONDS);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Icon source="book-open-page-variant" size={32} color="#FFD166" />
          </View>
          <View>
            <Text style={styles.kicker}>LITTLE STEPS, BIG DISCOVERIES</Text>
            <Text style={styles.title}>Learn & Study</Text>
            <Text style={styles.subtitle}>
              One small step at a time is a big achievement.
            </Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Pick a learning activity</Text>
        <View style={styles.taskRow}>
          {tasks.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              hasTVPreferredFocus={index === 0}
              onFocus={() => setSelected(index)}
              onPress={() => {
                setSelected(index);
                reset();
              }}
              style={[styles.taskCard, selected === index && styles.focused]}
              activeOpacity={1}>
              <Icon source={item.icon} size={28} color={item.color} />
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskSub}>
                {index === 0
                  ? 'Words & sounds'
                  : index === 1
                    ? 'Count & notice'
                    : 'Calm focus'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.mainPanel}>
          <View style={styles.taskCopy}>
            <Text style={styles.kicker}>TODAY'S LITTLE CHALLENGE</Text>
            <Text style={styles.panelTitle}>{task.title}</Text>
            <Text style={styles.panelDetail}>{task.detail}</Text>
            <View style={styles.taskChip}>
              <Icon source="check-circle-outline" size={17} color="#5EEAD4" />
              <Text style={styles.chipText}>No rush — try your best</Text>
            </View>
          </View>
          <View style={styles.timerPanel}>
            <Text style={styles.timerLabel}>
              {complete ? 'WELL DONE!' : 'FOCUS TIMER'}
            </Text>
            <Text style={styles.timer}>
              {complete ? '⭐' : formatTime(seconds)}
            </Text>
            <Text style={styles.timerHint}>
              {complete ? 'You earned a star!' : '5 minute practice'}
            </Text>
            <TouchableOpacity
              hasTVPreferredFocus={false}
              onPress={() => (complete ? reset() : setRunning(value => !value))}
              onFocus={() => {}}
              style={styles.primaryButton}
              activeOpacity={1}>
              <Icon
                source={complete ? 'refresh' : running ? 'pause' : 'play'}
                size={18}
                color="#102033"
              />
              <Text style={styles.primaryText}>
                {complete ? 'Again' : running ? 'Pause' : 'Start focus'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={reset}
              style={styles.secondaryButton}
              activeOpacity={1}>
              <Text style={styles.secondaryText}>Reset timer</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.footer}>
          GROWN-UP TIP • A parent can set a study task and schedule in the
          future parent controls.
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
    backgroundColor: '#3C3422',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 17,
  },
  kicker: {
    color: '#8DA1B9',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.7,
  },
  title: {color: '#FFF', fontSize: 29, fontWeight: '900', marginTop: 3},
  subtitle: {color: '#B8C6D8', fontSize: 12, marginTop: 4},
  sectionTitle: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },
  taskRow: {flexDirection: 'row', gap: 12},
  taskCard: {
    flex: 1,
    backgroundColor: '#182638',
    borderRadius: 16,
    padding: 15,
    borderWidth: 3,
    borderColor: 'transparent',
    minHeight: 100,
  },
  focused: {borderColor: '#FFF', backgroundColor: '#213349'},
  taskTitle: {color: '#FFF', fontSize: 14, fontWeight: '800', marginTop: 9},
  taskSub: {color: '#9FB0C4', fontSize: 10, marginTop: 4},
  mainPanel: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1A2A3C',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A3D50',
    padding: 22,
    marginTop: 18,
    alignItems: 'center',
  },
  taskCopy: {flex: 1, paddingRight: 20},
  panelTitle: {color: '#FFF', fontSize: 25, fontWeight: '900', marginTop: 10},
  panelDetail: {
    color: '#B8C6D8',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    maxWidth: 400,
  },
  taskChip: {flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 17},
  chipText: {color: '#B8F4E6', fontSize: 11, fontWeight: '700'},
  timerPanel: {
    width: 210,
    alignItems: 'center',
    backgroundColor: '#111D2C',
    borderRadius: 18,
    padding: 17,
  },
  timerLabel: {
    color: '#8DA1B9',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  timer: {color: '#FFF', fontSize: 34, fontWeight: '900', marginTop: 6},
  timerHint: {color: '#8DA1B9', fontSize: 10, marginBottom: 12},
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: '#5EEAD4',
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 12,
    width: '100%',
  },
  primaryText: {color: '#102033', fontSize: 12, fontWeight: '900'},
  secondaryButton: {paddingVertical: 10, marginTop: 4},
  secondaryText: {color: '#A8B8CA', fontSize: 11, fontWeight: '700'},
  footer: {
    color: '#70859E',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginTop: 15,
  },
});
