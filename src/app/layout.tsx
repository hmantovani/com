import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Henrique Mantovani | Data Professional',
  description:
    'Data Professional specializing in ETL pipelines, data modeling, and predictive analytics. IBM · Keyence · Thermo Fisher Scientific. Available for freelance and full-time opportunities.',
  keywords: [
    'Data Engineer', 'Data Scientist', 'ETL', 'Python', 'Machine Learning',
    'Data Analytics', 'Portfolio', 'Henrique Mantovani', 'hmantovani',
    'Freelance Data', 'Upwork Data Engineer',
  ],
  authors: [{ name: 'Henrique Mantovani', url: 'https://hmantovani.com' }],
  creator: 'Henrique Mantovani',
  openGraph: {
    type: 'website',
    url: 'https://hmantovani.com',
    title: 'Henrique Mantovani | Data Professional',
    description:
      'ETL pipelines, data modeling, and predictive analytics. 3 experiences at global market leaders.',
    siteName: 'hmantovani.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Henrique Mantovani | Data Professional',
    description: 'ETL pipelines, data modeling, and predictive analytics.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://hmantovani.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ background: '#08080f' }}>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
