import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, ArrowDown } from 'lucide-react';
import { Petals } from '../components/AmbientParticles.jsx';
import { Blossom, FloralCorner, HeartFlourish } from '../components/FloralDecor.jsx';
import { heroPhoto } from '../data/memories.js';
import { birthdayConfig } from '../data/config.js';

const easeOut = [0.22, 1, 0.36, 1];

/**
 * Section 2 — Happy Birthday, Miuw (editorial hero).
 */
export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yNoteLeft = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const yNoteRight = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-16"
      style={{ minHeight: '100svh' }}
    >
      {/* Soft background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[8%] h-80 w-80 rounded-full bg-softpink/70 blur-3xl" />
        <div className="absolute bottom-[12%] right-[4%] h-96 w-96 rounded-full bg-blush/50 blur-3xl" />
        <div className="absolute left-[38%] top-[30%] h-64 w-64 rounded-full bg-ivory/80 blur-3xl" />
      </div>

      <Petals count={8} />
      <FloralCorner className="absolute -left-4 -top-4 opacity-60" />
      <FloralCorner className="absolute -bottom-4 -right-4 rotate-180 opacity-60" />

      {/* Handwritten floating notes (desktop) */}
      <motion.p
        style={{ y: yNoteLeft }}
        aria-hidden="true"
        className="absolute left-[3%] top-[22%] z-[5] hidden -rotate-6 font-script text-2xl text-deeprose/80 xl:block"
      >
        your day, your smile ✿
      </motion.p>
      <motion.p
        style={{ y: yNoteRight }}
        aria-hidden="true"
        className="absolute bottom-[20%] right-[3%] z-[5] hidden rotate-3 font-script text-2xl text-rosegold xl:block"
      >
        the sweetest girl ♡
      </motion.p>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-10">
        {/* ── Text block ─────────────────────────────────────── */}
        <motion.div style={{ y: yText }} className="order-1 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
            className="font-script text-3xl text-deeprose sm:text-4xl"
          >
            to my favorite girl
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
            className="mt-3 font-display text-5xl font-semibold italic leading-tight text-ink sm:text-6xl lg:text-7xl"
          >
            {birthdayConfig.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: easeOut }}
            className="mt-3 bg-gradient-to-r from-deeprose via-[#B9768E] to-rosegold bg-clip-text font-display text-6xl font-bold uppercase tracking-[0.14em] text-transparent sm:text-7xl lg:text-8xl"
          >
            {birthdayConfig.name}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="mt-7 flex justify-center lg:justify-start"
          >
            <HeartFlourish className="h-7 w-32" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: easeOut }}
            className="mx-auto mt-6 max-w-md font-editorial text-xl italic leading-relaxed text-ink/75 sm:text-2xl lg:mx-0"
          >
            Today, the world celebrates someone as beautiful as you, {birthdayConfig.name}.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.05 }}
            className="mt-3 font-body text-xs uppercase tracking-[0.3em] text-rosegold sm:text-sm"
          >
            Your day. Your smile. Your little world.
          </motion.p>
        </motion.div>

        {/* ── Photo block ────────────────────────────────────── */}
        <div className="order-2 mt-4 lg:mt-0">
          <motion.div style={{ y: yPhoto }} className="relative mx-auto w-full max-w-md lg:max-w-lg">
            {/* Offset blush backdrop + thin rose-gold frame */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 rotate-2 rounded-[2.6rem] bg-blush/60 sm:-inset-5"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-3 -rotate-1 rounded-[2.6rem] border border-rosegold/40 sm:-inset-5"
            />

            {heroPhoto && (
              <motion.div
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.3, delay: 0.55, ease: easeOut }}
                className="photo-grain relative overflow-hidden rounded-[2rem] bg-white p-2.5 shadow-frame"
              >
                <div className="overflow-hidden rounded-[1.6rem]">
                  <img
                    src={heroPhoto.src}
                    alt={heroPhoto.alt}
                    width={heroPhoto.width}
                    height={heroPhoto.height}
                    loading="eager"
                    decoding="async"
                    className="block h-auto w-full"
                    style={{ aspectRatio: `${heroPhoto.width} / ${heroPhoto.height}` }}
                  />
                </div>
                <p className="pb-1.5 pt-3 text-center font-script text-2xl text-deeprose">
                  the birthday girl ♡
                </p>
              </motion.div>
            )}

            {/* Rotating birthday badge */}
            <div className="absolute -right-6 -top-8 z-10 h-24 w-24 sm:-right-10 sm:h-28 sm:w-28">
              <div className="absolute inset-0 rounded-full bg-white shadow-card" />
              <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slower" aria-hidden="true">
                <defs>
                  <path
                    id="badge-circle"
                    d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
                    fill="none"
                  />
                </defs>
                <text
                  className="fill-deeprose"
                  style={{ fontSize: '10px', letterSpacing: '2.6px', fontFamily: '"DM Sans", sans-serif' }}
                >
                  <textPath href="#badge-circle">HAPPY BIRTHDAY • MIUW •</textPath>
                </text>
              </svg>
              <Heart className="absolute inset-0 m-auto h-6 w-6 text-deeprose" fill="currentColor" strokeWidth={0} />
            </div>

            {/* Corner blossoms */}
            <Blossom className="absolute -bottom-7 -left-7 h-14 w-14 opacity-80" />
            <Blossom className="absolute -left-4 top-1/3 h-8 w-8 opacity-60" petal="#F8DDE3" />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue (functional — scrolls to gallery) */}
      <motion.button
        type="button"
        onClick={scrollToGallery}
        aria-label="Scroll to the gallery"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.6 }}
        className="group absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-deeprose/80 transition-colors hover:text-deeprose"
      >
        <span className="font-script text-xl">A little world made just for you</span>
        <ArrowDown className="h-5 w-5 animate-bob" />
      </motion.button>
    </section>
  );
}
