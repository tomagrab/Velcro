import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Velcro',
  description: 'A simple ticket formatting tool',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
