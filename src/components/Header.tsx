import { Github } from 'lucide-react';
import { REPO_URL } from '@/lib/downloads';
import { publicUrl } from '@/lib/utils';

export function Header() {
  return (
    <header className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
      <a href={publicUrl('')} className="flex items-center gap-3">
        <img src={publicUrl('amethyst-logo.jpg')} alt="" className="h-10 w-10 rounded-xl" />
        <span className="font-serif text-xl font-bold text-gradient">Amethyst</span>
      </a>
      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Amethyst on GitHub"
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
      >
        <Github className="h-5 w-5" />
      </a>
    </header>
  );
}
