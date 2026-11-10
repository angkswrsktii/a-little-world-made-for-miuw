import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles as SparklesIcon } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import { Sparkles } from '../components/AmbientParticles.jsx';
import { Blossom } from '../components/FloralDecor.jsx';
import { wishes, wishMessage } from '../data/wishes.js';
import { celebrate } from '../utils/confetti.js';

const BALLOON_COLORS = [
  { fill: '#EFC1CE', stripe: '#A75D75' },
  { fill: '#F8DDE3', stripe: '#C9A46A' },
  { fill: '#F7EBDD', stripe: '#A75D75' },
  { fill: '#D89AAE', stripe: '#FFF8F5' },
];

/**
 * Section 6 — Wishes for Your New Chapter.
 * Balloons, stars, a birthday cake — and a wish-making button.
 */
export default function Wishes() {
  const [messageShown, setMessageShown] = useState(false);
  const [balloons, setBalloons] = useState([]);
  const idRef = useRef(0);

  const makeWish = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = rect.top / window.innerHeight;

    celebrate({ originX, originY, count: 140 });
    setMessageShown(true);

    // Release a flock of balloons
    const flock = Array.from({ length: 6 }, (_, i) => {
      idRef.current += 1;
      return {
        id: idRef.current,
        x: 8 + Math.random() * 84,
        size: 40 + Math.random() * 42,
        duration: 5 + Math.random() * 3.5,
        delay: i * 0.18,
        color: BALLOON_COLORS[(idRef.current + i) % BALLOON_COLORS.length],
      };
    });
    setBalloons((prev) => [...prev, ...flock]);
  };

  const removeBalloon = (id) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <section
      id="wishes"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-softpink/80 to-blush/60 px-5 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-white/60 blur-3xl"
      />
      <Sparkles count={12} />

      {/* Idle decorative balloons */}
      <IdleBalloon className="left-[6%] top-[14%] hidden md:block" size={64} color={BALLOON_COLORS[0]} delay={0} />
      <IdleBalloon className="right-[8%] top-[10%] hidden md:block" size={52} color={BALLOON_COLORS[1]} delay={1.4} />
      <IdleBalloon className="left-[12%] bottom-[16%] hidden lg:block" size={44} color={BALLOON_COLORS[2]} delay={0.7} />
      <IdleBalloon className="right-[14%] bottom-[22%] hidden lg:block" size={56} color={BALLOON_COLORS[3]} delay={2} />

      <SectionHeading
        eyebrow="a new chapter"
        title="A New Chapter, Miuw"
        subtitle="A thousand beautiful wishes for you."
      />

      {/* Birthday cake illustration */}
      <ScrollReveal className="relative z-10 mt-12 flex flex-col items-center">
        <BirthdayCake className="h-44 w-auto sm:h-52" />
        <p className="mt-3 font-script text-2xl text-deeprose">make a wish, sayang ♡</p>
      </ScrollReveal>

      {/* The wishes */}
      <div className="relative z-10 mx-auto mt-12 flex max-w-xl flex-col gap-4">
        {wishes.map((wish, i) => (
          <ScrollReveal key={wish} delay={i * 0.08} y={20}>
            <div
              className="flex items-center gap-4 rounded-2xl bg-white/85 px-6 py-5 shadow-soft backdrop-blur-sm"
              style={{ transform: `rotate(${i % 2 === 0 ? -0.7 : 0.7}deg)` }}
            >
              <Blossom className="h-7 w-7 shrink-0" />
              <p className="font-editorial text-lg italic leading-relaxed text-ink/85 sm:text-xl">{wish}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Make a wish */}
      <div className="relative z-10 mt-14 flex flex-col items-center">
        <motion.button
          type="button"
          onClick={makeWish}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-rose"
        >
          <SparklesIcon className="h-5 w-5" />
          Make a Wish, Miuw! ✨
        </motion.button>

        <AnimatePresence>
          {messageShown && (
            <motion.p
              key="wish-message"
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-md px-4 text-center font-script text-3xl leading-snug text-deeprose sm:text-4xl"
            >
              {wishMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Released balloons */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            className="absolute bottom-[-120px]"
            style={{ left: `${balloon.x}%` }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: '-125vh', opacity: [0, 1, 1, 0.9] }}
            transition={{ duration: balloon.duration, delay: balloon.delay, ease: 'easeIn' }}
            onAnimationComplete={() => removeBalloon(balloon.id)}
          >
            <BalloonShape size={balloon.size} color={balloon.color} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Balloon SVG ─────────────────────────────────────────────── */

function BalloonShape({ size, color, className = '' }) {
  return (
    <svg
      viewBox="0 0 60 90"
      width={size}
      height={size * 1.5}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="30" cy="30" rx="22" ry="27" fill={color.fill} stroke={color.stripe} strokeWidth="1.5" />
      <path
        d="M30 3 C 22 14, 22 44, 30 56"
        stroke={color.stripe}
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />
      <path d="M26 57 L34 57 L30 64 Z" fill={color.stripe} opacity="0.8" />
      <path d="M30 64 C 34 72, 26 76, 30 88" stroke={color.stripe} strokeWidth="1.2" fill="none" opacity="0.7" />
      <ellipse cx="22" cy="20" rx="5" ry="8" fill="#FFFFFF" opacity="0.45" transform="rotate(-18 22 20)" />
    </svg>
  );
}

function IdleBalloon({ className = '', size, color, delay = 0 }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <div className="animate-float-y" style={{ animationDelay: `${delay}s` }}>
        <BalloonShape size={size} color={color} />
      </div>
    </div>
  );
}

/* ── Birthday cake illustration ──────────────────────────────── */

function BirthdayCake({ className = '' }) {
  return (
    <svg viewBox="0 0 220 200" className={className} aria-hidden="true" focusable="false" fill="none">
      {/* Plate */}
      <ellipse cx="110" cy="180" rx="82" ry="12" fill="#FFFFFF" stroke="#EFC1CE" strokeWidth="2" />

      {/* Bottom tier */}
      <rect x="42" y="122" width="136" height="52" rx="10" fill="#F8DDE3" stroke="#A75D75" strokeWidth="2" />
      {/* Frosting drips (bottom tier) */}
      <path
        d="M42 128
           q8 16 17 0 q8 16 17 0 q8 16 17 0 q8 16 17 0 q8 16 17 0 q8 16 17 0 q8 16 17 0 q8 16 17 0
           v-10 H42 Z"
        fill="#FFF8F5"
        stroke="#A75D75"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Top tier */}
      <rect x="67" y="80" width="86" height="44" rx="9" fill="#EFC1CE" stroke="#A75D75" strokeWidth="2" />
      <path
        d="M67 86
           q7 13 14.3 0 q7.2 13 14.3 0 q7.2 13 14.3 0 q7.2 13 14.3 0 q7.2 13 14.3 0 q7.2 13 14.3 0
           v-10 H67 Z"
        fill="#FFF8F5"
        stroke="#A75D75"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Tiny hearts on top tier */}
      <g fill="#A75D75" opacity="0.85">
        <path d="M84 106c-2.2-2.9-5.2-4.6-5.2-7 0-1.9 1.5-3.1 3.1-3.1 1 0 1.7.5 2.1 1.3.4-.8 1.1-1.3 2.1-1.3 1.6 0 3.1 1.2 3.1 3.1 0 2.4-3 4.1-5.2 7Z" />
        <path d="M136 106c-2.2-2.9-5.2-4.6-5.2-7 0-1.9 1.5-3.1 3.1-3.1 1 0 1.7.5 2.1 1.3.4-.8 1.1-1.3 2.1-1.3 1.6 0 3.1 1.2 3.1 3.1 0 2.4-3 4.1-5.2 7Z" />
      </g>

      {/* Candles */}
      {[84, 106, 128].map((x, i) => (
        <g key={x}>
          <rect x={x} y="48" width="8" height="30" rx="3.5" fill="#FFFFFF" stroke="#C9A46A" strokeWidth="1.6" />
          <line x1={x + 2} y1="55" x2={x + 6} y2="55" stroke="#C9A46A" strokeWidth="1.4" />
          <line x1={x + 2} y1="63" x2={x + 6} y2="63" stroke="#C9A46A" strokeWidth="1.4" />
          <line x1={x + 2} y1="71" x2={x + 6} y2="71" stroke="#C9A46A" strokeWidth="1.4" />
          <line x1={x + 4} y1="48" x2={x + 4} y2="43" stroke="#514044" strokeWidth="1.4" strokeLinecap="round" />
          {/* Flame */}
          <g className="candle-flame" style={{ animationDelay: `${i * 0.35}s` }} transform={`translate(${x + 4} 42)`}>
            <path d="M0 0 C 4.2 -4.5 4.2 -9 0 -14 C -4.2 -9 -4.2 -4.5 0 0 Z" fill="#C9A46A" />
            <path d="M0 -1.5 C 2.4 -4.2 2.4 -6.6 0 -9.6 C -2.4 -6.6 -2.4 -4.2 0 -1.5 Z" fill="#FFF8F5" />
          </g>
        </g>
      ))}
    </svg>
  );
}
