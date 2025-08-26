import { Metadata } from 'next';
import { ColorPickerTool } from '@/components/tools/ColorPickerTool';

export const metadata: Metadata = {
  title: 'Color Picker - Pick Colors and Get Hex, RGB, HSL Values',
  description: 'Free online color picker tool. Pick colors and get hex, RGB, HSL, and HSV values. Create color palettes and convert between color formats.',
  keywords: ['color picker', 'color selector', 'hex color', 'rgb color', 'hsl color', 'color converter'],
  openGraph: {
    title: 'Color Picker - Pick Colors and Get Hex, RGB, HSL Values',
    description: 'Free online color picker tool. Pick colors and get values in multiple formats.',
    type: 'website',
  },
};

export default function ColorPickerPage() {
  return <ColorPickerTool />;
}
