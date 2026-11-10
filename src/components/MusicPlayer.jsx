import { useEffect, useRef, useState } from 'react';
import { Disc3, Music } from 'lucide-react';
import { birthdayConfig } from '../data/config.js';

/**
 * Minimalist background music player.
 * Hidden entirely when no local music file is configured in src/data/config.js.
 * Never autoplays — the visitor chooses to start it.
 */
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const { musicSrc, musicTitle } = birthdayConfig;

  // Verify the file actually exists before showing the player
  useEffect(() => {
    if (!musicSrc) return undefined;
    let alive = true;
    fetch(musicSrc, { method: 'HEAD' })
      .then((res) => {
        if (alive && !res.ok) setUnavailable(true);
      })
      .catch(() => {
        if (alive) setUnavailable(true);
      });
    return () => {
      alive = false;
    };
  }, [musicSrc]);

  if (!musicSrc || unavailable) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        title={musicTitle}
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-white text-deeprose shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:text-[#96506a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deeprose ${
          playing ? 'ring-2 ring-rosegold/70' : ''
        }`}
      >
        <Disc3 className={`h-6 w-6 ${playing ? 'animate-spin-slow' : ''}`} />
      </button>

      {playing && (
        <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-soft backdrop-blur-sm">
          <Music className="h-3.5 w-3.5 text-deeprose" />
          <span className="max-w-[9rem] truncate font-body text-xs text-ink sm:max-w-[12rem]">
            {musicTitle}
          </span>
          <span className="flex items-end gap-0.5" aria-hidden="true">
            {[0, 1, 2].map((bar) => (
              <span
                key={bar}
                className="w-0.5 rounded-full bg-deeprose/80"
                style={{
                  height: '10px',
                  animation: `eq 0.9s ease-in-out ${bar * 0.15}s infinite alternate`,
                }}
              />
            ))}
          </span>
        </div>
      )}

      <audio ref={audioRef} src={musicSrc} loop preload="none" onError={() => setUnavailable(true)} />

      {/* Equalizer keyframes (scoped) */}
      <style>{`@keyframes eq { from { transform: scaleY(0.3); } to { transform: scaleY(1); } }`}</style>
    </div>
  );
}
