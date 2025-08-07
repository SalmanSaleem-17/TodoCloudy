import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TodoCloudy',
  description: 'Real-Time Collaborative Task Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Providers>{children}</Providers>
         <Footer />
      </body>
    </html>
  );
}