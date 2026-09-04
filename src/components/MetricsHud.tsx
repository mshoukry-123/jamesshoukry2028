import React from 'react';
import { playerData } from '../data/playerData';
import { Zap, Compass, Gauge, Activity, ShieldCheck, AlertCircle } from 'lucide-react';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  exitVelo: Zap,
  infieldVelo: Compass,
  sixty: Gauge,
  frame: Activity,
};

const TINT: Record<string, string> = {
  exitVelo: 'from-amber-500/25',
  infieldVelo: 'from-sky-500/25',
  sixty: 'from-emerald-500/25',
  frame: 'from-violet-500/25',
};

export const MetricsHud: React.FC = () => {
  const primary = playerData.metrics.filter((m) => m.tier === 'primary');
  const secondary = playerData.metrics.filter((m) => m.tier === 'secondary');
  const anyUnsourced = playerData.metrics.some(
    (m) => m.key !== 'frame' && !m.date,
  );

  return (
    <section id="metrics" className="scroll-mt-24 py-12 border-b border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Measurables</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white font-display">
              SCOUTING METRICS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 sm:text-right max-w-md">
            Recorded at Prep Baseball showcase events. Each number carries the event
            and date it was taken.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {primary.map((m) => {
            const Icon = ICONS[m.key] ?? Activity;
            const attribution = [m.event, m.date].filter(Boolean).join(' · ');
            return (
              <div
                key={m.key}
                className="relative overflow-hidden p-5 rounded-xl bg-slate-900/70 border border-slate-800"
              >
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${
                    TINT[m.key] ?? 'from-slate-500/20'
                  } to-transparent blur-xl pointer-events-none`}
                />
                <div className="relative flex items-start justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    {m.label}
                  </span>
                  <Icon className="w-4 h-4 text-slate-500" />
                </div>
                <div className="relative mt-3 flex items-baseline gap-1.5">
                  <span
                    className={`font-display font-bold tabular-nums ${
                      m.highlight ? 'text-5xl text-white' : 'text-3xl text-white'
                    }`}
                  >
                    {m.value}
                  </span>
                  <span className="text-sm font-semibold text-amber-400">{m.unit}</span>
                </div>
                <div className="relative mt-3 pt-3 border-t border-slate-800 min-h-[38px]">
                  {attribution ? (
                    <p className="text-[11px] leading-snug text-slate-400">
                      {attribution}
                      {m.method ? <span className="text-slate-500"> · {m.method}</span> : null}
                    </p>
                  ) : m.key === 'frame' ? (
                    <p className="text-[11px] text-slate-400">Bats Right / Throws Right</p>
                  ) : (
                    <p className="text-[11px] text-slate-500 italic">Event and date pending</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {secondary.length ? (
          <div className="mt-4 flex flex-wrap items-stretch gap-3">
            {secondary.map((m) => {
              const Icon = ICONS[m.key] ?? Activity;
              const attribution = [m.event, m.date].filter(Boolean).join(' · ');
              return (
                <div
                  key={m.key}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800/80"
                >
                  <Icon className="w-4 h-4 text-slate-500 shrink-0" />
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-display font-bold text-white tabular-nums">
                      {m.value}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{m.unit}</span>
                  </div>
                  <div className="leading-tight">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      {m.label}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {attribution || m.method || 'Event and date pending'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {anyUnsourced ? (
          <div className="mt-4 flex items-start gap-2 text-[11px] text-slate-500">
            <AlertCircle className="w-3.5 h-3.5 mt-px shrink-0" />
            <p>
              Coaches: any number above without an event and date has not been
              attributed yet. Ask and it will be sent with the source.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};
