import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {theme} from '../styles/theme';
function Control({emoji, title, subtitle, onPress, tint}) {
  return (
    <Pressable
      focusable
      onPress={onPress}
      style={({focused}) => [
        styles.control,
        {borderColor: tint},
        focused && styles.focused,
      ]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}
export default function ModeControls({onSleep, onWindow, onLesson}) {
  return (
    <View style={styles.row}>
      <Control
        emoji="🌙"
        title="SLEEP MODE"
        subtitle="Wind down and lock the screen"
        tint="#655A93"
        onPress={onSleep}
      />
      <Control
        emoji="🌿"
        title="WINDOW MODE"
        subtitle="Take a healthy little break"
        tint="#2B7770"
        onPress={onWindow}
      />
      <Control
        emoji="📚"
        title="LESSON MODE"
        subtitle="Focused learning time"
        tint="#355D91"
        onPress={onLesson}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  row: {flexDirection: 'row', gap: 14, marginTop: 14},
  control: {
    flex: 1,
    minHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 17,
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
  },
  focused: {
    borderColor: '#FFFFFF',
    borderWidth: 3,
    transform: [{scale: 1.025}],
  },
  emoji: {fontSize: 30},
  copy: {flex: 1},
  title: {
    color: theme.colors.text,
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  subtitle: {color: theme.colors.muted, fontSize: 11, marginTop: 6},
  arrow: {color: theme.colors.text, fontSize: 28},
});
