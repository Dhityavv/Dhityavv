import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/context/LanguageContext';
import { ModalProvider } from '@/context/ModalContext';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dhitya-space.my.id'),
  title: 'Dhitya Nurhadi - 3D Artist & Creative Developer',
  description:
    'Portfolio of Dhitya Nurhadi (Dhityavv) — Front-End Developer, 3D & Animation Artist, and Creative Technologist. Next.js, Blender (3.6 – 5.3), Fabric Modding.',
  keywords: [
    'Dhitya Nurhadi',
    'Dhityavv',
    'Front-End Developer',
    '3D Artist',
    'Creative Technologist',
    'Next.js',
    'Blender 3D',
    'Minecraft Modding',
    'Grainox',
  ],
  authors: [{ name: 'Dhitya Nurhadi', url: 'https://github.com/Dhityavv' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/assets/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/assets/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: 'kmiL-zEHmypQ_WvUXk_XUGtnQ5XgQjUfln99K_fFN7Y',
  },
  openGraph: {
    title: 'Dhitya Nurhadi - 3D Artist & Creative Developer',
    description: 'Building clean web interfaces & 3D pipelines built for production.',
    url: 'https://www.dhitya-space.my.id',
    siteName: 'Dhitya Nurhadi',
    type: 'website',
  },
};

import { ScrollRestorationReset } from '@/components/ScrollRestorationReset';
import { SmoothScroll } from '@/components/SmoothScroll';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} no-scrollbar`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-indigo-500/25 selection:text-indigo-300 overflow-x-hidden min-h-screen no-scrollbar">
        <ScrollRestorationReset />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <ModalProvider>
              <SmoothScroll>{children}</SmoothScroll>
            </ModalProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
