// ══════════════════════════════════════════════════════════════
//  Confetti & heart bursts — lightweight canvas particles.
//  No dependencies; auto-cleans its canvas when finished.
// ══════════════════════════════════════════════════════════════

const CONFETTI_COLORS = ['#EFC1CE', '#F8DDE3', '#C9A46A', '#A75D75', '#F7EBDD', '#FFFFFF'];
const HEART_COLORS = ['#EFC1CE', '#A75D75', '#C9A46A', '#D89AAE'];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function createCanvas(zIndex = 120) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: String(zIndex),
  });
  document.body.appendChild(canvas);

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { canvas, ctx };
}

function drawHeart(ctx, s) {
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.35);
  ctx.bezierCurveTo(s * 0.6, -s * 0.95, s * 1.15, -s * 0.05, 0, s * 0.7);
  ctx.bezierCurveTo(-s * 1.15, -s * 0.05, -s * 0.6, -s * 0.95, 0, -s * 0.35);
  ctx.closePath();
  ctx.fill();
}

/**
 * Confetti burst — paper pieces fan out from a point.
 * originX/originY are 0..1 fractions of the viewport.
 */
export function launchConfetti({ originX = 0.5, originY = 0.5, count = 130 } = {}) {
  if (prefersReducedMotion() || typeof window === 'undefined') return;

  const W = window.innerWidth;
  const H = window.innerHeight;
  const ox = originX * W;
  const oy = originY * H;
  const { canvas, ctx } = createCanvas();

  const parts = Array.from({ length: count }, () => {
    const shapeRoll = Math.random();
    return {
      shape: shapeRoll < 0.55 ? 'rect' : shapeRoll < 0.8 ? 'circle' : 'heart',
      x: ox + (Math.random() - 0.5) * 70,
      y: oy,
      vx: (Math.random() - 0.5) * 7.5,
      vy: -(4 + Math.random() * 8),
      g: 0.16 + Math.random() * 0.08,
      drag: 0.985,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      size: 5 + Math.random() * 5,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      spin: Math.random() * Math.PI * 2,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      life: 0,
      ttl: 130 + Math.random() * 80,
    };
  });

  let raf;
  const tick = () => {
    ctx.clearRect(0, 0, W, H);
    let alive = false;

    for (const p of parts) {
      p.life += 1;
      if (p.life > p.ttl) continue;
      alive = true;

      p.vy += p.g;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      const fadeStart = p.ttl * 0.72;
      const alpha = p.life > fadeStart ? 1 - (p.life - fadeStart) / (p.ttl - fadeStart) : 1;

      ctx.save();
      ctx.globalAlpha = Math.max(alpha, 0);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        // Paper flip effect via vertical squash
        ctx.scale(1, Math.abs(Math.sin(p.life * 0.18 + p.spin)) * 0.9 + 0.1);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        drawHeart(ctx, p.size);
      }
      ctx.restore();
    }

    if (alive) {
      raf = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, W, H);
      canvas.remove();
    }
  };

  raf = requestAnimationFrame(tick);

  // Safety cleanup — never leave a canvas behind
  window.setTimeout(() => {
    cancelAnimationFrame(raf);
    canvas.remove();
  }, 6000);
}

/**
 * Gentle hearts drifting upward from a point (0..1 viewport fractions).
 */
export function launchHearts({ originX = 0.5, originY = 0.55, count = 18 } = {}) {
  if (prefersReducedMotion() || typeof window === 'undefined') return;

  const W = window.innerWidth;
  const H = window.innerHeight;
  const ox = originX * W;
  const oy = originY * H;
  const { canvas, ctx } = createCanvas();

  const parts = Array.from({ length: count }, () => ({
    x: ox + (Math.random() - 0.5) * 90,
    y: oy + (Math.random() - 0.5) * 30,
    vx: (Math.random() - 0.5) * 1.6,
    vy: -(1.6 + Math.random() * 2.4),
    size: 8 + Math.random() * 11,
    phase: Math.random() * Math.PI * 2,
    sway: 0.4 + Math.random() * 0.6,
    color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    peak: 0.5 + Math.random() * 0.5,
    life: 0,
    ttl: 170 + Math.random() * 110,
  }));

  let raf;
  const tick = () => {
    ctx.clearRect(0, 0, W, H);
    let alive = false;

    for (const p of parts) {
      p.life += 1;
      if (p.life > p.ttl) continue;
      alive = true;

      p.x += p.vx + Math.sin(p.life * 0.045 + p.phase) * p.sway;
      p.y += p.vy;

      const fadeIn = Math.min(p.life / 12, 1);
      const fadeOut = Math.min((p.ttl - p.life) / 40, 1);
      const alpha = Math.max(Math.min(fadeIn, fadeOut), 0) * p.peak;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.fillStyle = p.color;
      drawHeart(ctx, p.size);
      ctx.restore();
    }

    if (alive) {
      raf = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, W, H);
      canvas.remove();
    }
  };

  raf = requestAnimationFrame(tick);

  window.setTimeout(() => {
    cancelAnimationFrame(raf);
    canvas.remove();
  }, 8000);
}

/**
 * Full celebration — confetti + a follow-up wave of hearts.
 */
export function celebrate(options = {}) {
  launchConfetti(options);
  window.setTimeout(() => launchHearts({ ...options, count: 16 }), 180);
}
