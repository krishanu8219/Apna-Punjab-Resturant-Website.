'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCart, calculateTotal } from '@/contexts/CartContext';

export default function CheckoutPage() {
  const { state } = useCart();
  const router = useRouter();

  // Redirect if cart is empty
  React.useEffect(() => {
    if (state.items.length === 0) {
      router.push('/cart');
    }
  }, [state.items, router]);

  if (state.items.length === 0) {
    return null;
  }

  const total = calculateTotal(state.items);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">Completa l'ordine</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm />
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white shadow-soft rounded-2xl p-6 sticky top-24">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-6">Riepilogo Ordine</h3>
                <ul className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        <span className="font-medium text-gray-900">{item.quantity}x</span> {item.name}
                      </span>
                      <span className="font-medium text-gray-900">€{(item.quantity * item.price).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-gray-900">Totale</span>
                    <span className="text-2xl font-display font-bold text-primary-600">€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
