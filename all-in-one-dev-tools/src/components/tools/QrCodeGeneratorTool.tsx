'use client';

import { useState, useEffect, useRef } from 'react';
import { ToolLayout } from './ToolLayout';
import { ToolOptions } from './ToolOptions';
import { Download, Copy, Check } from 'lucide-react';
import QRCode from 'qrcode';
import { copyToClipboard } from '@/lib/utils';

export function QrCodeGeneratorTool() {
  const [input, setInput] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [size, setSize] = useState(256);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [margin, setMargin] = useState(4);
  const [darkColor, setDarkColor] = useState('#000000');
  const [lightColor, setLightColor] = useState('#FFFFFF');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!input.trim()) {
      setQrCodeUrl('');
      return;
    }

    generateQRCode();
  }, [input, size, errorCorrectionLevel, margin, darkColor, lightColor]);

  const generateQRCode = async () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      await QRCode.toCanvas(canvas, input, {
        width: size,
        margin: margin,
        color: {
          dark: darkColor,
          light: lightColor,
        },
        errorCorrectionLevel: errorCorrectionLevel,
      });

      const dataUrl = canvas.toDataURL('image/png');
      setQrCodeUrl(dataUrl);
    } catch (err) {
      console.error('Error generating QR code:', err);
      setQrCodeUrl('');
    }
  };

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrCodeUrl;
      link.click();
    }
  };

  const handleCopyImage = async () => {
    if (qrCodeUrl) {
      try {
        const response = await fetch(qrCodeUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy image:', err);
      }
    }
  };

  const loadSampleData = () => {
    setInput('https://example.com');
  };

  const options = [
    {
      id: 'size',
      label: 'Size (pixels)',
      type: 'number' as const,
      value: size,
      onChange: (value: unknown) => setSize(value as number),
      min: 100,
      max: 1000,
      step: 50,
      description: 'Width and height of the QR code in pixels'
    },
    {
      id: 'errorCorrectionLevel',
      label: 'Error Correction Level',
      type: 'select' as const,
      value: errorCorrectionLevel,
      onChange: (value: unknown) => setErrorCorrectionLevel(value as 'L' | 'M' | 'Q' | 'H'),
      options: [
        { value: 'L', label: 'Low (~7%)' },
        { value: 'M', label: 'Medium (~15%)' },
        { value: 'Q', label: 'Quartile (~25%)' },
        { value: 'H', label: 'High (~30%)' },
      ],
      description: 'Higher levels can recover from more damage but create denser codes'
    },
    {
      id: 'margin',
      label: 'Margin',
      type: 'number' as const,
      value: margin,
      onChange: (value: unknown) => setMargin(value as number),
      min: 0,
      max: 10,
      description: 'White space around the QR code'
    },
    {
      id: 'darkColor',
      label: 'Dark Color',
      type: 'text' as const,
      value: darkColor,
      onChange: (value: unknown) => setDarkColor(value as string),
      placeholder: '#000000',
      description: 'Color for the dark modules (hex color)'
    },
    {
      id: 'lightColor',
      label: 'Light Color',
      type: 'text' as const,
      value: lightColor,
      onChange: (value: unknown) => setLightColor(value as string),
      placeholder: '#FFFFFF',
      description: 'Color for the light modules (hex color)'
    }
  ];

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes from text, URLs, phone numbers, and more. Customize size, colors, and error correction level."
      breadcrumb="Design & Media"
    >
      <ToolOptions options={options}>
        <div className="flex space-x-2">
          <button
            onClick={loadSampleData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Load Sample URL
          </button>
        </div>
      </ToolOptions>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text or URL to Encode
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text, URL, phone number, or any data to encode..."
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <p className="mt-2 text-sm text-gray-500">
            Examples: https://example.com, tel:+1234567890, mailto:user@example.com, or any text
          </p>
        </div>

        {/* QR Code Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Generated QR Code
            </label>
            {qrCodeUrl && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyImage}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copied ? 'Copied!' : 'Copy Image'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PNG</span>
                </button>
              </div>
            )}
          </div>
          
          <div className="border border-gray-300 rounded-md p-4 bg-white min-h-[300px] flex items-center justify-center">
            {qrCodeUrl ? (
              <div className="text-center">
                <img 
                  src={qrCodeUrl} 
                  alt="Generated QR Code" 
                  className="mx-auto mb-2 border border-gray-200 rounded"
                />
                <p className="text-sm text-gray-500">
                  {size} × {size} pixels
                </p>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <p>Enter text above to generate QR code</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hidden canvas for QR code generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* QR Code Information */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">About QR Codes</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <p>
            <strong>QR Code (Quick Response Code)</strong> is a two-dimensional barcode that can store 
            various types of data including text, URLs, phone numbers, and more.
          </p>
          <p>
            QR Code features:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>High capacity:</strong> Can store up to 4,296 alphanumeric characters</li>
            <li><strong>Error correction:</strong> Can be read even when partially damaged</li>
            <li><strong>Fast scanning:</strong> Can be read quickly from any direction</li>
            <li><strong>Versatile:</strong> Works with URLs, text, phone numbers, WiFi credentials, etc.</li>
          </ul>
          <p>
            Common data formats:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 font-mono text-xs">
            <li>URL: https://example.com</li>
            <li>Phone: tel:+1234567890</li>
            <li>Email: mailto:user@example.com</li>
            <li>WiFi: WIFI:T:WPA;S:NetworkName;P:Password;;</li>
            <li>SMS: sms:+1234567890:Hello World</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
