'use client';

import React from 'react';
import Link from 'next/link';
import { useCart, calculateTotal } from '@/contexts/CartContext';
import Button from '../ui/Button';

const CartSummary: React.FC = () => {
  const { state } = useCart();
  const total = calculateTotal(state.items);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white shadow-soft rounded-2xl p-6 sm:p-8">
      <h3 className="text-xl font-display font-bold text-gray-900 mb-6">Riepilogo Ordine</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotale ({itemCount} articoli)</span>
          <span className="font-medium">€{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Costo del Servizio</span>
          <span className="font-medium">€0.00</span>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-6 mb-8">
        <div className="flex justify-between items-end">
          <span className="text-lg font-bold text-gray-900">Totale</span>
          <div className="text-right">
            <span className="text-3xl font-display font-bold text-primary-600">€{total.toFixed(2)}</span>
            <p className="text-xs text-gray-500 mt-1">IVA inclusa</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {state.items.length === 0 ? (
          <Button fullWidth disabled size="lg" className="shadow-soft-lg">
            Procedi al Checkout
          </Button>
        ) : (
          <Link href="/checkout" className="block w-full">
            <div className="font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500 px-6 py-3 text-lg w-full text-center shadow-soft-lg">
              Procedi al Checkout
            </div>
          </Link>
        )}
        
        <Link href="/" className="block w-full">
          <div className="font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-orange-600 text-orange-600 hover:bg-orange-50 focus:ring-orange-500 px-6 py-3 text-lg w-full text-center">
            Continua lo Shopping
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
