import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Photo lightbox — click backdrop/Esc to close, arrows or swipe to navigate.
 */
export default function Lightbox({ photos, index, onClose, onNavigate }) {
  const photo = photos[index];

  // Keyboard navigation + body scroll lock
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNavigate(1);
      else if (e.key === 'ArrowLeft') onNavigate(-1);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onNavigate]);

  if (!photo) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}: ${photo.caption}`}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        autoFocus
        aria-label="Close photo"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/15 p-3 text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Previous */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(-1);
        }}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(1);
        }}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Photo (no keyed remount inside AnimatePresence — it breaks exit tracking) */}
      <motion.figure
        className="flex max-h-full flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          draggable={false}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70) onNavigate(1);
            else if (info.offset.x > 70) onNavigate(-1);
          }}
          className="max-h-[68vh] max-w-[88vw] rounded-2xl bg-white object-contain shadow-frame sm:max-h-[74vh] sm:max-w-[76vw]"
        />
        <figcaption className="mt-4 text-center">
          <span className="font-script text-2xl text-cream sm:text-3xl">{photo.caption}</span>
          <span className="mt-1 block font-body text-xs tracking-widest text-cream/70">
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
