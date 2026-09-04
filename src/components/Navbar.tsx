import React from 'react';
import { playerData } from '../data/playerData';
import { Mail, ExternalLink, Award } from 'lucide-react';
import { YouTubeIcon } from './Icons';

interface NavbarProps {
  onOpenYouTubeGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenYouTubeGuide }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 font-display text-lg tracking-wider">
            JS
          </div>
          <div>
            <a href="#" className="font-display font-bold text-lg text-white tracking-wide hover:text-amber-400 transition-colors">
              {playerData.name.toUpperCase()}
            </a>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-amber-400">{playerData.classLabel}</span>
              <span>•</span>
              <span>{playerData.positionsDisplay}</span>
              <span>•</span>
              <span className="text-slate-300 font-medium">{playerData.school}</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#metrics" className="hover:text-amber-400 transition-colors">Metrics</a>
          <a href="#featured-reel" className="hover:text-amber-400 transition-colors">Highlight Reel</a>
          <a href="#film-room" className="hover:text-amber-400 transition-colors">Film Room (20)</a>
          <a href="#academics" className="hover:text-amber-400 transition-colors">Academics & Staff</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenYouTubeGuide}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            title="YouTube Upload Playbook"
          >
            <YouTubeIcon className="w-3.5 h-3.5 text-red-500" />
            <span>YouTube Guide</span>
          </button>

          <a
            href={playerData.ncsaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>NCSA Profile</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <a
            href={`mailto:${playerData.email}?subject=College%20Baseball%20Recruiting%20Inquiry%20-%20James%20Shoukry`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all shadow-sm shadow-amber-500/20"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
};
