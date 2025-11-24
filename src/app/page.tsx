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
        <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-block mb-8">
                <span className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide uppercase inline-flex items-center space-x-2 shadow-lg backdrop-blur-md border border-white/20 ${
                  isOpen() 
                    ? 'bg-green-500/90 text-white' 
                    : 'bg-red-500/90 text-white'
                }`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${isOpen() ? 'bg-white' : 'bg-white/80'} animate-pulse`}></span>
                  <span>{isOpen() ? 'Aperto Ora' : 'Chiuso'}</span>
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold mb-8 leading-tight drop-shadow-lg">
                Sapori Autentici<br />
                <span className="text-accent-300 italic">Consegnati con Amore</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/95 mb-10 leading-relaxed max-w-2xl mx-auto font-light drop-shadow-md">
                Scopri il mix perfetto tra cucina tradizionale indiana, pakistana e i classici italiani
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
                <a 
                  href="#menu" 
                  className="w-full sm:w-auto px-10 py-4 bg-white text-primary-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Vedi il Menù
                </a>
                <a 
                  href="tel:+393206879063" 
                  className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border-2 border-white/40 hover:bg-white/20 hover:border-white transition-all duration-300 inline-flex items-center justify-center space-x-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Chiama Ora</span>
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

        {/* Top Sellers */}
        {topSellers.length > 0 && (
          <section className="py-16 sm:py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-accent-50/30 dark:bg-gray-700/30 -skew-y-3 transform origin-top-left z-0"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-2 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 rounded-full text-sm font-bold tracking-wide mb-4 shadow-sm">
                  I Preferiti dai Clienti
                </span>
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
                  ⭐ I Più Venduti
                </h2>
                <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
              </div>
              <MenuGrid items={topSellers} />
            </div>
          </section>
        )}

        {/* Full Menu */}
        <section id="menu" className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Il Nostro Menù Completo
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                Esplora la nostra ampia selezione di piatti autentici, dai curry tradizionali alle pizze cotte a legna
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
