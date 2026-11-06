import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store/useStore';
import { ThemeProvider } from '@/lib/theme/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PWAInstallBanner from '@/components/PWAInstallBanner';
import CookieBanner from '@/components/CookieBanner';
import ViralFloatingButton from '@/components/ViralFloatingButton';
import MobileBottomNav from '@/components/MobileBottomNav';

export const metadata: Metadata = {
  title: 'M&H BIENESTAR — Reeducación Corporal y Terapias Manuales en Orcera (Jaén)',
  description: 'Centro Parasanitario M&H en Orcera (Jaén). Especialistas en reeducación corporal, técnica craneosacral suave, bienestar visceral y movilidad. Pide tu cita online.',
  keywords: [
    'centro de bienestar en Orcera',
    'reeducación corporal en Jaén',
    'técnicas manuales Orcera',
    'bienestar corporal Sierra de Segura',
    'técnica craneosacral Jaén',
    'M&H Bienestar Orcera',
    'quirosteopatia mh',
    'masaje terapéutico Orcera'
  ],
  authors: [{ name: 'Centro Parasanitario M&H' }],
  creator: 'M&H BIENESTAR',
  publisher: 'Centro Parasanitario M&H',
  metadataBase: new URL('https://quirosteopatiamh.es'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'M&H BIENESTAR — Reeducación Corporal en Orcera (Jaén)',
    description: 'Equilibrio, movilidad y serenidad para tu cuerpo en el corazón de la Sierra de Segura. Reserva tu sesión online.',
    url: 'https://quirosteopatiamh.es',
    siteName: 'M&H BIENESTAR',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Centro Parasanitario M&H Bienestar',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'M&H BIENESTAR — Centro Parasanitario en Orcera',
    description: 'Reeducación corporal, técnicas manuales y bienestar en la Sierra de Segura.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#233D2D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: 'M&H BIENESTAR — Centro Parasanitario',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    '@id': 'https://quirosteopatiamh.es',
    url: 'https://quirosteopatiamh.es',
    telephone: '+34651308738',
    email: 'info@quirosteopatiamh.es',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle San José, 2',
      addressLocality: 'Orcera',
      postalCode: '23370',
      addressRegion: 'Jaén',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.3180,
      longitude: -2.6610,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:30',
        closes: '20:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:30',
        closes: '13:30',
      },
    ],
    priceRange: '35€ - 45€',
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-[#0F0A1C] text-slate-900 dark:text-purple-100 antialiased selection:bg-[#EDE9FE] selection:text-[#3B1238] transition-colors duration-300">
        <ThemeProvider>
          <StoreProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <PWAInstallBanner />
            <ViralFloatingButton />
            <CookieBanner />
            <MobileBottomNav />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
