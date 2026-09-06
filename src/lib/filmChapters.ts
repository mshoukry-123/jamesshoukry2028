export const filmChapterPath = (time: number) => `/recruiting-film?t=${time}`;

export function filmStartTime(search: string, duration: number): number | null {
  const value = new URLSearchParams(search).get('t');
  if (!value || !/^\d+(?:\.\d+)?$/.test(value)) return null;
  const time = Number(value);
  return Number.isFinite(time) && time >= 0 && time < duration ? time : null;
}
