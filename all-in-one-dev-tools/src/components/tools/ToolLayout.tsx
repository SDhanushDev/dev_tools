'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ads/AdBanner';
import { ToolJsonLd } from '@/components/seo/JsonLd';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  breadcrumb?: string;
}

export function ToolLayout({ title, description, children, breadcrumb }: ToolLayoutProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <ToolJsonLd
        name={title}
        description={description}
        url={currentUrl}
      />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Tools
              </Link>
              {breadcrumb && (
                <>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-600">{breadcrumb}</span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Ad Banner */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdPlaceholder type="banner" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tool Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
                <p className="text-gray-600 text-lg mb-6">{description}</p>
                
                {children}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-8 space-y-6">
              {/* Sidebar Ad */}
              <AdPlaceholder type="sidebar" />
              
              {/* Tool Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">About This Tool</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium">{breadcrumb}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Privacy:</span>
                    <span className="font-medium text-green-600">Client-side only</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                </div>
              </div>

              {/* Related Tools */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-2">
                  <Link href="/tools/json-formatter" className="block text-blue-600 hover:text-blue-800 text-sm">
                    JSON Formatter
                  </Link>
                  <Link href="/tools/base64-encoder" className="block text-blue-600 hover:text-blue-800 text-sm">
                    Base64 Encoder
                  </Link>
                  <Link href="/tools/sha256-generator" className="block text-blue-600 hover:text-blue-800 text-sm">
                    SHA256 Generator
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
