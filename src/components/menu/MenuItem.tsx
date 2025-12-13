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
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col border-4 border-yellow-400 hover:border-orange-500 relative">
      <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-red-500 rounded-tl-xl"></div>
      <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-red-500 rounded-tr-xl"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-red-500 rounded-bl-xl"></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-red-500 rounded-br-xl"></div>
      
      {item.image && (
        <div className="relative h-52 w-full overflow-hidden border-b-4 border-yellow-400">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-orange-400 transition-colors leading-tight pr-2">
            {item.name}
          </h3>
          {item.isTopSeller && (
            <span className="flex-shrink-0 inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg transform group-hover:scale-110 transition-transform border-2 border-yellow-300">
              ⭐ Top
            </span>
          )}
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed font-medium">
          {item.description}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t-2 border-yellow-300 dark:border-orange-700 mt-auto">
          <span className="text-3xl font-display font-bold text-red-600 dark:text-orange-400">
            €{item.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 flex items-center space-x-2 border-2 border-yellow-400"
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
