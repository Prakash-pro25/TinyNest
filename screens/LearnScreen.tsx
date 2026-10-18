import React from 'react';
import FeatureScreen, {FeatureConfig} from './FeatureScreen';
const config: FeatureConfig = {title: 'Learn', subtitle: 'Little steps, big discoveries.', icon: 'book-open-page-variant', accent: '#FFD166', ideas: [{title: 'Word Garden', detail: 'Explore everyday words and sounds.', icon: 'flower-outline'}, {title: 'Number Trail', detail: 'Count, compare and spot patterns.', icon: 'numeric'}, {title: 'Focus Time', detail: 'A gentle timer for a small study task.', icon: 'timer-outline'}]};
export default function LearnScreen() { return <FeatureScreen config={config} />; }
