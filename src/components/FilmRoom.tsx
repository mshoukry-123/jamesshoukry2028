import React, { useState, useMemo } from 'react';
import { playerData, VideoClip } from '../data/playerData';
import { Play, Search, Filter, Shield, Target, Flame, Sparkles } from 'lucide-react';
import { ClipModal } from './ClipModal';

export const FilmRoom: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeClip, setActiveClip] = useState<VideoClip | null>(null);

  const categories = [
    { id: 'all', label: 'All Clips', count: playerData.clips.length, icon: Sparkles },
    { id: 'game', label: 'Game At-Bats', count: playerData.clips.filter(c => c.category === 'game').length, icon: Flame },
    { id: 'defense', label: 'Infield Defense', count: playerData.clips.filter(c => c.category === 'defense').length, icon: Shield },
    { id: 'showcase', label: 'Showcase / BP', count: playerData.clips.filter(c => c.category === 'showcase').length, icon: Target },
  ];

  const filteredClips = useMemo(() => {
    return playerData.clips.filter(clip => {
      const matchesCategory = selectedCategory === 'all' || clip.category === selectedCategory;
      const matchesSearch =
        clip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clip.scoutingNote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clip.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeIndex = activeClip ? filteredClips.findIndex(c => c.id === activeClip.id) : -1;

  const handleNextClip = () => {
    if (activeIndex >= 0 && activeIndex < filteredClips.length - 1) {
      setActiveClip(filteredClips[activeIndex + 1]);
    }
  };

  const handlePrevClip = () => {
    if (activeIndex > 0) {
      setActiveClip(filteredClips[activeIndex - 1]);
    }
  };

  return (
    <section id="film-room" className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <Filter className="w-4 h-4" />
              <span>Full Video Breakdown</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              COACH FILM ROOM & INDIVIDUAL REPS
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Click any rep to view high-definition isolated tape with scouting evaluation notes.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reps (e.g. 3B, warning track, BP)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
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
        </div>

        {/* Video Cards Grid */}
        {filteredClips.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
            <p className="text-sm">No video clips match your search query.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-xs text-amber-400 hover:underline font-semibold"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredClips.map((clip, index) => (
              <div
                key={clip.id}
                onClick={() => setActiveClip(clip)}
                className="group cursor-pointer rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-200 overflow-hidden flex flex-col hover:shadow-xl hover:shadow-black/40"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                  <img
                    src={clip.thumbnailSrc}
                    alt={clip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-slate-950/80 border border-slate-700/80 group-hover:bg-amber-500 group-hover:border-amber-400 flex items-center justify-center text-white group-hover:text-slate-950 transition-all shadow-lg group-hover:scale-110">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-950/90 text-amber-400 px-2 py-0.5 rounded border border-slate-800">
                      {clip.categoryLabel}
                    </span>
                    <span className="text-[11px] font-mono font-medium bg-slate-950/90 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                      {clip.duration}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Clip #{index + 1}
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors font-display line-clamp-1">
                      {clip.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {clip.scoutingNote}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Watch isolated rep</span>
                    <span className="text-amber-400/80 group-hover:text-amber-400">Play →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Video Modal */}
      {activeClip && (
        <ClipModal
          clip={activeClip}
          onClose={() => setActiveClip(null)}
          onNext={handleNextClip}
          onPrev={handlePrevClip}
          hasNext={activeIndex < filteredClips.length - 1}
          hasPrev={activeIndex > 0}
          currentIndex={activeIndex}
          totalClips={filteredClips.length}
        />
      )}
    </section>
  );
};
