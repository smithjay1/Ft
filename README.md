# The Road to My First Funded Account

An interactive Forex trading portfolio documenting the journey to a first funded account:
the trading model, the full trade journal, candle-by-candle trade replays and live
performance analytics computed from the journal itself.

## Pages

| Route                 | What it is                                                              |
| --------------------- | ----------------------------------------------------------------------- |
| `/`                   | Landing page — hero, pillars, Trade Replay section, milestones, roadmap |
| `/about`              | Who I am, why I trade Forex, my goal, why this website exists           |
| `/trading-edge`       | Liquidity Reversal Model, Smart Money Concepts, top-down analysis, risk |
| `/trade-journal`      | Every journaled trade with before/after charts, reasoning and lessons   |
| `/ftm-journey`        | Why FTM, road to a first FTM account, future updates                    |
| `/propscan`           | Simulates my R distribution against prop firm rule sets                 |
| `/account-finder`     | Four-question wizard that ranks account types by fit                    |
| `/win-rate-analytics` | Equity curve, R distribution, per-pair/session stats, expectancy tool   |
| `/timeline`           | Interactive milestone timeline with filters and detail panel            |

A full-screen logo animation plays once per browser session before collapsing into the
navigation bar.

## Data

Everything is derived from two data modules — there is no backend requirement:

- `client/data/journal.ts` — the trade journal plus the stats helpers used site-wide
- `client/data/replays.ts` — the two Trade Replay setups (GBPUSD and USDCAD CPI buys)
- `client/data/milestones.ts` — the road-to-funded milestones
- `client/data/accounts.ts` — account shapes and the Account Finder scoring

Charts are rendered from OHLC series built by `client/lib/candles.ts`, so no image assets
are needed and every chart is deterministic.

## Development

Requires Node 20.19+ or 22.12+ (Vite 8) and pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:8080
pnpm typecheck
pnpm build
pnpm start      # serve the production build
```

## Notes

Prop firm rule sets and account shapes in PROPSCAN and the Account Finder are
illustrative inputs for reasoning about fit — they are not quoted terms from any firm.
Nothing on the site is financial advice.
