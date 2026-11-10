import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';

import OpeningSurprise from './sections/OpeningSurprise.jsx';
import Hero from './sections/Hero.jsx';
import Gallery from './sections/Gallery.jsx';
import LittleThings from './sections/LittleThings.jsx';
import Letter from './sections/Letter.jsx';
import Wishes from './sections/Wishes.jsx';
import FinalSurprise from './sections/FinalSurprise.jsx';

import { AmbientDecor } from './components/AmbientParticles.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import BackToTop from './components/BackToTop.jsx';

/**
 * A LITTLE WORLD MADE FOR MIUW
 * Flow: Opening Surprise → Hero → Gallery → Little Things → Letter →
 * Wishes → One Last Surprise (replayable).
 */
export default function App() {
  const [opened, setOpened] = useState(false);

  // Lock scrolling until the gift is opened
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  const handleOpen = useCallback(() => setOpened(true), []);

  const handleReplay = useCallback(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch {
      window.scrollTo(0, 0);
    }
    setOpened(false);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!opened && <OpeningSurprise key="opening-surprise" onOpen={handleOpen} />}
      </AnimatePresence>

      <main>
        <Hero />
        <Gallery />
        <LittleThings />
        <Letter />
        <Wishes />
        <FinalSurprise onReplay={handleReplay} />
      </main>

      {/* Subtle full-page film grain */}
      <div
        aria-hidden="true"
        className="grain-bg pointer-events-none fixed inset-0 z-[60] opacity-[0.035]"
      />

      <AmbientDecor />
      <BackToTop />
      <MusicPlayer />
    </MotionConfig>
  );
}
