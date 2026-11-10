import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import Lightbox from '../components/Lightbox.jsx';
import { photos } from '../data/memories.js';
import { birthdayConfig } from '../data/config.js';

/**
 * Section 3 — A Gallery of Miuw.
 * Masonry scrapbook of polaroids with lightbox, keyboard nav & swipe.
 */
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const navigate = (delta) => {
    setLightboxIndex((current) =>
      current === null ? null : (current + delta + photos.length) % photos.length,
    );
  };

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-ivory/70 to-cream px-5 py-24 sm:py-32"
    >
      {/* Paper grain over the whole gallery */}
      <div aria-hidden="true" className="grain-bg pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-softpink/50 blur-3xl"
      />

      <SectionHeading
        eyebrow="captured moments"
        title="A Gallery of Miuw"
        subtitle="Every little picture captures something beautiful about you."
      />

      <div className="relative z-10 mx-auto mt-14 max-w-6xl columns-1 gap-8 sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <PolaroidCard key={photo.id} photo={photo} index={i} onOpen={() => setLightboxIndex(i)} />
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            key="lightbox"
            photos={photos}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>

      <p className="relative z-10 mt-12 text-center font-script text-2xl text-rosegold">
        {photos.length} little pieces of {birthdayConfig.name} ♡
      </p>
    </section>
  );
}

function PolaroidCard({ photo, index, onOpen }) {
  const TapePosition =
    index % 3 === 0 ? 'left-1/2 -translate-x-1/2' : index % 3 === 1 ? '-left-4 rotate-[-24deg]' : '-right-4 rotate-[24deg]';

  return (
    <ScrollReveal delay={(index % 3) * 0.08} className="mb-8 break-inside-avoid">
      <motion.button
        type="button"
        onClick={onOpen}
        initial={{ rotate: photo.rotation }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        aria-label={`Open photo ${index + 1}: ${photo.caption}`}
        className="group relative block w-full cursor-pointer rounded-sm bg-white p-3 pb-4 text-left shadow-card transition-shadow duration-300 hover:shadow-frame focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deeprose"
      >
        {photo.tape && (
          <span aria-hidden="true" className={`washi washi--${photo.tape} ${TapePosition}`} />
        )}

        <div className="photo-grain overflow-hidden">
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          />
        </div>

        <div className="pt-3 text-center">
          <span className="font-script text-2xl leading-snug text-ink/80">{photo.caption}</span>
        </div>
      </motion.button>
    </ScrollReveal>
  );
}
