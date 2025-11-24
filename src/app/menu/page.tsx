'use client';

import React, { useState } from 'react';
import { MENU } from '@/data/menu';
import { MenuCategoryId } from '@/types/menu';
import MenuGrid from '@/components/menu/MenuGrid';
import CategoryFilter from '@/components/menu/CategoryFilter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId | 'all'>('all');
  
  const categories = MENU.map(cat => ({
    id: cat.id,
    name: cat.name
  }));

  const allItems = MENU.flatMap(category => category.items);
  const filteredItems = activeCategory === 'all' 
    ? allItems 
    : allItems.filter(item => item.categoryId === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">Il Nostro Menù</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Esplora la nostra deliziosa selezione di piatti autentici, dai curry tradizionali alle pizze cotte a legna.
            </p>
          </div>
          
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          <div className="mt-8">
            <MenuGrid items={filteredItems} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;