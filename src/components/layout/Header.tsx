'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

const Header: React.FC = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkIfOpen = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();

      if (day === 0) { // Sunday
        return hour >= 18 && hour < 23;
      }
      // Monday-Saturday
      return hour >= 11 && hour < 23;
    };

    setIsOpen(checkIfOpen());
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-black via-gray-800 to-gray-700 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-gray-900/40 backdrop-blur-md rounded-3xl px-6 py-3 border border-white/20 shadow-xl">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex flex-col group">
              <span className="text-2xl sm:text-3xl font-display font-bold text-white drop-shadow-lg tracking-wide">
                APNA PUNJAB <span className="text-gray-300">PIZZA KEBAB</span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-400 tracking-widest">AUTHENTIC INDIAN & PAKISTANI CUISINE</span>
            </Link>

            <div className="flex items-center space-x-3">
              {mounted && (
                <div className={`hidden sm:flex items-center px-4 py-2 rounded-full shadow-lg ${
                  isOpen 
                    ? 'bg-green-500' 
                    : 'bg-gray-500'
                }`}>
                  <span className="text-white font-bold text-sm tracking-wide">
                    {isOpen ? '● APERTO ORA' : '● IL NEGOZIO È CHIUSO'}
                  </span>
                </div>
              )}

              <div className="hidden sm:flex items-center bg-green-500 px-4 py-2 rounded-full shadow-lg">
                <span className="text-white font-bold text-sm tracking-wide">✓ 100% HALAL</span>
              </div>

              <nav className="flex items-center space-x-2">
                <Link
                  href="/menu"
                  className="px-4 py-2 bg-transparent text-white font-bold hover:bg-white/20 transition-all rounded-full border-2 border-white/50 text-sm"
                >
                  MENÙ
                </Link>
                <Link
                  href="/cart"
                  className="relative px-4 py-2 bg-gray-600 text-white font-bold hover:bg-gray-500 transition-all rounded-full shadow-lg flex items-center space-x-2 text-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="hidden sm:inline">CARRELLO</span>
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-bounce border-2 border-white">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;