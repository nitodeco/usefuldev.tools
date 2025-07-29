import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { Geist, Geist_Mono } from 'next/font/google';

import { ThemeToggle } from '@/components/molecules/ThemeToggle';
import { Footer } from '@/components/organisms/Footer';
import { Sidebar } from '@/components/organisms/Sidebar';
import { RootProvider } from '@/components/providers/RootProvider';

import { generatePageMetadata } from '@/lib/metadata';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const generateMetadata = generatePageMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [messages, locale] = await Promise.all([getMessages(), getLocale()]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <RootProvider>
            <div className='fixed top-4 right-4'>
              <ThemeToggle />
            </div>
            <Sidebar>
              <div className='flex flex-col flex-1'>
                <div className='flex-1 p-6'>{children}</div>
                <Footer />
              </div>
            </Sidebar>
          </RootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
