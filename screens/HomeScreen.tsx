import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Icon} from 'react-native-paper';

type HomeNavigation = DrawerNavigationProp<any>;

type Activity = {
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  color: string;
  ink: string;
};

const activities: Activity[] = [
  {
    title: 'Learn',
    subtitle: 'Little steps, big discoveries',
    icon: 'book-open-page-variant',
    route: 'Learn',
    color: '#FFE8A3',
    ink: '#624B0A',
  },
  {
    title: 'Stories',
    subtitle: 'A new world awaits',
    icon: 'book-open-page-variant',
    route: 'Stories',
    color: '#E7D9FF',
    ink: '#50367D',
  },
  {
    title: 'Play',
    subtitle: 'Think, match and solve',
    icon: 'puzzle-outline',
    route: 'Play',
    color: '#C9F6E9',
    ink: '#145C4D',
  },
  {
    title: 'Move',
    subtitle: 'Stretch, breathe and dance',
    icon: 'human-child',
    route: 'Move',
    color: '#FFDCC5',
    ink: '#813D1B',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigation>();
  const [focusedCard, setFocusedCard] = useState<string>('Learn');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.eyebrow}>YOUR LITTLE WORLD</Text>
            <Text style={styles.brand}>TinyNest<Text style={styles.brandDot}>.</Text></Text>
          </View>
          <View style={styles.dayPill}>
            <Icon source="weather-sunny" size={19} color="#FFD166" />
            <Text style={styles.dayText}>Ready for a lovely day?</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroKicker}>HELLO, LITTLE EXPLORER</Text>
            <Text style={styles.heroTitle}>What shall we{ '\n' }discover today?</Text>
            <Text style={styles.heroDescription}>
              Learn something new, hear a story, play a game or get moving.
            </Text>
            <View style={styles.safeNote}>
              <Icon source="heart-outline" size={17} color="#B8F4E6" />
              <Text style={styles.safeNoteText}>Made for little minds and big imaginations</Text>
            </View>
          </View>
          <View style={styles.mascotBubble}>
            <Text style={styles.mascot}>🐻</Text>
            <View style={styles.sparkleOne}><Text style={styles.sparkleText}>✦</Text></View>
            <View style={styles.sparkleTwo}><Text style={styles.sparkleText}>✧</Text></View>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>Choose your adventure</Text>
            <Text style={styles.sectionSubtitle}>Use your remote to pick a card</Text>
          </View>
          <Text style={styles.remoteHint}>↑ ↓ ← →  SELECT</Text>
        </View>

        <View style={styles.grid}>
          {activities.map((activity, index) => {
            const focused = focusedCard === activity.route;
            return (
              <TouchableOpacity
                key={activity.route}
                activeOpacity={1}
                hasTVPreferredFocus={index === 0}
                onFocus={() => setFocusedCard(activity.route)}
                onBlur={() => setFocusedCard('')}
                onPress={() => navigation.navigate(activity.route)}
                accessibilityRole="button"
                accessibilityLabel={`${activity.title}. ${activity.subtitle}`}
                style={[
                  styles.activityCard,
                  {backgroundColor: activity.color},
                  focused && styles.focusedCard,
                ]}>
                <View style={[styles.activityIcon, {backgroundColor: `${activity.ink}12`}]}>
                  <Icon source={activity.icon} size={34} color={activity.ink} />
                </View>
                <View style={styles.cardText}>
                  <Text style={[styles.activityTitle, {color: activity.ink}]}>{activity.title}</Text>
                  <Text style={[styles.activitySubtitle, {color: activity.ink}]}>{activity.subtitle}</Text>
                </View>
                <View style={[styles.cardArrow, {backgroundColor: `${activity.ink}18`}]}>
                  <Icon source="arrow-top-right" size={20} color={activity.ink} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.routineIcon}><Icon source="clock-time-four-outline" size={22} color="#B8F4E6" /></View>
          <View style={styles.routineCopy}>
            <Text style={styles.routineTitle}>Little routines make great days</Text>
            <Text style={styles.routineSubtitle}>Your grown-up can help plan study, play and wind-down time.</Text>
          </View>
          <View style={styles.routineBadge}><Text style={styles.routineBadgeText}>GROW AT YOUR PACE</Text></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#101827'},
  content: {paddingTop: 28, paddingBottom: 26, paddingHorizontal: 34, paddingLeft: 82},
  topRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20},
  eyebrow: {color: '#8DA1B9', fontSize: 11, fontWeight: '800', letterSpacing: 2.5},
  brand: {color: '#FFFFFF', fontSize: 28, fontWeight: '900', letterSpacing: -0.8, marginTop: 3},
  brandDot: {color: '#5EEAD4'},
  dayPill: {flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 22, backgroundColor: '#1B293A'},
  dayText: {color: '#DCE6F2', fontSize: 13, fontWeight: '600'},
  hero: {minHeight: 180, borderRadius: 24, backgroundColor: '#1A2A3C', flexDirection: 'row', overflow: 'hidden', paddingHorizontal: 25, paddingVertical: 22, marginBottom: 23, borderWidth: 1, borderColor: '#2A3D50'},
  heroCopy: {flex: 1, justifyContent: 'center', zIndex: 1},
  heroKicker: {color: '#5EEAD4', fontSize: 10, fontWeight: '800', letterSpacing: 2},
  heroTitle: {color: '#FFFFFF', fontSize: 28, lineHeight: 33, fontWeight: '900', marginTop: 7},
  heroDescription: {color: '#B8C6D8', fontSize: 13, marginTop: 8, maxWidth: 440, lineHeight: 19},
  safeNote: {flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 12},
  safeNoteText: {color: '#B8F4E6', fontSize: 11, fontWeight: '600'},
  mascotBubble: {width: 160, alignItems: 'center', justifyContent: 'center', marginLeft: 10, position: 'relative'},
  mascot: {fontSize: 86},
  sparkleOne: {position: 'absolute', top: 10, right: 25},
  sparkleTwo: {position: 'absolute', bottom: 15, left: 14},
  sparkleText: {fontSize: 24, color: '#FFD166'},
  sectionHeading: {flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12},
  sectionTitle: {color: '#FFFFFF', fontSize: 19, fontWeight: '800'},
  sectionSubtitle: {color: '#8DA1B9', fontSize: 12, marginTop: 4},
  remoteHint: {color: '#8DA1B9', fontSize: 10, fontWeight: '800', letterSpacing: 1},
  grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 14},
  activityCard: {width: '48%', minHeight: 112, flexGrow: 1, flexBasis: '40%', borderRadius: 18, padding: 17, flexDirection: 'row', alignItems: 'center', borderWidth: 3, borderColor: 'transparent'},
  focusedCard: {borderColor: '#FFFFFF', transform: [{scale: 1.025}]},
  activityIcon: {width: 58, height: 58, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 15},
  cardText: {flex: 1},
  activityTitle: {fontSize: 20, fontWeight: '900'},
  activitySubtitle: {fontSize: 11, fontWeight: '600', marginTop: 5},
  cardArrow: {width: 31, height: 31, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginLeft: 8},
  bottomRow: {marginTop: 18, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16, backgroundColor: '#172437', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#25374A'},
  routineIcon: {width: 42, height: 42, borderRadius: 14, backgroundColor: '#234044', alignItems: 'center', justifyContent: 'center', marginRight: 12},
  routineCopy: {flex: 1},
  routineTitle: {color: '#EAF2FB', fontSize: 13, fontWeight: '800'},
  routineSubtitle: {color: '#8DA1B9', fontSize: 11, marginTop: 4},
  routineBadge: {backgroundColor: '#203E42', borderRadius: 12, paddingHorizontal: 11, paddingVertical: 8, marginLeft: 10},
  routineBadgeText: {color: '#B8F4E6', fontSize: 9, fontWeight: '900', letterSpacing: 0.8},
});

export default HomeScreen;
