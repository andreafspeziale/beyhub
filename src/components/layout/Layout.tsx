import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-4 flex-1 flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col mt-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
