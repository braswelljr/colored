'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from '~/components/providers/theme';
import { Toaster } from '~/components/ui/sonner';

type BaseProviderProps = {
  children?: React.ReactNode;
};

export default function BaseProvider({ children }: BaseProviderProps) {
  return (
    <NuqsAdapter>
      <ThemeProvider>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
        />
      </ThemeProvider>
    </NuqsAdapter>
  );
}
