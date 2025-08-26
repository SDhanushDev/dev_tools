'use client';

import { useState, useEffect } from 'react';
import { ToolLayout } from './ToolLayout';
import { ToolOptions } from './ToolOptions';

export function RegexTesterTool() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState('g');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([]);
      setError('');
      setHighlightedText(testString);
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: RegExpMatchArray[] = [];
      let match;
      let lastIndex = 0;
      let highlighted = '';

      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          allMatches.push(match);
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          allMatches.push(match);
        }
      }

      // Create highlighted text
      if (allMatches.length > 0) {
        allMatches.forEach((match, index) => {
          if (match.index !== undefined) {
            highlighted += testString.slice(lastIndex, match.index);
            highlighted += `<mark class="bg-yellow-200 px-1 rounded">${match[0]}</mark>`;
            lastIndex = match.index + match[0].length;
          }
        });
        highlighted += testString.slice(lastIndex);
      } else {
        highlighted = testString;
      }

      setMatches(allMatches);
      setHighlightedText(highlighted);
      setError('');
    } catch (err) {
      setError('Invalid regular expression: ' + (err as Error).message);
      setMatches([]);
      setHighlightedText(testString);
    }
  }, [pattern, testString, flags]);

  const handleReset = () => {
    setPattern('');
    setTestString('');
    setMatches([]);
    setError('');
    setHighlightedText('');
  };

  const loadSampleData = () => {
    setPattern('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b');
    setTestString('Contact us at support@example.com or sales@company.org for more information. You can also reach admin@test.co.uk.');
  };

  const flagOptions = [
    {
      id: 'global',
      label: 'Global (g)',
      type: 'checkbox' as const,
      value: flags.includes('g'),
      onChange: (value: unknown) => {
        const checked = value as boolean;
        if (checked) {
          setFlags(prev => prev.includes('g') ? prev : prev + 'g');
        } else {
          setFlags(prev => prev.replace('g', ''));
        }
      },
      description: 'Find all matches rather than stopping after the first match'
    },
    {
      id: 'ignoreCase',
      label: 'Ignore Case (i)',
      type: 'checkbox' as const,
      value: flags.includes('i'),
      onChange: (value: unknown) => {
        const checked = value as boolean;
        if (checked) {
          setFlags(prev => prev.includes('i') ? prev : prev + 'i');
        } else {
          setFlags(prev => prev.replace('i', ''));
        }
      },
      description: 'Case insensitive matching'
    },
    {
      id: 'multiline',
      label: 'Multiline (m)',
      type: 'checkbox' as const,
      value: flags.includes('m'),
      onChange: (value: unknown) => {
        const checked = value as boolean;
        if (checked) {
          setFlags(prev => prev.includes('m') ? prev : prev + 'm');
        } else {
          setFlags(prev => prev.replace('m', ''));
        }
      },
      description: '^ and $ match line breaks'
    }
  ];

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test and debug regular expressions with real-time matching, highlighting, and detailed match information."
      breadcrumb="Developer Tools"
    >
      <ToolOptions title="Regex Flags" options={flagOptions}>
        <div className="flex space-x-2">
          <button
            onClick={loadSampleData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Load Email Example
          </button>
        </div>
      </ToolOptions>

      <div className="space-y-6">
        {/* Pattern Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Regular Expression Pattern
          </label>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-mono">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter your regex pattern..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            />
            <span className="text-gray-500 font-mono">/{flags}</span>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        {/* Test String Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test String
          </label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against your regex..."
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          />
        </div>

        {/* Results */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Results ({matches.length} match{matches.length !== 1 ? 'es' : ''})
          </h3>
          
          {/* Highlighted Text */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highlighted Matches
            </label>
            <div 
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm min-h-[100px] whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
          </div>

          {/* Match Details */}
          {matches.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Match Details
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {matches.map((match, index) => (
                  <div key={index} className="bg-gray-50 rounded-md p-3 text-sm">
                    <div className="font-medium text-gray-900">Match {index + 1}</div>
                    <div className="text-gray-600">
                      <span className="font-mono bg-yellow-100 px-1 rounded">{match[0]}</span>
                      {match.index !== undefined && (
                        <span className="ml-2">at position {match.index}-{match.index + match[0].length - 1}</span>
                      )}
                    </div>
                    {match.length > 1 && (
                      <div className="mt-1">
                        <div className="text-xs text-gray-500">Capture groups:</div>
                        {match.slice(1).map((group, groupIndex) => (
                          <div key={groupIndex} className="text-xs text-gray-600 ml-2">
                            Group {groupIndex + 1}: <span className="font-mono">{group || '(empty)'}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Regex Information */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Regex Quick Reference</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Common Patterns:</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li><code>.</code> - Any character</li>
                <li><code>*</code> - 0 or more</li>
                <li><code>+</code> - 1 or more</li>
                <li><code>?</code> - 0 or 1</li>
                <li><code>^</code> - Start of line</li>
                <li><code>$</code> - End of line</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Character Classes:</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li><code>[abc]</code> - Any of a, b, or c</li>
                <li><code>[a-z]</code> - Any lowercase letter</li>
                <li><code>[A-Z]</code> - Any uppercase letter</li>
                <li><code>[0-9]</code> - Any digit</li>
                <li><code>\d</code> - Any digit</li>
                <li><code>\w</code> - Any word character</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
