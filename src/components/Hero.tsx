import React from 'react';
import { playerData } from '../data/playerData';
import { Play, MapPin, Mail, ExternalLink } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pb-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/60">
      {/* Subtle background glow & faded player watermark */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
      
      {/* Faded athletic background watermark */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 overflow-hidden pointer-events-none opacity-10 lg:opacity-15 select-none flex items-center justify-end">
        <img
          src="/images/james_ascenders_cutout.png"
          alt=""
          className="h-full max-h-[680px] object-contain object-right filter brightness-90 contrast-125"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Bio & Headline */}
          <div className="lg:col-span-7 space-y-5">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {playerData.classLabel}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                {playerData.positionsDisplay}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/80">
                {playerData.batsThrows}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-slate-400 bg-slate-900/60 border border-slate-800">
                <MapPin className="w-3 h-3 text-slate-500" />
                {playerData.school} ({playerData.location})
              </span>
            </div>

            {/* Name */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight leading-none">
                {playerData.name.toUpperCase()}
              </h1>
              <p className="mt-2 text-lg sm:text-xl text-slate-300 font-medium">
                {playerData.positionsDisplay} <span className="text-slate-500">•</span> {playerData.batsThrows} <span className="text-slate-500">•</span> {playerData.height}, {playerData.weight}
              </p>
            </div>

            {/* Quick Pitch */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              Physical, athletic infielder in the Class of 2028 at IMG Academy. Strong right-handed swing producing 93 MPH exit velocity, 85 MPH infield arm velo with soft hands and lateral range across the diamond, and a 7.0 laser-timed 60-yard dash.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#featured-reel"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold tracking-wide transition-all shadow-lg shadow-amber-500/20"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Watch Highlight Reel</span>
              </a>

              <a
                href="#film-room"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold border border-slate-700 transition-colors"
              >
                <span>Browse All 20 Clips</span>
              </a>

              <a
                href={`mailto:${playerData.email}?subject=College%20Baseball%20Recruiting%20Inquiry%20-%20James%20Shoukry`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium border border-slate-800 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Email James</span>
              </a>
            </div>

            {/* Social & Profile links */}
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="text-slate-500 uppercase font-semibold tracking-wider">Direct Profiles:</span>
              <a
                href={playerData.ncsaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                NCSA Recruiting Profile
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={playerData.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center gap-1"
              >
                X: <span className="text-slate-200 font-medium">{playerData.twitter}</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
              <a
                href={playerData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center gap-1"
              >
                IG: <span className="text-slate-200 font-medium">{playerData.instagram}</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Official Prospect Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-black/60 group">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
                {/* Athletic background glow for cutout */}
                <div className="absolute inset-0 bg-radial from-blue-900/20 via-transparent to-transparent opacity-80" />
                
                <img
                  src="/images/james_ascenders_cutout.png"
                  alt="James Shoukry - IMG Academy Ascenders"
                  className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500 z-10 relative pt-4"
                />

                {/* Subtle vignette gradient at bottom so text overlays cleanly */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-20 pointer-events-none" />

                {/* Top Badge: IMG Ascenders */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
                  <div className="bg-blue-600/90 backdrop-blur-sm border border-blue-400/30 px-3 py-1 rounded-md text-xs font-bold text-white uppercase tracking-wider font-display shadow-md">
                    IMG Ascenders
                  </div>
                  <div className="bg-slate-950/80 backdrop-blur-sm border border-slate-800 px-3 py-1 rounded-md text-xs font-mono font-bold text-amber-400">
                    6'1" • 190 LBS
                  </div>
                </div>

                {/* Bottom Overlay with CTA */}
                <div className="absolute bottom-4 left-4 right-4 z-30 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block font-display">
                      Class of 2028 Recruit
                    </span>
                    <h3 className="text-xl font-black text-white font-display leading-tight">
                      James Shoukry
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">
                      3rd/SS • Bradenton, FL
                    </p>
                  </div>

                  <a
                    href="#featured-reel"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/30 group-hover:scale-105"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Watch Reel</span>
                  </a>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3.5 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  NCAA Registered
                </span>
                <span className="text-amber-400 font-semibold font-mono">93 Exit • 85 Infield</span>
                <span className="text-slate-300 font-medium">R/R</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
