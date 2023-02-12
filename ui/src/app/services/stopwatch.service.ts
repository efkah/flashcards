import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StopwatchService {
  private diffs: Diff[];

  constructor() {
    this.diffs = [];
  }

  start() {
    this.diffs.push({ start: performance.now() });
  }
  pause() {
    const diff = this.diffs[this.diffs.length - 1];
    diff.stop = performance.now();
  }
  pauseAndRestart() {
    const diff = this.diffs[this.diffs.length - 1];
    diff.stop = performance.now();
    this.diffs.push({ start: diff.stop });
  }

  getLastTime(): number {
    const diff = this.diffs[this.diffs.length - 1];
    return diff.stop ? diff.stop - diff.start : -1;
  }

  getAllTime(): number {
    return this.diffs
      .map((diff) => {
        return diff.stop! - diff.start;
      })
      .reduce((sum, add) => sum + add, 0);
  }

  clear() {
    this.diffs = [];
  }
}

interface Diff {
  start: number;
  stop?: number;
}
