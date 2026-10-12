import { publicUrl } from '@/lib/utils';

/** The desktop app on macOS, with the Android app overlapping its corner. */
export function Screenshots() {
  return (
    <div className="w-full px-4">
      <div className="relative mx-auto max-w-5xl pb-[6%]">
        <img
          src={publicUrl('amethyst-desktop.webp')}
          alt="Amethyst on macOS, showing the home feed, a video post and the notifications chart"
          width={1743}
          height={1199}
          loading="lazy"
          className="h-auto w-full"
        />
        <img
          src={publicUrl('amethyst-1.webp')}
          alt="Amethyst on Android, showing the home feed"
          width={648}
          height={1440}
          loading="lazy"
          className="absolute bottom-0 right-0 h-auto w-[22%] rounded-[8%/3.6%] border border-purple-500/30 shadow-2xl shadow-black/60"
        />
      </div>
    </div>
  );
}
