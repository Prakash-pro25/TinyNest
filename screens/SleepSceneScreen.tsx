import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Icon} from 'react-native-paper';
export default function SleepSceneScreen() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [dim, setDim] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setDim(true), 8000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <SafeAreaView style={[styles.container, dim && styles.dim]}>
      <View style={styles.scene}>
        <Text style={styles.star}>✦</Text>
        <Text style={styles.moon}>🌙</Text>
        <Text style={styles.title}>Your nest is quiet now</Text>
        <Text style={styles.subtitle}>
          Breathe in gently… and breathe out slowly.
        </Text>
        <View style={styles.dots}>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.dot}>•</Text>
        </View>
        <Text style={styles.note}>You are safe. You can rest.</Text>
        <TouchableOpacity
          hasTVPreferredFocus
          onPress={() => navigation.navigate('Home')}
          style={styles.homeButton}
          activeOpacity={1}>
          <Icon source="home-outline" size={17} color="#D9E4F2" />
          <Text style={styles.homeText}>Return to TinyNest</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#101827'},
  dim: {backgroundColor: '#070C17'},
  scene: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30},
  star: {
    position: 'absolute',
    top: 55,
    right: '23%',
    fontSize: 27,
    color: '#DCD4FF',
  },
  moon: {fontSize: 74},
  title: {
    color: '#F1F3FF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    color: '#B5BDD5',
    fontSize: 15,
    marginTop: 12,
    textAlign: 'center',
  },
  dots: {flexDirection: 'row', gap: 16, marginTop: 24},
  dot: {color: '#DCD4FF', fontSize: 27},
  note: {color: '#7F8BAA', fontSize: 12, marginTop: 18},
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#39425B',
    borderRadius: 13,
    paddingVertical: 11,
    paddingHorizontal: 15,
    marginTop: 40,
  },
  homeText: {color: '#D9E4F2', fontSize: 11, fontWeight: '800'},
});
