import { Metadata } from 'next';
import { JsonFormatterTool } from '@/components/tools/JsonFormatterTool';

export const metadata: Metadata = {
  title: 'JSON Formatter - Format, Validate & Beautify JSON Online',
  description: 'Free online JSON formatter and validator. Format, beautify, minify and validate JSON data with syntax highlighting. No registration required.',
  keywords: ['json formatter', 'json beautifier', 'json validator', 'json minifier', 'format json online'],
  openGraph: {
    title: 'JSON Formatter - Format, Validate & Beautify JSON Online',
    description: 'Free online JSON formatter and validator. Format, beautify, minify and validate JSON data with syntax highlighting.',
    type: 'website',
  },
};

export default function JsonFormatterPage() {
  return <JsonFormatterTool />;
}
