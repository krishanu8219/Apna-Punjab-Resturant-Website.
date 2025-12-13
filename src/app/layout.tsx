import type { Metadata } from 'next';
import { Playfair_Display, Lato, Bebas_Neue, Poppins } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Apna Punjab Pizza Kebap - Ordina Online',
  description: 'Cucina autentica indiana e pakistana, pizza e kebab a Torino, Italia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${playfair.variable} ${poppins.variable} ${bebasNeue.variable}`}>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}