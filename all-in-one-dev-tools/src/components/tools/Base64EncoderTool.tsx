'use client';

import { useState, useEffect } from 'react';
import { ToolLayout } from './ToolLayout';
import { InputOutput } from './InputOutput';
import { ToolOptions } from './ToolOptions';

export function Base64EncoderTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      if (mode === 'encode') {
        // Encode to Base64
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
        setError('');
      } else {
        // Decode from Base64
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
        setError('');
      }
    } catch {
      setError(mode === 'encode' ? 'Failed to encode text' : 'Invalid Base64 string');
      setOutput('');
    }
  }, [input, mode]);

  const handleReset = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const loadSampleData = () => {
    if (mode === 'encode') {
      setInput('Hello, World! This is a sample text for Base64 encoding.');
    } else {
      setInput('SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgZm9yIEJhc2U2NCBlbmNvZGluZy4=');
    }
  };

  const options = [
    {
      id: 'mode',
      label: 'Mode',
      type: 'radio' as const,
      value: mode,
      onChange: (value: unknown) => setMode(value as 'encode' | 'decode'),
      options: [
        { value: 'encode', label: 'Encode to Base64' },
        { value: 'decode', label: 'Decode from Base64' },
      ],
      description: 'Choose whether to encode or decode'
    }
  ];

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Encode text to Base64 or decode Base64 strings back to text. Supports UTF-8 encoding for international characters."
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
        inputLabel={mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
        outputLabel={mode === 'encode' ? 'Base64 Encoded' : 'Decoded Text'}
        inputPlaceholder={
          mode === 'encode' 
            ? 'Enter text to encode...' 
            : 'Enter Base64 string to decode...'
        }
        outputPlaceholder={
          mode === 'encode' 
            ? 'Base64 encoded text will appear here...' 
            : 'Decoded text will appear here...'
        }
        inputValue={input}
        outputValue={output}
        onInputChange={setInput}
        onReset={handleReset}
        allowDownload={true}
        downloadFilename={mode === 'encode' ? 'encoded.txt' : 'decoded.txt'}
        downloadMimeType="text/plain"
        error={error}
      />

      {/* Base64 Information */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">About Base64</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <p>
            <strong>Base64</strong> is a binary-to-text encoding scheme that represents binary data 
            in an ASCII string format by translating it into a radix-64 representation.
          </p>
          <p>
            Common uses of Base64 encoding:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Encoding binary data for transmission over text-based protocols</li>
            <li>Embedding images in HTML/CSS (data URLs)</li>
            <li>Storing complex data in JSON or XML</li>
            <li>Email attachments (MIME encoding)</li>
            <li>Basic authentication in HTTP headers</li>
          </ul>
          <p className="mt-3">
            <strong>Note:</strong> Base64 is not encryption - it&apos;s just encoding.
            Anyone can decode Base64 strings, so don&apos;t use it for sensitive data protection.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
