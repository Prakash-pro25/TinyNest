import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-paper';
const initial = [
  {
    title: 'Gentle reminders',
    detail: 'Show friendly routine messages',
    enabled: true,
    icon: 'bell-outline',
  },
  {
    title: 'Calm sounds',
    detail: 'Sound and narration preferences (demo)',
    enabled: false,
    icon: 'volume-high',
  },
  {
    title: 'Wind-down routine',
    detail: 'Offer a calm transition before sleep',
    enabled: true,
    icon: 'weather-night',
  },
];
export default function SettingsScreen() {
  const [options, setOptions] = useState(initial);
  const [age, setAge] = useState('3–5 years');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Icon source="cog-outline" size={31} color="#5EEAD4" />
          </View>
          <View>
            <Text style={styles.kicker}>GROWN-UP SPACE</Text>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>
              Simple choices to make TinyNest feel right for your family.
            </Text>
          </View>
        </View>
        <View style={styles.notice}>
          <Icon source="shield-check-outline" size={22} color="#5EEAD4" />
          <View style={{flex: 1}}>
            <Text style={styles.noticeTitle}>Parent controls preview</Text>
            <Text style={styles.noticeText}>
              These preferences are local demo state and reset when the app
              restarts. Pairing and cloud sync are planned for a later
              milestone.
            </Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Child age level</Text>
        <View style={styles.ageRow}>
          {['3–5 years', '6–8 years'].map(value => (
            <TouchableOpacity
              key={value}
              hasTVPreferredFocus={value === age}
              onPress={() => setAge(value)}
              style={[styles.ageButton, age === value && styles.ageActive]}
              activeOpacity={1}>
              <Text
                style={[styles.ageText, age === value && styles.ageTextActive]}>
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Routine preferences</Text>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.title}
            onPress={() =>
              setOptions(old =>
                old.map((item, i) =>
                  i === index ? {...item, enabled: !item.enabled} : item,
                ),
              )
            }
            activeOpacity={1}
            style={styles.option}>
            <View style={styles.optionIcon}>
              <Icon source={option.icon} size={23} color="#BCA4FF" />
            </View>
            <View style={styles.optionCopy}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDetail}>{option.detail}</Text>
            </View>
            <View style={[styles.toggle, option.enabled && styles.toggleOn]}>
              <View
                style={[styles.toggleKnob, option.enabled && styles.knobOn]}
              />
            </View>
          </TouchableOpacity>
        ))}
        <Text style={styles.footer}>
          Privacy first: this demo does not collect child photos, voice
          recordings, or account data.
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
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 20},
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 19,
    backgroundColor: '#203F3C',
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
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 15,
    borderRadius: 16,
    backgroundColor: '#182638',
    borderWidth: 1,
    borderColor: '#2A3D50',
  },
  noticeTitle: {color: '#FFF', fontSize: 13, fontWeight: '900'},
  noticeText: {color: '#A8B8CA', fontSize: 10, lineHeight: 15, marginTop: 4},
  sectionTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 18,
    marginBottom: 9,
  },
  ageRow: {flexDirection: 'row', gap: 10},
  ageButton: {
    backgroundColor: '#182638',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  ageActive: {backgroundColor: '#DCD4FF', borderColor: '#FFF'},
  ageText: {color: '#D7E0EC', fontSize: 11, fontWeight: '800'},
  ageTextActive: {color: '#171A2D'},
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#182638',
    padding: 12,
    borderRadius: 14,
    marginTop: 7,
    borderWidth: 1,
    borderColor: '#25374A',
  },
  optionIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#2B2940',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionCopy: {flex: 1},
  optionTitle: {color: '#FFF', fontSize: 12, fontWeight: '900'},
  optionDetail: {color: '#8DA1B9', fontSize: 10, marginTop: 4},
  toggle: {
    width: 42,
    height: 24,
    borderRadius: 13,
    backgroundColor: '#3A485B',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleOn: {backgroundColor: '#1D8C7C'},
  toggleKnob: {width: 18, height: 18, borderRadius: 9, backgroundColor: '#FFF'},
  knobOn: {alignSelf: 'flex-end'},
  footer: {color: '#70859E', fontSize: 9, lineHeight: 14, marginTop: 15},
});
