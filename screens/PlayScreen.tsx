import React from 'react';
import FeatureScreen, {FeatureConfig} from './FeatureScreen';
const config: FeatureConfig = {
  title: 'Play',
  subtitle: 'Think, match and solve together.',
  icon: 'puzzle-outline',
  accent: '#5EEAD4',
  ideas: [
    {
      title: 'Shape Safari',
      detail: 'Find shapes hiding in the world.',
      icon: 'shape-outline',
    },
    {
      title: 'Memory Match',
      detail: 'Remember pairs and find a match.',
      icon: 'cards-outline',
    },
    {
      title: 'Little Logic',
      detail: 'Try a friendly pattern puzzle.',
      icon: 'lightbulb-on-outline',
    },
  ],
};
export default function PlayScreen() {
  return <FeatureScreen config={config} />;
}
