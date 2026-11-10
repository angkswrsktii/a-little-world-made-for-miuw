import { useState } from 'react';
import { Heart } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import { Blossom } from '../components/FloralDecor.jsx';
import { littleThings } from '../data/littleThings.js';

/**
 * Section 4 — Little Things That Make Miuw Special.
 * Six scrapbook flip cards; click to reveal a warm message.
 */
export default function LittleThings() {
  return (
    <section
      id="little-things"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-softpink/40 to-cream px-5 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-blush/50 blur-3xl"
      />

      <SectionHeading
        eyebrow="little things"
        title="Little Things That Make Miuw Special"
        subtitle="Sometimes the smallest things make someone truly unforgettable."
      />

      <div className="relative z-10 mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {littleThings.map((thing, i) => (
          <ScrollReveal key={thing.id} delay={(i % 3) * 0.1}>
            <FlipCard thing={thing} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function FlipCard({ thing }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = thing.icon;

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${thing.title} — tap to flip the card`}
      className="group block h-64 w-full cursor-pointer rounded-3xl [perspective:1200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deeprose sm:h-72"
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ── Front ── */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-white/70 p-6 text-center shadow-soft [backface-visibility:hidden] ${thing.bg}`}
        >
          <Blossom className="absolute left-3 top-3 h-8 w-8 opacity-50" />
          <Blossom
            className="absolute bottom-3 right-3 h-6 w-6 opacity-40"
            petal="#F8DDE3"
          />
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-soft">
            <Icon className="h-7 w-7 text-deeprose" strokeWidth={1.7} />
          </span>
          <h3 className="font-display text-xl font-semibold leading-snug text-ink">{thing.title}</h3>
          <span className="mt-4 font-script text-xl text-deeprose/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            tap to flip ♡
          </span>
        </div>

        {/* ── Back ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-deeprose p-7 text-center shadow-card [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Heart className="mb-4 h-6 w-6 text-cream/90" fill="currentColor" strokeWidth={0} />
          <p className="font-editorial text-lg italic leading-relaxed text-cream sm:text-xl">
            {thing.message}
          </p>
          <span className="mt-4 font-script text-xl text-blush">for you, always ♡</span>
        </div>
      </div>
    </button>
  );
}
