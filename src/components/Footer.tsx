import React from 'react';
import { playerData } from '../data/playerData';
import { Mail, ExternalLink, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-800 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Player info */}
          <div className="text-center md:text-left space-y-1">
            <div className="font-display font-bold text-base text-white">
              {playerData.name.toUpperCase()}
            </div>
            <p className="text-slate-400">
              {playerData.classLabel} • {playerData.positionsDisplay} • {playerData.batsThrows}
            </p>
            <p className="text-slate-500">
              {playerData.school} — {playerData.location}
            </p>
          </div>

          {/* Social & Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-slate-400">
            <a
              href={`mailto:${playerData.email}`}
              className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{playerData.email}</span>
            </a>
            <a
              href={playerData.ncsaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
            >
              <span>NCSA Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={playerData.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              X: {playerData.twitter}
            </a>
            <a
              href={playerData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              IG: {playerData.instagram}
            </a>
          </div>

          {/* Back to top */}
          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors text-slate-400"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600">
          <p>© {new Date().getFullYear()} James Shoukry. Film and measurables from Prep Baseball showcase events and live game footage.</p>
          <p>Built for college coaches and recruiting coordinators.</p>
        </div>
      </div>
    </footer>
  );
};
