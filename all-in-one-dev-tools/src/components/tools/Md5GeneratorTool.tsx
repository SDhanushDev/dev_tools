'use client';

import { useState, useEffect } from 'react';
import { ToolLayout } from './ToolLayout';
import { InputOutput } from './InputOutput';
import { ToolOptions } from './ToolOptions';
import CryptoJS from 'crypto-js';

export function Md5GeneratorTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [outputFormat, setOutputFormat] = useState<'hex' | 'base64'>('hex');

  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }

    try {
      const hash = CryptoJS.MD5(input);
      
      if (outputFormat === 'hex') {
        setOutput(hash.toString(CryptoJS.enc.Hex));
      } else {
        setOutput(hash.toString(CryptoJS.enc.Base64));
      }
    } catch {
      setOutput('Error generating hash');
    }
  }, [input, outputFormat]);

  const handleReset = () => {
    setInput('');
    setOutput('');
  };

  const loadSampleData = () => {
    setInput('Hello, World!');
  };

  const options = [
    {
      id: 'outputFormat',
      label: 'Output Format',
      type: 'radio' as const,
      value: outputFormat,
      onChange: (value: unknown) => setOutputFormat(value as 'hex' | 'base64'),
      options: [
        { value: 'hex', label: 'Hexadecimal (lowercase)' },
        { value: 'base64', label: 'Base64' },
      ],
      description: 'Choose the output format for the hash'
    }
  ];

  return (
    <ToolLayout
      title="MD5 Hash Generator"
      description="Generate MD5 hashes from text input. Note: MD5 is considered cryptographically broken and should not be used for security purposes."
      breadcrumb="Security & Hashing"
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
        inputLabel="Text to Hash"
        outputLabel="MD5 Hash"
        inputPlaceholder="Enter text to generate MD5 hash..."
        outputPlaceholder="MD5 hash will appear here..."
        inputValue={input}
        outputValue={output}
        onInputChange={setInput}
        onReset={handleReset}
        allowDownload={true}
        downloadFilename="md5-hash.txt"
        downloadMimeType="text/plain"
        inputRows={4}
        outputRows={3}
      />

      {/* Hash Information */}
      <div className="mt-8 bg-red-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-3">About MD5</h3>
        <div className="text-red-800 space-y-2 text-sm">
          <div className="p-3 bg-red-100 rounded-md mb-4">
            <p className="text-red-900 font-medium">
              ⚠️ Security Warning: MD5 is cryptographically broken and should not be used for security purposes.
            </p>
          </div>
          <p>
            <strong>MD5 (Message Digest Algorithm 5)</strong> is a widely used hash function 
            that produces a 128-bit (16-byte) hash value, typically expressed as a 32-character hexadecimal number.
          </p>
          <p>
            Why MD5 is considered insecure:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Collision vulnerabilities:</strong> It&apos;s possible to create two different inputs with the same MD5 hash</li>
            <li><strong>Fast computation:</strong> Modern hardware can compute billions of MD5 hashes per second</li>
            <li><strong>Rainbow table attacks:</strong> Pre-computed hash tables make it easy to reverse common inputs</li>
            <li><strong>Not suitable for passwords:</strong> Should never be used for password storage</li>
          </ul>
          <p>
            Legitimate uses for MD5:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>File integrity verification (when security is not a concern)</li>
            <li>Checksums for non-critical data</li>
            <li>Legacy system compatibility</li>
            <li>Non-cryptographic applications like hash tables</li>
          </ul>
          <p className="mt-3">
            <strong>Recommendation:</strong> Use SHA-256 or SHA-3 for security-sensitive applications.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
