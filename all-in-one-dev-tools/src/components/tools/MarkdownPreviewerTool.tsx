'use client';

import { useState, useEffect } from 'react';
import { ToolLayout } from './ToolLayout';
import { ToolOptions } from './ToolOptions';
import { Copy, Check, Download, Eye, Edit } from 'lucide-react';
import { copyToClipboard, downloadFile } from '@/lib/utils';

export function MarkdownPreviewerTool() {
  const [input, setInput] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');
  const [enableTables, setEnableTables] = useState(true);
  const [enableCodeHighlight, setEnableCodeHighlight] = useState(true);
  const [copied, setCopied] = useState(false);

  // Simple markdown to HTML converter
  const markdownToHtml = (markdown: string): string => {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    html = html.replace(/_(.*?)_/gim, '<em>$1</em>');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`(.*?)`/gim, '<code>$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img alt="$1" src="$2" style="max-width: 100%; height: auto;" />');

    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^\+ (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$1. $2</li>');

    // Wrap consecutive list items in ul/ol
    html = html.replace(/(<li>.*<\/li>)/gim, (match) => {
      if (match.includes('<li>1.') || /\d+\./.test(match)) {
        return `<ol>${match}</ol>`;
      }
      return `<ul>${match}</ul>`;
    });

    // Tables (if enabled)
    if (enableTables) {
      const tableRegex = /^\|(.+)\|\s*\n\|[-\s|:]+\|\s*\n((?:\|.+\|\s*\n?)*)/gm;
      html = html.replace(tableRegex, (match, header, rows) => {
        const headerCells = header.split('|').map((cell: string) => `<th>${cell.trim()}</th>`).join('');
        const rowCells = rows.trim().split('\n').map((row: string) => {
          const cells = row.split('|').slice(1, -1).map((cell: string) => `<td>${cell.trim()}</td>`).join('');
          return `<tr>${cells}</tr>`;
        }).join('');
        return `<table class="table"><thead><tr>${headerCells}</tr></thead><tbody>${rowCells}</tbody></table>`;
      });
    }

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr>');
    html = html.replace(/^\*\*\*$/gim, '<hr>');

    // Line breaks
    html = html.replace(/\n\n/gim, '</p><p>');
    html = html.replace(/\n/gim, '<br>');

    // Wrap in paragraphs
    html = `<p>${html}</p>`;

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/gim, '');
    html = html.replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/gim, '$1');
    html = html.replace(/<p>(<hr>)<\/p>/gim, '$1');
    html = html.replace(/<p>(<blockquote>.*<\/blockquote>)<\/p>/gim, '$1');
    html = html.replace(/<p>(<table.*<\/table>)<\/p>/gim, '$1');
    html = html.replace(/<p>(<pre><code>.*<\/code><\/pre>)<\/p>/gim, '$1');
    html = html.replace(/<p>(<ul>.*<\/ul>)<\/p>/gim, '$1');
    html = html.replace(/<p>(<ol>.*<\/ol>)<\/p>/gim, '$1');

    return html;
  };

  useEffect(() => {
    if (!input.trim()) {
      setHtmlOutput('');
      return;
    }

    const html = markdownToHtml(input);
    setHtmlOutput(html);
  }, [input, enableTables, enableCodeHighlight]);

  const handleCopy = async (content: string, type: 'markdown' | 'html') => {
    await copyToClipboard(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content: string, filename: string, mimeType: string) => {
    downloadFile(content, filename, mimeType);
  };

  const loadSampleData = () => {
    const sampleMarkdown = `# Markdown Preview Example

This is a **bold** text and this is *italic* text.

## Features

- [x] Headers (H1, H2, H3)
- [x] **Bold** and *italic* text
- [x] \`inline code\` and code blocks
- [x] Links and images
- [x] Lists (ordered and unordered)
- [x] Tables
- [x] Blockquotes

### Code Block Example

\`\`\`javascript
function hello() {
    console.log("Hello, World!");
}
\`\`\`

### Table Example

| Name | Age | City |
|------|-----|------|
| John | 30  | NYC  |
| Jane | 25  | LA   |

### Blockquote

> This is a blockquote example.
> It can span multiple lines.

### Link Example

Check out [Google](https://google.com) for more information.

---

That's all folks!`;
    setInput(sampleMarkdown);
  };

  const options = [
    {
      id: 'viewMode',
      label: 'View Mode',
      type: 'radio' as const,
      value: viewMode,
      onChange: (value: unknown) => setViewMode(value as 'split' | 'edit' | 'preview'),
      options: [
        { value: 'split', label: 'Split View' },
        { value: 'edit', label: 'Edit Only' },
        { value: 'preview', label: 'Preview Only' },
      ],
      description: 'Choose how to display the editor and preview'
    },
    {
      id: 'enableTables',
      label: 'Enable Tables',
      type: 'checkbox' as const,
      value: enableTables,
      onChange: (value: unknown) => setEnableTables(value as boolean),
      description: 'Parse markdown tables'
    },
    {
      id: 'enableCodeHighlight',
      label: 'Enable Code Highlighting',
      type: 'checkbox' as const,
      value: enableCodeHighlight,
      onChange: (value: unknown) => setEnableCodeHighlight(value as boolean),
      description: 'Highlight code blocks (basic styling)'
    }
  ];

  return (
    <ToolLayout
      title="Markdown Previewer"
      description="Write markdown and see live HTML preview. Supports headers, lists, links, images, tables, and more."
      breadcrumb="Developer Tools"
    >
      <ToolOptions options={options}>
        <div className="flex space-x-2">
          <button
            onClick={loadSampleData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Load Sample
          </button>
        </div>
      </ToolOptions>

      <div className="space-y-4">
        {/* View Mode Buttons */}
        <div className="flex items-center space-x-2 border-b border-gray-200 pb-4">
          <button
            onClick={() => setViewMode('edit')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm transition-colors ${
              viewMode === 'edit' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm transition-colors ${
              viewMode === 'split' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span>Split</span>
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm transition-colors ${
              viewMode === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
        </div>

        {/* Editor and Preview */}
        <div className={`grid gap-4 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Editor */}
          {(viewMode === 'edit' || viewMode === 'split') && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Markdown Input
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopy(input, 'markdown')}
                    className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={() => handleDownload(input, 'document.md', 'text/markdown')}
                    className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your markdown here..."
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              />
            </div>
          )}

          {/* Preview */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  HTML Preview
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopy(htmlOutput, 'html')}
                    className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                    <span>Copy HTML</span>
                  </button>
                  <button
                    onClick={() => handleDownload(htmlOutput, 'document.html', 'text/html')}
                    className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div 
                className="w-full min-h-[500px] px-4 py-3 border border-gray-300 rounded-md bg-white prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlOutput || '<p class="text-gray-500">Preview will appear here...</p>' }}
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Markdown Guide */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Markdown Syntax Guide</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Text Formatting:</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li><code>**bold**</code> or <code>__bold__</code></li>
                <li><code>*italic*</code> or <code>_italic_</code></li>
                <li><code>`inline code`</code></li>
                <li><code>~~strikethrough~~</code></li>
              </ul>
              <h4 className="font-medium mb-2 mt-3">Headers:</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li><code># H1</code></li>
                <li><code>## H2</code></li>
                <li><code>### H3</code></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Links & Images:</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li><code>[link text](URL)</code></li>
                <li><code>![alt text](image URL)</code></li>
              </ul>
              <h4 className="font-medium mb-2 mt-3">Lists:</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li><code>- item</code> or <code>* item</code></li>
                <li><code>1. numbered item</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
