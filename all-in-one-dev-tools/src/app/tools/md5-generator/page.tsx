import { Metadata } from 'next';
import { Md5GeneratorTool } from '@/components/tools/Md5GeneratorTool';

export const metadata: Metadata = {
  title: 'MD5 Hash Generator - Generate MD5 Hashes Online',
  description: 'Free online MD5 hash generator. Generate MD5 hashes from text input for legacy systems and basic verification.',
  keywords: ['md5 generator', 'md5 hash', 'hash generator', 'checksum', 'legacy hash'],
  openGraph: {
    title: 'MD5 Hash Generator - Generate MD5 Hashes Online',
    description: 'Free online MD5 hash generator. Generate MD5 hashes from text input for legacy systems.',
    type: 'website',
  },
};

export default function Md5GeneratorPage() {
  return <Md5GeneratorTool />;
}
