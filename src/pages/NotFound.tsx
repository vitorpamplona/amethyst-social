import { useEffect } from 'react';
import { publicUrl } from '@/lib/utils';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page not found · Amethyst';
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-hero-gradient px-4 text-center">
      <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-gradient">Page not found</h1>
      <p className="text-muted-foreground">This page doesn't exist on amethyst.social.</p>
      <a href={publicUrl('')} className="text-foreground underline underline-offset-4 hover:text-primary">
        Go to the download page
      </a>
    </div>
  );
};

export default NotFound;
