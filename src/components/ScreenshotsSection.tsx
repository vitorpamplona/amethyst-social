import { useState } from 'react';
import { cn } from '@/lib/utils';

const screenshots = [
  {
    src: '/amethyst-1.webp',
    alt: 'Amethyst Feed View',
    label: 'Beautiful Feed',
  },
  {
    src: '/amethyst-2.webp',
    alt: 'Amethyst Profile View',
    label: 'Rich Profiles',
  },
  {
    src: '/amethyst-3.webp',
    alt: 'Amethyst Messaging',
    label: 'Private Messages',
  },
  {
    src: '/amethyst-4.webp',
    alt: 'Amethyst Features',
    label: 'Powerful Features',
  },
];

export function ScreenshotsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="screenshots" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/20 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/40 border border-purple-500/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-purple-300">App Preview</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            <span className="text-foreground">Experience the</span>
            <br />
            <span className="text-gradient">Interface</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground">
            A beautifully crafted experience that makes exploring Nostr a joy.
          </p>
        </div>

        {/* Desktop Layout: Floating phone mockups */}
        <div className="hidden lg:block">
          <div className="relative max-w-6xl mx-auto h-[700px]">
            {screenshots.map((screenshot, index) => {
              const positions = [
                { left: '5%', top: '8%', rotate: -8, z: 10 },
                { left: '25%', top: '0%', rotate: -3, z: 20 },
                { right: '25%', top: '0%', rotate: 3, z: 20 },
                { right: '5%', top: '8%', rotate: 8, z: 10 },
              ];
              const pos = positions[index];

              return (
                <div
                  key={screenshot.src}
                  className={cn(
                    "absolute w-56 cursor-pointer transition-all duration-500 group",
                    activeIndex === index ? "scale-110 z-30" : "hover:scale-105"
                  )}
                  style={{
                    left: pos.left,
                    right: pos.right,
                    top: pos.top,
                    transform: `rotate(${activeIndex === index ? 0 : pos.rotate}deg)`,
                    zIndex: activeIndex === index ? 30 : pos.z,
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Phone frame */}
                  <div className="relative">
                    {/* Glow effect */}
                    <div className={cn(
                      "absolute -inset-4 bg-gradient-to-br from-purple-500/40 via-purple-600/20 to-cyan-500/40 rounded-[3rem] blur-2xl transition-opacity duration-500",
                      activeIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                    )} />

                    {/* Phone body */}
                    <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-2xl shadow-purple-900/30">
                      {/* Screen bezel */}
                      <div className="relative bg-black rounded-[2rem] overflow-hidden">
                        {/* Dynamic Island / Notch */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10" />

                        {/* Screenshot */}
                        <img
                          src={screenshot.src}
                          alt={screenshot.alt}
                          className="w-full h-auto aspect-[9/19.5] object-cover object-top"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <div className={cn(
                    "absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300",
                    activeIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  )}>
                    <span className="px-4 py-2 bg-purple-900/60 backdrop-blur-sm rounded-full text-sm font-medium text-purple-200 border border-purple-500/30">
                      {screenshot.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? "bg-purple-500 w-8"
                    : "bg-purple-500/30 hover:bg-purple-500/50"
                )}
                aria-label={`View screenshot ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 max-w-2xl mx-auto">
          {screenshots.map((screenshot, index) => (
            <div
              key={screenshot.src}
              className={cn(
                "group cursor-pointer transition-all duration-300",
                index % 2 === 0 ? "translate-y-8" : ""
              )}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Phone frame */}
                <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2rem] p-1.5 shadow-xl">
                  <div className="relative bg-black rounded-[1.75rem] overflow-hidden">
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full z-10" />
                    <img
                      src={screenshot.src}
                      alt={screenshot.alt}
                      className="w-full h-auto aspect-[9/19.5] object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              <p className="text-center mt-4 text-sm font-medium text-muted-foreground group-hover:text-purple-300 transition-colors">
                {screenshot.label}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Layout: Carousel style */}
        <div className="md:hidden">
          {/* Main screenshot */}
          <div className="relative max-w-xs mx-auto">
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/40 via-purple-600/20 to-cyan-500/40 rounded-[3rem] blur-2xl" />

            {/* Phone frame */}
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
              <div className="relative bg-black rounded-[2rem] overflow-hidden">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10" />
                <img
                  src={screenshots[activeIndex].src}
                  alt={screenshots[activeIndex].alt}
                  className="w-full h-auto aspect-[9/19.5] object-cover object-top transition-opacity duration-300"
                />
              </div>
            </div>
          </div>

          {/* Label */}
          <p className="text-center mt-6 text-lg font-medium text-purple-300">
            {screenshots[activeIndex].label}
          </p>

          {/* Thumbnail strip */}
          <div className="flex justify-center gap-3 mt-6">
            {screenshots.map((screenshot, index) => (
              <button
                key={screenshot.src}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative w-14 rounded-xl overflow-hidden transition-all duration-300",
                  activeIndex === index
                    ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-background scale-110"
                    : "opacity-50 hover:opacity-75"
                )}
              >
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="w-full h-auto aspect-[9/16] object-cover object-top"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
