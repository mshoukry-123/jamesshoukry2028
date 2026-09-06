import { useRef, useState } from 'react';
import { ArrowLeft, Download, ExternalLink, Link2, Check, Mail } from 'lucide-react';
import { playerData } from '../data/playerData';
import { copyText } from '../lib/profile';

export function RecruitingFilmPage() {
  const p = playerData;
  const film = p.featuredVideo;
  const published = new Date(`${film.publishedDate}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  const video = useRef<HTMLVideoElement>(null);
  const [copied, setCopied] = useState(false);
  const [playError, setPlayError] = useState(false);
  async function seek(time: number) {
    if (!video.current) return;
    video.current.currentTime = time;
    try { await video.current.play(); setPlayError(false); }
    catch { setPlayError(true); }
  }
  return (
    <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 mb-4"><ArrowLeft size={16} /> Full recruiting profile</a>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-white">{p.name} — Recruiting Film</h1>
        <p className="text-base text-slate-300 mt-2 mb-5">{p.classLabel} · {p.positionsDisplay} · {p.batsThrows} · {p.school}, {p.location}</p>
        <video ref={video} controls playsInline preload="metadata" data-video-id="recruiting-reel" data-video-title="James Shoukry recruiting film"
          src={playerData.featuredVideo.videoSrc} poster={playerData.featuredVideo.thumbnailSrc}
          className="w-full aspect-video rounded-xl bg-black border border-slate-800" aria-label="James Shoukry recruiting film" />
        {playError && <p role="status" className="mt-2 text-sm text-amber-300">Press Play in the video controls to continue.</p>}
        <nav aria-label="Film chapters" className="flex flex-wrap gap-2 mt-4">
          {film.chapters.map(c => <button key={c.time} onClick={() => void seek(c.time)} className="px-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 hover:text-amber-400">{c.label}</button>)}
        </nav>
        <div className="flex flex-wrap gap-3 mt-5">
          <a href={`mailto:${playerData.email}?subject=Recruiting%20Inquiry%20-%20James%20Shoukry`} className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg px-4 py-3 font-semibold"><Mail size={18} /> Contact James</a>
          <button onClick={async () => { const ok = await copyText(`${playerData.siteUrl}/recruiting-film`); setCopied(ok); }} className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-700 hover:border-amber-400" data-action="copy-film-link">{copied ? <Check size={18} /> : <Link2 size={18} />}{copied ? 'Link copied' : 'Copy film link'}</button>
          <a href={`https://www.youtube.com/watch?v=${playerData.featuredVideo.youtubeId}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-4 py-3 text-slate-300 hover:text-amber-400">Watch on YouTube <ExternalLink size={16} /></a>
        </div>
        <section aria-labelledby="film-context" className="mt-8 pt-6 border-t border-slate-800 text-slate-300">
          <h2 id="film-context" className="text-lg text-white font-semibold">About this film</h2>
          <p className="mt-2 text-base leading-relaxed">A {Math.round(film.durationSeconds)}-second recruiting reel with game at-bats, showcase batting practice, third-base fielding and throwing, and a running finish. Published {published}. {film.context}</p>
          <p className="mt-3 text-base leading-relaxed">See the <a className="text-amber-400 underline" href="/#metrics">dated measurements</a>, <a className="text-amber-400 underline" href="/#film-room">individual reps</a>, and <a className="text-amber-400 underline" href="/#academics">academic and contact information</a> on James's full profile.</p>
          <a href={playerData.featuredVideo.videoSrcHd} download className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 mt-4"><Download size={16} /> Download the 1080p reel</a>
        </section>
      </div>
    </main>
  );
}
