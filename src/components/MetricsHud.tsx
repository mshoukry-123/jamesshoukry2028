import React from 'react';
import { playerData } from '../data/playerData';
import { Activity, ShieldCheck, Gauge, Zap, Compass } from 'lucide-react';

export const MetricsHud: React.FC = () => {
  return (
    <section id="metrics" className="py-10 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Measurements & Tech</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              SCOUTING METRICS & MEASURABLES
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 md:mt-0">
            Showcase verified via Prep Baseball / TrackMan & on-field radar
          </p>
        </div>

        {/* 4 Main Hero Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Exit Velocity */}
          <div className="relative p-5 sm:p-6 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Exit Velo</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight">
                {playerData.metrics.exitVelo.value}
              </span>
              <span className="text-sm font-bold text-amber-400 font-display">
                {playerData.metrics.exitVelo.unit}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400 font-medium">
              {playerData.metrics.exitVelo.verifiedBy}
            </p>
          </div>

          {/* Infield Arm Velocity */}
          <div className="relative p-5 sm:p-6 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Infield Velo</span>
              <Compass className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight">
                {playerData.metrics.infieldVelo.value}
              </span>
              <span className="text-sm font-bold text-blue-400 font-display">
                {playerData.metrics.infieldVelo.unit}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400 font-medium">
              {playerData.metrics.infieldVelo.verifiedBy}
            </p>
          </div>

          {/* 60-Yard Dash */}
          <div className="relative p-5 sm:p-6 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">60-Yard Dash</span>
              <Gauge className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight">
                {playerData.metrics.sixtyYard.value}
              </span>
              <span className="text-sm font-bold text-emerald-400 font-display">
                {playerData.metrics.sixtyYard.unit}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400 font-medium">
              {playerData.metrics.sixtyYard.verifiedBy}
            </p>
          </div>

          {/* Size & Frame */}
          <div className="relative p-5 sm:p-6 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Frame / Physicals</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
                {playerData.height}
              </span>
              <span className="text-sm font-bold text-slate-400 font-display">
                • {playerData.weight}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400 font-medium">
              3rd | Bats Right / Throws Right
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
