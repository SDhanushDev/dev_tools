import { Metadata } from 'next';
import { TextCaseConverterTool } from '@/components/tools/TextCaseConverterTool';

export const metadata: Metadata = {
  title: 'Text Case Converter - Convert Text Cases Online',
  description: 'Free online text case converter. Convert text between camelCase, snake_case, kebab-case, PascalCase, and more.',
  keywords: ['text case converter', 'camelcase', 'snake_case', 'kebab-case', 'pascalcase', 'text transform'],
  openGraph: {
    title: 'Text Case Converter - Convert Text Cases Online',
    description: 'Free online text case converter. Convert between different text cases and formats.',
    type: 'website',
  },
};

export default function TextCaseConverterPage() {
  return <TextCaseConverterTool />;
}
