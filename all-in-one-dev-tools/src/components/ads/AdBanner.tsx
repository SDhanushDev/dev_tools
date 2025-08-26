'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  type: 'banner' | 'sidebar' | 'square';
  className?: string;
}

export function AdBanner({ type, className = '' }: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-expect-error - adsbygoogle is a global variable from Google AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const getAdConfig = () => {
    switch (type) {
      case 'banner':
        return {
          style: { display: 'block' },
          'data-ad-client': 'ca-pub-XXXXXXXXXX',
          'data-ad-slot': '1234567890',
          'data-ad-format': 'auto',
          'data-full-width-responsive': 'true',
        };
      case 'sidebar':
        return {
          style: { display: 'block' },
          'data-ad-client': 'ca-pub-XXXXXXXXXX',
          'data-ad-slot': '0987654321',
          'data-ad-format': 'auto',
          'data-full-width-responsive': 'true',
        };
      case 'square':
        return {
          style: { display: 'inline-block', width: '300px', height: '250px' },
          'data-ad-client': 'ca-pub-XXXXXXXXXX',
          'data-ad-slot': '1122334455',
        };
      default:
        return {};
    }
  };

  return (
    <div className={`ad-container ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-2">Advertisement</div>
      <ins
        className="adsbygoogle"
        {...getAdConfig()}
      ></ins>
    </div>
  );
}

// Placeholder component for development
export function AdPlaceholder({ type, className = '' }: AdBannerProps) {
  const getSize = () => {
    switch (type) {
      case 'banner':
        return 'h-24 w-full';
      case 'sidebar':
        return 'h-64 w-full';
      case 'square':
        return 'h-64 w-80';
      default:
        return 'h-24 w-full';
    }
  };

  return (
    <div className={`${className}`}>
      <div className="text-xs text-gray-400 text-center mb-2">Advertisement</div>
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${getSize()}`}>
        <div className="text-center text-gray-500">
          <div className="text-sm font-medium">Google AdSense</div>
          <div className="text-xs">{type} ad placeholder</div>
        </div>
      </div>
    </div>
  );
}
