import React, { useState } from 'react';
import { X, Copy, Check, FolderPlus, Tag, PlayCircle, ExternalLink } from 'lucide-react';
import { YouTubeIcon } from './Icons';
import { playerData } from '../data/playerData';

interface YouTubeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const YouTubeDrawer: React.FC<YouTubeDrawerProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const reelTitle = "James Shoukry | 2028 3rd | Recruiting Highlight Reel | IMG Academy";

  const reelDescription = `James Shoukry | 3rd | Class of 2028 | IMG Academy

6'1 | 190 lbs | R/R
93 MPH Exit Velo | 85 MPH Infield Velo | 7.0 60-Yard Dash

NCSA Profile:
${playerData.ncsaUrl}

Instagram: @james_shouk
Twitter / X: @james_shouk
Email: ${playerData.email}

Natural field contact audio. Zero background music.
Video breakdown:
0:00 - Player Card & Verified Metrics
0:03 - In-Game At-Bats (Wide angle, warning track drive, behind the pitcher)
1:03 - Infield Defense & 85 MPH Arm (3B ground balls, range & throws across diamond)
1:28 - Showcase & BP Swing Mechanics (Prep Baseball showcase, cage work, extension)`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500">
              <YouTubeIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                YouTube Upload Playbook for Coaches
              </h3>
              <p className="text-xs text-slate-400">
                Pre-formatted titles, descriptions, and playlist layout ready to paste.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Quick Tip for Coaches */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs leading-relaxed text-amber-200">
            <strong className="text-amber-400 font-bold block mb-1">Coach Recruiting Rule:</strong>
            College recruiting coordinators scrub through dozens of tapes a day. Clean field sound, visible mechanics, verified measurables, and timestamps make coaches bookmark a recruit immediately.
          </div>

          {/* Section 1: Main Highlight Video */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <PlayCircle className="w-4 h-4" />
                1. Main Recruiting Highlight Title
              </span>
              <button
                onClick={() => copyToClipboard(reelTitle, 'title')}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copiedSection === 'title' ? (
                  <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Copied</span>
                ) : (
                  <span className="flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> Copy Title</span>
                )}
              </button>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-white select-all">
              {reelTitle}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                2. YouTube Description (Copy & Paste)
              </span>
              <button
                onClick={() => copyToClipboard(reelDescription, 'desc')}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copiedSection === 'desc' ? (
                  <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Copied</span>
                ) : (
                  <span className="flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> Copy Description</span>
                )}
              </button>
            </div>
            <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap select-all max-h-48 overflow-y-auto">
              {reelDescription}
            </pre>
          </div>

          {/* Section 2: Channel Playlists */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <FolderPlus className="w-4 h-4" />
              3. Recommended YouTube Channel Playlists
            </span>
            <p className="text-xs text-slate-400">
              Create these 4 playlists so college scouts can view specific reps directly:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-xs font-bold text-white">1. Featured Recruiting Reels</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Pin as channel trailer (Featured Highlight)</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-xs font-bold text-white">2. Infield Defense & Arm (3rd)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Ground balls, range, slow rollers, 85 MPH throws</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-xs font-bold text-white">3. In-Game At-Bats & Contact</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Live game cuts, pitch sequences, 2-strike counts</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-xs font-bold text-white">4. Showcase BP & Swing Mechanics</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Prep Baseball reps, TrackMan data, 93 MPH exit velo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Source video: <code className="text-amber-400 text-[11px]">James_Shoukry_90_Second_Highlight_v10_OriginalAudioOnly_NoMusic.mp4</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
