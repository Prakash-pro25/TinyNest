import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-paper';

const stories = [
  {
    title: 'Forest Friends',
    emoji: '🦊',
    theme: '#294B43',
    description: 'A gentle tale about helping each other.',
    pages: [
      'In a green forest, a little fox named Fern found a tiny bird beside a fallen nest.',
      'Fern called her friends. Together, they gathered soft grass and twigs to make a safe new nest.',
      'The bird chirped happily. Fern learned that helping together can make a little problem feel small.',
    ],
  },
  {
    title: 'Moon Journey',
    emoji: '🌙',
    theme: '#34365D',
    description: 'A quiet adventure among the stars.',
    pages: [
      'Milo looked up at the moon and imagined a silver path across the sky.',
      'A friendly star showed Milo how to take a slow breath and notice the quiet night.',
      'Milo snuggled into bed, feeling safe and ready for sweet dreams.',
    ],
  },
  {
    title: 'The Brave Seed',
    emoji: '🌱',
    theme: '#43502C',
    description: 'A little seed learns to grow at its own pace.',
    pages: [
      'A small seed worried that everyone else in the garden was growing faster.',
      'The rain said, “Little things happen under the soil, even when you cannot see them.”',
      'One sunny morning, a green sprout appeared. The seed learned that growing takes time.',
    ],
  },
];
export default function StoriesScreen() {
  const [storyIndex, setStoryIndex] = useState(0);
  const [page, setPage] = useState(-1);
  const story = stories[storyIndex];
  const openStory = (index: number) => {
    setStoryIndex(index);
    setPage(0);
  };
  const closeStory = () => setPage(-1);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Icon source="book-open-variant" size={31} color="#BCA4FF" />
          </View>
          <View>
            <Text style={styles.kicker}>A LITTLE WONDER AWAITS</Text>
            <Text style={styles.title}>Story Garden</Text>
            <Text style={styles.subtitle}>
              Choose a cozy tale to read together.
            </Text>
          </View>
        </View>
        {page < 0 ? (
          <>
            <Text style={styles.sectionTitle}>Pick a story</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storyRow}>
              {stories.map((item, index) => (
                <TouchableOpacity
                  key={item.title}
                  hasTVPreferredFocus={index === 0}
                  onPress={() => openStory(index)}
                  activeOpacity={1}
                  style={[styles.storyCard, {backgroundColor: item.theme}]}>
                  <Text style={styles.storyEmoji}>{item.emoji}</Text>
                  <Text style={styles.storyTitle}>{item.title}</Text>
                  <Text style={styles.storyDescription}>
                    {item.description}
                  </Text>
                  <View style={styles.readPill}>
                    <Text style={styles.readText}>READ STORY</Text>
                    <Icon source="arrow-right" size={16} color="#152033" />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.note}>
              <Icon source="shield-check-outline" size={21} color="#5EEAD4" />
              <Text style={styles.noteText}>
                Stories are built into the app, so this demo works offline.
                Narration can be added in a later milestone.
              </Text>
            </View>
          </>
        ) : (
          <View style={[styles.reader, {backgroundColor: story.theme}]}>
            <Text style={styles.readerEmoji}>{story.emoji}</Text>
            <Text style={styles.readerKicker}>
              STORY {storyIndex + 1} • PAGE {page + 1} OF {story.pages.length}
            </Text>
            <Text style={styles.readerTitle}>{story.title}</Text>
            <Text style={styles.readerText}>{story.pages[page]}</Text>
            <View style={styles.readerActions}>
              <TouchableOpacity
                onPress={closeStory}
                style={styles.backButton}
                activeOpacity={1}>
                <Icon source="arrow-left" size={18} color="#FFF" />
                <Text style={styles.backText}>All stories</Text>
              </TouchableOpacity>
              <TouchableOpacity
                hasTVPreferredFocus
                onPress={() =>
                  page + 1 >= story.pages.length
                    ? closeStory()
                    : setPage(value => value + 1)
                }
                style={styles.nextButton}
                activeOpacity={1}>
                <Text style={styles.nextText}>
                  {page + 1 >= story.pages.length
                    ? 'Finish story'
                    : 'Next page'}
                </Text>
                <Icon
                  source={
                    page + 1 >= story.pages.length ? 'check' : 'arrow-right'
                  }
                  size={18}
                  color="#152033"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Text style={styles.footer}>
          GROWN-UP TIP • Choose gentle, parent-approved themes for your child's
          age.
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
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 22},
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 19,
    backgroundColor: '#302947',
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
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  storyRow: {gap: 14, paddingBottom: 5},
  storyCard: {
    width: 215,
    minHeight: 230,
    borderRadius: 20,
    padding: 18,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  storyEmoji: {fontSize: 43, marginBottom: 11},
  storyTitle: {color: '#FFF', fontSize: 17, fontWeight: '900'},
  storyDescription: {
    color: '#E1E7F0',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 7,
    flex: 1,
  },
  readPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F7FB',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 14,
  },
  readText: {
    color: '#152033',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#182638',
    padding: 15,
    borderRadius: 15,
    marginTop: 18,
  },
  noteText: {color: '#B8C6D8', fontSize: 11, lineHeight: 16, flex: 1},
  reader: {
    flex: 1,
    borderRadius: 22,
    padding: 26,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  readerEmoji: {fontSize: 54, marginBottom: 10},
  readerKicker: {
    color: '#D8DDF4',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  readerTitle: {color: '#FFF', fontSize: 27, fontWeight: '900', marginTop: 7},
  readerText: {
    color: '#FFF',
    fontSize: 19,
    lineHeight: 30,
    textAlign: 'center',
    maxWidth: 570,
    marginTop: 20,
  },
  readerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  backButton: {flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12},
  backText: {color: '#FFF', fontSize: 12, fontWeight: '800'},
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: '#F5F1FF',
    borderRadius: 13,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  nextText: {color: '#152033', fontSize: 12, fontWeight: '900'},
  footer: {
    color: '#70859E',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginTop: 15,
  },
});
