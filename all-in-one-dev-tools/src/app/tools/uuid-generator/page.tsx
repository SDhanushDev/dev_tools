import { Metadata } from 'next';
import { UuidGeneratorTool } from '@/components/tools/UuidGeneratorTool';

export const metadata: Metadata = {
  title: 'UUID Generator - Generate UUID/GUID Online',
  description: 'Free online UUID/GUID generator. Generate version 4 UUIDs (random) for unique identifiers in your applications.',
  keywords: ['uuid generator', 'guid generator', 'unique identifier', 'uuid v4', 'random uuid'],
  openGraph: {
    title: 'UUID Generator - Generate UUID/GUID Online',
    description: 'Free online UUID/GUID generator. Generate version 4 UUIDs for unique identifiers.',
    type: 'website',
  },
};

export default function UuidGeneratorPage() {
  return <UuidGeneratorTool />;
}
