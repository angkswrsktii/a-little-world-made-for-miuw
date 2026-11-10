import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { Petals, Sparkles, Hearts } from '../components/AmbientParticles.jsx';
import { Blossom, FloralCorner } from '../components/FloralDecor.jsx';
import { launchHearts } from '../utils/confetti.js';
import { birthdayConfig } from '../data/config.js';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Section 1 — Opening Surprise.
 * Full-screen gift experience; unlocking reveals the little world below.
 */
export default function OpeningSurprise({ onOpen }) {
  const handleOpen = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    launchHearts({
      originX: (rect.left + rect.width / 2) / window.innerWidth,
      originY: rect.top / window.innerHeight,
      count: 24,
    });
    window.setTimeout(onOpen, 700);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-cream px-6"
      style={{ minHeight: '100svh' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      exit={{
        opacity: 0,
        scale: 1.08,
        filter: 'blur(10px)',
        transition: { duration: 0.9, ease: 'easeInOut' },
      }}
    >
      <Sparkles count={16} />
      <Petals count={10} />
      <Hearts count={4} />

      <FloralCorner className="absolute -left-4 -top-4 opacity-70" />
      <FloralCorner className="absolute -bottom-4 -right-4 rotate-180 opacity-70" />
      <Blossom className="absolute right-[12%] top-[16%] hidden h-10 w-10 opacity-40 sm:block" />
      <Blossom className="absolute bottom-[16%] left-[10%] hidden h-8 w-8 opacity-40 sm:block" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex max-w-xl flex-col items-center text-center"
      >
        <motion.div
          variants={item}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-card animate-float-y"
        >
          <Gift className="h-9 w-9 text-deeprose" strokeWidth={1.6} />
        </motion.div>

        <motion.p variants={item} className="font-script text-3xl text-deeprose sm:text-4xl">
          a little surprise for
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-2 font-display text-6xl font-semibold tracking-[0.18em] text-ink sm:text-8xl"
        >
          {birthdayConfig.name.toUpperCase()}
        </motion.h1>

        <motion.div variants={item} className="mt-5 flex items-center gap-3">
          <span className="h-px w-10 bg-rosegold/60" />
          <Blossom className="h-5 w-5" />
          <span className="h-px w-10 bg-rosegold/60" />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 max-w-md font-editorial text-xl italic leading-relaxed text-ink/75 sm:text-2xl"
        >
          Because someone as special as you deserves something special.
        </motion.p>

        <motion.button variants={item} type="button" onClick={handleOpen} className="btn-rose mt-10">
          Open Your Gift ♡
        </motion.button>

        <motion.p variants={item} className="mt-8 font-script text-2xl text-rosegold">
          Made with love, just for {birthdayConfig.name} ♡
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
