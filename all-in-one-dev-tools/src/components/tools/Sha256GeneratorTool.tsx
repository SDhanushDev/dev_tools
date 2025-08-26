'use client';

import { useState, useEffect } from 'react';
import { ToolLayout } from './ToolLayout';
import { InputOutput } from './InputOutput';
import { ToolOptions } from './ToolOptions';
import CryptoJS from 'crypto-js';

export function Sha256GeneratorTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [outputFormat, setOutputFormat] = useState<'hex' | 'base64'>('hex');
  const [encoding, setEncoding] = useState<'utf8' | 'latin1'>('utf8');

  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }

    try {
      const hash = CryptoJS.SHA256(input);
      
      if (outputFormat === 'hex') {
        setOutput(hash.toString(CryptoJS.enc.Hex));
      } else {
        setOutput(hash.toString(CryptoJS.enc.Base64));
      }
    } catch (err) {
      setOutput('Error generating hash');
    }
  }, [input, outputFormat, encoding]);

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
    },
    {
      id: 'encoding',
      label: 'Input Encoding',
      type: 'select' as const,
      value: encoding,
      onChange: (value: unknown) => setEncoding(value as 'utf8' | 'latin1'),
      options: [
        { value: 'utf8', label: 'UTF-8' },
        { value: 'latin1', label: 'Latin1' },
      ],
      description: 'Character encoding for input text'
    }
  ];

  return (
    <ToolLayout
      title="SHA256 Hash Generator"
      description="Generate SHA256 hashes from text input. SHA256 is a cryptographic hash function that produces a 256-bit hash value."
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
        outputLabel="SHA256 Hash"
        inputPlaceholder="Enter text to generate SHA256 hash..."
        outputPlaceholder="SHA256 hash will appear here..."
        inputValue={input}
        outputValue={output}
        onInputChange={setInput}
        onReset={handleReset}
        allowDownload={true}
        downloadFilename="sha256-hash.txt"
        downloadMimeType="text/plain"
        inputRows={4}
        outputRows={3}
      />

      {/* Hash Information */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">About SHA256</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <p>
            <strong>SHA256 (Secure Hash Algorithm 256-bit)</strong> is a cryptographic hash function 
            that produces a 256-bit (32-byte) hash value, typically rendered as a 64-character hexadecimal number.
          </p>
          <p>
            Key characteristics of SHA256:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Deterministic:</strong> Same input always produces the same hash</li>
            <li><strong>Fixed size:</strong> Always produces a 256-bit output regardless of input size</li>
            <li><strong>Avalanche effect:</strong> Small input changes result in drastically different hashes</li>
            <li><strong>One-way function:</strong> Computationally infeasible to reverse</li>
            <li><strong>Collision resistant:</strong> Extremely difficult to find two inputs with the same hash</li>
          </ul>
          <p>
            Common uses: Password storage, digital signatures, blockchain, file integrity verification, 
            and cryptocurrency mining.
          </p>
          <div className="mt-3 p-3 bg-yellow-100 rounded-md">
            <p className="text-yellow-800 text-xs">
              <strong>Security Note:</strong> While SHA256 is cryptographically secure, never use plain hashes 
              for password storage. Always use proper password hashing functions like bcrypt, scrypt, or Argon2 
              with salt for password security.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
