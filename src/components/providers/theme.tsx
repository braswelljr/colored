'use client';

import { ThemeProvider as Theme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children }: { children?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Theme
      enableSystem
      defaultTheme="light"
      attribute="class"
      enableColorScheme
    >
      {/* <div data-mouse-glow /> */}
      {children}
    </Theme>
  );
}
