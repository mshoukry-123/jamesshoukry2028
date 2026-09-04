import React, { useEffect } from 'react';
import { VideoClip } from '../data/playerData';
import { X, ChevronLeft, ChevronRight, Play, Award } from 'lucide-react';

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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!clip) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
              Clip {currentIndex + 1} of {totalClips}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {clip.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-2">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="Previous clip (Left arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onNext}
                disabled={!hasNext}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="Next clip (Right arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative bg-black aspect-video w-full flex items-center justify-center overflow-hidden">
          <video
            key={clip.id}
            src={clip.videoSrc}
            poster={clip.thumbnailSrc}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* Clip Scouting Metadata */}
        <div className="p-5 overflow-y-auto bg-slate-900 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h3 className="text-lg font-bold text-white font-display">
              {clip.title}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Duration: {clip.duration}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Scouting Evaluation</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {clip.scoutingNote}
            </p>
          </div>

          <div className="text-[11px] text-slate-500 font-mono">
            Source: {clip.description}
          </div>
        </div>
      </div>
    </div>
  );
};
