import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {theme} from '../styles/theme';
export default function WindowTaskOverlay({task, onDone}) {
  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.kicker}>TINY BREAK TIME</Text>
        <Text style={styles.emoji}>{task.emoji}</Text>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.copy}>{task.detail}</Text>
        <Text style={styles.hint}>
          When you’re finished, ask a parent to confirm.
        </Text>
        <Pressable
          focusable
          hasTVPreferredFocus
          onPress={onDone}
          style={({focused}) => [styles.button, focused && styles.focused]}>
          <Text style={styles.buttonText}>I’M DONE — ASK A PARENT</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7,12,24,0.97)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '80%',
    maxWidth: 720,
    alignItems: 'center',
    padding: 30,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  kicker: {
    color: theme.colors.mint,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 14,
  },
  emoji: {fontSize: 70},
  title: {
    color: theme.colors.text,
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 12,
  },
  copy: {
    color: theme.colors.muted,
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
  },
  hint: {
    color: theme.colors.subtle,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 18,
  },
  button: {
    marginTop: 24,
    paddingHorizontal: 26,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: theme.colors.mint,
  },
  focused: {borderWidth: 3, borderColor: '#fff'},
  buttonText: {
    color: '#08211F',
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 0.6,
  },
});
