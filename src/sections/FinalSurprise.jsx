import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { Petals, Hearts } from '../components/AmbientParticles.jsx';
import { HeartFlourish } from '../components/FloralDecor.jsx';
import { launchHearts } from '../utils/confetti.js';
import { closingPhoto } from '../data/memories.js';
import { birthdayConfig } from '../data/config.js';

/**
 * Section 7 — One Last Surprise. The emotional closing scene.
 */
export default function FinalSurprise({ onReplay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  // One gentle wave of hearts when the scene first appears
  useEffect(() => {
    if (inView) {
      launchHearts({ originX: 0.5, originY: 0.4, count: 14 });
    }
  }, [inView]);

  const lines = [
    'I may not have a thousand gifts to give you, but I made this little corner of the internet just for you.',
    'Every detail is here to remind you how special you are to me.',
    'You deserve all the happiness in this world.',
  ];

  return (
    <section
      ref={ref}
      id="finale"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blush/70 via-softpink to-cream px-5 py-28"
      style={{ minHeight: '100svh' }}
    >
      {/* Glows + glowing hearts */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[12%] h-96 w-96 -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute bottom-[8%] left-[10%] h-72 w-72 rounded-full bg-blush/60 blur-3xl" />
      </div>
      <Petals count={12} />
      <Hearts count={6} className="[&_svg]:blur-[1px]" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-script text-4xl text-deeprose sm:text-5xl"
        >
          one last thing, {birthdayConfig.name}…
        </motion.h2>

        {/* Cinematic photo reveal */}
        {closingPhoto && (
          <div className="relative mt-10">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-blush/70 blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 1.14, clipPath: 'inset(16% 10% 16% 10% round 200px)' }}
              whileInView={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="photo-grain relative rounded-[2rem] bg-white p-2.5 shadow-frame ring-1 ring-rosegold/40"
            >
              <img
                src={closingPhoto.src}
                alt={closingPhoto.alt}
                width={closingPhoto.width}
                height={closingPhoto.height}
                loading="lazy"
                decoding="async"
                className="block h-auto w-[min(76vw,400px)] rounded-[1.6rem]"
                style={{ aspectRatio: `${closingPhoto.width} / ${closingPhoto.height}` }}
              />
            </motion.div>
          </div>
        )}

        {/* Words */}
        <div className="mt-10 space-y-4">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.25 + i * 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-xl font-editorial text-xl italic leading-relaxed text-ink/80 sm:text-2xl"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <HeartFlourish className="mx-auto h-7 w-36" />
          <p className="mt-4 font-display text-3xl font-semibold italic text-ink sm:text-4xl">
            Happy Birthday, My Love!
          </p>
          <p className="mt-3 bg-gradient-to-r from-deeprose to-rosegold bg-clip-text font-script text-5xl text-transparent sm:text-6xl">
            Happy Birthday, {birthdayConfig.name}! ❤️
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center"
        >
          <p className="font-script text-2xl text-rosegold">Made with love, just for you.</p>
          <button type="button" onClick={onReplay} className="btn-ghost mt-6">
            <RotateCcw className="h-4 w-4" />
            Replay This Little Surprise
          </button>
        </motion.div>

        <p className="mt-16 font-body text-xs tracking-[0.25em] text-ink/50">
          A LITTLE WORLD MADE FOR {birthdayConfig.name.toUpperCase()} · MADE WITH ♡ ·{' '}
          {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
