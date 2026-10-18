import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-paper';

type Tile = {id: number; value: string; matched: boolean};
const makeTiles = (): Tile[] => [
  {id: 0, value: '🐝', matched: false},
  {id: 1, value: '🌼', matched: false},
  {id: 2, value: '🐝', matched: false},
  {id: 3, value: '🌼', matched: false},
];
export default function PlayScreen() {
  const [tiles, setTiles] = useState<Tile[]>(makeTiles());
  const [open, setOpen] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [message, setMessage] = useState(
    'Find the matching pairs. Pick two cards with your remote!',
  );
  const choose = (id: number) => {
    if (tiles[id].matched || open.includes(id) || open.length === 2) return;
    const next = [...open, id];
    setOpen(next);
    if (next.length === 2) {
      setMoves(value => value + 1);
      if (tiles[next[0]].value === tiles[next[1]].value) {
        setTiles(old =>
          old.map(tile =>
            next.includes(tile.id) ? {...tile, matched: true} : tile,
          ),
        );
        setMessage('A lovely match! Keep going.');
        setOpen([]);
      } else {
        setMessage('Not a match yet. Try another pair!');
        setTimeout(() => setOpen([]), 850);
      }
    }
  };
  const reset = () => {
    setTiles(makeTiles());
    setOpen([]);
    setMoves(0);
    setMessage('Find the matching pairs. Pick two cards with your remote!');
  };
  const won = tiles.every(tile => tile.matched);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Icon source="puzzle-outline" size={31} color="#5EEAD4" />
          </View>
          <View>
            <Text style={styles.kicker}>THINK, MATCH AND SOLVE</Text>
            <Text style={styles.title}>Little Memory Match</Text>
            <Text style={styles.subtitle}>A tiny game for a curious mind.</Text>
          </View>
        </View>
        <View style={styles.gamePanel}>
          <View style={styles.gameInfo}>
            <Text style={styles.panelTitle}>
              {won ? 'You did it! 🎉' : 'Find the pairs'}
            </Text>
            <Text style={styles.instructions}>
              {won ? 'You found every match. Brilliant noticing!' : message}
            </Text>
            <View style={styles.movesPill}>
              <Icon source="cards-outline" size={18} color="#5EEAD4" />
              <Text style={styles.movesText}>MOVES {moves}</Text>
            </View>
          </View>
          <View style={styles.tileGrid}>
            {tiles.map(tile => {
              const revealed = tile.matched || open.includes(tile.id);
              return (
                <TouchableOpacity
                  key={tile.id}
                  hasTVPreferredFocus={tile.id === 0}
                  onPress={() => choose(tile.id)}
                  activeOpacity={1}
                  style={[
                    styles.tile,
                    revealed && styles.tileRevealed,
                    tile.matched && styles.tileMatched,
                  ]}>
                  <Text style={styles.tileText}>
                    {revealed ? tile.value : '?'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>
            Tip: remember where each picture appears.
          </Text>
          <TouchableOpacity
            onPress={reset}
            style={styles.resetButton}
            activeOpacity={1}>
            <Icon source="refresh" size={18} color="#102033" />
            <Text style={styles.resetText}>Play again</Text>
          </TouchableOpacity>
        </View>
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
  gamePanel: {
    flex: 1,
    backgroundColor: '#1A2A3C',
    borderRadius: 22,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A3D50',
  },
  gameInfo: {flex: 1, paddingRight: 22},
  panelTitle: {color: '#FFF', fontSize: 25, fontWeight: '900'},
  instructions: {
    color: '#B8C6D8',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 9,
    maxWidth: 300,
  },
  movesPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#102B32',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  movesText: {
    color: '#B8F4E6',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  tileGrid: {
    width: 280,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  tile: {
    width: 122,
    height: 116,
    borderRadius: 18,
    backgroundColor: '#2B3D52',
    borderWidth: 3,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileRevealed: {backgroundColor: '#E5DEFF', borderColor: '#FFF'},
  tileMatched: {backgroundColor: '#B9F2DF', borderColor: '#5EEAD4'},
  tileText: {fontSize: 43, color: '#FFF', fontWeight: '900'},
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  bottomText: {color: '#8DA1B9', fontSize: 11},
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#5EEAD4',
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  resetText: {color: '#102033', fontSize: 11, fontWeight: '900'},
});
