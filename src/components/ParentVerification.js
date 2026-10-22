import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {theme} from '../styles/theme';
const keys = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'clear',
  '0',
  'back',
];
export default function ParentVerification({
  pin,
  error,
  onDigit,
  onClear,
  onBackspace,
  onCancel,
}) {
  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.kicker}>GROWN-UPS ONLY</Text>
        <Text style={styles.title}>Parent check</Text>
        <Text style={styles.copy}>
          Enter your 4-digit parent PIN to continue.
        </Text>
        <View style={styles.dots}>
          {[0, 1, 2, 3].map(i => (
            <View
              key={i}
              style={[styles.dot, pin.length > i && styles.filled]}
            />
          ))}
        </View>
        <View style={styles.grid}>
          {keys.map((key, i) => (
            <Pressable
              key={key}
              focusable
              hasTVPreferredFocus={i === 0}
              onPress={() =>
                key === 'clear'
                  ? onClear()
                  : key === 'back'
                    ? onBackspace()
                    : onDigit(key)
              }
              style={({focused}) => [styles.key, focused && styles.focused]}>
              <Text style={styles.keyText}>
                {key === 'clear' ? 'CLEAR' : key === 'back' ? '⌫' : key}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={error ? styles.error : styles.hint}>
          {error || 'Demo PIN: 2468 — change before release'}
        </Text>
        <Pressable focusable onPress={onCancel} style={styles.cancel}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7,12,24,0.98)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '82%',
    maxWidth: 580,
    alignItems: 'center',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#40536F',
    backgroundColor: '#101A2B',
  },
  kicker: {
    color: theme.colors.mint,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 8,
  },
  copy: {color: theme.colors.muted, textAlign: 'center', marginTop: 8},
  dots: {flexDirection: 'row', gap: 14, marginVertical: 16},
  dot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#7E91AD',
  },
  filled: {backgroundColor: theme.colors.mint, borderColor: theme.colors.mint},
  grid: {
    width: 270,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  key: {
    width: 78,
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: '#1D2A40',
    borderWidth: 1,
    borderColor: '#344762',
  },
  focused: {borderColor: '#fff', borderWidth: 3},
  keyText: {color: theme.colors.text, fontSize: 16, fontWeight: '800'},
  hint: {
    color: theme.colors.subtle,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 12,
  },
  error: {
    color: theme.colors.danger,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
  },
  cancel: {marginTop: 12, padding: 10},
  cancelText: {color: theme.colors.muted, fontWeight: '900', fontSize: 11},
});
