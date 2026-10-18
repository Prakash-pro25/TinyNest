import React from 'react';
import FeatureScreen, {FeatureConfig} from './FeatureScreen';
const config: FeatureConfig = {title: 'Move', subtitle: 'Stretch, breathe and move at your pace.', icon: 'human-child', accent: '#FB923C', ideas: [{title: 'Animal Moves', detail: 'Move like a bear, bird or bunny.', icon: 'paw-outline'}, {title: 'Rainbow Stretch', detail: 'Follow a few gentle stretches.', icon: 'weather-sunset'}, {title: 'Calm Breathing', detail: 'Breathe in slowly, then breathe out.', icon: 'weather-windy'}]};
export default function MoveScreen() { return <FeatureScreen config={config} />; }
