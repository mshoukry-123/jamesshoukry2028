import { playerData } from '../data/playerData';

/** One-line summary a coach can paste straight into a recruiting database. */
export function profileOneLine(): string {
  const p = playerData;
  return [
    p.name,
    `${p.classLabel}`,
    p.positionsDisplay,
    p.batsThrows,
    `${p.height} ${p.weight}`,
    p.school,
    p.location,
  ].join(' | ');
}

/** Everything a coach normally has to retype by hand. */
export function profileBlock(): string {
  const p = playerData;
  const L: string[] = [];
  L.push(p.name);
  L.push(`${p.classLabel}  |  ${p.positionsDisplay}  |  ${p.batsThrows}  |  ${p.height} ${p.weight}`);
  L.push(`${p.school} — ${p.location}`);
  if (p.travelTeam) L.push(`Travel: ${p.travelTeam}`);
  L.push('');
  for (const m of p.metrics) {
    if (m.key === 'frame') continue;
    const src = [m.event, m.date, m.method].filter(Boolean).join(', ');
    L.push(`${m.label}: ${m.value} ${m.unit}${src ? `  (${src})` : ''}`);
  }
  if (p.accolades.length) {
    L.push('');
    for (const a of p.accolades) {
      L.push(`${a.org} — ${a.title}${a.date ? ` (${a.date})` : ''}`);
    }
  }
  L.push('');
  if (p.gpa) L.push(`GPA: ${p.gpa}`);
  if (p.testScore) L.push(`Test: ${p.testScore}`);
  if (p.ncaaId) L.push(`NCAA ID: ${p.ncaaId}`);
  else if (p.ncaaRegistered) L.push('NCAA Eligibility Center: registered');
  L.push('');
  L.push(`Email: ${p.email}`);
  if (p.phone) L.push(`Phone: ${p.phone}`);
  if (p.parentName) L.push(`Parent: ${p.parentName}${p.parentPhone ? ` — ${p.parentPhone}` : ''}${p.parentEmail ? ` — ${p.parentEmail}` : ''}`);
  L.push(`Film: ${p.siteUrl}`);
  L.push(`NCSA: ${p.ncsaUrl}`);
  L.push(`X/IG: ${p.twitter}`);
  return L.join('\n');
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** Deep link to a single rep, e.g. https://…/#clip=def-show-3 */
export function clipUrl(slug: string): string {
  const base =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : playerData.siteUrl + '/';
  return `${base}#clip=${slug}`;
}

export function readClipHash(): string | null {
  if (typeof window === 'undefined') return null;
  const m = window.location.hash.match(/clip=([A-Za-z0-9-]+)/);
  return m ? m[1] : null;
}
