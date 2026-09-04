import React, { useRef, useState, useEffect, useCallback } from 'react';
import { playerData } from '../data/playerData';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, CheckCircle2, Download } from 'lucide-react';

const CHAPTERS = [
  { t: 0,    label: 'Title' },
  { t: 4.6,  label: 'Hitting — showcase BP' },
  { t: 21.5, label: 'In game' },
  { t: 32.9, label: '3B defense' },
  { t: 59.5, label: '60-yard dash' },
];

const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, '0')}`;
};

export const FeaturedVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);
  const [started, setStarted] = useState(false);

  const v = () => videoRef.current;

  const togglePlay = useCallback(() => {
    const el = v();
    if (!el) return;
    if (el.paused) { void el.play(); setStarted(true); } else { el.pause(); }
  }, []);

  const toggleMute = () => {
    const el = v();
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const seek = (secs: number) => {
    const el = v();
    if (!el) return;
    el.currentTime = secs;
    if (el.paused) { void el.play(); setStarted(true); }
  };

  const handleFullscreen = () => {
    const el = v();
    if (el?.requestFullscreen) void el.requestFullscreen();
  };

  useEffect(() => {
    const el = v();
    if (!el) return;
    const onTime = () => setT(el.currentTime);
    const onMeta = () => setDur(el.duration || 0);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onMeta);
    return () => {
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('loadedmetadata', onMeta);
    };
  }, []);

  const pct = dur ? (t / dur) * 100 : 0;
  const activeChapter = CHAPTERS.reduce((acc, c, i) => (t >= c.t ? i : acc), 0);

  return (
    <section id="featured-reel" className="scroll-mt-24 py-12 bg-slate-900/50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <Film className="w-4 h-4" />
              <span>Primary recruiting tape</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              RECRUITING FILM
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              {playerData.featuredVideo.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-300 shrink-0">
            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              No music
            </span>
            <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-300 font-mono">
              {playerData.featuredVideo.runtime}
            </span>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
          <video
            ref={videoRef}
            src={playerData.featuredVideo.videoSrc}
            poster={playerData.featuredVideo.thumbnailSrc}
            playsInline
            preload="metadata"
            onClick={togglePlay}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full aspect-video object-contain bg-black cursor-pointer"
          />

          {!started && (
            <button
              onClick={togglePlay}
              aria-label="Play recruiting film"
              className="absolute inset-0 flex items-center justify-center bg-slate-950/30 hover:bg-slate-950/20 transition-colors group"
            >
              <span className="w-20 h-20 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/30 group-hover:scale-105 transition-transform">
                <Play className="w-9 h-9 fill-current ml-1" />
              </span>
            </button>
          )}

          {/* Custom transport, so the player matches the page instead of the browser. */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-10 pb-3 px-3 sm:px-4">
            <div
              className="relative h-1.5 rounded-full bg-white/15 cursor-pointer group/bar"
              onClick={(e) => {
                const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                if (dur) seek(((e.clientX - r.left) / r.width) * dur);
              }}
            >
              <div className="absolute inset-y-0 left-0 rounded-full bg-amber-500" style={{ width: `${pct}%` }} />
              {dur > 0 && CHAPTERS.map((c) => (
                <span
                  key={c.t}
                  className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-white/40 rounded"
                  style={{ left: `${(c.t / dur) * 100}%` }}
                />
              ))}
            </div>

            <div className="mt-2.5 flex items-center gap-3">
              <button onClick={togglePlay} className="text-white hover:text-amber-400 transition-colors" title={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              </button>
              <span className="text-[11px] font-mono text-slate-300 tabular-nums">
                {fmt(t)} / {fmt(dur)}
              </span>

              <div className="hidden md:flex items-center gap-1 ml-2 overflow-x-auto">
                {CHAPTERS.slice(1).map((c, i) => (
                  <button
                    key={c.t}
                    onClick={() => seek(c.t + 0.05)}
                    className={`px-2 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition-colors ${
                      activeChapter === i + 1
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="ml-auto flex items-center gap-3">
                <button onClick={toggleMute} className="text-white hover:text-amber-400 transition-colors" title={isMuted ? 'Unmute' : 'Mute'}>
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button onClick={handleFullscreen} className="text-white hover:text-amber-400 transition-colors" title="Fullscreen">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-500">
          <span>James is marked at the start of every showcase rep.</span>
          {playerData.featuredVideo.videoSrcHd ? (
            <a
              href={playerData.featuredVideo.videoSrcHd}
              download
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download 1080p copy
            </a>
          ) : null}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Showcase BP</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Two angles from the July 2026 Prep Baseball showcase. Load, sequence and
              finish, with the same swing shape rep to rep.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">3B defense</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Eight infield reps at third: pre-pitch footwork, range both ways, short
              hops, and throws across the diamond at game distance.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">In game and run</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Live at-bats against travel-circuit pitching, plus the laser-timed 60 from
              the same showcase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
