'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useCart, calculateTotal } from '@/contexts/CartContext';
import { OrderFormData } from '@/types/order';

const CheckoutForm: React.FC = () => {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<OrderFormData>({
    customer_name: '',
    phone: '',
    email: '',
    order_type: 'pickup',
    payment_method: 'cash',
    address: '',
    location_description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const total = calculateTotal(state.items);

    const orderPayload = {
      customer_name: formData.customer_name,
      phone: formData.phone,
      email: formData.email,
      order_type: formData.order_type,
      payment_method: formData.payment_method,
      address: formData.address,
      location_description: formData.location_description,
      items: state.items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      })),
      total_price: total,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      // Redirect to confirmation page with order data
      // Note: We don't clear the cart here to avoid triggering the "empty cart redirect" in the parent page.
      // The cart will be cleared on the confirmation page.
      const orderData = encodeURIComponent(JSON.stringify(data.order));
      router.push(`/order-confirmation?data=${orderData}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = calculateTotal(state.items);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white shadow-soft rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Informazioni di Contatto</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nome Completo"
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            required
            placeholder="Mario Rossi"
          />
          
          <Input
            label="Numero di Telefono"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+39 123 456 7890"
          />
          
          <Input
            label="Email (per ricevuta)"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="mario@email.com"
          />
        </div>
      </div>

      <div className="bg-white shadow-soft rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Tipo di Ordine</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <label className={`
            relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${formData.order_type === 'pickup' 
              ? 'border-primary-500 bg-primary-50 text-primary-700' 
              : 'border-gray-200 hover:border-gray-300 text-gray-600'}
          `}>
            <input
              type="radio"
              name="order_type"
              value="pickup"
              checked={formData.order_type === 'pickup'}
              onChange={handleChange}
              className="sr-only"
            />
            <span className="font-medium">Ritiro</span>
          </label>
          <label className={`
            relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${formData.order_type === 'delivery' 
              ? 'border-primary-500 bg-primary-50 text-primary-700' 
              : 'border-gray-200 hover:border-gray-300 text-gray-600'}
          `}>
            <input
              type="radio"
              name="order_type"
              value="delivery"
              checked={formData.order_type === 'delivery'}
              onChange={handleChange}
              className="sr-only"
            />
            <span className="font-medium">Consegna</span>
          </label>
        </div>

        {formData.order_type === 'delivery' && (
          <div className="mb-6 animate-fadeIn">
            <Input
              label="Indirizzo di Consegna"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required={formData.order_type === 'delivery'}
              placeholder="Via, numero civico, CAP, città"
            />
          </div>
        )}

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Note Aggiuntive (opzionale)
          </label>
          <textarea
            name="location_description"
            value={formData.location_description}
            onChange={handleChange}
            rows={3}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Istruzioni speciali..."
          />
        </div>
      </div>

      <div className="bg-white shadow-soft rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Metodo di Pagamento</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className={`
            relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${formData.payment_method === 'cash' 
              ? 'border-green-500 bg-green-50 text-green-700' 
              : 'border-gray-200 hover:border-gray-300 text-gray-600'}
          `}>
            <input
              type="radio"
              name="payment_method"
              value="cash"
              checked={formData.payment_method === 'cash'}
              onChange={handleChange}
              className="sr-only"
            />
            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-medium">Contanti</span>
          </label>

          <label className={`
            relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${formData.payment_method === 'satispay' 
              ? 'border-green-500 bg-green-50 text-green-700' 
              : 'border-gray-200 hover:border-gray-300 text-gray-600'}
          `}>
            <input
              type="radio"
              name="payment_method"
              value="satispay"
              checked={formData.payment_method === 'satispay'}
              onChange={handleChange}
              className="sr-only"
            />
            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Satispay</span>
          </label>

          <label className={`
            relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${formData.payment_method === 'card' 
              ? 'border-green-500 bg-green-50 text-green-700' 
              : 'border-gray-200 hover:border-gray-300 text-gray-600'}
          `}>
            <input
              type="radio"
              name="payment_method"
              value="card"
              checked={formData.payment_method === 'card'}
              onChange={handleChange}
              className="sr-only"
            />
            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="font-medium">Carta/Bancomat</span>
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="bg-white shadow-soft rounded-2xl p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-gray-900">Totale da Pagare</span>
          <span className="text-3xl font-display font-bold text-primary-600">€{total.toFixed(2)}</span>
        </div>
        
        <Button
          type="submit"
          fullWidth
          size="lg"
          disabled={isSubmitting || state.items.length === 0}
          className="shadow-soft-lg"
        >
          {isSubmitting ? 'Invio in corso...' : 'Invia Ordine'}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
