// NOTE: This file should normally not be modified unless you are adding a new provider.
// To add new routes, edit the AppRouter.tsx file.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from 'react';
import NostrProvider from '@/components/NostrProvider';
import AppRouter from './AppRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1 minute
      gcTime: Infinity,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NostrProvider>
        <Suspense>
          <AppRouter />
        </Suspense>
      </NostrProvider>
    </QueryClientProvider>
  );
}

export default App;
