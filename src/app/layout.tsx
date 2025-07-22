import LocalFont from 'next/font/local';
import Navbar from '~/components/layout/navbar';
import BaseProvider from '~/components/providers/base';
import { siteConfig } from '~/config/site';
import '~/css/main.css';
import { cn } from '~/utils/cn';

export const metadata = {
  title: 'colored',
  description: siteConfig.description,
  keywords: ['color'],
  authors: [
    {
      name: 'braswelljr',
      url: 'https://braswelljr.vercel.app'
    }
  ],
  creator: 'braswelljr',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icons/logo192.png',
    apple: '/icons/apple-touch-icon.png'
  },
  manifest: `/manifest.json`
};

const Cascadia = LocalFont({
  src: [{ path: './_fonts/Cascadia.ttf', style: 'normal' }],
  variable: '--font-cascadia'
});

const Kablammo = LocalFont({
  src: [{ path: './_fonts/Kablammo.ttf', style: 'normal' }],
  variable: '--font-kablammo'
});

const JetbrainsMono = LocalFont({
  src: [
    { path: './_fonts/jetbrainsmono.ttf', style: 'normal' },
    { path: './_fonts/jetbrainsmono-italic.ttf', style: 'italic' }
  ],
  variable: '--font-mono'
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        'font-cascadia bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white',
        Cascadia.variable,
        Kablammo.variable,
        JetbrainsMono.variable
      )}
    >
      <body className={cn('min-h-dvh bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white')}>
        <BaseProvider>
          <main className="min-h-dvh w-full">
            <Navbar className="" />
            <div className="h-full">{children}</div>
          </main>
        </BaseProvider>
      </body>
    </html>
  );
}
