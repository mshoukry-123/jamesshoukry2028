// A coach should get moving video on the first click, not a freeze frame and a
// second click. The Hero "Watch" buttons scroll to the inline player and ask it
// to start inside the same user gesture, which is why the browser allows sound.
// Autoplaying on page load would only be permitted muted, and a silent reel
// reads as a reel with no audio, which is the opposite of what this film sells.
export const FILM_PLAY_EVENT = 'james:play-featured-film';

export type FilmPlayDetail = { startAt?: number };

export function playFeaturedFilm(startAt?: number) {
  window.dispatchEvent(
    new CustomEvent<FilmPlayDetail>(FILM_PLAY_EVENT, { detail: { startAt } })
  );
}

// dispatchEvent is synchronous, so the listener's play() call still counts as
// part of the click that triggered it.
export function scrollToFilmAndPlay(startAt?: number) {
  document.getElementById('featured-reel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  playFeaturedFilm(startAt);
}

// True for a click the visitor meant as "open in a new tab" or similar, which
// should fall through to the href instead of playing inline.
export function isModifiedClick(e: {
  button: number; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean;
}) {
  return e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
}
