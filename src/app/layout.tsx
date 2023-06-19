import './globals.css'
import LocalFont from 'next/font/local'
import clsx from 'clsx'
import { siteConfig } from '~/config/site'
import Navbar from '~/components/Navbar'
import { PalleteProvider } from '~/context/usePallete'
import ThemeProvider from '~/context/useTheme'
import { Toaster } from '~/context/useToast'

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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icons/logo192.png',
    apple: '/icons/apple-touch-icon.png'
  },
  manifest: `/manifest.json`
}

const SpaceGrotesk = LocalFont({
  src: [{ path: './SpaceGrotesk.ttf', style: 'normal' }],
  variable: '--font-space-grotesk'
})

const Kablammo = LocalFont({
  src: [{ path: './Kablammo.ttf', style: 'normal' }],
  variable: '--font-kablammo'
})

const JetbrainsMono = LocalFont({
  src: [
    { path: './jetbrainsmono.ttf', style: 'normal' },
    { path: './jetbrainsmono-italic.ttf', style: 'italic' }
  ],
  variable: '--font-mono'
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={clsx(
        'bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white',
        SpaceGrotesk.variable,
        Kablammo.variable,
        JetbrainsMono.variable
      )}
    >
      <body
        className={clsx(
          'min-h-screen bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white'
        )}
      >
        <ThemeProvider>
          <PalleteProvider>
            <Navbar className="h-[7.5vh]" />
            <div className="min-h-[82.5vh]">{children}</div>
            <Toaster />
          </PalleteProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
