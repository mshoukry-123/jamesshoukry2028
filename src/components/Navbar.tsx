import React, { useState } from 'react';
import { playerData } from '../data/playerData';
import { Mail, ExternalLink, Award, ClipboardCopy, Check } from 'lucide-react';
import { profileBlock, copyText } from '../lib/profile';

export const Navbar: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const ok = await copyText(profileBlock());
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/92 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
        <a href="#" className="flex items-center gap-2.5 min-w-0 group">
          <span className="shrink-0 w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 font-display text-lg tracking-wider">
            JS
          </span>
          <span className="min-w-0">
            <span className="block font-display font-bold text-base sm:text-lg text-white tracking-wide group-hover:text-amber-400 transition-colors truncate">
              {playerData.name.toUpperCase()}
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 whitespace-nowrap">
              <span className="font-semibold text-amber-400">{playerData.classLabel}</span>
              <span>•</span>
              <span>{playerData.positionsDisplay}</span>
              <span>•</span>
              <span className="text-slate-300 font-medium">{playerData.school}</span>
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#metrics" className="hover:text-amber-400 transition-colors">Metrics</a>
          <a href="#selections" className="hover:text-amber-400 transition-colors">Selections</a>
          <a href="#featured-reel" className="hover:text-amber-400 transition-colors">Film</a>
          <a href="#film-room" className="hover:text-amber-400 transition-colors">
            Film Room ({playerData.clips.length})
          </a>
          <a href="#academics" className="hover:text-amber-400 transition-colors">Academics</a>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onCopy}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            title="Copy his full profile and contact details"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ClipboardCopy className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copied ? 'Copied' : 'Copy profile'}</span>
          </button>

          <a
            href={playerData.ncsaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-1 px-3 py-2 rounded-md bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>NCSA</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <a
            href={`mailto:${playerData.email}?subject=College%20Baseball%20Recruiting%20Inquiry%20-%20James%20Shoukry`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all shadow-sm shadow-amber-500/20"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
};
