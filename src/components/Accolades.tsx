import React from 'react';
import { playerData } from '../data/playerData';
import { BadgeCheck, MapPin, CalendarDays } from 'lucide-react';

const STATUS_COPY: Record<string, { label: string; cls: string }> = {
  played:   { label: 'Selected & Played', cls: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' },
  selected: { label: 'Selected',          cls: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' },
  invited:  { label: 'Invited',           cls: 'bg-amber-500/10 text-amber-300 border-amber-500/30' },
};

export const Accolades: React.FC = () => {
  const list = playerData.accolades;
  if (!list.length) return null;

  return (
    <section
      id="selections"
      className="scroll-mt-24 py-12 border-b border-slate-800 bg-slate-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <BadgeCheck className="w-4 h-4" />
              <span>Third-Party Evaluation</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white font-display">
              INVITATIONS &amp; SELECTIONS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 sm:text-right max-w-md">
            Invite-only events. Each selection was made by the organization named,
            not by the player.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {list.map((a, i) => {
            const s = STATUS_COPY[a.status] ?? STATUS_COPY.invited;
            return (
              <div
                key={i}
                className="flex flex-col p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 leading-tight">
                    {a.org}
                  </span>
                  {a.national ? (
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      National
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-2 text-base font-bold text-white leading-snug">
                  {a.title}
                </h3>

                {a.detail ? (
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{a.detail}</p>
                ) : null}

                <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-[11px] text-slate-400">
                  {a.date ? (
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{a.date}</span>
                    </div>
                  ) : null}
                  {a.location ? (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{a.location}</span>
                    </div>
                  ) : null}
                </div>

                <span
                  className={`mt-3 self-start text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${s.cls}`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
