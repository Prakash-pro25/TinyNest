import React from 'react';
import FeatureScreen, {FeatureConfig} from './FeatureScreen';
const config: FeatureConfig = {
  title: 'Stories',
  subtitle: 'Settle in for a little wonder.',
  icon: 'book-open-page-variant',
  accent: '#BCA4FF',
  ideas: [
    {
      title: 'Forest Friends',
      detail: 'A gentle tale about helping each other.',
      icon: 'pine-tree',
    },
    {
      title: 'Moon Journey',
      detail: 'A calm adventure among the stars.',
      icon: 'moon-waning-crescent',
    },
    {
      title: 'Bedtime Story',
      detail: 'A quiet story for the wind-down routine.',
      icon: 'weather-night',
    },
  ],
};
export default function StoriesScreen() {
  return <FeatureScreen config={config} />;
}
