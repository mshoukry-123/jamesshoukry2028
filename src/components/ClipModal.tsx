import React, { useEffect, useRef, useState } from 'react';
import { VideoClip } from '../data/playerData';
import { X, ChevronLeft, ChevronRight, Award, Link2, Check, RotateCcw, VolumeX } from 'lucide-react';
import { clipUrl, copyText } from '../lib/profile';

interface ClipModalProps {
  clip: VideoClip | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  currentIndex: number;
  totalClips: number;
}

export const ClipModal: React.FC<ClipModalProps> = ({
  clip,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  currentIndex,
  totalClips,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    setCopied(false);
    setRate(1);
  }, [clip?.id]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = rate;
  }, [rate, clip?.id]);

  /* Play with sound. The modal only opens from a click, so browsers normally allow
     it; if a policy still blocks it we fall back to muted rather than not playing. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !clip) return;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      void v.play();
    });
  }, [clip?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      const v = videoRef.current;
      switch (e.key) {
        case 'Escape': onClose(); break;
        case 'ArrowRight':
        case 'j':
          if (hasNext) { e.preventDefault(); onNext(); }
          break;
        case 'ArrowLeft':
        case 'k':
          if (hasPrev) { e.preventDefault(); onPrev(); }
          break;
        case ' ':
          e.preventDefault();
          if (v) { v.paused ? void v.play() : v.pause(); }
          break;
        case 'r':
          if (v) { v.currentTime = 0; void v.play(); }
          break;
        case ',':
          if (v) { v.pause(); v.currentTime = Math.max(0, v.currentTime - 1 / 30); }
          break;
        case '.':
          if (v) { v.pause(); v.currentTime = v.currentTime + 1 / 30; }
          break;
        case '1': setRate(1); break;
        case '2': setRate(0.5); break;
        case '3': setRate(0.25); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!clip) return null;

  const onCopyLink = async () => {
    const ok = await copyText(clipUrl(clip.slug));
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-slate-950/92 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={clip.title}
    >
      <div
        className={`relative w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] ${
          clip.vertical ? 'max-w-md' : 'max-w-5xl'
        }`}
      >
        <div className="px-4 sm:px-5 py-3 border-b border-slate-800 flex items-center justify-between gap-2 bg-slate-950/80">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
              {currentIndex + 1} / {totalClips}
            </span>
            <span className="shrink-0 hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {clip.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onCopyLink}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Copy a direct link to this rep"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Link copied' : 'Copy link'}</span>
            </button>
            <span className="w-px h-5 bg-slate-800 mx-1" />
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Previous rep (←)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Next rep (→)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className={`relative bg-black w-full flex items-center justify-center overflow-hidden ${
            clip.vertical ? 'max-h-[62vh]' : 'aspect-video'
          }`}
        >
          <video
            ref={videoRef}
            key={clip.id}
            src={clip.videoSrc}
            poster={clip.thumbnailSrc}
            controls
            loop
            playsInline
            preload="auto"
            className={clip.vertical ? 'max-h-[62vh] w-auto' : 'w-full h-full object-contain'}
          />
        </div>

        <div className="px-4 sm:px-5 py-2.5 border-y border-slate-800 bg-slate-950/60 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mr-1">Speed</span>
            {[1, 0.5, 0.25].map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={`px-2 py-1 rounded text-[11px] font-mono font-semibold transition-colors ${
                  rate === r
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {r === 1 ? '1x' : `${r}x`}
              </button>
            ))}
            <button
              onClick={() => { const v = videoRef.current; if (v) { v.currentTime = 0; void v.play(); } }}
              className="ml-1 inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
              title="Replay (R)"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Replay</span>
            </button>
          </div>
          <div className="hidden md:block text-[10px] text-slate-500">
            <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800">space</kbd> play
            {' · '}
            <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800">←</kbd>
            <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 ml-0.5">→</kbd> reps
            {' · '}
            <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800">,</kbd>
            <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 ml-0.5">.</kbd> frame step
            {' · '}
            <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800">1</kbd>
            <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 ml-0.5">2</kbd>
            <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 ml-0.5">3</kbd> speed
          </div>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto bg-slate-900 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h3 className="text-lg font-bold text-white font-display leading-snug">
              {clip.title}
            </h3>
            <span className="shrink-0 flex items-center gap-2 text-xs text-slate-400 font-mono">
              {clip.silent ? (
                <span className="inline-flex items-center gap-1 font-sans text-[11px] text-slate-500">
                  <VolumeX className="w-3.5 h-3.5" />
                  No audio
                </span>
              ) : null}
              {clip.duration}
            </span>
          </div>

          {clip.silent ? (
            <p className="text-[11px] text-slate-500 leading-relaxed">
              This rep comes from a showcase video whose only audio was a music bed, so it ships
              silent rather than with a soundtrack over it. Every clip cut from original field
              footage keeps its natural audio.
            </p>
          ) : null}

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>What to look for</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {clip.scoutingNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
