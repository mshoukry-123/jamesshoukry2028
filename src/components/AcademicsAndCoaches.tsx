import React from 'react';
import { playerData } from '../data/playerData';
import { GraduationCap, Users, Mail, Award, CheckCircle, ExternalLink, Phone, CalendarDays } from 'lucide-react';

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
    <span className="text-xs text-slate-400 shrink-0">{label}</span>
    <span className="text-sm font-semibold text-white text-right">{children}</span>
  </div>
);

export const AcademicsAndCoaches: React.FC = () => {
  const p = playerData;
  const hasSchedule = p.schedule.length > 0;

  return (
    <section id="academics" className="scroll-mt-24 py-12 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Student-athlete</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-display">ACADEMICS</h3>

            <div className="mt-6 space-y-3 flex-1">
              <Row label="High school">
                {p.academics.school} ({p.academics.location})
              </Row>
              <Row label="Graduation year">
                <span className="text-amber-400 font-display">{p.classLabel}</span>
              </Row>
              <Row label="Position">
                {p.positionsDisplay} ({p.batsThrows})
              </Row>
              {p.travelTeam ? <Row label="Travel team">{p.travelTeam}</Row> : null}
              {p.gpa ? <Row label="GPA">{p.gpa}</Row> : null}
              {p.testScore ? <Row label="Test score">{p.testScore}</Row> : null}
              {p.anticipatedMajor ? <Row label="Academic interest">{p.anticipatedMajor}</Row> : null}
              <Row label="NCAA Eligibility Center">
                {p.ncaaId ? (
                  <span className="font-mono text-sm">{p.ncaaId}</span>
                ) : p.ncaaRegistered ? (
                  <span className="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Registered
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">Not yet registered</span>
                )}
              </Row>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500">Transcript available on request</span>
              <a
                href={`mailto:${p.email}?subject=Transcript%20Request%20-%20James%20Shoukry`}
                className="text-xs font-semibold text-amber-400 hover:underline inline-flex items-center gap-1 py-1"
              >
                Request transcript →
              </a>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <Users className="w-4 h-4" />
              <span>Direct contact</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-display">GET IN TOUCH</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Class of 2028. Contact rules permitting, reach out directly.
            </p>

            <div className="mt-6 space-y-3 flex-1">
              {p.coaches.map((c, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {c.role}
                    </div>
                    <div className="text-sm font-semibold text-white mt-0.5 truncate">{c.name}</div>
                    <div className="text-xs text-slate-400 truncate">{c.organization}</div>
                    {c.phone ? (
                      <a
                        href={`tel:${c.phone.replace(/[^\d+]/g, '')}`}
                        className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-400"
                      >
                        <Phone className="w-3 h-3" />
                        {c.phone}
                      </a>
                    ) : null}
                  </div>
                  {c.email ? (
                    <a
                      href={`mailto:${c.email}?subject=Recruiting%20Inquiry%20-%20James%20Shoukry`}
                      className="shrink-0 p-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                      title={`Email ${c.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  ) : null}
                </div>
              ))}

              {p.phone ? (
                <a
                  href={`tel:${p.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 transition-colors"
                >
                  <span className="text-xs text-slate-400">Phone</span>
                  <span className="text-sm font-semibold text-white font-mono">{p.phone}</span>
                </a>
              ) : null}

              <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-amber-400">NCSA profile</div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Verified stats, video catalog and schedule
                  </div>
                </div>
                <a
                  href={p.ncsaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-3 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all inline-flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>View</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {hasSchedule ? (
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-2">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>Where to see him play</span>
                  </div>
                  <ul className="space-y-1.5">
                    {p.schedule.map((s, i) => (
                      <li key={i} className="flex items-baseline justify-between gap-3 text-xs">
                        <span className="text-white font-medium">{s.label}</span>
                        <span className="text-slate-400 shrink-0">
                          {s.date}
                          {s.location ? ` · ${s.location}` : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span>Primary contact</span>
              <a
                href={`mailto:${p.email}`}
                className="text-white hover:text-amber-400 font-mono transition-colors break-all"
              >
                {p.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
