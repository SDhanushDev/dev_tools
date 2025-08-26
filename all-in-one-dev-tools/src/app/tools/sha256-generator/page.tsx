import { Metadata } from 'next';
import { Sha256GeneratorTool } from '@/components/tools/Sha256GeneratorTool';

export const metadata: Metadata = {
  title: 'SHA256 Hash Generator - Generate SHA256 Hashes Online',
  description: 'Free online SHA256 hash generator. Generate SHA256 hashes from text input for security, verification, and data integrity checks.',
  keywords: ['sha256 generator', 'sha256 hash', 'hash generator', 'checksum', 'security hash'],
  openGraph: {
    title: 'SHA256 Hash Generator - Generate SHA256 Hashes Online',
    description: 'Free online SHA256 hash generator. Generate SHA256 hashes from text input for security and verification.',
    type: 'website',
  },
};

export default function Sha256GeneratorPage() {
  return <Sha256GeneratorTool />;
}
