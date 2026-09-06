import { VideoProgress } from './videoProgress';

// Measurement IDs are public configuration, not credentials.
export const measurementId = 'G-5R7YWW9RZF';
const preferenceKey = 'james-analytics-choice-v1';
const hosts = new Set(['www.jamesshoukry2028.com', 'jamesshoukry2028.com']);
type Choice = 'allow' | 'decline' | null;
type Params = Record<string, string | number | boolean>;
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; }
}
let allowed = false;
let loaded = false;
export function analyticsChoice(): Choice {
  try { const value = localStorage.getItem(preferenceKey); return value === 'allow' || value === 'decline' ? value : null; }
  catch { return null; }
}
export function cleanLocation(raw: string) {
  const url = new URL(raw);
  const clean = new URL(url.origin + url.pathname);
  // Only campaign labels authored for this project are included, never arbitrary query values.
  const campaigns: Record<string, Set<string>> = {
    utm_source: new Set(['instagram', 'youtube', 'x', 'email', 'team', 'qr']),
    utm_medium: new Set(['social', 'video', 'email', 'qr']),
    utm_campaign: new Set(['fall_2026']),
    utm_content: new Set(['bio', 'reel', 'profile', ...Array.from({ length: 8 }, (_, i) => `short_${String(i + 1).padStart(2, '0')}`)]),
  };
  for (const [key, values] of Object.entries(campaigns)) {
    const value = url.searchParams.get(key);
    if (value && values.has(value)) clean.searchParams.set(key, value);
  }
  return clean.href;
}
export function event(name: string, params: Params = {}) {
  if (!allowed || !loaded) return;
  window.gtag?.('event', name, { ...params, page_location: cleanLocation(location.href), transport_type: 'beacon' });
}
export function setAnalyticsChoice(choice: Exclude<Choice, null>) {
  try { localStorage.setItem(preferenceKey, choice); } catch { /* Preference remains effective for this page. */ }
  allowed = choice === 'allow';
  if (!allowed) {
    if (loaded) {
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
      (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
    }
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', '; domain=.' + location.hostname, '; domain=.jamesshoukry2028.com']) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
      }
    }
    return;
  }
  if (!measurementId || !hosts.has(location.hostname)) return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = false;
  if (loaded) { window.gtag?.('consent', 'update', { analytics_storage: 'granted' }); return; }
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('js', new Date());
  let referrer = '';
  try { referrer = document.referrer ? new URL(document.referrer).origin : ''; } catch { /* Ignore invalid referrers. */ }
  window.gtag('config', measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: cleanLocation(location.href), page_referrer: referrer, cookie_expires: 60 * 60 * 24 * 90 });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  event('page_view', { page_title: document.title, page_referrer: referrer });
}

export function observeEngagement() {
  const states = new WeakMap<HTMLVideoElement, { progress: VideoProgress; started: boolean; complete: boolean; source: string }>();
  function state(video: HTMLVideoElement) {
    let value = states.get(video);
    const source = video.currentSrc || video.src;
    if (!value || value.source !== source) {
      value = { progress: new VideoProgress(), started: false, complete: false, source };
      states.set(video, value);
    }
    return value;
  }
  function onVideo(e: Event) {
    const video = e.target;
    if (!(video instanceof HTMLVideoElement)) return;
    const value = state(video);
    if (e.type === 'seeking' || e.type === 'pause') { value.progress.resetPosition(); return; }
    if (!allowed || !loaded) { value.progress.resetPosition(); return; }
    const id = video.dataset.videoId || new URL(video.currentSrc || video.src, location.origin).pathname.split('/').pop()!.replace(/\.mp4$/, '');
    const params = { video_id: id, video_duration: Math.round(video.duration || 0) };
    if (e.type === 'play' && !value.started) { value.started = true; event('video_start', params); }
    if (e.type === 'timeupdate') {
      if (!value.started && !video.paused) { value.started = true; event('video_start', params); }
      for (const percent of value.progress.sample(video.currentTime, video.duration, !video.paused && !video.seeking, video.playbackRate)) {
        event('video_progress', { ...params, video_percent: percent });
      }
    }
    if (e.type === 'ended' && !value.complete && value.progress.watchedSeconds >= video.duration * 0.9) {
      value.complete = true; event('video_complete', params);
    }
  }
  function click(e: MouseEvent) {
    if (!(e.target instanceof Element)) return;
    const target = e.target.closest('a,button');
    if (!target) return;
    if (target instanceof HTMLAnchorElement) {
      const href = target.getAttribute('href') || '';
      if (href.startsWith('mailto:')) event(href.includes('Transcript') ? 'transcript_request_click' : 'contact_click');
      else if (target.hasAttribute('download')) event('film_download_click');
      else {
        const domain = new URL(href, location.origin).hostname;
        const names: Record<string, string> = { 'www.youtube.com': 'youtube', 'youtube.com': 'youtube', 'www.ncsasports.org': 'ncsa', 'x.com': 'x', 'instagram.com': 'instagram', 'www.instagram.com': 'instagram' };
        if (names[domain]) event('profile_outbound_click', { destination: names[domain] });
      }
    }
  }
  const videoEvents = ['play', 'pause', 'timeupdate', 'seeking', 'ended'];
  videoEvents.forEach(name => document.addEventListener(name, onVideo, true));
  document.addEventListener('click', click);
  return () => { videoEvents.forEach(name => document.removeEventListener(name, onVideo, true)); document.removeEventListener('click', click); };
}
