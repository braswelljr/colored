import './globals.css'
import LocalFont from 'next/font/local'
import clsx from 'clsx'

export const metadata = {
  title: 'Create Next App',
  description: 'Color Pallette',
  keywords: ['color'],
  authors: [
    {
      name: 'braswelljr',
      url: 'https://braswelljr.engineer'
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
        {children}
      </body>
    </html>
  )
}
