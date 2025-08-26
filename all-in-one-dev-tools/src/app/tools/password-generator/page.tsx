import { Metadata } from 'next';
import { PasswordGeneratorTool } from '@/components/tools/PasswordGeneratorTool';

export const metadata: Metadata = {
  title: 'Password Generator - Generate Secure Random Passwords',
  description: 'Free online password generator. Create strong, secure random passwords with customizable length and character sets. No data stored.',
  keywords: ['password generator', 'random password', 'secure password', 'strong password', 'password creator'],
  openGraph: {
    title: 'Password Generator - Generate Secure Random Passwords',
    description: 'Free online password generator. Create strong, secure random passwords with customizable options.',
    type: 'website',
  },
};

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorTool />;
}
