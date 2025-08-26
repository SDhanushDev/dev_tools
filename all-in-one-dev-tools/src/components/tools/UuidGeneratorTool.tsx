'use client';

import { useState } from 'react';
import { ToolLayout } from './ToolLayout';
import { ToolOptions } from './ToolOptions';
import { Copy, RefreshCw, Check, Download } from 'lucide-react';
import { copyToClipboard, downloadFile } from '@/lib/utils';

export function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState<'standard' | 'uppercase' | 'nohyphens' | 'braces'>('standard');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const formatUUID = (uuid: string): string => {
    switch (format) {
      case 'uppercase':
        return uuid.toUpperCase();
      case 'nohyphens':
        return uuid.replace(/-/g, '');
      case 'braces':
        return `{${uuid}}`;
      default:
        return uuid;
    }
  };

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: count }, () => formatUUID(generateUUID()));
    setUuids(newUuids);
  };

  const handleCopy = async (uuid: string, index: number) => {
    await copyToClipboard(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = async () => {
    const allUuids = uuids.join('\n');
    await copyToClipboard(allUuids);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownload = () => {
    const content = uuids.join('\n');
    downloadFile(content, 'uuids.txt', 'text/plain');
  };

  const options = [
    {
      id: 'count',
      label: 'Number of UUIDs',
      type: 'number' as const,
      value: count,
      onChange: (value: unknown) => setCount(value as number),
      min: 1,
      max: 1000,
      description: 'How many UUIDs to generate (1-1000)'
    },
    {
      id: 'format',
      label: 'Format',
      type: 'select' as const,
      value: format,
      onChange: (value: unknown) => setFormat(value as 'standard' | 'uppercase' | 'nohyphens' | 'braces'),
      options: [
        { value: 'standard', label: 'Standard (lowercase with hyphens)' },
        { value: 'uppercase', label: 'Uppercase with hyphens' },
        { value: 'nohyphens', label: 'No hyphens (lowercase)' },
        { value: 'braces', label: 'With braces {uuid}' },
      ],
      description: 'Choose the UUID format'
    }
  ];

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate UUID (Universally Unique Identifier) version 4 strings for use as unique identifiers in your applications."
      breadcrumb="Security & Hashing"
    >
      <ToolOptions options={options}>
        <div className="flex space-x-2">
          <button
            onClick={generateUUIDs}
            className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Generate UUIDs</span>
          </button>
        </div>
      </ToolOptions>

      {/* Generated UUIDs */}
      {uuids.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Generated UUIDs ({uuids.length})
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyAll}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {copiedIndex === -1 ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copiedIndex === -1 ? 'Copied All!' : 'Copy All'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {uuids.map((uuid, index) => (
              <div key={index} className="flex items-center justify-between bg-white border border-gray-300 rounded-md p-3">
                <div className="font-mono text-sm flex-1 mr-4 select-all">
                  {uuid}
                </div>
                <button
                  onClick={() => handleCopy(uuid, index)}
                  className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {copiedIndex === index ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  <span>{copiedIndex === index ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Initial State */}
      {uuids.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <div className="text-gray-500 mb-4">
            <RefreshCw className="h-12 w-12 mx-auto mb-2" />
            <p>Click &quot;Generate UUIDs&quot; to create unique identifiers</p>
          </div>
        </div>
      )}

      {/* UUID Information */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">About UUIDs</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <p>
            <strong>UUID (Universally Unique Identifier)</strong> is a 128-bit identifier used to uniquely 
            identify information in computer systems. This tool generates UUID version 4, which uses random numbers.
          </p>
          <p>
            UUID v4 characteristics:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Format:</strong> 8-4-4-4-12 hexadecimal digits (36 characters total)</li>
            <li><strong>Randomness:</strong> 122 bits of randomness (6 bits are fixed)</li>
            <li><strong>Collision probability:</strong> Extremely low (1 in 2^122)</li>
            <li><strong>No central authority:</strong> Can be generated independently</li>
            <li><strong>Cross-platform:</strong> Standardized format (RFC 4122)</li>
          </ul>
          <p>
            Common uses: Database primary keys, session IDs, file names, API request IDs, 
            distributed system identifiers, and temporary unique references.
          </p>
          <div className="mt-3 p-3 bg-green-100 rounded-md">
            <p className="text-green-800 text-xs">
              <strong>Privacy Note:</strong> All UUIDs are generated locally using your browser&apos;s
              cryptographically secure random number generator. No data is sent to our servers.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
