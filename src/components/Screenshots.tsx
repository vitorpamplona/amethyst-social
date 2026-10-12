import { publicUrl } from '@/lib/utils';

const screenshots = [
  { src: 'amethyst-1.webp', alt: 'Home feed' },
  { src: 'amethyst-2.webp', alt: 'Messages' },
  { src: 'amethyst-3.webp', alt: 'Notifications' },
  { src: 'amethyst-4.webp', alt: 'Live stream with chat' },
];

export function Screenshots() {
  return (
    <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:justify-center">
      {screenshots.map((shot) => (
        <img
          key={shot.src}
          src={publicUrl(shot.src)}
          alt={shot.alt}
          width={648}
          height={1440}
          loading="lazy"
          className="h-auto w-40 shrink-0 snap-center rounded-2xl border border-purple-500/20 shadow-xl shadow-purple-900/40 md:w-48"
        />
      ))}
    </div>
  );
}
