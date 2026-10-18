import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-paper';

export type FeatureConfig = {
  title: string;
  subtitle: string;
  icon: string;
  accent: string;
  ideas: {title: string; detail: string; icon: string}[];
};

type Props = {config: FeatureConfig};

/** Shared, remote-friendly activity landing screen for the smaller activity sections. */
const FeatureScreen = ({config}: Props) => {
  const [selected, setSelected] = useState(0);
  const [started, setStarted] = useState(false);
  const active = config.ideas[selected];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headingRow}>
          <View
            style={[
              styles.headingIcon,
              {backgroundColor: `${config.accent}20`},
            ]}>
            <Icon source={config.icon} size={32} color={config.accent} />
          </View>
          <View style={styles.headingCopy}>
            <Text style={styles.kicker}>TINYNEST ACTIVITY</Text>
            <Text style={styles.title}>{config.title}</Text>
            <Text style={styles.subtitle}>{config.subtitle}</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Choose an activity</Text>
        <View style={styles.cards}>
          {config.ideas.map((idea, index) => (
            <TouchableOpacity
              key={idea.title}
              hasTVPreferredFocus={index === 0}
              onFocus={() => {
                setSelected(index);
                setStarted(false);
              }}
              onPress={() => {
                setSelected(index);
                setStarted(true);
              }}
              activeOpacity={1}
              style={[styles.card, selected === index && styles.cardFocused]}>
              <View
                style={[
                  styles.ideaIcon,
                  {backgroundColor: `${config.accent}20`},
                ]}>
                <Icon source={idea.icon} size={28} color={config.accent} />
              </View>
              <View style={styles.ideaCopy}>
                <Text style={styles.ideaTitle}>{idea.title}</Text>
                <Text style={styles.ideaDetail}>{idea.detail}</Text>
              </View>
              <Icon
                source="chevron-right"
                size={24}
                color={selected === index ? config.accent : '#7890A8'}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.activityPanel}>
          <View style={{flex: 1}}>
            <Text style={styles.panelKicker}>
              {started ? 'YOU PICKED' : 'READY WHEN YOU ARE'}
            </Text>
            <Text style={styles.panelTitle}>{active.title}</Text>
            <Text style={styles.panelDetail}>
              {started
                ? `Great choice! ${active.detail} Ask your grown-up to join you if you need help.`
                : 'Choose a card with your remote, then press Select to begin.'}
            </Text>
          </View>
          <View style={styles.panelEmoji}>
            <Text style={styles.emoji}>{started ? '🌟' : '🐻'}</Text>
          </View>
        </View>
        <Text style={styles.remoteHint}>USE THE REMOTE • SELECT TO CHOOSE</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#101827'},
  content: {
    flex: 1,
    paddingTop: 28,
    paddingBottom: 22,
    paddingHorizontal: 34,
    paddingLeft: 82,
  },
  headingRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 24},
  headingIcon: {
    width: 66,
    height: 66,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  headingCopy: {flex: 1},
  kicker: {color: '#8DA1B9', fontSize: 10, fontWeight: '800', letterSpacing: 2},
  title: {color: '#FFFFFF', fontSize: 30, fontWeight: '900', marginTop: 4},
  subtitle: {color: '#B8C6D8', fontSize: 13, marginTop: 4},
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  cards: {flexDirection: 'row', flexWrap: 'wrap', gap: 12},
  card: {
    width: '31%',
    minHeight: 130,
    backgroundColor: '#182638',
    borderRadius: 18,
    padding: 15,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  cardFocused: {
    borderColor: '#FFFFFF',
    backgroundColor: '#213349',
    transform: [{scale: 1.02}],
  },
  ideaIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  ideaCopy: {flex: 1},
  ideaTitle: {color: '#FFFFFF', fontSize: 15, fontWeight: '800'},
  ideaDetail: {color: '#A8B8CA', fontSize: 11, lineHeight: 16, marginTop: 5},
  activityPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2A3C',
    borderColor: '#2A3D50',
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    minHeight: 115,
  },
  panelKicker: {
    color: '#5EEAD4',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.8,
  },
  panelTitle: {color: '#FFFFFF', fontSize: 19, fontWeight: '900', marginTop: 5},
  panelDetail: {
    color: '#B8C6D8',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    maxWidth: 560,
  },
  panelEmoji: {width: 76, alignItems: 'center'},
  emoji: {fontSize: 42},
  remoteHint: {
    color: '#70859E',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.3,
    marginTop: 17,
  },
});

export default FeatureScreen;
