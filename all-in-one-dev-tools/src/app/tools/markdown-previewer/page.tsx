import { Metadata } from 'next';
import { MarkdownPreviewerTool } from '@/components/tools/MarkdownPreviewerTool';

export const metadata: Metadata = {
  title: 'Markdown Previewer - Preview Markdown Online',
  description: 'Free online markdown previewer. Write markdown and see live HTML preview with syntax highlighting and export options.',
  keywords: ['markdown previewer', 'markdown editor', 'md preview', 'markdown to html', 'live preview'],
  openGraph: {
    title: 'Markdown Previewer - Preview Markdown Online',
    description: 'Free online markdown previewer with live HTML preview and export options.',
    type: 'website',
  },
};

export default function MarkdownPreviewerPage() {
  return <MarkdownPreviewerTool />;
}
