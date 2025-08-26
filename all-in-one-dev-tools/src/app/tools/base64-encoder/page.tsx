import { Metadata } from 'next';
import { Base64EncoderTool } from '@/components/tools/Base64EncoderTool';

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder - Encode & Decode Base64 Online',
  description: 'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 to text. Supports UTF-8 encoding and file uploads.',
  keywords: ['base64 encoder', 'base64 decoder', 'base64 converter', 'encode base64', 'decode base64'],
  openGraph: {
    title: 'Base64 Encoder/Decoder - Encode & Decode Base64 Online',
    description: 'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 to text.',
    type: 'website',
  },
};

export default function Base64EncoderPage() {
  return <Base64EncoderTool />;
}
