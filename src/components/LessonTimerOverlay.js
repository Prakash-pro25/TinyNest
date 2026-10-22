import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
export default function LessonTimerOverlay({remainingMs, onStop}) {
  const s = Math.ceil(remainingMs / 1000);
  const label = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  return (
    <View style={styles.root}>
      <View style={styles.timer}>
        <Text style={styles.label}>LESSON TIME LEFT</Text>
        <Text style={styles.value}>{label}</Text>
      </View>
      <Pressable
        focusable
        onPress={onStop}
        style={({focused}) => [styles.stop, focused && styles.focused]}>
        <Text style={styles.stopText}>END LESSON</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {position: 'absolute', top: 18, right: 20, alignItems: 'flex-end'},
  timer: {
    backgroundColor: 'rgba(8,13,24,0.94)',
    borderColor: '#4773A9',
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  label: {color: '#B8D7FF', fontSize: 9, fontWeight: '900', letterSpacing: 1.4},
  value: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
    marginTop: 2,
  },
  stop: {
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: '#40232D',
    borderWidth: 1,
    borderColor: '#844151',
  },
  focused: {borderColor: '#fff', borderWidth: 3},
  stopText: {color: '#FFDCE3', fontSize: 11, fontWeight: '900'},
});
