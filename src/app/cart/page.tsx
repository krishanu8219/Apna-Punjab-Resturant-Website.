'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const { state, dispatch } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-white rounded-full shadow-soft flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Il tuo carrello è vuoto</h2>
            <p className="text-gray-500 mb-8 text-lg">Sembra che tu non abbia ancora aggiunto piatti deliziosi.</p>
            <Link href="/">
              <Button className="w-full sm:w-auto">Sfoglia il Menù</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-8">Il tuo Carrello</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-soft rounded-2xl p-6 sm:p-8">
              <div className="divide-y divide-gray-100">
                {state.items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => dispatch({ type: 'CLEAR_CART' })}
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                >
                  Svuota Carrello
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
