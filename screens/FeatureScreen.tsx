import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-paper';

export type FeatureConfig = {
  title: string;
  subtitle: string;
  icon: string;
  accent: string;
  ideas: {title: string; detail: string; icon: string}[];
};

type Props = {config: FeatureConfig};

const FeatureScreen = ({config}: Props) => {
  const [focused, setFocused] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headingRow}>
          <View style={[styles.headingIcon, {backgroundColor: `${config.accent}20`}]}>
            <Icon source={config.icon} size={32} color={config.accent} />
          </View>
          <View style={styles.headingCopy}>
            <Text style={styles.kicker}>TINYNEST ACTIVITY</Text>
            <Text style={styles.title}>{config.title}</Text>
            <Text style={styles.subtitle}>{config.subtitle}</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Coming up in your nest</Text>
        <View style={styles.cards}>
          {config.ideas.map((idea, index) => (
            <TouchableOpacity
              key={idea.title}
              hasTVPreferredFocus={index === 0}
              onFocus={() => setFocused(index)}
              onBlur={() => setFocused(-1)}
              onPress={() => undefined}
              activeOpacity={1}
              style={[styles.card, focused === index && styles.focusedCard]}>
              <View style={[styles.ideaIcon, {backgroundColor: `${config.accent}20`}]}>
                <Icon source={idea.icon} size={28} color={config.accent} />
              </View>
              <Text style={styles.ideaTitle}>{idea.title}</Text>
              <Text style={styles.ideaDetail}>{idea.detail}</Text>
              <Text style={[styles.previewLabel, {color: config.accent}]}>PREVIEW ACTIVITY</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.note}>
          <Icon source="lightbulb-on-outline" size={20} color="#FFD166" />
          <Text style={styles.noteText}>This is the first screen scaffold. The activities will be implemented in the next milestone.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#101827'},
  content: {flex: 1, paddingTop: 48, paddingHorizontal: 42, paddingLeft: 88},
  headingRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 38},
  headingIcon: {width: 68, height: 68, borderRadius: 21, alignItems: 'center', justifyContent: 'center', marginRight: 18},
  headingCopy: {flex: 1},
  kicker: {fontSize: 10, letterSpacing: 2, color: '#8DA1B9', fontWeight: '800'},
  title: {fontSize: 30, fontWeight: '900', color: '#FFFFFF', marginTop: 4},
  subtitle: {fontSize: 14, color: '#B8C6D8', marginTop: 5},
  sectionTitle: {fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginBottom: 14},
  cards: {flexDirection: 'row', gap: 16},
  card: {flex: 1, minHeight: 210, padding: 18, borderRadius: 18, backgroundColor: '#19283A', borderWidth: 3, borderColor: 'transparent'},
  focusedCard: {borderColor: '#FFFFFF', backgroundColor: '#22364B', transform: [{scale: 1.025}]},
  ideaIcon: {width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginBottom: 17},
  ideaTitle: {fontSize: 17, fontWeight: '800', color: '#F4F7FB'},
  ideaDetail: {fontSize: 12, lineHeight: 18, color: '#AEBED0', marginTop: 7},
  previewLabel: {fontSize: 9, fontWeight: '900', letterSpacing: 1, marginTop: 18},
  note: {marginTop: 22, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 13, backgroundColor: '#19283A'},
  noteText: {color: '#B8C6D8', fontSize: 12, flex: 1},
});

export default FeatureScreen;
