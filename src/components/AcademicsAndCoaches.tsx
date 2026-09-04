import React from 'react';
import { playerData } from '../data/playerData';
import { GraduationCap, Users, Mail, Award, CheckCircle, ExternalLink } from 'lucide-react';

export const AcademicsAndCoaches: React.FC = () => {
  return (
    <section id="academics" className="py-12 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Academic Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>Student-Athlete Profile</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                ACADEMICS & HIGH SCHOOL
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Committed to high academic performance alongside elite athletic development.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-slate-400">High School</span>
                  <span className="text-sm font-semibold text-white">{playerData.academics.school} ({playerData.academics.location})</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-slate-400">Graduation Year</span>
                  <span className="text-sm font-semibold text-amber-400 font-display">{playerData.classLabel}</span>
                </div>


                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-slate-400">Primary / Secondary</span>
                  <span className="text-sm font-semibold text-white">{playerData.positionsDisplay} (R/R)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-slate-400">NCAA Eligibility Status</span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Eligible & Registered
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">Transcripts available upon request</span>
              <a
                href={`mailto:${playerData.email}?subject=Transcript%20Request%20-%20James%20Shoukry`}
                className="text-xs font-semibold text-amber-400 hover:underline inline-flex items-center gap-1"
              >
                Request Transcripts →
              </a>
            </div>
          </div>

          {/* Coach & References Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
                <Users className="w-4 h-4" />
                <span>Direct Contact & References</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                COACHING STAFF & VERIFICATION
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Reach out directly or verify metrics through school staff.
              </p>

              <div className="mt-6 space-y-4">
                {playerData.coaches.map((coach, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        {coach.role}
                      </div>
                      <div className="text-sm font-semibold text-white mt-0.5">
                        {coach.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {coach.organization}
                      </div>
                    </div>
                    {coach.email && (
                      <a
                        href={`mailto:${coach.email}?subject=Recruiting%20Inquiry%20-%20James%20Shoukry`}
                        className="p-2 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                        title={`Email ${coach.name}`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Verified Links */}
              <div className="mt-4 p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-400">NCSA Certified Profile</div>
                  <div className="text-[11px] text-slate-400">Full verified stats, video catalog, and verified schedule</div>
                </div>
                <a
                  href={playerData.ncsaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all inline-flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>View</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Recruiting Coordinator Point of Contact</span>
              <a
                href={`mailto:${playerData.email}`}
                className="text-white hover:text-amber-400 font-mono transition-colors"
              >
                {playerData.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
