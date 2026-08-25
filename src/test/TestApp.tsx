import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NostrProvider from '@/components/NostrProvider';

interface TestAppProps {
  children: React.ReactNode;
}

export function TestApp({ children }: TestAppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NostrProvider>
        {children}
      </NostrProvider>
    </QueryClientProvider>
  );
}

export default TestApp;