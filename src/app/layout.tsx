import Header from './header';

import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ReactQueryProvider from '@/providers/reactQueryProvider';
import { ThemeProvider } from '@/providers/themeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'devooks',
  description: '전자책 상거래 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className + ' mt-[56px]'}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            {children}
            {/* <footer>footer</footer> */}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
