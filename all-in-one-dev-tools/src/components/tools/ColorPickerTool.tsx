'use client';

import { useState, useEffect, useCallback } from 'react';
import { ToolLayout } from './ToolLayout';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface ColorFormat {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
  cmyk: string;
}

export function ColorPickerTool() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [colorFormats, setColorFormats] = useState<ColorFormat>({
    hex: '#3B82F6',
    rgb: 'rgb(59, 130, 246)',
    hsl: 'hsl(217, 91%, 60%)',
    hsv: 'hsv(217, 76%, 96%)',
    cmyk: 'cmyk(76%, 47%, 0%, 4%)'
  });
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [colorHistory, setColorHistory] = useState<string[]>(['#3B82F6']);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgbToHsv = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, Math.max(g, b));
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  const updateColorFormats = useCallback((hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

    setColorFormats({
      hex: hex.toUpperCase(),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      hsv: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`,
      cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`
    });
  }, []);

  useEffect(() => {
    updateColorFormats(selectedColor);
  }, [selectedColor, updateColorFormats]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (!colorHistory.includes(color)) {
      setColorHistory(prev => [color, ...prev.slice(0, 9)]);
    }
  };

  const handleCopy = async (format: string, value: string) => {
    await copyToClipboard(value);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    handleColorChange(randomColor);
  };

  const predefinedColors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#000000',
    '#FFFFFF', '#F0F8FF', '#FAEBD7', '#7FFFD4', '#F5F5DC', '#FFE4C4'
  ];

  return (
    <ToolLayout
      title="Color Picker"
      description="Pick colors and get their values in multiple formats including Hex, RGB, HSL, HSV, and CMYK."
      breadcrumb="Design & Media"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Picker */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Picker
            </label>
            <div className="space-y-4">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full h-32 border border-gray-300 rounded-lg cursor-pointer"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                  placeholder="#000000"
                />
                <button
                  onClick={generateRandomColor}
                  className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Random</span>
                </button>
              </div>
            </div>
          </div>

          {/* Predefined Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Predefined Colors
            </label>
            <div className="grid grid-cols-6 gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className="w-10 h-10 rounded-md border-2 border-gray-300 hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Color History */}
          {colorHistory.length > 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recent Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {colorHistory.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className="w-8 h-8 rounded-md border-2 border-gray-300 hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Color Values */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Color Values</h3>
          
          {/* Color Preview */}
          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <div 
              className="w-full h-24 rounded-md border border-gray-200 mb-3"
              style={{ backgroundColor: selectedColor }}
            />
            <div className="text-center">
              <div className="font-mono text-lg font-medium">{colorFormats.hex}</div>
              <div className="text-sm text-gray-500">Selected Color</div>
            </div>
          </div>

          {/* Format Values */}
          <div className="space-y-3">
            {Object.entries(colorFormats).map(([format, value]) => (
              <div key={format} className="flex items-center justify-between bg-gray-50 rounded-md p-3">
                <div>
                  <div className="font-medium text-gray-900 uppercase text-sm">
                    {format}
                  </div>
                  <div className="font-mono text-sm text-gray-600">
                    {value}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(format, value)}
                  className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {copiedFormat === format ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copiedFormat === format ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Color Information */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Color Format Guide</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Color Formats:</h4>
              <ul className="space-y-1">
                <li><strong>HEX:</strong> Hexadecimal notation (#RRGGBB)</li>
                <li><strong>RGB:</strong> Red, Green, Blue (0-255)</li>
                <li><strong>HSL:</strong> Hue, Saturation, Lightness</li>
                <li><strong>HSV:</strong> Hue, Saturation, Value</li>
                <li><strong>CMYK:</strong> Cyan, Magenta, Yellow, Black</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Usage:</h4>
              <ul className="space-y-1">
                <li><strong>Web/CSS:</strong> HEX, RGB, HSL</li>
                <li><strong>Design:</strong> HSV, HSL</li>
                <li><strong>Print:</strong> CMYK</li>
                <li><strong>Programming:</strong> HEX, RGB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
