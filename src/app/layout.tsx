import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Newsreader } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
});

const DESCRIPTION =
  'Henrique Mantovani builds data pipelines, data models and predictive analyses. Production engineer and data scientist; previously at IBM, Keyence and Thermo Fisher Scientific.';

export const metadata: Metadata = {
  title: 'Henrique Mantovani — Data engineering and analytics',
  description: DESCRIPTION,
  keywords: [
    'Data Engineer', 'Data Scientist', 'ETL', 'Python', 'Data Modeling',
    'Data Analytics', 'Henrique Mantovani', 'hmantovani', 'Freelance Data',
  ],
  authors: [{ name: 'Henrique Mantovani', url: 'https://hmantovani.com' }],
  creator: 'Henrique Mantovani',
  icons: { icon: '/hmv.png', apple: '/hmv.png' },
  openGraph: {
    type: 'website',
    url: 'https://hmantovani.com',
    title: 'Henrique Mantovani — Data engineering and analytics',
    description: DESCRIPTION,
    siteName: 'hmantovani.com',
    images: [{ url: '/hmv.png', width: 512, height: 512, alt: 'hmantovani' }],
  },
  twitter: {
    card: 'summary',
    title: 'Henrique Mantovani — Data engineering and analytics',
    description: DESCRIPTION,
    images: ['/hmv.png'],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://hmantovani.com'),
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f2ec' },
    { media: '(prefers-color-scheme: dark)', color: '#121210' },
  ],
};

// Runs before first paint: applies the stored theme (or the system one) and
// the stored language, and marks JS as available for scroll reveals.
const BOOT = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('hm-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t;var l=localStorage.getItem('hm-lang');if(l==='pt')d.lang='pt-BR';d.classList.add('js')}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body className="min-h-screen flex flex-col bg-bg text-ink">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-bg focus:px-4 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
