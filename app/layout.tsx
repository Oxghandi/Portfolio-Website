import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://oxghandi.netlify.app'),
  title: 'Gen. Paul (0xghandi) | Web3 Ecosystem Operator',
  description:
    'Portfolio of Gen. Paul (0xghandi), a Web3 ecosystem operator focused on RWA narratives, community growth, and strategic marketing.',
  openGraph: {
    title: 'Gen. Paul (0xghandi) | Web3 Ecosystem Operator',
    description:
      'Building narratives and communities in Web3 through moderation, strategy, and RWA-focused ecosystem operations.',
    type: 'website',
    url: 'https://oxghandi.netlify.app',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Gen. Paul portfolio preview' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gen. Paul (0xghandi) | Web3 Ecosystem Operator',
    description:
      'Narrative-driven Web3 portfolio highlighting ecosystem building, growth strategy, and RWA advocacy.',
    images: ['/og-image.svg']
  },
  icons: {
    icon: [
      { url: '/favicon.jpg', type: 'image/jpeg' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-bg text-cream antialiased">{children}</body>
    </html>
  );
}
