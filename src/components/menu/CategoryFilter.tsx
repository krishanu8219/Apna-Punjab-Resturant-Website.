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
    <div className="mb-10">
      <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-3">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-6 py-3 rounded-xl whitespace-nowrap font-semibold transition-all duration-200 flex-shrink-0 ${
            activeCategory === 'all'
              ? 'bg-primary-500 text-white shadow-soft-lg scale-105'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-soft hover:shadow-md'
          }`}
        >
          Tutti i Piatti
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-3 rounded-xl whitespace-nowrap font-semibold transition-all duration-200 flex-shrink-0 ${
              activeCategory === category.id
                ? 'bg-primary-500 text-white shadow-soft-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-soft hover:shadow-md'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
