import { buildPath, type Candle } from "@/lib/candles";

export type LevelKind =
  "liquidity" | "poi" | "order-block" | "fvg" | "entry" | "stop" | "target";

export interface ReplayLevel {
  kind: LevelKind;
  label: string;
  /** Zones use both prices; single lines only use `price`. */
  price: number;
  priceTo?: number;
  /** Candle index at which the drawing becomes visible. */
  from: number;
}

export interface ReplayStep {
  at: number;
  title: string;
  detail: string;
}

export interface ReplayTrade {
  id: string;
  pair: string;
  title: string;
  direction: "Buy" | "Sell";
  session: string;
  catalyst: string;
  digits: number;
  candles: Candle[];
  levels: ReplayLevel[];
  steps: ReplayStep[];
  entry: number;
  stop: number;
  target: number;
  rr: string;
  result: "TP" | "SL" | "BE";
  bias: string;
  reasoning: string[];
  lessons: string[];
  /** Index where the before/after snapshot split sits. */
  splitAt: number;
}

const gbpusdCandles = buildPath(
  1.274,
  [
    { to: 1.2735, candles: 8, volatility: 0.0006 },
    { to: 1.2694, candles: 3, volatility: 0.0008, overshoot: -0.0006 },
    { to: 1.2748, candles: 4, volatility: 0.0007 },
    { to: 1.2716, candles: 3, volatility: 0.0005 },
    { to: 1.279, candles: 10, volatility: 0.0009 },
    { to: 1.2836, candles: 5, volatility: 0.0008 },
  ],
  20260108,
);

const usdcadCandles = buildPath(
  1.3585,
  [
    { to: 1.358, candles: 7, volatility: 0.0005 },
    { to: 1.355, candles: 3, volatility: 0.0007, overshoot: -0.0005 },
    { to: 1.3596, candles: 4, volatility: 0.0006 },
    { to: 1.357, candles: 3, volatility: 0.0004 },
    { to: 1.363, candles: 9, volatility: 0.0007 },
    { to: 1.3668, candles: 4, volatility: 0.0006 },
  ],
  20260114,
);

export const replays: ReplayTrade[] = [
  {
    id: "gbpusd-cpi-buy",
    pair: "GBPUSD",
    title: "GBPUSD CPI Buy",
    direction: "Buy",
    session: "New York — CPI release",
    catalyst: "US CPI",
    digits: 4,
    candles: gbpusdCandles,
    splitAt: 18,
    entry: 1.2716,
    stop: 1.2688,
    target: 1.2828,
    rr: "1:4",
    result: "TP",
    bias: "Daily bullish. Price was trading in a 4H discount with sell-side liquidity resting under the Asian session low ahead of CPI.",
    levels: [
      {
        kind: "liquidity",
        label: "Asian session low — sell-side liquidity",
        price: 1.2702,
        from: 5,
      },
      {
        kind: "poi",
        label: "4H discount POI",
        price: 1.2686,
        priceTo: 1.2718,
        from: 6,
      },
      {
        kind: "order-block",
        label: "Bullish order block",
        price: 1.2694,
        priceTo: 1.2707,
        from: 14,
      },
      {
        kind: "fvg",
        label: "Fair value gap",
        price: 1.2712,
        priceTo: 1.2727,
        from: 16,
      },
      { kind: "entry", label: "Entry 1.2716", price: 1.2716, from: 18 },
      { kind: "stop", label: "Stop loss 1.2688", price: 1.2688, from: 18 },
      { kind: "target", label: "Take profit 1.2828", price: 1.2828, from: 18 },
    ],
    steps: [
      {
        at: 0,
        title: "Higher timeframe bias",
        detail:
          "Weekly and daily are bullish. I am only interested in buys from a 4H discount today.",
      },
      {
        at: 6,
        title: "Liquidity mapped",
        detail:
          "Sell-side liquidity is resting below the Asian low, directly above my 4H point of interest.",
      },
      {
        at: 11,
        title: "Liquidity taken.",
        detail:
          "CPI prints and price raids the Asian low into the POI. This is the engineering I wait for — I do not enter here.",
      },
      {
        at: 15,
        title: "Market Structure Shift confirmed.",
        detail:
          "Price displaces up through the 5M swing high, leaving an order block and an unmitigated fair value gap behind.",
      },
      {
        at: 18,
        title: "Entry executed.",
        detail:
          "Limit fills on the fair value gap at 1.2716 with the stop protected below the raid at 1.2688.",
      },
      {
        at: 19,
        title: "Risk:Reward = 1:4.",
        detail:
          "28 pips of risk targeting 112 pips into the buy-side liquidity above the previous day high.",
      },
      {
        at: 28,
        title: "Trade in profit — hands off.",
        detail:
          "Price expands away from the entry. No partials, no stop moves — the plan was set before the entry.",
      },
      {
        at: 32,
        title: "Trade reaches TP.",
        detail: "Target hit at 1.2828 for a clean +4R. Result: TP.",
      },
    ],
    reasoning: [
      "Daily bias was bullish and price was discounted inside the 4H dealing range.",
      "Sell-side liquidity below the Asian low gave the release an obvious draw before the real move.",
      "I waited for the raid, then for the 5M market structure shift, and only entered on the fair value gap the displacement created.",
      "Stop placement below the raid meant the invalidation was structural rather than arbitrary.",
    ],
    lessons: [
      "Letting the news candle take liquidity first is what keeps my stop small.",
      "The confirmation candle is the trigger — not the sweep itself.",
      "Doing nothing after entry produced my best R of the month.",
    ],
  },
  {
    id: "usdcad-cpi-buy",
    pair: "USDCAD",
    title: "USDCAD CPI Buy",
    direction: "Buy",
    session: "New York — CPI release",
    catalyst: "CA CPI",
    digits: 4,
    candles: usdcadCandles,
    splitAt: 17,
    entry: 1.357,
    stop: 1.3544,
    target: 1.3661,
    rr: "1:3.5",
    result: "TP",
    bias: "4H bullish order flow with equal lows engineered below the London session — a textbook draw on liquidity into CPI.",
    levels: [
      {
        kind: "liquidity",
        label: "Equal lows — engineered liquidity",
        price: 1.3556,
        from: 4,
      },
      {
        kind: "poi",
        label: "4H demand POI",
        price: 1.3542,
        priceTo: 1.3572,
        from: 5,
      },
      {
        kind: "order-block",
        label: "Breaker block",
        price: 1.3556,
        priceTo: 1.3572,
        from: 13,
      },
      {
        kind: "fvg",
        label: "Fair value gap",
        price: 1.3572,
        priceTo: 1.3585,
        from: 15,
      },
      { kind: "entry", label: "Entry 1.3570", price: 1.357, from: 17 },
      { kind: "stop", label: "Stop loss 1.3544", price: 1.3544, from: 17 },
      { kind: "target", label: "Take profit 1.3661", price: 1.3661, from: 17 },
    ],
    steps: [
      {
        at: 0,
        title: "Higher timeframe bias",
        detail:
          "4H order flow is bullish and the daily has not yet reached its objective above.",
      },
      {
        at: 5,
        title: "Equal lows identified",
        detail:
          "Two matching lows sit under the London session — engineered liquidity waiting to be taken.",
      },
      {
        at: 10,
        title: "Liquidity taken.",
        detail:
          "CPI prints and the equal lows are raided straight into the 4H demand POI.",
      },
      {
        at: 14,
        title: "Market Structure Shift confirmed.",
        detail:
          "Displacement flips the previous supply into a breaker block and leaves a fair value gap above it.",
      },
      {
        at: 17,
        title: "Entry executed.",
        detail:
          "Entry on the breaker retest at 1.3570, stop below the raid at 1.3544.",
      },
      {
        at: 18,
        title: "Risk:Reward = 1:3.5.",
        detail: "26 pips risked to target the previous day high at 1.3661.",
      },
      {
        at: 26,
        title: "Objective in sight",
        detail:
          "Structure keeps making higher lows — the narrative is still valid.",
      },
      {
        at: 29,
        title: "Trade reaches TP.",
        detail: "Target filled at 1.3661 for +3.5R. Result: TP.",
      },
    ],
    reasoning: [
      "Equal lows in a bullish 4H narrative are the highest-quality variation of my Liquidity Reversal Model.",
      "The CPI release provided the volatility needed to raid them and reprice into the POI.",
      "The breaker block gave a tighter entry than the fair value gap alone, improving reward without widening risk.",
      "Target was the previous day high — a liquidity pool, not an arbitrary number of pips.",
    ],
    lessons: [
      "Equal lows plus a bullish higher timeframe is a setup I should never skip.",
      "Breaker retests improve my average R without changing the model.",
      "Naming the target liquidity before entry keeps me from closing trades early.",
    ],
  },
];
