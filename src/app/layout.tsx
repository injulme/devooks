import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import RecoilRootProvider from '@/components/RecoilRootProvider';

import Header from './header';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <RecoilRootProvider>
          <Header />
          {children}
          {/* <footer>footer</footer> */}
        </RecoilRootProvider>
      </body>
    </html>
  );
}
