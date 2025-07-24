'use client';

import { ThemeProvider as Theme, ThemeProviderProps } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children, ...props }: { children?: React.ReactNode } & ThemeProviderProps) {
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
      {...props}
    >
      {/* <div data-mouse-glow /> */}
      {children}
    </Theme>
  );
}
