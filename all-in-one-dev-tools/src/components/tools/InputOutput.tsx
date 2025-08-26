'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, RotateCcw, Download, Check } from 'lucide-react';
import { copyToClipboard, downloadFile } from '@/lib/utils';

interface InputOutputProps {
  inputLabel?: string;
  outputLabel?: string;
  inputPlaceholder?: string;
  outputPlaceholder?: string;
  inputValue: string;
  outputValue: string;
  onInputChange: (value: string) => void;
  onReset?: () => void;
  allowDownload?: boolean;
  downloadFilename?: string;
  downloadMimeType?: string;
  inputRows?: number;
  outputRows?: number;
  processing?: boolean;
  error?: string;
}

export function InputOutput({
  inputLabel = 'Input',
  outputLabel = 'Output',
  inputPlaceholder = 'Enter your text here...',
  outputPlaceholder = 'Output will appear here...',
  inputValue,
  outputValue,
  onInputChange,
  onReset,
  allowDownload = false,
  downloadFilename = 'output.txt',
  downloadMimeType = 'text/plain',
  inputRows = 8,
  outputRows = 8,
  processing = false,
  error,
}: InputOutputProps) {
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  const handleCopyInput = async () => {
    if (inputValue) {
      await copyToClipboard(inputValue);
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    }
  };

  const handleCopyOutput = async () => {
    if (outputValue) {
      await copyToClipboard(outputValue);
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    }
  };

  const handleDownload = () => {
    if (outputValue) {
      downloadFile(outputValue, downloadFilename, downloadMimeType);
    }
  };

  const handleReset = () => {
    onInputChange('');
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            {inputLabel}
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyInput}
              disabled={!inputValue}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {copiedInput ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copiedInput ? 'Copied!' : 'Copy'}</span>
            </button>
            {onReset && (
              <button
                onClick={handleReset}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
        <textarea
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={inputPlaceholder}
          rows={inputRows}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
        />
      </div>

      {/* Ad Placeholder between input and output */}
      <div className="py-4">
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-20 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-sm">Advertisement</div>
            <div className="text-xs">Square ad placeholder</div>
          </div>
        </div>
      </div>

      {/* Output Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            {outputLabel}
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyOutput}
              disabled={!outputValue}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {copiedOutput ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copiedOutput ? 'Copied!' : 'Copy'}</span>
            </button>
            {allowDownload && (
              <button
                onClick={handleDownload}
                disabled={!outputValue}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            )}
          </div>
        </div>
        <div className="relative">
          <textarea
            value={processing ? 'Processing...' : outputValue}
            placeholder={outputPlaceholder}
            rows={outputRows}
            readOnly
            className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 resize-none font-mono text-sm ${
              error ? 'border-red-300 bg-red-50' : ''
            }`}
          />
          {processing && (
            <div className="absolute inset-0 bg-gray-50 bg-opacity-75 flex items-center justify-center rounded-md">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"
              />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
