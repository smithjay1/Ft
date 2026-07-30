export interface Candle {
  o: number;
  h: number;
  l: number;
  c: number;
}

/** Deterministic PRNG so generated charts stay identical between renders. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface SeriesOptions {
  seed: number;
  length: number;
  start: number;
  volatility: number;
  /** Net move applied across the series, in price units. */
  drift?: number;
}

/**
 * Builds a plausible OHLC series: a random walk nudged by a linear drift so
 * charts can be told to end bullish, bearish or flat.
 */
export function buildSeries({
  seed,
  length,
  start,
  volatility,
  drift = 0,
}: SeriesOptions): Candle[] {
  const rand = mulberry32(seed);
  const step = drift / Math.max(length - 1, 1);
  const candles: Candle[] = [];
  let price = start;

  for (let i = 0; i < length; i += 1) {
    const o = price;
    const shock = (rand() - 0.5) * 2 * volatility;
    const c = o + shock + step;
    const wickUp = rand() * volatility * 0.9;
    const wickDown = rand() * volatility * 0.9;
    candles.push({
      o,
      c,
      h: Math.max(o, c) + wickUp,
      l: Math.min(o, c) - wickDown,
    });
    price = c;
  }

  return candles;
}

export interface PathSegment {
  /** Price the segment closes at. */
  to: number;
  candles: number;
  volatility: number;
  /** Extra wick beyond the segment path, used to model liquidity raids. */
  overshoot?: number;
}

/**
 * Turns a narrative (consolidate, raid, displace, retrace, expand) into an OHLC
 * series by interpolating between anchor prices and adding seeded wicks.
 */
export function buildPath(
  start: number,
  segments: PathSegment[],
  seed: number,
): Candle[] {
  const rand = mulberry32(seed);
  const candles: Candle[] = [];
  let price = start;

  for (const segment of segments) {
    const step = (segment.to - price) / segment.candles;
    for (let i = 0; i < segment.candles; i += 1) {
      const o = price;
      const noise = (rand() - 0.5) * segment.volatility;
      const c = i === segment.candles - 1 ? segment.to : o + step + noise;
      const overshoot = segment.overshoot ?? 0;
      const isLast = i === segment.candles - 1;
      const wickUp =
        rand() * segment.volatility * 0.55 +
        (overshoot > 0 && isLast ? overshoot : 0);
      const wickDown =
        rand() * segment.volatility * 0.55 +
        (overshoot < 0 && isLast ? -overshoot : 0);
      candles.push({
        o,
        c,
        h: Math.max(o, c) + wickUp,
        l: Math.min(o, c) - wickDown,
      });
      price = c;
    }
  }

  return candles;
}

export function seriesBounds(candles: Candle[]) {
  const high = Math.max(...candles.map((c) => c.h));
  const low = Math.min(...candles.map((c) => c.l));
  const pad = (high - low) * 0.12 || 0.0005;
  return { high: high + pad, low: low - pad };
}

export function hashSeed(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
