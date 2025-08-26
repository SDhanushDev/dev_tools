'use client';

import { useState, useEffect, useCallback } from 'react';
import { ToolLayout } from './ToolLayout';
import { ToolOptions } from './ToolOptions';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export function PasswordGeneratorTool() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = '';
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }
    
    if (excludeAmbiguous) {
      charset = charset.replace(/[{}[\]()\/\\'"~,;.<>]/g, '');
    }

    if (!charset) {
      setPassword('Please select at least one character type');
      return;
    }

    let result = '';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += charset.charAt(array[i] % charset.length);
    }

    setPassword(result);
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous, length]);

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous]);

  const handleCopy = async () => {
    if (password) {
      await copyToClipboard(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPasswordStrength = () => {
    if (!password || password.includes('Please select')) return { strength: 'Invalid', color: 'text-red-600', width: '0%' };
    
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { strength: 'Weak', color: 'text-red-600', width: '25%' };
    if (score <= 4) return { strength: 'Fair', color: 'text-yellow-600', width: '50%' };
    if (score <= 6) return { strength: 'Good', color: 'text-blue-600', width: '75%' };
    return { strength: 'Strong', color: 'text-green-600', width: '100%' };
  };

  const strengthInfo = getPasswordStrength();

  const options = [
    {
      id: 'length',
      label: 'Password Length',
      type: 'number' as const,
      value: length,
      onChange: (value: unknown) => setLength(value as number),
      min: 4,
      max: 128,
      description: 'Number of characters in the password (4-128)'
    },
    {
      id: 'includeUppercase',
      label: 'Include Uppercase Letters (A-Z)',
      type: 'checkbox' as const,
      value: includeUppercase,
      onChange: (value: unknown) => setIncludeUppercase(value as boolean),
    },
    {
      id: 'includeLowercase',
      label: 'Include Lowercase Letters (a-z)',
      type: 'checkbox' as const,
      value: includeLowercase,
      onChange: (value: unknown) => setIncludeLowercase(value as boolean),
    },
    {
      id: 'includeNumbers',
      label: 'Include Numbers (0-9)',
      type: 'checkbox' as const,
      value: includeNumbers,
      onChange: (value: unknown) => setIncludeNumbers(value as boolean),
    },
    {
      id: 'includeSymbols',
      label: 'Include Symbols (!@#$%^&*)',
      type: 'checkbox' as const,
      value: includeSymbols,
      onChange: (value: unknown) => setIncludeSymbols(value as boolean),
    },
    {
      id: 'excludeSimilar',
      label: 'Exclude Similar Characters (i, l, 1, L, o, 0, O)',
      type: 'checkbox' as const,
      value: excludeSimilar,
      onChange: (value: unknown) => setExcludeSimilar(value as boolean),
      description: 'Avoid characters that look similar'
    },
    {
      id: 'excludeAmbiguous',
      label: 'Exclude Ambiguous Characters ({ } [ ] ( ) / \\ \' " ~ , ; . < >)',
      type: 'checkbox' as const,
      value: excludeAmbiguous,
      onChange: (value: unknown) => setExcludeAmbiguous(value as boolean),
      description: 'Avoid characters that might cause issues in some systems'
    }
  ];

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate secure, random passwords with customizable length and character sets. All generation happens locally in your browser."
      breadcrumb="Security & Hashing"
    >
      <ToolOptions options={options} />

      {/* Generated Password */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Generated Password</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={generatePassword}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Generate New</span>
            </button>
            <button
              onClick={handleCopy}
              disabled={!password || password.includes('Please select')}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-300 rounded-md p-4 mb-4">
          <div className="font-mono text-lg break-all select-all">
            {password || 'Click "Generate New" to create a password'}
          </div>
        </div>

        {/* Password Strength */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Password Strength:</span>
            <span className={`font-medium ${strengthInfo.color}`}>
              {strengthInfo.strength}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                strengthInfo.strength === 'Weak' ? 'bg-red-500' :
                strengthInfo.strength === 'Fair' ? 'bg-yellow-500' :
                strengthInfo.strength === 'Good' ? 'bg-blue-500' :
                'bg-green-500'
              }`}
              style={{ width: strengthInfo.width }}
            />
          </div>
        </div>
      </div>

      {/* Password Security Tips */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Password Security Tips</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Use unique passwords</strong> for each account</li>
            <li><strong>Longer is stronger</strong> - aim for at least 12 characters</li>
            <li><strong>Use a password manager</strong> to store and generate passwords</li>
            <li><strong>Enable two-factor authentication</strong> when available</li>
            <li><strong>Don&apos;t share passwords</strong> or write them down in plain text</li>
            <li><strong>Change passwords</strong> if you suspect they&apos;ve been compromised</li>
          </ul>
          <div className="mt-3 p-3 bg-green-100 rounded-md">
            <p className="text-green-800 text-xs">
              <strong>Privacy Note:</strong> All password generation happens locally in your browser. 
              No passwords are sent to our servers or stored anywhere.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
