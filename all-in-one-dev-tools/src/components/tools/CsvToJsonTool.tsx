'use client';

import { useState, useEffect, useCallback } from 'react';
import { ToolLayout } from './ToolLayout';
import { InputOutput } from './InputOutput';
import { ToolOptions } from './ToolOptions';

export function CsvToJsonTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);
  const [skipEmptyLines, setSkipEmptyLines] = useState(true);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [outputFormat, setOutputFormat] = useState<'array' | 'object'>('array');
  const [error, setError] = useState('');

  const parseCSV = useCallback((csvText: string): string[][] => {
    const lines = csvText.split('\n');
    const result: string[][] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (skipEmptyLines && !line.trim()) {
        continue;
      }
      
      const row: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        
        if (char === '"') {
          if (inQuotes && line[j + 1] === '"') {
            current += '"';
            j++; // Skip next quote
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === delimiter && !inQuotes) {
          row.push(trimWhitespace ? current.trim() : current);
          current = '';
        } else {
          current += char;
        }
      }
      
      row.push(trimWhitespace ? current.trim() : current);
      result.push(row);
    }
    
    return result;
  }, [skipEmptyLines, trimWhitespace, delimiter]);

  const convertToJSON = useCallback((csvData: string[][]): string => {
    if (csvData.length === 0) {
      return '[]';
    }

    if (outputFormat === 'array') {
      return JSON.stringify(csvData, null, 2);
    }

    // Object format
    if (!hasHeader || csvData.length < 2) {
      throw new Error('Object format requires header row and at least one data row');
    }

    const headers = csvData[0];
    const dataRows = csvData.slice(1);
    
    const objects = dataRows.map(row => {
      const obj: Record<string, string> = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });

    return JSON.stringify(objects, null, 2);
  }, [outputFormat, hasHeader]);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const csvData = parseCSV(input);
      const jsonOutput = convertToJSON(csvData);
      setOutput(jsonOutput);
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  }, [input, parseCSV, convertToJSON]);

  const handleReset = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const loadSampleData = () => {
    const sampleCSV = `name,age,city,country
John Doe,30,New York,USA
Jane Smith,25,London,UK
Bob Johnson,35,"Los Angeles",USA
Alice Brown,28,Toronto,Canada`;
    setInput(sampleCSV);
  };

  const options = [
    {
      id: 'delimiter',
      label: 'Delimiter',
      type: 'select' as const,
      value: delimiter,
      onChange: (value: unknown) => setDelimiter(value as string),
      options: [
        { value: ',', label: 'Comma (,)' },
        { value: ';', label: 'Semicolon (;)' },
        { value: '\t', label: 'Tab' },
        { value: '|', label: 'Pipe (|)' },
      ],
      description: 'Character used to separate CSV fields'
    },
    {
      id: 'outputFormat',
      label: 'Output Format',
      type: 'radio' as const,
      value: outputFormat,
      onChange: (value: unknown) => setOutputFormat(value as 'array' | 'object'),
      options: [
        { value: 'array', label: 'Array of arrays' },
        { value: 'object', label: 'Array of objects' },
      ],
      description: 'Choose the JSON output structure'
    },
    {
      id: 'hasHeader',
      label: 'First row is header',
      type: 'checkbox' as const,
      value: hasHeader,
      onChange: (value: unknown) => setHasHeader(value as boolean),
      description: 'Treat the first row as column headers (required for object format)'
    },
    {
      id: 'skipEmptyLines',
      label: 'Skip empty lines',
      type: 'checkbox' as const,
      value: skipEmptyLines,
      onChange: (value: unknown) => setSkipEmptyLines(value as boolean),
      description: 'Ignore empty lines in the CSV'
    },
    {
      id: 'trimWhitespace',
      label: 'Trim whitespace',
      type: 'checkbox' as const,
      value: trimWhitespace,
      onChange: (value: unknown) => setTrimWhitespace(value as boolean),
      description: 'Remove leading and trailing whitespace from fields'
    }
  ];

  return (
    <ToolLayout
      title="CSV to JSON Converter"
      description="Convert CSV (Comma Separated Values) data to JSON format with customizable parsing options and output formats."
      breadcrumb="File Utilities"
    >
      <ToolOptions options={options}>
        <div className="flex space-x-2">
          <button
            onClick={loadSampleData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Load Sample CSV
          </button>
        </div>
      </ToolOptions>

      <InputOutput
        inputLabel="CSV Input"
        outputLabel="JSON Output"
        inputPlaceholder="Paste your CSV data here..."
        outputPlaceholder="JSON output will appear here..."
        inputValue={input}
        outputValue={output}
        onInputChange={setInput}
        onReset={handleReset}
        allowDownload={true}
        downloadFilename="converted.json"
        downloadMimeType="application/json"
        error={error}
        inputRows={10}
        outputRows={10}
      />

      {/* CSV Information */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">CSV to JSON Conversion Guide</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Output Formats:</h4>
              <ul className="space-y-1">
                <li><strong>Array of arrays:</strong> Each row becomes an array</li>
                <li><strong>Array of objects:</strong> Each row becomes an object with header keys</li>
              </ul>
              <h4 className="font-medium mb-2 mt-3">Supported Features:</h4>
              <ul className="space-y-1">
                <li>Quoted fields with commas</li>
                <li>Escaped quotes (&quot;&quot;)</li>
                <li>Custom delimiters</li>
                <li>Header row handling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Example CSV:</h4>
              <pre className="text-xs bg-white p-2 rounded border font-mono">
{`name,age,city
"John Doe",30,"New York"
Jane Smith,25,London`}
              </pre>
              <h4 className="font-medium mb-2 mt-3">Becomes JSON:</h4>
              <pre className="text-xs bg-white p-2 rounded border font-mono">
{`[
  {"name": "John Doe", "age": "30", "city": "New York"},
  {"name": "Jane Smith", "age": "25", "city": "London"}
]`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
