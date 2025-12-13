'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuGrid from '@/components/menu/MenuGrid';
import CategoryFilter from '@/components/menu/CategoryFilter';
import { MENU, getTopSellers } from '@/data/menu';
import { MenuCategoryId } from '@/types/menu';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId | 'all'>('all');
  const topSellers = getTopSellers();

  const filteredItems = activeCategory === 'all'
    ? MENU.flatMap(category => category.items)
    : MENU.find(cat => cat.id === activeCategory)?.items || [];

  // Check if restaurant is open
  const isOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if (day === 0) { // Sunday
      return hour >= 18 && hour < 23;
    }
    // Monday-Saturday
    return hour >= 11 && hour < 23;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-red-600 via-orange-500 to-orange-400 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-400/30 to-purple-900/60"></div>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.15) 35px, rgba(255,255,255,0.15) 70px)`
          }}></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative">

            <div className="max-w-4xl mx-auto text-center animate-fade-in relative z-10">
              <div className="inline-block mb-8">
                <span className="px-6 py-2 rounded-full text-sm font-bold tracking-wide uppercase inline-flex items-center space-x-2 shadow-lg bg-green-500 text-white border border-white/20">
                  <span>✓ 100% HALAL</span>
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-8 leading-tight drop-shadow-2xl tracking-wider flex items-center justify-center gap-0 sm:gap-4 lg:gap-8">
                <div className="w-40 sm:w-64 lg:w-80 flex-shrink-0">
                  <img 
                    src="/Images/punjabi-chef.png" 
                    alt="Chef" 
                    className="w-full h-auto animate-float drop-shadow-2xl"
                  />
                </div>
                <div className="flex-1 text-center">
                  <div className="hidden sm:block text-6xl mb-2">🌶️</div>
                  <div className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold italic" style={{ fontFamily: 'Impact, "Arial Black", sans-serif', textTransform: 'uppercase' }}>
                    <span className="text-white" style={{ WebkitTextStroke: '2px #ff6b00' }}>Sapori </span>
                    <span className="text-gray-300" style={{ WebkitTextStroke: '2px #ff6b00' }}>Autentici</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-yellow-400 italic font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black" style={{ fontFamily: 'Impact, "Arial Black", sans-serif', textTransform: 'uppercase', WebkitTextStroke: '2px #d97706' }}>Consegnati Con Amore</span>
                  </div>
                  <div className="hidden sm:block text-6xl mt-2">🌶️</div>
                </div>
                <div className="hidden lg:block w-80 flex-shrink-0">
                  <img 
                    src="/Images/punjabi-lady.png" 
                    alt="Server" 
                    className="w-full h-auto animate-float drop-shadow-2xl"
                    style={{ animationDelay: '1s' }}
                  />
                </div>
              </h1>

              <p className="text-xl sm:text-2xl text-white mb-10 leading-relaxed max-w-2xl mx-auto font-bold drop-shadow-md">
                🪔 Scopri il mix perfetto tra cucina tradizionale indiana, pakistana e i classici italiani 🪔
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
                <a
                  href="#menu"
                  className="w-full sm:w-auto px-10 py-4 bg-white text-desi-chili font-bold rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 border-4 border-desi-gold text-lg"
                >
                  🍛 Vedi il Menù
                </a>
                <a
                  href="tel:+393206879063"
                  className="w-full sm:w-auto px-10 py-4 bg-desi-green text-white font-bold rounded-full border-4 border-white hover:bg-green-700 hover:scale-110 transition-all duration-300 shadow-2xl inline-flex items-center justify-center space-x-3 text-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Chiama Ora</span>
                </a>
                <a
                  href="https://wa.me/393206879063?text=Ciao!%20Vorrei%20ordinare%20da%20Apna%20Punjab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full border-4 border-white hover:from-green-600 hover:to-green-700 hover:scale-110 transition-all duration-300 shadow-2xl inline-flex items-center justify-center space-x-3 text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-10 text-white/90 text-base font-medium">
                <div className="flex items-center space-x-2 bg-black/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  <svg className="w-5 h-5 text-accent-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Corso Regina Margherita 251f, Torino</span>
                </div>
                <div className="flex items-center space-x-2 bg-black/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  <svg className="w-5 h-5 text-accent-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>Lun-Sab: 11-23 | Dom: 18-23</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full Menu */}
        <section id="menu" className="py-20 sm:py-28 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden border-t-8 border-desi-saffron">
          <div className="absolute inset-0 opacity-5 desi-pattern"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block mb-6">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-20 h-12 bg-orange-400 rounded-full flex items-center justify-center shadow-xl"></div>
                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold text-orange-600 tracking-wider" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                    IL NOSTRO MENÙ
                  </h2>
                  <div className="w-0 h-0 border-t-[50px] border-t-transparent border-l-[80px] border-l-red-600 border-b-[50px] border-b-transparent"></div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed font-bold">
                Esplora la nostra ampia selezione di piatti autentici<br />
                Esplora la nostra ampia selezione di piatti autentici<br />
                <span className="text-red-600 dark:text-desi-saffron font-heading text-2xl" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>DAI CURRY ALLE PIZZE COTTE A LEGNA</span>
              </p>
            </div>

            <CategoryFilter
              categories={MENU.map(cat => ({ id: cat.id, name: cat.name }))}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <MenuGrid items={filteredItems} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
