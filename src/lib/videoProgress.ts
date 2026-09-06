/** Counts unique watched intervals, so seeking or replaying cannot inflate completion. */
export class VideoProgress {
  private intervals: [number, number][] = [];
  private previous: number | null = null;
  private reported = new Set<number>();
  resetPosition() { this.previous = null; }
  sample(time: number, duration: number, playing: boolean, rate = 1): number[] {
    if (!playing || !Number.isFinite(time) || !Number.isFinite(duration) || duration <= 0) {
      this.previous = null;
      return [];
    }
    const previous = this.previous;
    this.previous = time;
    if (previous === null || time <= previous || time - previous > Math.max(1.5, rate * 1.5)) return [];
    this.intervals.push([Math.max(0, previous), Math.min(duration, time)]);
    this.intervals.sort((a, b) => a[0] - b[0]);
    const merged: [number, number][] = [];
    for (const interval of this.intervals) {
      const last = merged.at(-1);
      if (last && interval[0] <= last[1]) last[1] = Math.max(last[1], interval[1]);
      else merged.push([...interval]);
    }
    this.intervals = merged;
    const percent = this.watchedSeconds / duration * 100;
    return [25, 50, 75, 90].filter(value => {
      if (percent < value || this.reported.has(value)) return false;
      this.reported.add(value);
      return true;
    });
  }
  get watchedSeconds() { return this.intervals.reduce((sum, [a, b]) => sum + b - a, 0); }
}
