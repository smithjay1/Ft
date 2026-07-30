export type TradeResult = "TP" | "SL" | "BE";
export type TradeSession = "Asia" | "London" | "New York";

export interface JournalTrade {
  id: string;
  date: string;
  pair: string;
  direction: "Buy" | "Sell";
  session: TradeSession;
  model: string;
  entryTimeframe: string;
  riskPct: number;
  plannedRR: number;
  realizedR: number;
  result: TradeResult;
  bias: string;
  reasoning: string;
  execution: string;
  lesson: string;
  tags: string[];
}

/**
 * Journal entries from my own review process. Every page that shows performance
 * (analytics, timeline, homepage stats) derives from this single list.
 */
export const journal: JournalTrade[] = [
  {
    id: "2026-01-08-gbpusd",
    date: "2026-01-08",
    pair: "GBPUSD",
    direction: "Buy",
    session: "New York",
    model: "Liquidity Reversal Model",
    entryTimeframe: "5M",
    riskPct: 0.5,
    plannedRR: 4,
    realizedR: 4,
    result: "TP",
    bias: "Daily bullish, price discounted into 4H demand after CPI liquidity sweep.",
    reasoning:
      "Asia low swept minutes into the CPI release, 5M market structure shift printed with a clean FVG left behind. Entry on the 50% of the FVG with stop below the sweep.",
    execution:
      "Limit order at FVG midpoint, stop 12 pips below the raid, target the 4H internal high.",
    lesson:
      "Waiting for the structure shift instead of anticipating the sweep kept the stop small and produced the best R of the month.",
    tags: ["CPI", "FVG", "MSS", "News"],
  },
  {
    id: "2026-01-14-usdcad",
    date: "2026-01-14",
    pair: "USDCAD",
    direction: "Buy",
    session: "New York",
    model: "Liquidity Reversal Model",
    entryTimeframe: "5M",
    riskPct: 0.5,
    plannedRR: 3.5,
    realizedR: 3.5,
    result: "TP",
    bias: "4H bullish order flow, price rebalancing into a breaker below equal lows.",
    reasoning:
      "Equal lows below the London session were engineered before CPI. Price displaced up through the 15M inducement and I entered on the breaker block retest.",
    execution:
      "Market entry on the confirmation candle close, stop under the breaker, TP at the previous day high.",
    lesson:
      "Equal lows in a bullish 4H narrative are one of my highest-quality setups — I should stop taking counter-trend variations of it.",
    tags: ["CPI", "Breaker", "Equal Lows"],
  },
  {
    id: "2026-01-21-eurusd",
    date: "2026-01-21",
    pair: "EURUSD",
    direction: "Sell",
    session: "London",
    model: "Liquidity Reversal Model",
    entryTimeframe: "15M",
    riskPct: 0.5,
    plannedRR: 3,
    realizedR: -1,
    result: "SL",
    bias: "Daily bearish, premium array on the 4H.",
    reasoning:
      "Sold the 4H premium order block after a London high sweep, but the daily bias was still ranging rather than clearly bearish.",
    execution: "Entered on the 15M rejection, stop above the sweep.",
    lesson:
      "A sweep alone is not a reason to enter. Without a clear higher timeframe imbalance to target, the reward does not justify the risk.",
    tags: ["Premium", "Sweep", "Bias Error"],
  },
  {
    id: "2026-02-03-gbpjpy",
    date: "2026-02-03",
    pair: "GBPJPY",
    direction: "Buy",
    session: "London",
    model: "Liquidity Reversal Model",
    entryTimeframe: "5M",
    riskPct: 0.5,
    plannedRR: 4,
    realizedR: 3.2,
    result: "TP",
    bias: "Weekly bullish continuation, 4H discount order block.",
    reasoning:
      "Asian range low raided at the London open, CHoCH on the 5M and entry on the order block that caused the displacement.",
    execution:
      "Partial at 2R, remainder trailed to the 4H high and closed at 3.2R.",
    lesson:
      "Partialling early on GBPJPY reduces stress but also caps the model's edge. Keep the exit rules mechanical.",
    tags: ["London Open", "CHoCH", "Order Block"],
  },
  {
    id: "2026-02-11-xauusd",
    date: "2026-02-11",
    pair: "XAUUSD",
    direction: "Sell",
    session: "New York",
    model: "Liquidity Reversal Model",
    entryTimeframe: "1M",
    riskPct: 0.25,
    plannedRR: 3,
    realizedR: 0,
    result: "BE",
    bias: "4H bearish, price into premium after a failed high.",
    reasoning:
      "Correct read on direction but I entered on the 1M without a confirmed 5M shift, so the position was underwater before working.",
    execution:
      "Moved stop to breakeven when price stalled and was taken out flat.",
    lesson:
      "Dropping below my 5M confirmation timeframe is the main way I create unnecessary drawdown. 1M is for refinement only.",
    tags: ["Timeframe Discipline", "Breakeven"],
  },
  {
    id: "2026-02-18-audusd",
    date: "2026-02-18",
    pair: "AUDUSD",
    direction: "Buy",
    session: "Asia",
    model: "Liquidity Reversal Model",
    entryTimeframe: "15M",
    riskPct: 0.5,
    plannedRR: 2.5,
    realizedR: 2.5,
    result: "TP",
    bias: "Daily discount, 4H bullish order flow intact.",
    reasoning:
      "Previous day low swept during Asia, 15M inducement cleared and price displaced into the sell-side imbalance.",
    execution: "Entry on the FVG retest with stop below the daily low.",
    lesson:
      "Asia setups work when they align with the daily narrative; they fail when I trade them for the sake of activity.",
    tags: ["Asia", "FVG", "Daily Low"],
  },
  {
    id: "2026-02-25-eurusd",
    date: "2026-02-25",
    pair: "EURUSD",
    direction: "Buy",
    session: "London",
    model: "Liquidity Reversal Model",
    entryTimeframe: "5M",
    riskPct: 0.5,
    plannedRR: 3,
    realizedR: -1,
    result: "SL",
    bias: "4H bullish, price into discount FVG.",
    reasoning:
      "Valid setup that simply failed — price wicked one pip beyond my stop before running to target without me.",
    execution: "Entry at the FVG, stop below the swing low.",
    lesson:
      "This is the cost of doing business. The trade followed the plan, so it was a good trade with a losing outcome.",
    tags: ["Valid Loss", "FVG"],
  },
  {
    id: "2026-03-04-usdjpy",
    date: "2026-03-04",
    pair: "USDJPY",
    direction: "Sell",
    session: "New York",
    model: "Liquidity Reversal Model",
    entryTimeframe: "5M",
    riskPct: 0.5,
    plannedRR: 4,
    realizedR: 4,
    result: "TP",
    bias: "Daily bearish after a weekly high raid.",
    reasoning:
      "NY open drove into the 4H premium order block, 5M CHoCH confirmed and the FVG offered a tight entry.",
    execution:
      "Limit at the FVG high, TP at the sell-side liquidity resting under equal lows.",
    lesson:
      "Trading with the weekly narrative gives the trade room to run — the same entry against it usually stalls.",
    tags: ["NY Open", "Premium", "CHoCH"],
  },
  {
    id: "2026-03-12-gbpusd",
    date: "2026-03-12",
    pair: "GBPUSD",
    direction: "Buy",
    session: "London",
    model: "Liquidity Reversal Model",
    entryTimeframe: "5M",
    riskPct: 0.5,
    plannedRR: 3,
    realizedR: 3,
    result: "TP",
    bias: "4H bullish, discount array unmitigated.",
    reasoning:
      "Clean sweep of the Asian low, displacement through the 15M high and a retest of the breaker.",
    execution: "Single entry, single target, no interference.",
    lesson:
      "My best executions are the ones where I do nothing after entering.",
    tags: ["Breaker", "Patience"],
  },
  {
    id: "2026-03-19-nas100",
    date: "2026-03-19",
    pair: "NAS100",
    direction: "Buy",
    session: "New York",
    model: "Liquidity Reversal Model",
    entryTimeframe: "5M",
    riskPct: 0.25,
    plannedRR: 3,
    realizedR: -1,
    result: "SL",
    bias: "Bullish continuation into the NY session.",
    reasoning:
      "Index volatility around the open expanded well beyond my normal stop distance and the setup broke down immediately.",
    execution: "Entered on the 5M FVG, stopped out within four candles.",
    lesson:
      "Indices need a different risk model than FX. Until I build it, I keep size at a quarter percent or skip them.",
    tags: ["Indices", "Volatility"],
  },
  {
    id: "2026-04-02-eurjpy",
    date: "2026-04-02",
    pair: "EURJPY",
    direction: "Buy",
    session: "London",
    model: "Liquidity Reversal Model",
    entryTimeframe: "15M",
    riskPct: 0.5,
    plannedRR: 3.5,
    realizedR: 3.5,
    result: "TP",
    bias: "Weekly bullish, 4H discount.",
    reasoning:
      "Double bottom below the Asian range was engineered, then a strong displacement left an unmitigated FVG I entered on the retest.",
    execution: "Entry on the FVG, target the weekly high.",
    lesson:
      "Engineered double bottoms have become a repeatable variation of the LRM.",
    tags: ["Engineered Liquidity", "FVG"],
  },
  {
    id: "2026-04-09-usdchf",
    date: "2026-04-09",
    pair: "USDCHF",
    direction: "Sell",
    session: "London",
    model: "Liquidity Reversal Model",
    entryTimeframe: "5M",
    riskPct: 0.5,
    plannedRR: 2.5,
    realizedR: 0,
    result: "BE",
    bias: "4H bearish but late in the move.",
    reasoning:
      "Entry was technically valid but price had already delivered most of the range, leaving little room to target.",
    execution: "Closed at breakeven when momentum dried up.",
    lesson:
      "Check how much of the range is left before entering. Late entries are low-reward even when they are valid.",
    tags: ["Late Entry", "Breakeven"],
  },
  {
    id: "2026-04-16-gbpusd",
    date: "2026-04-16",
    pair: "GBPUSD",
    direction: "Sell",
    session: "New York",
    model: "Liquidity Reversal Model",
    entryTimeframe: "5M",
    riskPct: 0.5,
    plannedRR: 4,
    realizedR: 4,
    result: "TP",
    bias: "Daily bearish after the previous day high was raided.",
    reasoning:
      "Price swept the previous day high into the 4H premium order block and shifted structure on the 5M within the killzone.",
    execution: "Entry on the FVG retest, TP into the sell-side liquidity pool.",
    lesson:
      "Killzone timing plus premium arrays is where my win rate is highest. Trade the schedule, not the screen time.",
    tags: ["Killzone", "Premium", "PDH"],
  },
  {
    id: "2026-04-23-audusd",
    date: "2026-04-23",
    pair: "AUDUSD",
    direction: "Sell",
    session: "Asia",
    model: "Liquidity Reversal Model",
    entryTimeframe: "15M",
    riskPct: 0.5,
    plannedRR: 3,
    realizedR: -1,
    result: "SL",
    bias: "4H bearish, but session liquidity was thin.",
    reasoning:
      "Took an Asia session reversal without a clear draw on liquidity below.",
    execution: "Stopped out on the London open expansion.",
    lesson:
      "If I cannot name the target liquidity before entering, there is no trade.",
    tags: ["No Target", "Asia"],
  },
  {
    id: "2026-05-06-usdcad",
    date: "2026-05-06",
    pair: "USDCAD",
    direction: "Buy",
    session: "New York",
    model: "Liquidity Reversal Model",
    entryTimeframe: "5M",
    riskPct: 0.5,
    plannedRR: 4,
    realizedR: 4,
    result: "TP",
    bias: "Daily bullish, equal lows resting below.",
    reasoning:
      "Repeat of my January CPI setup: equal lows raided, 5M MSS, entry on the FVG created by the displacement.",
    execution: "Entry on the FVG, stop under the raid, one target.",
    lesson:
      "Recognising a repeated setup from my own journal is the clearest evidence that journaling compounds.",
    tags: ["Repeat Setup", "MSS", "Equal Lows"],
  },
  {
    id: "2026-05-13-eurusd",
    date: "2026-05-13",
    pair: "EURUSD",
    direction: "Buy",
    session: "London",
    model: "Liquidity Reversal Model",
    entryTimeframe: "5M",
    riskPct: 0.5,
    plannedRR: 3,
    realizedR: 3,
    result: "TP",
    bias: "4H bullish, discount breaker unmitigated.",
    reasoning:
      "Inducement above the Asian high cleared the impatient sellers, then price returned to the breaker for the entry.",
    execution: "Entry on the breaker retest, target the London high.",
    lesson:
      "Inducement is the detail that separates my entries from obvious retail levels.",
    tags: ["Inducement", "Breaker"],
  },
  {
    id: "2026-05-20-xauusd",
    date: "2026-05-20",
    pair: "XAUUSD",
    direction: "Buy",
    session: "London",
    model: "Liquidity Reversal Model",
    entryTimeframe: "5M",
    riskPct: 0.25,
    plannedRR: 3,
    realizedR: 2.1,
    result: "TP",
    bias: "Daily bullish, deep discount after a stop raid.",
    reasoning:
      "Gold raided the previous day low aggressively, then displaced with a 5M MSS.",
    execution: "Closed manually at 2.1R ahead of a scheduled release.",
    lesson:
      "Closing before news is acceptable risk management, but it must be planned before entry, not decided mid-trade.",
    tags: ["Gold", "News Risk"],
  },
  {
    id: "2026-05-27-gbpjpy",
    date: "2026-05-27",
    pair: "GBPJPY",
    direction: "Sell",
    session: "London",
    model: "Liquidity Reversal Model",
    entryTimeframe: "5M",
    riskPct: 0.5,
    plannedRR: 3.5,
    realizedR: 3.5,
    result: "TP",
    bias: "Daily bearish after a weekly premium tap.",
    reasoning:
      "London high swept into the 4H order block, CHoCH on the 5M and a clean FVG entry.",
    execution: "Entry on the FVG, TP at the previous day low.",
    lesson:
      "Three consecutive sessions of following the plan does more for my confidence than any single big win.",
    tags: ["CHoCH", "Weekly Premium"],
  },
];

export interface Stats {
  total: number;
  wins: number;
  losses: number;
  breakeven: number;
  winRate: number;
  expectancy: number;
  totalR: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  bestR: number;
  worstR: number;
  maxDrawdownR: number;
  longestWinStreak: number;
}

export function computeStats(trades: JournalTrade[]): Stats {
  const total = trades.length;
  const wins = trades.filter((t) => t.result === "TP").length;
  const losses = trades.filter((t) => t.result === "SL").length;
  const breakeven = trades.filter((t) => t.result === "BE").length;
  const totalR = trades.reduce((sum, t) => sum + t.realizedR, 0);
  const winR = trades.filter((t) => t.realizedR > 0).map((t) => t.realizedR);
  const lossR = trades.filter((t) => t.realizedR < 0).map((t) => t.realizedR);
  const grossWin = winR.reduce((a, b) => a + b, 0);
  const grossLoss = Math.abs(lossR.reduce((a, b) => a + b, 0));

  let equity = 0;
  let peak = 0;
  let maxDrawdownR = 0;
  let streak = 0;
  let longestWinStreak = 0;

  const ordered = [...trades].sort((a, b) => a.date.localeCompare(b.date));
  for (const trade of ordered) {
    equity += trade.realizedR;
    peak = Math.max(peak, equity);
    maxDrawdownR = Math.max(maxDrawdownR, peak - equity);
    if (trade.realizedR > 0) {
      streak += 1;
      longestWinStreak = Math.max(longestWinStreak, streak);
    } else if (trade.realizedR < 0) {
      streak = 0;
    }
  }

  return {
    total,
    wins,
    losses,
    breakeven,
    winRate: total ? (wins / total) * 100 : 0,
    expectancy: total ? totalR / total : 0,
    totalR,
    avgWin: winR.length ? grossWin / winR.length : 0,
    avgLoss: lossR.length ? -grossLoss / lossR.length : 0,
    profitFactor: grossLoss ? grossWin / grossLoss : grossWin,
    bestR: total ? Math.max(...trades.map((t) => t.realizedR)) : 0,
    worstR: total ? Math.min(...trades.map((t) => t.realizedR)) : 0,
    maxDrawdownR,
    longestWinStreak,
  };
}

export function equityCurve(trades: JournalTrade[]) {
  let equity = 0;
  return [...trades]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((trade, index) => {
      equity += trade.realizedR;
      return {
        label: `#${index + 1}`,
        date: trade.date,
        pair: trade.pair,
        equity: Number(equity.toFixed(2)),
        r: trade.realizedR,
      };
    });
}

export function groupBy<K extends string>(
  trades: JournalTrade[],
  key: (trade: JournalTrade) => K,
) {
  return trades.reduce<Record<string, JournalTrade[]>>((acc, trade) => {
    const group = key(trade);
    acc[group] = acc[group] ? [...acc[group], trade] : [trade];
    return acc;
  }, {});
}

export const monthLabel = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export const prettyDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
