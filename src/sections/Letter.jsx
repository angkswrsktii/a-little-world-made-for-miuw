import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MailOpen } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import { Hearts } from '../components/AmbientParticles.jsx';
import { Blossom, FloralCorner, HeartFlourish } from '../components/FloralDecor.jsx';
import { letterSalutation, letterParagraphs, letterSignature } from '../data/letterData.js';

/**
 * Section 5 — A Little Letter Just for Miuw.
 * Sealed envelope → opening animation → letter with gentle text reveal.
 */
export default function Letter() {
  const [phase, setPhase] = useState('closed'); // closed → opening → letter

  const openLetter = () => {
    setPhase('opening');
    window.setTimeout(() => setPhase('letter'), 1250);
  };

  return (
    <section
      id="letter"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-ivory/60 to-cream px-5 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-32 h-72 w-72 rounded-full bg-softpink/60 blur-3xl"
      />
      <Hearts count={4} className="opacity-70" />

      <SectionHeading
        eyebrow="from my heart"
        title="A Little Letter Just for Miuw"
        subtitle="Some words are better written down — sealed, kept, and meant only for you."
      />

      <div className="relative z-10 mx-auto mt-14 max-w-2xl">
        <AnimatePresence mode="wait">
          {phase !== 'letter' ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20, transition: { duration: 0.45 } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Envelope phase={phase} onOpen={openLetter} />
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <LetterPaper />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Sealed envelope ─────────────────────────────────────────── */

function Envelope({ phase, onOpen }) {
  const opening = phase === 'opening';
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={onOpen}
        disabled={opening}
        aria-label="Open the letter"
        className="group relative block w-[320px] max-w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deeprose focus-visible:ring-offset-4 focus-visible:ring-offset-cream sm:w-[400px]"
      >
        <div className="relative aspect-[4/3]">
          {/* Envelope body */}
          <div className="absolute inset-0 rounded-xl bg-ivory shadow-frame" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-xl bg-[#F2E3CC]" />

          {/* Letter sheet sliding out */}
          <motion.div
            className="absolute inset-x-5 top-2 bottom-5 rounded-md bg-white shadow-soft"
            animate={opening ? { y: '-46%', scale: 1.02 } : { y: 0 }}
            transition={{ delay: opening ? 0.55 : 0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mt-4 block text-center font-script text-2xl text-deeprose/70">
              for Miuw ♡
            </span>
            <span className="mx-auto mt-2 block h-1 w-16 rounded-full bg-blush" />
            <span className="mx-auto mt-3 block h-1 w-24 rounded-full bg-ivory" />
            <span className="mx-auto mt-2 block h-1 w-20 rounded-full bg-ivory" />
          </motion.div>

          {/* Top flap */}
          <div
            className="absolute inset-x-0 top-0 h-[52%] origin-top rounded-t-xl bg-blush transition-transform duration-700 [clip-path:polygon(0_0,100%_0,50%_100%)]"
            style={{
              transform: opening ? 'rotateX(180deg)' : 'rotateX(0deg)',
              transformStyle: 'preserve-3d',
              zIndex: opening ? 0 : 2,
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />

          {/* Wax seal */}
          <motion.div
            className="absolute left-1/2 top-[52%] z-[3] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-deeprose shadow-card"
            animate={opening ? { scale: 1.6, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            <Heart className="h-6 w-6 text-cream" fill="currentColor" strokeWidth={0} />
          </motion.div>

          {/* Blossoms */}
          <Blossom className="absolute -right-5 -top-5 h-12 w-12 opacity-80" />
          <Blossom className="absolute -bottom-4 -left-5 h-9 w-9 opacity-60" petal="#F8DDE3" />
        </div>
      </button>

      <p className="mt-6 flex items-center gap-2 font-script text-2xl text-deeprose">
        <MailOpen className="h-5 w-5" />
        {opening ? 'opening your letter…' : 'click the envelope to open ♡'}
      </p>
    </div>
  );
}

/* ── The letter itself ───────────────────────────────────────── */

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.35 } },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function LetterPaper() {
  return (
    <motion.article
      variants={listVariants}
      initial="hidden"
      animate="show"
      className="photo-grain relative mx-auto max-w-2xl -rotate-[0.4deg] rounded-lg bg-[#FFFDF8] px-6 py-10 shadow-frame sm:px-12 sm:py-14"
    >
      <span aria-hidden="true" className="washi washi--blush left-1/2 -translate-x-1/2" />
      <FloralCorner className="absolute -left-3 -top-3 opacity-40" />
      <Blossom className="absolute -right-4 bottom-10 h-10 w-10 opacity-50" petal="#F8DDE3" />

      {/* Typewriter salutation — quick, never sluggish */}
      <Typewriter text={letterSalutation} className="font-display text-2xl font-semibold italic text-deeprose sm:text-3xl" />

      <div className="mt-6 space-y-5">
        {letterParagraphs.map((text, i) => (
          <motion.p
            key={i}
            variants={paragraphVariants}
            className="font-editorial text-lg leading-loose text-ink/85 sm:text-xl"
          >
            {text}
          </motion.p>
        ))}
      </div>

      {/* Handwritten signature */}
      <motion.div variants={paragraphVariants} className="mt-10 text-right">
        <HeartFlourish className="ml-auto h-6 w-28 -rotate-2" color="#C9A46A" />
        <p className="mt-1 font-script text-4xl text-deeprose">{letterSignature}</p>
      </motion.div>
    </motion.article>
  );
}

/* ── Tiny typewriter hook ────────────────────────────────────── */

function Typewriter({ text, speed = 42, className = '' }) {
  const [shown, setShown] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setShown('');
    setDone(false);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);

  return (
    <p className={`${done ? '' : 'type-caret'} ${className}`}>
      {shown}
      <span className="sr-only">{text}</span>
    </p>
  );
}
