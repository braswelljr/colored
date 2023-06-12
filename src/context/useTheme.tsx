'use client'

import { ThemeProvider as Theme } from 'next-themes'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Theme attribute="class" enableSystem={false} defaultTheme="system">
      {children}
    </Theme>
  )
}
