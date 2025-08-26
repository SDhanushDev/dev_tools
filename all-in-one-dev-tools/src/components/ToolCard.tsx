import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Hash, Braces, Search, FileText, Binary, Key, ArrowRightLeft, Type, Palette, QrCode, Clock, GitCompare } from 'lucide-react';
import { Tool } from '@/lib/tools';

const iconMap = {
  Braces,
  Search,
  FileText,
  Binary,
  Hash,
  Key,
  ArrowRightLeft,
  Type,
  Palette,
  QrCode,
  Clock,
  GitCompare,
};

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = iconMap[tool.icon as keyof typeof iconMap] || Hash;

  return (
    <Link href={tool.path}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="tool-card group cursor-pointer h-full"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <IconComponent className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
              {tool.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {tool.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tool.keywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
              Try it now
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
