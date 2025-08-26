'use client';

import { useState, useEffect, useCallback } from 'react';
import { ToolLayout } from './ToolLayout';
import { InputOutput } from './InputOutput';
import { ToolOptions } from './ToolOptions';
import { minifyJSON } from '@/lib/utils';

export function JsonFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [minify, setMinify] = useState(false);

  const sortObjectKeys = useCallback((obj: unknown): unknown => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    } else if (obj !== null && typeof obj === 'object') {
      const sorted: Record<string, unknown> = {};
      Object.keys(obj)
        .sort()
        .forEach(key => {
          sorted[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
        });
      return sorted;
    }
    return obj;
  }, []);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      if (minify) {
        setOutput(minifyJSON(input));
      } else {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(
          sortKeys ? sortObjectKeys(parsed) : parsed,
          null,
          indentSize
        );
        setOutput(formatted);
      }
      setError('');
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
      setOutput('');
    }
  }, [input, indentSize, sortKeys, minify, sortObjectKeys]);

  const handleReset = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const loadSampleData = () => {
    const sampleJson = {
      "name": "John Doe",
      "age": 30,
      "city": "New York",
      "hobbies": ["reading", "swimming", "coding"],
      "address": {
        "street": "123 Main St",
        "zipCode": "10001"
      },
      "isActive": true
    };
    setInput(JSON.stringify(sampleJson, null, 2));
  };

  const options = [
    {
      id: 'indentSize',
      label: 'Indent Size',
      type: 'select' as const,
      value: indentSize,
      onChange: (value: unknown) => setIndentSize(value as number),
      options: [
        { value: 2, label: '2 spaces' },
        { value: 4, label: '4 spaces' },
        { value: 8, label: '8 spaces' },
      ],
      description: 'Number of spaces for indentation'
    },
    {
      id: 'sortKeys',
      label: 'Sort Keys',
      type: 'checkbox' as const,
      value: sortKeys,
      onChange: (value: unknown) => setSortKeys(value as boolean),
      description: 'Sort object keys alphabetically'
    },
    {
      id: 'minify',
      label: 'Minify',
      type: 'checkbox' as const,
      value: minify,
      onChange: (value: unknown) => setMinify(value as boolean),
      description: 'Remove all whitespace and formatting'
    }
  ];

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate, and beautify JSON data with syntax highlighting and customizable options."
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

      <InputOutput
        inputLabel="JSON Input"
        outputLabel="Formatted JSON"
        inputPlaceholder="Paste your JSON here..."
        outputPlaceholder="Formatted JSON will appear here..."
        inputValue={input}
        outputValue={output}
        onInputChange={setInput}
        onReset={handleReset}
        allowDownload={true}
        downloadFilename="formatted.json"
        downloadMimeType="application/json"
        error={error}
      />

      {/* JSON Schema Information */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">About JSON</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <p>
            <strong>JSON (JavaScript Object Notation)</strong> is a lightweight data-interchange format 
            that is easy for humans to read and write.
          </p>
          <p>
            This tool helps you format, validate, and beautify JSON data. It supports:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>JSON validation with detailed error messages</li>
            <li>Customizable indentation (2, 4, or 8 spaces)</li>
            <li>Alphabetical key sorting</li>
            <li>JSON minification for production use</li>
            <li>Download formatted JSON as a file</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
