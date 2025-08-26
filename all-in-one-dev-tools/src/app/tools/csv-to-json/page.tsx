import { Metadata } from 'next';
import { CsvToJsonTool } from '@/components/tools/CsvToJsonTool';

export const metadata: Metadata = {
  title: 'CSV to JSON Converter - Convert CSV to JSON Online',
  description: 'Free online CSV to JSON converter. Convert CSV data to JSON format with customizable options and validation.',
  keywords: ['csv to json', 'csv converter', 'json converter', 'data conversion', 'csv parser'],
  openGraph: {
    title: 'CSV to JSON Converter - Convert CSV to JSON Online',
    description: 'Free online CSV to JSON converter. Convert CSV data to JSON format with customizable options.',
    type: 'website',
  },
};

export default function CsvToJsonPage() {
  return <CsvToJsonTool />;
}
