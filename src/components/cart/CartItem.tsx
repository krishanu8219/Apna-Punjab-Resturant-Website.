'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { dispatch } = useCart();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4">
      <div className="flex items-center gap-4 flex-1">
        {item.image && (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <h3 className="font-display font-semibold text-gray-900 text-lg mb-1">{item.name}</h3>
          <p className="text-sm text-gray-500 font-medium">€{item.price.toFixed(2)} cadauno</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between sm:justify-end gap-6">
        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
          <button
            onClick={() => dispatch({ type: 'DECREMENT_ITEM', payload: { id: item.id } })}
            className="w-8 h-8 rounded-lg bg-white text-gray-600 hover:text-primary-600 hover:bg-primary-50 flex items-center justify-center transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
          <button
            onClick={() => dispatch({ type: 'INCREMENT_ITEM', payload: { id: item.id } })}
            className="w-8 h-8 rounded-lg bg-primary-500 text-white hover:bg-primary-600 flex items-center justify-center transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="w-24 text-right font-display font-bold text-lg text-gray-900">
            €{(item.price * item.quantity).toFixed(2)}
          </div>
          
          <button
            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })}
            className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
            title="Rimuovi articolo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
