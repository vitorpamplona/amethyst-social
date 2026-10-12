import { createRoot } from 'react-dom/client';

// Fonts
import '@fontsource-variable/inter';
import '@fontsource-variable/outfit';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
