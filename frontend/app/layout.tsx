import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';
import CartSidebar from '@/components/CartSidebar';
import ChatBot from '@/components/ChatBot';
import { CartProvider } from '@/lib/cart-context';

export const metadata: Metadata = {
  title: { default: 'FoodFinder', template: '%s | FoodFinder' },
  description: 'Откройте для себя лучшие рестораны рядом с вами',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-slate-50 text-gray-900 antialiased">
        <CartProvider>
          <NavBar />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
          <CartSidebar />
          <ChatBot />
        </CartProvider>
      </body>
    </html>
  );
}
