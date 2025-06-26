import { type Metadata } from 'next';
import { Caveat, Poppins } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import '@/styles/globals.css';
import { Toaster } from 'sonner';
import { BRAND_NAME } from '@/utils/constants';

const font = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const font_ii = Caveat({
  subsets: ['latin'],
  variable: '--app-font-ii',
});

export const metadata: Metadata = {
  title: { default: BRAND_NAME, template: `%s | ${BRAND_NAME}` },

  description:
    'Style, beauty, travel, and real-life inspo— Trendsfits brings you curated looks, lifestyle tips, and stunning photography, all with a touch of everyday luxury.',

  icons: '/assets/logo.png',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} ${font_ii.variable} antialiased`}>
        {children}

        <Toaster position="top-right" expand richColors />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
