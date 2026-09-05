import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { playerData, VideoClip, clipBySlug } from '../data/playerData';
import { Play, Search, Filter, Shield, Target, Flame, Sparkles, Gauge, Keyboard, VolumeX } from 'lucide-react';
import { ClipModal } from './ClipModal';
import { readClipHash } from '../lib/profile';

type CatId = 'all' | 'showcase' | 'game' | 'defense' | 'run';

export const FilmRoom: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CatId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeClip, setActiveClip] = useState<VideoClip | null>(null);

  const count = (fn: (c: VideoClip) => boolean) => playerData.clips.filter(fn).length;

  type Cat = { id: CatId; label: string; count: number; icon: React.ComponentType<{ className?: string }> };
  const categories: Cat[] = ([
    { id: 'all', label: 'All Reps', count: playerData.clips.length, icon: Sparkles },
    { id: 'defense', label: '3B Defense', count: count(c => c.category === 'defense'), icon: Shield },
    { id: 'showcase', label: 'Showcase BP', count: count(c => c.category === 'showcase'), icon: Target },
    { id: 'game', label: 'In Game', count: count(c => c.category === 'game' || c.category === 'cage'), icon: Flame },
    { id: 'run', label: 'Run', count: count(c => c.category === 'run'), icon: Gauge },
  ] as Cat[]).filter(c => c.count > 0);

  const filteredClips = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return playerData.clips.filter((clip) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        clip.category === selectedCategory ||
        (selectedCategory === 'game' && clip.category === 'cage');
      const matchesSearch =
        !q ||
        clip.title.toLowerCase().includes(q) ||
        clip.scoutingNote.toLowerCase().includes(q) ||
        clip.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeIndex = activeClip ? filteredClips.findIndex(c => c.id === activeClip.id) : -1;

  const openClip = useCallback((clip: VideoClip) => {
    setActiveClip(clip);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#clip=${clip.slug}`);
    }
  }, []);

  const closeClip = useCallback(() => {
    setActiveClip(null);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const step = useCallback((delta: number) => {
    if (activeIndex < 0) return;
    const next = activeIndex + delta;
    if (next >= 0 && next < filteredClips.length) openClip(filteredClips[next]);
  }, [activeIndex, filteredClips, openClip]);

  /* Deep link: /#clip=def-show-3 opens that rep directly. */
  useEffect(() => {
    const slug = readClipHash();
    if (!slug) return;
    const c = clipBySlug(slug);
    if (!c) return;
    setSelectedCategory('all');
    setActiveClip(c);
    window.requestAnimationFrame(() => {
      document.getElementById('film-room')?.scrollIntoView({ block: 'start' });
    });
  }, []);

  /* Grid-level keyboard control. The modal handles its own keys while open. */
  useEffect(() => {
    if (activeClip) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (!filteredClips.length) return;
      if (e.key === 'j' || e.key === 'ArrowRight') { e.preventDefault(); openClip(filteredClips[0]); }
      if (e.key === '/') { e.preventDefault(); document.getElementById('film-search')?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeClip, filteredClips, openClip]);

  return (
    <section id="film-room" className="scroll-mt-24 py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <Filter className="w-4 h-4" />
              <span>Rep by rep</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              FILM ROOM
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              {playerData.clips.length} isolated reps, game and showcase. Any rep can be
              linked directly, so you can send a single clip to your staff.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="film-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reps (backhand, BP, 60)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-7">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
          <span className="hidden lg:inline-flex items-center gap-1.5 ml-auto text-[11px] text-slate-500">
            <Keyboard className="w-3.5 h-3.5" />
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">J</kbd> play
              {' · '}
              <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">/</kbd> search
            </span>
          </span>
        </div>

        {filteredClips.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
            <p className="text-sm">No reps match that search.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-xs text-amber-400 hover:underline font-semibold"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {filteredClips.map((clip, index) => (
              <button
                key={clip.id}
                onClick={() => openClip(clip)}
                className="group text-left cursor-pointer rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 focus:border-amber-500 focus:outline-none transition-all duration-200 overflow-hidden flex flex-col hover:shadow-xl hover:shadow-black/40"
              >
                <div className="relative overflow-hidden bg-slate-950 aspect-video">
                  <img
                    src={clip.thumbnailSrc}
                    alt={clip.title}
                    className={`w-full h-full group-hover:scale-105 transition-transform duration-300 ${
                      clip.vertical ? 'object-contain bg-slate-950' : 'object-cover'
                    }`}
                    loading="lazy"
                    width={clip.width}
                    height={clip.height}
                  />
                  <div className="absolute inset-0 bg-slate-950/25 group-hover:bg-slate-950/5 transition-colors" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-slate-950/80 border border-slate-700/80 group-hover:bg-amber-500 group-hover:border-amber-400 flex items-center justify-center text-white group-hover:text-slate-950 transition-all shadow-lg group-hover:scale-110">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-950/90 text-amber-400 px-2 py-0.5 rounded border border-slate-800">
                      {clip.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1.5">
                      {clip.silent ? (
                        <span
                          className="inline-flex items-center bg-slate-950/90 text-slate-400 px-1.5 py-1 rounded border border-slate-800"
                          title="Source carried a music bed, so this clip ships without audio"
                        >
                          <VolumeX className="w-3 h-3" />
                        </span>
                      ) : null}
                      <span className="text-[11px] font-mono font-medium bg-slate-950/90 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                        {clip.duration}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Rep {index + 1} of {filteredClips.length}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors font-display leading-snug">
                      {clip.title}
                    </h3>
                    <p className="mt-1 text-[11px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed hidden sm:block">
                      {clip.scoutingNote}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="hidden sm:inline">Watch isolated rep</span>
                    <span className="text-amber-400/80 group-hover:text-amber-400">Play →</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {activeClip && (
        <ClipModal
          clip={activeClip}
          onClose={closeClip}
          onNext={() => step(1)}
          onPrev={() => step(-1)}
          hasNext={activeIndex >= 0 && activeIndex < filteredClips.length - 1}
          hasPrev={activeIndex > 0}
          currentIndex={activeIndex}
          totalClips={filteredClips.length}
        />
      )}
    </section>
  );
};
