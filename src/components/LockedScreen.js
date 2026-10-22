import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
export default function LockedScreen({onUnlock}) {
  return (
    <View style={styles.root}>
      <Text style={styles.moon}>🌙</Text>
      <Text style={styles.title}>Good night</Text>
      <Text style={styles.copy}>
        This screen is resting. Ask a parent to unlock TinyNest.
      </Text>
      <Pressable
        focusable
        hasTVPreferredFocus
        onPress={onUnlock}
        style={({focused}) => [styles.button, focused && styles.focused]}>
        <Text style={styles.buttonText}>PARENT UNLOCK</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  moon: {fontSize: 52},
  title: {color: '#F8FAFF', fontSize: 30, fontWeight: '900', marginTop: 12},
  copy: {
    color: '#9AA7B8',
    fontSize: 15,
    textAlign: 'center',
    maxWidth: 460,
    marginTop: 10,
  },
  button: {
    marginTop: 25,
    paddingHorizontal: 26,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: '#65E7D3',
  },
  focused: {borderWidth: 3, borderColor: '#fff'},
  buttonText: {color: '#08211F', fontWeight: '900', letterSpacing: 1},
});
