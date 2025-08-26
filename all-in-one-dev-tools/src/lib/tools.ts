export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
  keywords: string[];
  icon: string;
}

export const toolCategories = [
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Essential tools for developers',
    icon: 'Code',
  },
  {
    id: 'security',
    name: 'Security & Hashing',
    description: 'Security and encryption tools',
    icon: 'Shield',
  },
  {
    id: 'file-utilities',
    name: 'File Utilities',
    description: 'File processing and conversion tools',
    icon: 'FileText',
  },
  {
    id: 'design',
    name: 'Design & Media',
    description: 'Design and media creation tools',
    icon: 'Palette',
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Productivity and utility tools',
    icon: 'Zap',
  },
];

export const tools: Tool[] = [
  // Developer Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data with syntax highlighting',
    category: 'developer',
    path: '/tools/json-formatter',
    keywords: ['json', 'format', 'beautify', 'validate', 'pretty print'],
    icon: 'Braces',
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regular expressions with real-time matching',
    category: 'developer',
    path: '/tools/regex-tester',
    keywords: ['regex', 'regular expression', 'pattern', 'match', 'test'],
    icon: 'Search',
  },
  {
    id: 'markdown-previewer',
    name: 'Markdown Previewer',
    description: 'Preview markdown content with live rendering',
    category: 'developer',
    path: '/tools/markdown-previewer',
    keywords: ['markdown', 'preview', 'md', 'render', 'documentation'],
    icon: 'FileText',
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings',
    category: 'developer',
    path: '/tools/base64-encoder',
    keywords: ['base64', 'encode', 'decode', 'encoding', 'conversion'],
    icon: 'Binary',
  },

  // Security & Hashing
  {
    id: 'sha256-generator',
    name: 'SHA256 Hash Generator',
    description: 'Generate SHA256 hashes from text input',
    category: 'security',
    path: '/tools/sha256-generator',
    keywords: ['sha256', 'hash', 'checksum', 'security', 'encryption'],
    icon: 'Hash',
  },
  {
    id: 'sha3-256-generator',
    name: 'SHA3-256 Hash Generator',
    description: 'Generate SHA3-256 hashes from text input',
    category: 'security',
    path: '/tools/sha3-256-generator',
    keywords: ['sha3', 'sha3-256', 'hash', 'checksum', 'security'],
    icon: 'Hash',
  },
  {
    id: 'md5-generator',
    name: 'MD5 Hash Generator',
    description: 'Generate MD5 hashes from text input',
    category: 'security',
    path: '/tools/md5-generator',
    keywords: ['md5', 'hash', 'checksum', 'legacy', 'verification'],
    icon: 'Hash',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure random passwords with customizable options',
    category: 'security',
    path: '/tools/password-generator',
    keywords: ['password', 'generate', 'random', 'secure', 'strength'],
    icon: 'Key',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate UUID/GUID identifiers',
    category: 'security',
    path: '/tools/uuid-generator',
    keywords: ['uuid', 'guid', 'identifier', 'unique', 'generate'],
    icon: 'Hash',
  },
  {
    id: 'md5-generator',
    name: 'MD5 Hash Generator',
    description: 'Generate MD5 hashes from text input',
    category: 'security',
    path: '/tools/md5-generator',
    keywords: ['md5', 'hash', 'checksum', 'legacy', 'verification'],
    icon: 'Hash',
  },

  // File Utilities
  {
    id: 'csv-to-json',
    name: 'CSV to JSON Converter',
    description: 'Convert CSV data to JSON format',
    category: 'file-utilities',
    path: '/tools/csv-to-json',
    keywords: ['csv', 'json', 'convert', 'data', 'transformation'],
    icon: 'ArrowRightLeft',
  },
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    description: 'Convert text between different cases (camelCase, snake_case, etc.)',
    category: 'file-utilities',
    path: '/tools/text-case-converter',
    keywords: ['text', 'case', 'convert', 'camelcase', 'snake_case', 'kebab-case'],
    icon: 'Type',
  },
  {
    id: 'markdown-previewer',
    name: 'Markdown Previewer',
    description: 'Preview markdown content with live rendering',
    category: 'developer',
    path: '/tools/markdown-previewer',
    keywords: ['markdown', 'preview', 'md', 'render', 'documentation'],
    icon: 'FileText',
  },

  // Design & Media
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors and get hex, RGB, HSL values',
    category: 'design',
    path: '/tools/color-picker',
    keywords: ['color', 'picker', 'hex', 'rgb', 'hsl', 'palette'],
    icon: 'Palette',
  },
  {
    id: 'gradient-generator',
    name: 'Gradient Generator',
    description: 'Create CSS gradients with live preview',
    category: 'design',
    path: '/tools/gradient-generator',
    keywords: ['gradient', 'css', 'linear', 'radial', 'background'],
    icon: 'Palette',
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from text or URLs',
    category: 'design',
    path: '/tools/qr-code-generator',
    keywords: ['qr', 'qr code', 'generate', 'barcode', 'url'],
    icon: 'QrCode',
  },
  {
    id: 'gradient-generator',
    name: 'Gradient Generator',
    description: 'Create CSS gradients with live preview',
    category: 'design',
    path: '/tools/gradient-generator',
    keywords: ['gradient', 'css', 'linear', 'radial', 'background'],
    icon: 'Palette',
  },

  // Productivity
  {
    id: 'epoch-converter',
    name: 'Epoch Time Converter',
    description: 'Convert between epoch time and human-readable dates',
    category: 'productivity',
    path: '/tools/epoch-converter',
    keywords: ['epoch', 'unix', 'timestamp', 'date', 'time', 'convert'],
    icon: 'Clock',
  },
  {
    id: 'diff-checker',
    name: 'Text Diff Checker',
    description: 'Compare two texts and highlight differences',
    category: 'productivity',
    path: '/tools/diff-checker',
    keywords: ['diff', 'compare', 'text', 'difference', 'merge'],
    icon: 'GitCompare',
  },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(tool => tool.category === categoryId);
}

export function searchTools(query: string): Tool[] {
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
}

export function getToolById(id: string): Tool | undefined {
  return tools.find(tool => tool.id === id);
}
