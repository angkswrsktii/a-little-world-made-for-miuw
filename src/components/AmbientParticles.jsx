// ══════════════════════════════════════════════════════════════
//  Ambient decorative particles — flower petals, floating hearts,
//  sparkling particles. Pure CSS transform/opacity animations.
//  Deterministic pseudo-random so layout never "jumps" on rerender.
// ══════════════════════════════════════════════════════════════

const PETAL_COLORS = ['#EFC1CE', '#F8DDE3', '#C9A46A', '#D89AAE'];
const HEART_COLORS = ['#EFC1CE', '#A75D75', '#C9A46A'];
const SPARKLE_COLORS = ['#C9A46A', '#A75D75', '#EFC1CE'];

// Deterministic "random" in [0, 1)
const seeded = (i, salt) => {
  const x = Math.sin((i + 1) * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export function Petals({ count = 10, className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const size = 10 + seeded(i, 1) * 12;
        const duration = 11 + seeded(i, 3) * 11;
        return (
          <span
            key={i}
            className="petal-fall"
            style={{
              left: `${seeded(i, 2) * 100}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${-seeded(i, 4) * duration}s`,
              '--drift': `${(seeded(i, 5) - 0.5) * 18}vw`,
            }}
          >
            <span className="petal-sway" style={{ animationDuration: `${3 + seeded(i, 7) * 3}s` }}>
              <span
                className="petal"
                style={{
                  width: size,
                  height: size * 1.35,
                  background: PETAL_COLORS[i % PETAL_COLORS.length],
                  opacity: 0.4 + seeded(i, 6) * 0.4,
                }}
              />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function HeartShape({ color, size }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden="true" focusable="false">
      <path d="M12 21C6 16.5 2.5 12.8 2.5 9.3 2.5 6.4 4.8 4.5 7.4 4.5c1.8 0 3.5 1 4.6 2.7 1.1-1.7 2.8-2.7 4.6-2.7 2.6 0 4.9 1.9 4.9 4.8 0 3.5-3.5 7.2-9.5 11.7Z" />
    </svg>
  );
}

export function Hearts({ count = 5, className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const size = 13 + seeded(i, 21) * 11;
        const duration = 15 + seeded(i, 23) * 11;
        return (
          <span
            key={i}
            className="heart-float"
            style={{
              left: `${6 + seeded(i, 22) * 88}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${-seeded(i, 24) * duration}s`,
              '--drift': `${(seeded(i, 25) - 0.5) * 10}vw`,
              '--peak': `${0.18 + seeded(i, 26) * 0.22}`,
            }}
          >
            <HeartShape color={HEART_COLORS[i % HEART_COLORS.length]} size={size} />
          </span>
        );
      })}
    </div>
  );
}

export function Sparkles({ count = 12, className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const duration = 2.5 + seeded(i, 35) * 3.5;
        return (
          <span
            key={i}
            className="sparkle"
            style={{
              left: `${seeded(i, 32) * 100}%`,
              top: `${seeded(i, 33) * 100}%`,
              fontSize: 7 + seeded(i, 31) * 8,
              color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
              animationDelay: `${-seeded(i, 34) * duration}s`,
              animationDuration: `${duration}s`,
            }}
          >
            ✦
          </span>
        );
      })}
    </div>
  );
}

/**
 * Fixed full-viewport ambient layer rendered above section backgrounds.
 */
export function AmbientDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[3] overflow-hidden">
      <Petals count={7} />
      <Sparkles count={10} />
      <Hearts count={4} />
    </div>
  );
}
