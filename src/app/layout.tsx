import './globals.css'
import LocalFont from 'next/font/local'
import clsx from 'clsx'
import Footer from '~/components/Footer'
import Navbar from '~/components/Navbar'
import ThemeProvider from '~/context/useTheme'

export const metadata = {
  title: 'colored',
  description: 'Color palette 🎨',
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

const Lobster = LocalFont({
  src: [{ path: './lobster.ttf', style: 'normal' }],
  variable: '--font-lobster'
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
        Lobster.variable,
        JetbrainsMono.variable
      )}
    >
      <body className={clsx('bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white')}>
        <ThemeProvider>
          <Navbar className="" />
          {children}
          <Footer className="" />
        </ThemeProvider>
      </body>
    </html>
  )
}
