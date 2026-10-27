import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { MotionProvider } from '@/components/motion-provider';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  title: { default: 'Murali Forge Systems | Business Automation & Digital Systems', template: '%s | Murali Forge Systems' },
  description: 'Murali Forge Systems designs practical business automation, connected workflows, and custom digital systems.',
  applicationName: 'Murali Forge Systems',
  openGraph: { type: 'website', title: 'Murali Forge Systems', description: 'Business workflows, engineered to work better.', siteName: 'Murali Forge Systems' },
  twitter: { card: 'summary_large_image', title: 'Murali Forge Systems', description: 'Business workflows, engineered to work better.' },
  icons: { icon: '/icon.png', apple: '/icon.png' },
};
export const viewport: Viewport = { themeColor: '#f6f4ee', colorScheme: 'light' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><MotionProvider><SiteHeader />{children}<SiteFooter /></MotionProvider><Analytics /></body></html>;
}
