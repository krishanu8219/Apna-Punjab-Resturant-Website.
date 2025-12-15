'use client';

import React from 'react';
import { MenuCategoryId } from '@/types/menu';

interface CategoryFilterProps {
  categories: Array<{ id: MenuCategoryId; name: string }>;
  activeCategory: MenuCategoryId | 'all';
  onCategoryChange: (categoryId: MenuCategoryId | 'all') => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mb-12">
      <div className="flex overflow-x-auto pb-6 scrollbar-hide space-x-4">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-8 py-4 rounded-full whitespace-nowrap font-bold transition-all duration-300 flex-shrink-0 border-3 relative overflow-hidden ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-2xl scale-110 border-gray-600'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl border-gray-400 hover:scale-105'
          }`}
        >
          <span className="relative z-10">🍽️ Tutti i Piatti</span>
          {activeCategory === 'all' && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-transparent animate-pulse"></div>
          )}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-8 py-4 rounded-full whitespace-nowrap font-bold transition-all duration-300 flex-shrink-0 border-3 relative overflow-hidden ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-2xl scale-110 border-gray-600'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl border-gray-400 hover:scale-105'
            }`}
          >
            <span className="relative z-10">{category.name}</span>
            {activeCategory === category.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-transparent animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
