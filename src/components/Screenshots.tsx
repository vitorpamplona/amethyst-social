import { publicUrl } from '@/lib/utils';

/** The desktop app on macOS, with its phone layout in a narrow window overlapping the corner. */
export function Screenshots() {
  return (
    <div className="w-full px-4">
      <div className="relative mx-auto max-w-4xl pb-[8%]">
        <img
          src={publicUrl('amethyst-desktop.webp')}
          srcSet={`${publicUrl('amethyst-desktop-1100.webp')} 1100w, ${publicUrl('amethyst-desktop.webp')} 1587w`}
          sizes="(min-width: 928px) 896px, calc(100vw - 2rem)"
          alt="Amethyst on macOS, showing the navigation drawer, the home feed and the notifications column"
          width={1587}
          height={1337}
          decoding="async"
          className="h-auto w-full"
        />
        <img
          src={publicUrl('amethyst-mobile.webp')}
          alt="Amethyst's phone layout, showing the home feed and the bottom navigation bar"
          width={549}
          height={1101}
          loading="lazy"
          className="absolute -right-[3%] bottom-0 h-auto w-[28%]"
        />
      </div>
    </div>
  );
}
