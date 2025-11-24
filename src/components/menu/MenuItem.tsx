'use client';

import React from 'react';
import Image from 'next/image';
import { MenuItem as MenuItemType } from '@/types/menu';
import { useCart } from '@/contexts/CartContext';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
    });
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col border border-transparent hover:border-primary-100 dark:hover:border-primary-800">
      {item.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight pr-2">
            {item.name}
          </h3>
          {item.isTopSeller && (
            <span className="flex-shrink-0 inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-accent-400 to-accent-500 text-white text-xs font-bold rounded-full shadow-sm transform group-hover:scale-105 transition-transform">
              ⭐ Popolare
            </span>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
          {item.description}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-50 dark:border-gray-700 mt-auto">
          <span className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            €{item.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-6 py-2.5 bg-gray-900 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center space-x-2"
          >
            <span>Aggiungi</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
