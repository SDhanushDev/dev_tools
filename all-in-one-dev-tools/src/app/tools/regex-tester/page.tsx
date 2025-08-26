import { Metadata } from 'next';
import { RegexTesterTool } from '@/components/tools/RegexTesterTool';

export const metadata: Metadata = {
  title: 'Regex Tester - Test Regular Expressions Online',
  description: 'Free online regex tester and debugger. Test regular expressions with real-time matching, capture groups, and detailed explanations.',
  keywords: ['regex tester', 'regular expression tester', 'regex debugger', 'pattern matching', 'regex online'],
  openGraph: {
    title: 'Regex Tester - Test Regular Expressions Online',
    description: 'Free online regex tester and debugger. Test regular expressions with real-time matching and explanations.',
    type: 'website',
  },
};

export default function RegexTesterPage() {
  return <RegexTesterTool />;
}
