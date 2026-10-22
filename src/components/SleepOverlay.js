import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
export default function SleepOverlay() {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
    }).start();
  }, [opacity]);
  return (
    <Animated.View style={[styles.root, {opacity}]}>
      <Text style={styles.moon}>🌙</Text>
      <Text style={styles.title}>Time to sleep, little star!</Text>
      <Text style={styles.copy}>
        The moon is out. Let’s rest our eyes and get cozy. 😴
      </Text>
      <View style={styles.stars}>
        <Text style={styles.star}>✦</Text>
        <Text style={styles.star}>✧</Text>
        <Text style={styles.star}>✦</Text>
      </View>
      <Text style={styles.hint}>TinyNest is gently winding down…</Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#090D21',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  moon: {fontSize: 70},
  title: {
    color: '#F5F7FF',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 15,
    textAlign: 'center',
  },
  copy: {
    color: '#C0CBE0',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: 600,
  },
  stars: {flexDirection: 'row', gap: 36, marginTop: 24},
  star: {color: '#B8A7FF', fontSize: 24},
  hint: {color: '#8796B5', fontSize: 12, marginTop: 24, letterSpacing: 1},
});
