import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface CategoryCardProps {
  category: Category;
  icon: LucideIcon;
  onClick: () => void;
  toolCount: number;
}

export function CategoryCard({ category, icon: Icon, onClick, toolCount }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 group"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {category.description}
        </p>
        <div className="text-blue-600 text-sm font-medium">
          {toolCount} tools
        </div>
      </div>
    </motion.div>
  );
}
