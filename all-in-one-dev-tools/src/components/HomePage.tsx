'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Star, Zap, Shield, Code, FileText, Palette } from 'lucide-react';
import { tools, toolCategories, searchTools, getToolsByCategory } from '@/lib/tools';
import { ToolCard } from '@/components/ToolCard';
import { CategoryCard } from '@/components/CategoryCard';
import { AdPlaceholder } from '@/components/ads/AdBanner';

const iconMap = {
  Code,
  Shield,
  FileText,
  Palette,
  Zap,
};

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    if (searchQuery) {
      return searchTools(searchQuery);
    }
    if (selectedCategory) {
      return getToolsByCategory(selectedCategory);
    }
    return tools.slice(0, 12); // Show first 12 tools by default
  }, [searchQuery, selectedCategory]);

  const featuredTools = tools.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              All-in-One
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Dev Tools
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Free online developer tools to boost your productivity. No registration required, 
              all tools work directly in your browser.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for tools (e.g., JSON, hash, converter)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{tools.length}+</div>
              <div className="text-gray-600">Developer Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Free to Use</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">0</div>
              <div className="text-gray-600">Registration Required</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdPlaceholder type="banner" className="mb-12" />

      {/* Categories Section */}
      {!searchQuery && !selectedCategory && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Browse by Category
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover tools organized by category to find exactly what you need
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {toolCategories.map((category, index) => {
                const IconComponent = iconMap[category.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CategoryCard
                      category={category}
                      icon={IconComponent}
                      onClick={() => setSelectedCategory(category.id)}
                      toolCount={getToolsByCategory(category.id).length}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tools Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {searchQuery 
                    ? `Search Results for "${searchQuery}"` 
                    : selectedCategory 
                      ? `${toolCategories.find(c => c.id === selectedCategory)?.name} Tools`
                      : 'Featured Tools'
                  }
                </h2>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View All Categories
                  </button>
                )}
              </div>

              {filteredTools.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No tools found matching your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ToolCard tool={tool} />
                    </motion.div>
                  ))}
                </div>
              )}

              {!searchQuery && !selectedCategory && (
                <div className="text-center mt-12">
                  <Link
                    href="/tools"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View All Tools
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <AdPlaceholder type="sidebar" className="mb-8" />
              
              {/* Quick Links */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Popular Tools</h3>
                <div className="space-y-3">
                  {featuredTools.slice(0, 5).map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.path}
                      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to boost your productivity?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who use our tools daily to streamline their workflow
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Explore All Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
