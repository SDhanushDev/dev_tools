'use client';

import { useState } from 'react';
import { ToolLayout } from './ToolLayout';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface CaseResult {
  name: string;
  value: string;
  description: string;
}

export function TextCaseConverterTool() {
  const [input, setInput] = useState('');
  const [copiedCase, setCopiedCase] = useState<string | null>(null);

  const toCamelCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  };

  const toPascalCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
        return word.toUpperCase();
      })
      .replace(/\s+/g, '');
  };

  const toSnakeCase = (str: string): string => {
    return str
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');
  };

  const toKebabCase = (str: string): string => {
    return str
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('-');
  };

  const toConstantCase = (str: string): string => {
    return toSnakeCase(str).toUpperCase();
  };

  const toDotCase = (str: string): string => {
    return str
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('.');
  };

  const toPathCase = (str: string): string => {
    return str
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('/');
  };

  const toSentenceCase = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const toTitleCase = (str: string): string => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const generateCases = (text: string): CaseResult[] => {
    if (!text.trim()) return [];

    return [
      {
        name: 'camelCase',
        value: toCamelCase(text),
        description: 'First word lowercase, subsequent words capitalized'
      },
      {
        name: 'PascalCase',
        value: toPascalCase(text),
        description: 'All words capitalized, no spaces'
      },
      {
        name: 'snake_case',
        value: toSnakeCase(text),
        description: 'All lowercase with underscores'
      },
      {
        name: 'kebab-case',
        value: toKebabCase(text),
        description: 'All lowercase with hyphens'
      },
      {
        name: 'CONSTANT_CASE',
        value: toConstantCase(text),
        description: 'All uppercase with underscores'
      },
      {
        name: 'dot.case',
        value: toDotCase(text),
        description: 'All lowercase with dots'
      },
      {
        name: 'path/case',
        value: toPathCase(text),
        description: 'All lowercase with forward slashes'
      },
      {
        name: 'Sentence case',
        value: toSentenceCase(text),
        description: 'First letter capitalized, rest lowercase'
      },
      {
        name: 'Title Case',
        value: toTitleCase(text),
        description: 'First letter of each word capitalized'
      },
      {
        name: 'UPPERCASE',
        value: text.toUpperCase(),
        description: 'All letters uppercase'
      },
      {
        name: 'lowercase',
        value: text.toLowerCase(),
        description: 'All letters lowercase'
      }
    ];
  };

  const cases = generateCases(input);

  const handleCopy = async (caseName: string, value: string) => {
    await copyToClipboard(value);
    setCopiedCase(caseName);
    setTimeout(() => setCopiedCase(null), 2000);
  };

  const loadSampleData = () => {
    setInput('Hello World Example Text');
  };

  return (
    <ToolLayout
      title="Text Case Converter"
      description="Convert text between different cases including camelCase, snake_case, kebab-case, PascalCase, and more."
      breadcrumb="File Utilities"
    >
      <div className="space-y-6">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Input Text
            </label>
            <button
              onClick={loadSampleData}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Load Sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert between different cases..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Results */}
        {cases.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Converted Cases</h3>
            <div className="space-y-3">
              {cases.map((caseResult) => (
                <div key={caseResult.name} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{caseResult.name}</h4>
                      <p className="text-sm text-gray-600">{caseResult.description}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(caseResult.name, caseResult.value)}
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {copiedCase === caseResult.name ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span>{copiedCase === caseResult.name ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-md p-3 font-mono text-sm break-all select-all">
                    {caseResult.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Initial State */}
        {cases.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <div className="text-gray-500 mb-4">
              <div className="text-4xl mb-2">📝</div>
              <p>Enter text above to see all case conversions</p>
            </div>
          </div>
        )}
      </div>

      {/* Case Information */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Text Case Guide</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Programming Cases:</h4>
              <ul className="space-y-1">
                <li><strong>camelCase:</strong> JavaScript, Java variables</li>
                <li><strong>PascalCase:</strong> Class names, components</li>
                <li><strong>snake_case:</strong> Python, Ruby variables</li>
                <li><strong>CONSTANT_CASE:</strong> Constants, environment variables</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Web & File Cases:</h4>
              <ul className="space-y-1">
                <li><strong>kebab-case:</strong> URLs, CSS classes, file names</li>
                <li><strong>dot.case:</strong> File extensions, namespaces</li>
                <li><strong>path/case:</strong> File paths, routes</li>
                <li><strong>Title Case:</strong> Headings, proper nouns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
