'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from '~/components/providers/theme';
import { Toaster } from '~/components/ui/sonner';

type BaseProviderProps = {
  children?: React.ReactNode;
};

const queryClient = new QueryClient();

export default function BaseProvider({ children }: BaseProviderProps) {
  return (
    <ThemeProvider>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        <Toaster
          position="top-right"
          richColors
          closeButton
          visibleToasts={5}
        />
      </NuqsAdapter>
    </ThemeProvider>
  );
}
