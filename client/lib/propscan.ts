import type { JournalTrade } from "@/data/journal";

export interface RuleSet {
  id: string;
  name: string;
  note: string;
  profitTarget: number;
  maxDailyLoss: number;
  maxOverallLoss: number;
  minTradingDays: number;
}

export interface ScanInput {
  riskPerTrade: number;
  tradesPerDay: number;
  /** Number of shuffled orderings simulated. */
  runs: number;
}

export interface ScanResult {
  passRate: number;
  avgDaysToTarget: number | null;
  dailyBreaches: number;
  overallBreaches: number;
  timeouts: number;
  worstDrawdown: number;
  medianReturn: number;
}

/** Deterministic PRNG so a given rule set always scans to the same result. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], rand: () => number) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const MAX_DAYS = 40;

/**
 * Replays my journal's R-multiple distribution against a rule set to estimate
 * how often the same behaviour would clear the objective without a breach.
 */
export function scanRuleSet(
  trades: JournalTrade[],
  rules: RuleSet,
  input: ScanInput,
): ScanResult {
  const rMultiples = trades.map((t) => t.realizedR);
  if (!rMultiples.length) {
    return {
      passRate: 0,
      avgDaysToTarget: null,
      dailyBreaches: 0,
      overallBreaches: 0,
      timeouts: 0,
      worstDrawdown: 0,
      medianReturn: 0,
    };
  }

  const rand = mulberry32(
    0x5eed ^ Math.round(input.riskPerTrade * 100) ^ rules.id.length,
  );
  let passes = 0;
  let dailyBreaches = 0;
  let overallBreaches = 0;
  let timeouts = 0;
  let daysToTargetTotal = 0;
  let worstDrawdown = 0;
  const returns: number[] = [];

  for (let run = 0; run < input.runs; run += 1) {
    let pool = shuffle(rMultiples, rand);
    let cursor = 0;
    let equity = 0;
    let peak = 0;
    let outcome: "pass" | "daily" | "overall" | "timeout" = "timeout";
    let daysTraded = 0;

    for (let day = 0; day < MAX_DAYS; day += 1) {
      let dayPnl = 0;
      daysTraded += 1;

      for (let i = 0; i < input.tradesPerDay; i += 1) {
        if (cursor >= pool.length) {
          pool = shuffle(rMultiples, rand);
          cursor = 0;
        }
        const r = pool[cursor];
        cursor += 1;
        const pnl = r * input.riskPerTrade;
        dayPnl += pnl;
        equity += pnl;
        peak = Math.max(peak, equity);
        worstDrawdown = Math.max(worstDrawdown, peak - equity);

        if (-dayPnl >= rules.maxDailyLoss) {
          outcome = "daily";
          break;
        }
        if (
          peak - equity >= rules.maxOverallLoss ||
          -equity >= rules.maxOverallLoss
        ) {
          outcome = "overall";
          break;
        }
        if (
          equity >= rules.profitTarget &&
          daysTraded >= rules.minTradingDays
        ) {
          outcome = "pass";
          break;
        }
      }

      if (outcome !== "timeout") break;
    }

    returns.push(equity);
    if (outcome === "pass") {
      passes += 1;
      daysToTargetTotal += daysTraded;
    } else if (outcome === "daily") {
      dailyBreaches += 1;
    } else if (outcome === "overall") {
      overallBreaches += 1;
    } else {
      timeouts += 1;
    }
  }

  const sorted = [...returns].sort((a, b) => a - b);

  return {
    passRate: (passes / input.runs) * 100,
    avgDaysToTarget: passes ? daysToTargetTotal / passes : null,
    dailyBreaches: (dailyBreaches / input.runs) * 100,
    overallBreaches: (overallBreaches / input.runs) * 100,
    timeouts: (timeouts / input.runs) * 100,
    worstDrawdown,
    medianReturn: sorted[Math.floor(sorted.length / 2)] ?? 0,
  };
}
