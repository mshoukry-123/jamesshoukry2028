import React, { useState } from 'react';
import { playerData } from '../data/playerData';
import { Play, MapPin, Mail, ExternalLink, ClipboardCopy, Check, Film } from 'lucide-react';
import { profileBlock, copyText } from '../lib/profile';

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const ok = await copyText(profileBlock());
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  const p = playerData;

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pb-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/60">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {p.classLabel}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                {p.positionsDisplay}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/80">
                {p.batsThrows}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-slate-400 bg-slate-900/60 border border-slate-800">
                <MapPin className="w-3 h-3 text-slate-500" />
                {p.school} ({p.location})
              </span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-6xl font-bold text-white font-display tracking-tight leading-none">
                {p.name.toUpperCase()}
              </h1>
              <p className="mt-2 text-lg sm:text-xl text-slate-300 font-medium">
                {p.positionsDisplay} <span className="text-slate-500">•</span> {p.batsThrows}{' '}
                <span className="text-slate-500">•</span> {p.height}, {p.weight}
              </p>
            </div>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {p.bio}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#featured-reel"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold tracking-wide transition-all shadow-lg shadow-amber-500/20"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Watch the film</span>
              </a>

              <a
                href="#film-room"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold border border-slate-700 transition-colors"
              >
                <Film className="w-4 h-4 text-amber-400" />
                <span>{p.clips.length} reps, rep by rep</span>
              </a>

              <button
                onClick={onCopy}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium border border-slate-800 transition-colors"
                title="Copy name, class, position, measurables and contact to the clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <ClipboardCopy className="w-4 h-4 text-amber-400" />
                    <span>Copy profile</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${p.email}?subject=College%20Baseball%20Recruiting%20Inquiry%20-%20James%20Shoukry`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium border border-slate-800 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Email</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="text-slate-500 uppercase font-semibold tracking-wider">Profiles</span>
              <a
                href={p.ncsaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline inline-flex items-center gap-1 font-semibold py-1"
              >
                NCSA Recruiting Profile
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={p.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center gap-1 py-1"
              >
                X: <span className="text-slate-200 font-medium">{p.twitter}</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
              <a
                href={p.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center gap-1 py-1"
              >
                IG: <span className="text-slate-200 font-medium">{p.instagram}</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-black/60 group">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/james_action_hero.jpg"
                  alt={`${p.name}, ${p.classLabel}, ${p.primaryPosition} at ${p.school}`}
                  width={900}
                  height={1200}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/30 pointer-events-none" />

                <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 z-10 pointer-events-none">
                  <div className="bg-slate-950/85 backdrop-blur-sm border border-slate-700 px-3 py-1 rounded-md text-xs font-bold text-white uppercase tracking-wider font-display shadow-md">
                    {p.school}
                  </div>
                  <div className="bg-slate-950/85 backdrop-blur-sm border border-slate-800 px-3 py-1 rounded-md text-xs font-mono font-bold text-amber-400">
                    {p.height} • {p.weight.toUpperCase()}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block font-display">
                      {p.classLabel} Recruit
                    </span>
                    <h3 className="text-xl font-bold text-white font-display leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">
                      {p.positionsDisplay} • {p.location}
                    </p>
                  </div>

                  <a
                    href="#featured-reel"
                    className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/30"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Watch</span>
                  </a>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  NCAA registered
                </span>
                <span className="text-amber-400 font-semibold font-mono">
                  {p.metrics[0]?.value} EV • {p.metrics[1]?.value} INF
                </span>
                <span className="text-slate-300 font-medium">{p.batsThrows}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
