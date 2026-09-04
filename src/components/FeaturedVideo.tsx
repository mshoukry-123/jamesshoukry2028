import React, { useRef, useState } from 'react';
import { playerData } from '../data/playerData';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, CheckCircle2 } from 'lucide-react';

export const FeaturedVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="featured-reel" className="py-12 bg-slate-900/50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <Film className="w-4 h-4" />
              <span>Primary Recruiting Tape</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              FEATURED RECRUITING HIGHLIGHT REEL
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Natural bat-crack and field audio. No background music or distracting overlays.
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 lg:mt-0 text-xs font-medium text-slate-300">
            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Recruiting Coordinator Cut
            </span>
            <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-300 font-mono">
              {playerData.featuredVideo.runtime}
            </span>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl group">
          <video
            ref={videoRef}
            src={playerData.featuredVideo.videoSrc}
            poster={playerData.featuredVideo.thumbnailSrc}
            controls
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full aspect-video object-contain bg-black"
          />

          {/* Quick Custom Floating Controls for ease of use */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={togglePlay}
              className="text-white hover:text-amber-400 transition-colors"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button
              onClick={toggleMute}
              className="text-white hover:text-amber-400 transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleFullscreen}
              className="text-white hover:text-amber-400 transition-colors"
              title="Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reel Breakdown Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">In-Game At-Bats</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Multiple game camera angles showing pitch recognition, bat speed through the zone, hard barrel contact, and hustle out of the box.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">3B Defense & Arm</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Third base reps demonstrating pre-pitch footwork, soft hands, lateral range to both sides, and strong 85 MPH throws across the diamond.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Showcase & Cage Mechanics</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Side-angle high-speed reps showing swing path, hip-shoulder separation, lower-half rotational acceleration, and 93 MPH exit velo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
