'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { Order } from '@/types/order';
import { useCart } from '@/contexts/CartContext';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const { dispatch } = useCart();

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const parsedOrder = JSON.parse(decodeURIComponent(data));
        setOrder(parsedOrder);
        // Clear the cart once the order is confirmed and loaded
        dispatch({ type: 'CLEAR_CART' });
      } catch (e) {
        console.error('Failed to parse order data', e);
      }
    }
  }, [searchParams, dispatch]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Caricamento...</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 print:bg-white">
      <div className="print:hidden">
        <Header />
      </div>
      
      <main className="flex-1 container mx-auto px-4 py-12 print:p-0 print:w-full">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-soft overflow-hidden print:shadow-none print:rounded-none">
          {/* Success Header - Hidden in Print */}
          <div className="bg-green-50 p-8 text-center border-b border-green-100 print:hidden">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Ordine Confermato!</h1>
            <p className="text-gray-600">Grazie per il tuo ordine. Abbiamo inviato una conferma al ristorante.</p>
          </div>

          {/* Receipt Content */}
          <div className="p-8 print:p-4">
            <div className="text-center mb-8 border-b border-gray-100 pb-8 print:border-black">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Apna Punjab Pizza & Kebap</h2>
              <p className="text-gray-500 text-sm print:text-black">Ricevuta Ordine #{order.id?.slice(-6)}</p>
              <p className="text-gray-500 text-sm print:text-black">{new Date(order.created_at!).toLocaleString('it-IT')}</p>
            </div>

            <div className="space-y-6">
              {/* Customer Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 print:text-black font-bold">Cliente</p>
                  <p className="font-medium text-gray-900 print:text-black">{order.customer_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 print:text-black font-bold">Telefono</p>
                  <p className="font-medium text-gray-900 print:text-black">{order.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 print:text-black font-bold">Tipo Ordine</p>
                  <p className="font-medium text-gray-900 print:text-black uppercase">
                    {order.order_type === 'delivery' ? 'Consegna a Domicilio' : 'Ritiro in Sede'}
                  </p>
                </div>
                {order.order_type === 'delivery' && (
                  <div className="text-right">
                    <p className="text-gray-500 print:text-black font-bold">Indirizzo</p>
                    <p className="font-medium text-gray-900 print:text-black">{order.address}</p>
                  </div>
                )}
              </div>

              {/* Items Table */}
              <div className="mt-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 print:border-black">
                      <th className="text-left py-2 font-bold text-gray-900 print:text-black">Q.tà</th>
                      <th className="text-left py-2 font-bold text-gray-900 print:text-black">Articolo</th>
                      <th className="text-right py-2 font-bold text-gray-900 print:text-black">Prezzo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 print:divide-gray-300">
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="py-3 text-gray-900 print:text-black font-medium">{item.quantity}x</td>
                        <td className="py-3 text-gray-900 print:text-black">{item.name}</td>
                        <td className="py-3 text-right text-gray-900 print:text-black">€{item.unit_price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-900 print:border-black">
                      <td colSpan={2} className="py-4 text-lg font-bold text-gray-900 print:text-black">Totale</td>
                      <td className="py-4 text-right text-lg font-bold text-gray-900 print:text-black">€{order.total_price.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {order.location_description && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg print:border print:border-gray-300 print:bg-white">
                  <p className="text-sm font-bold text-gray-700 print:text-black mb-1">Note:</p>
                  <p className="text-sm text-gray-600 print:text-black">{order.location_description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions - Hidden in Print */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-center print:hidden">
            <Button onClick={handlePrint} variant="outline" className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Stampa Ricevuta
            </Button>
            <Button onClick={() => router.push('/')}>
              Torna alla Home
            </Button>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>

      {/* Print-only Footer */}
      <div className="hidden print:block text-center text-xs mt-8">
        <p>Grazie per aver scelto Apna Punjab Pizza & Kebap!</p>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
