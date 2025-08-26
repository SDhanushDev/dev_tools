import { Metadata } from 'next';
import { GradientGeneratorTool } from '@/components/tools/GradientGeneratorTool';

export const metadata: Metadata = {
  title: 'CSS Gradient Generator - Create Gradients Online',
  description: 'Free online CSS gradient generator. Create linear and radial gradients with live preview and copy CSS code.',
  keywords: ['css gradient', 'gradient generator', 'linear gradient', 'radial gradient', 'css background'],
  openGraph: {
    title: 'CSS Gradient Generator - Create Gradients Online',
    description: 'Free online CSS gradient generator. Create beautiful gradients with live preview.',
    type: 'website',
  },
};

export default function GradientGeneratorPage() {
  return <GradientGeneratorTool />;
}
