// ══════════════════════════════════════════════════════════════
//  Hand-drawn style floral SVG decorations — blossoms, sprigs,
//  corners & dividers that tie the scrapbook theme together.
// ══════════════════════════════════════════════════════════════

export function Blossom({ className = '', petal = '#EFC1CE', core = '#C9A46A', stroke = '#A75D75' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <g stroke={stroke} strokeWidth="2">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="30"
            rx="12"
            ry="17"
            fill={petal}
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="8" fill={core} />
      <circle cx="50" cy="50" r="3.5" fill="#FFF8F5" />
    </svg>
  );
}

export function Sprig({ className = '', stroke = '#A75D75', leaf = '#EFC1CE' }) {
  const leaves = [
    [23, 98, -40],
    [38, 78, 40],
    [21, 58, -45],
    [40, 40, 45],
    [26, 24, -50],
  ];
  return (
    <svg viewBox="0 0 60 140" className={className} aria-hidden="true" focusable="false" fill="none">
      <path d="M30 136 C 26 100 34 66 30 8" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      {leaves.map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="7"
          ry="14"
          fill={leaf}
          stroke={stroke}
          strokeWidth="1.5"
          transform={`rotate(${r} ${x} ${y})`}
        />
      ))}
    </svg>
  );
}

export function FloralCorner({ className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <Blossom className="h-16 w-16 opacity-70" />
      <Blossom className="-ml-8 -mt-5 h-9 w-9 opacity-50" petal="#F8DDE3" />
      <Sprig className="-mt-3 ml-2 h-20 w-8 -scale-x-100 opacity-50" />
    </div>
  );
}

export function OrnamentDivider({ className = '' }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-3 sm:gap-4 ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-rosegold/60 sm:w-24" />
      <Blossom className="h-5 w-5" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-rosegold/60 sm:w-24" />
    </div>
  );
}

/**
 * Small heart flourish — used under handwritten notes & signatures.
 */
export function HeartFlourish({ className = '', color = '#A75D75' }) {
  return (
    <svg viewBox="0 0 120 30" className={className} aria-hidden="true" focusable="false" fill="none">
      <path
        d="M6 18 C 30 6, 52 6, 60 16 C 68 6, 90 6, 114 18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M60 12c-1.6-3.4-6-3.4-6 0 0 2.4 3.4 4.6 6 6.4 2.6-1.8 6-4 6-6.4 0-3.4-4.4-3.4-6 0Z"
        fill={color}
        opacity="0.75"
      />
    </svg>
  );
}
