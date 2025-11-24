'use client';

import React from 'react';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from '@/types/menu';

interface MenuGridProps {
  items: MenuItemType[];
  title?: string;
}

const MenuGrid: React.FC<MenuGridProps> = ({ items, title }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">Nessun piatto disponibile in questa categoria</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {title && (
        <h2 className="text-3xl font-display font-bold mb-8 text-gray-900">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
