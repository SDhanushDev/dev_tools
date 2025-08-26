'use client';

import { useState, useEffect } from 'react';
import { ToolLayout } from './ToolLayout';
import { ToolOptions } from './ToolOptions';

interface ToolOption {
  id: string;
  label: string;
  type: 'checkbox' | 'radio' | 'select' | 'number' | 'text';
  value: unknown;
  onChange: (value: unknown) => void;
  options?: { value: unknown; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  description?: string;
}
import { Copy, Check, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export function GradientGeneratorTool() {
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [direction, setDirection] = useState(90);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: '1', color: '#ff6b6b', position: 0 },
    { id: '2', color: '#4ecdc4', position: 100 }
  ]);
  const [cssCode, setCssCode] = useState('');
  const [copied, setCopied] = useState(false);

  const generateCSS = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stopStrings = sortedStops.map(stop => `${stop.color} ${stop.position}%`);
    
    if (gradientType === 'linear') {
      return `background: linear-gradient(${direction}deg, ${stopStrings.join(', ')});`;
    } else {
      return `background: radial-gradient(circle, ${stopStrings.join(', ')});`;
    }
  };

  useEffect(() => {
    setCssCode(generateCSS());
  }, [gradientType, direction, colorStops]);

  const addColorStop = () => {
    const newId = Date.now().toString();
    const newPosition = colorStops.length > 0 
      ? Math.max(...colorStops.map(s => s.position)) + 10 
      : 50;
    
    setColorStops([...colorStops, {
      id: newId,
      color: '#000000',
      position: Math.min(newPosition, 100)
    }]);
  };

  const removeColorStop = (id: string) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter(stop => stop.id !== id));
    }
  };

  const updateColorStop = (id: string, field: 'color' | 'position', value: string | number) => {
    setColorStops(colorStops.map(stop => 
      stop.id === id ? { ...stop, [field]: value } : stop
    ));
  };

  const handleCopy = async () => {
    await copyToClipboard(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateRandomGradient = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    const randomColors = colors.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2);
    
    const newStops = randomColors.map((color, index) => ({
      id: Date.now().toString() + index,
      color,
      position: (100 / (randomColors.length - 1)) * index
    }));
    
    setColorStops(newStops);
    setDirection(Math.floor(Math.random() * 360));
  };

  const presetGradients = [
    { name: 'Sunset', stops: [{ color: '#ff7e5f', position: 0 }, { color: '#feb47b', position: 100 }] },
    { name: 'Ocean', stops: [{ color: '#2196f3', position: 0 }, { color: '#21cbf3', position: 100 }] },
    { name: 'Forest', stops: [{ color: '#11998e', position: 0 }, { color: '#38ef7d', position: 100 }] },
    { name: 'Purple', stops: [{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }] },
  ];

  const loadPreset = (preset: typeof presetGradients[0]) => {
    const newStops = preset.stops.map((stop, index) => ({
      id: Date.now().toString() + index,
      color: stop.color,
      position: stop.position
    }));
    setColorStops(newStops);
  };

  const options: ToolOption[] = [
    {
      id: 'gradientType',
      label: 'Gradient Type',
      type: 'radio' as const,
      value: gradientType,
      onChange: (value: unknown) => setGradientType(value as 'linear' | 'radial'),
      options: [
        { value: 'linear', label: 'Linear' },
        { value: 'radial', label: 'Radial' },
      ],
      description: 'Choose between linear or radial gradient'
    }
  ];

  if (gradientType === 'linear') {
    options.push({
      id: 'direction',
      label: 'Direction (degrees)',
      type: 'number' as const,
      value: direction,
      onChange: (value: unknown) => setDirection(value as number),
      min: 0,
      max: 360,
      description: 'Gradient direction in degrees (0-360)'
    });
  }

  return (
    <ToolLayout
      title="CSS Gradient Generator"
      description="Create beautiful CSS gradients with live preview. Generate linear and radial gradients with multiple color stops."
      breadcrumb="Design & Media"
    >
      <ToolOptions options={options}>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={generateRandomGradient}
            className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Random</span>
          </button>
          {presetGradients.map((preset) => (
            <button
              key={preset.name}
              onClick={() => loadPreset(preset)}
              className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </ToolOptions>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color Stops */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Color Stops</h3>
            <button
              onClick={addColorStop}
              className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Add Stop</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {colorStops.map((stop, index) => (
              <div key={stop.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 flex-1">
                  <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => updateColorStop(stop.id, 'color', e.target.value)}
                    className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={stop.color}
                    onChange={(e) => updateColorStop(stop.id, 'color', e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                    placeholder="#000000"
                  />
                  <input
                    type="number"
                    value={stop.position}
                    onChange={(e) => updateColorStop(stop.id, 'position', Number(e.target.value))}
                    min="0"
                    max="100"
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
                {colorStops.length > 2 && (
                  <button
                    onClick={() => removeColorStop(stop.id)}
                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preview and CSS */}
        <div className="space-y-4">
          {/* Preview */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Preview</h3>
            <div 
              className="w-full h-48 border border-gray-300 rounded-lg"
              style={{ background: cssCode.replace('background: ', '').replace(';', '') }}
            />
          </div>

          {/* CSS Code */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">CSS Code</h3>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copied ? 'Copied!' : 'Copy CSS'}</span>
              </button>
            </div>
            <textarea
              value={cssCode}
              readOnly
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm resize-none select-all"
            />
          </div>
        </div>
      </div>

      {/* Gradient Information */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">CSS Gradient Guide</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Gradient Types:</h4>
              <ul className="space-y-1">
                <li><strong>Linear:</strong> Colors transition in a straight line</li>
                <li><strong>Radial:</strong> Colors transition from center outward</li>
              </ul>
              <h4 className="font-medium mb-2 mt-3">Direction Values:</h4>
              <ul className="space-y-1">
                <li><strong>0deg:</strong> Bottom to top</li>
                <li><strong>90deg:</strong> Left to right</li>
                <li><strong>180deg:</strong> Top to bottom</li>
                <li><strong>270deg:</strong> Right to left</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Browser Support:</h4>
              <ul className="space-y-1">
                <li>Modern browsers: Full support</li>
                <li>IE 10+: Supported</li>
                <li>Mobile: Excellent support</li>
              </ul>
              <h4 className="font-medium mb-2 mt-3">Tips:</h4>
              <ul className="space-y-1">
                <li>Use fallback background color</li>
                <li>Test on different devices</li>
                <li>Consider accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
