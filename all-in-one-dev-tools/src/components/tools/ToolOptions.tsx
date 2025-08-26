'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

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

interface ToolOptionsProps {
  title?: string;
  options: ToolOption[];
  children?: ReactNode;
}

export function ToolOptions({ title = 'Options', options, children }: ToolOptionsProps) {
  if (options.length === 0 && !children) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 rounded-lg p-4 mb-6"
    >
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {options.map((option) => (
          <div key={option.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {option.label}
            </label>
            {option.description && (
              <p className="text-xs text-gray-500">{option.description}</p>
            )}
            
            {option.type === 'checkbox' && (
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(option.value)}
                  onChange={(e) => option.onChange(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            )}

            {option.type === 'radio' && option.options && (
              <div className="space-y-2">
                {option.options.map((radioOption) => (
                  <label key={String(radioOption.value)} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={option.id}
                      value={String(radioOption.value)}
                      checked={option.value === radioOption.value}
                      onChange={() => option.onChange(radioOption.value)}
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{radioOption.label}</span>
                  </label>
                ))}
              </div>
            )}

            {option.type === 'select' && option.options && (
              <select
                value={String(option.value)}
                onChange={(e) => option.onChange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {option.options.map((selectOption) => (
                  <option key={String(selectOption.value)} value={String(selectOption.value)}>
                    {selectOption.label}
                  </option>
                ))}
              </select>
            )}

            {option.type === 'number' && (
              <input
                type="number"
                value={Number(option.value)}
                onChange={(e) => option.onChange(Number(e.target.value))}
                min={option.min}
                max={option.max}
                step={option.step}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            )}

            {option.type === 'text' && (
              <input
                type="text"
                value={String(option.value)}
                onChange={(e) => option.onChange(e.target.value)}
                placeholder={option.placeholder}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            )}
          </div>
        ))}
        {children}
      </div>
    </motion.div>
  );
}
