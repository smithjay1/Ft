import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  computeStats,
  equityCurve,
  groupBy,
  journal,
  monthLabel,
} from "@/data/journal";

const axisStyle = {
  fill: "#6b7c8c",
  fontSize: 11,
  fontFamily: "JetBrains Mono, monospace",
};

const tooltipStyle = {
  contentStyle: {
    background: "#0e151c",
    border: "1px solid #1b2732",
    borderRadius: 12,
    fontSize: 12,
  },
  labelStyle: { color: "#ffffff", fontFamily: "JetBrains Mono, monospace" },
  itemStyle: { color: "#9fb0bf" },
};

export default function WinRateAnalytics() {
  const stats = useMemo(() => computeStats(journal), []);
  const curve = useMemo(() => equityCurve(journal), []);
  const [winRate, setWinRate] = useState(Math.round(stats.winRate));
  const [avgWin, setAvgWin] = useState(Number(stats.avgWin.toFixed(1)));

  const byPair = useMemo(() => {
    const groups = groupBy(journal, (t) => t.pair);
    return Object.entries(groups)
      .map(([pair, trades]) => ({
        pair,
        trades: trades.length,
        winRate:
          (trades.filter((t) => t.result === "TP").length / trades.length) *
          100,
        netR: Number(
          trades.reduce((sum, t) => sum + t.realizedR, 0).toFixed(1),
        ),
      }))
      .sort((a, b) => b.netR - a.netR);
  }, []);

  const bySession = useMemo(() => {
    const groups = groupBy(journal, (t) => t.session);
    return Object.entries(groups).map(([session, trades]) => ({
      session,
      trades: trades.length,
      winRate: Number(
        (
          (trades.filter((t) => t.result === "TP").length / trades.length) *
          100
        ).toFixed(0),
      ),
      netR: Number(trades.reduce((sum, t) => sum + t.realizedR, 0).toFixed(1)),
    }));
  }, []);

  const byMonth = useMemo(() => {
    const groups = groupBy(journal, (t) => monthLabel(t.date));
    return Object.entries(groups).map(([month, trades]) => ({
      month,
      netR: Number(trades.reduce((sum, t) => sum + t.realizedR, 0).toFixed(1)),
      trades: trades.length,
    }));
  }, []);

  const distribution = useMemo(() => {
    const buckets = [
      { label: "-1R", test: (r: number) => r <= -0.5 },
      { label: "0R", test: (r: number) => r > -0.5 && r < 0.5 },
      { label: "+1R–2R", test: (r: number) => r >= 0.5 && r < 2.5 },
      { label: "+3R", test: (r: number) => r >= 2.5 && r < 3.5 },
      { label: "+4R", test: (r: number) => r >= 3.5 },
    ];
    return buckets.map((bucket) => ({
      label: bucket.label,
      count: journal.filter((t) => bucket.test(t.realizedR)).length,
    }));
  }, []);

  const outcomeSplit = [
    { name: "TP", value: stats.wins, fill: "#12e06a" },
    { name: "SL", value: stats.losses, fill: "#ff5470" },
    { name: "BE", value: stats.breakeven, fill: "#22e0d0" },
  ];

  const simulatedExpectancy =
    (winRate / 100) * avgWin - (1 - winRate / 100) * 1;

  return (
    <Layout>
      <PageHero
        eyebrow="Win Rate Analytics"
        title="The numbers behind the journal."
        description="Every figure on this page is computed from the trade journal at render time — change the journal and these charts change with it."
      />

      <section className="shell py-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Win rate",
              value: `${stats.winRate.toFixed(1)}%`,
              sub: `${stats.wins}W / ${stats.losses}L / ${stats.breakeven}BE`,
            },
            {
              label: "Expectancy",
              value: `${stats.expectancy.toFixed(2)}R`,
              sub: "Per trade, all trades",
            },
            {
              label: "Profit factor",
              value: stats.profitFactor.toFixed(2),
              sub: "Gross win ÷ gross loss",
            },
            {
              label: "Net result",
              value: `+${stats.totalR.toFixed(1)}R`,
              sub: `Best +${stats.bestR}R · Worst ${stats.worstR}R`,
            },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.05}>
              <div className="panel h-full p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                <p className="stat-num mt-2">{item.value}</p>
                <p className="mt-2 text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell pb-12">
        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="panel h-full p-6">
              <p className="eyebrow">Equity curve — R multiples</p>
              <div className="mt-6 h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={curve}
                    margin={{ left: -18, right: 6, top: 6 }}
                  >
                    <defs>
                      <linearGradient
                        id="equityFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#12e06a"
                          stopOpacity={0.45}
                        />
                        <stop
                          offset="100%"
                          stopColor="#12e06a"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="label" tick={axisStyle} stroke="#1b2732" />
                    <YAxis tick={axisStyle} stroke="#1b2732" />
                    <Tooltip
                      {...tooltipStyle}
                      formatter={(value: number) => [`${value}R`, "Cumulative"]}
                      labelFormatter={(label, payload) => {
                        const point = payload?.[0]?.payload;
                        return point
                          ? `${point.pair} · ${point.date}`
                          : String(label);
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="equity"
                      stroke="#12e06a"
                      strokeWidth={2}
                      fill="url(#equityFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Max drawdown",
                    value: `${stats.maxDrawdownR.toFixed(1)}R`,
                  },
                  {
                    label: "Longest win streak",
                    value: stats.longestWinStreak,
                  },
                  {
                    label: "Avg win / avg loss",
                    value: `${stats.avgWin.toFixed(1)}R / ${stats.avgLoss.toFixed(1)}R`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-ftm-line bg-ftm-ink/60 px-4 py-3"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 font-mono text-sm text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="panel h-full p-6">
              <p className="eyebrow">Outcome split</p>
              <div className="mt-4 h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={outcomeSplit}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={62}
                      outerRadius={92}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {outcomeSplit.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      formatter={(value) => (
                        <span style={{ color: "#9fb0bf", fontSize: 12 }}>
                          {value}
                        </span>
                      )}
                    />
                    <Tooltip {...tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                A {stats.winRate.toFixed(0)}% win rate only works because the
                average winner is{" "}
                {Math.abs(stats.avgWin / stats.avgLoss).toFixed(1)}× the average
                loser.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell pb-12">
        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal>
            <div className="panel h-full p-6">
              <p className="eyebrow">R distribution</p>
              <div className="mt-6 h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={distribution}
                    margin={{ left: -22, right: 6 }}
                  >
                    <XAxis dataKey="label" tick={axisStyle} stroke="#1b2732" />
                    <YAxis
                      tick={axisStyle}
                      stroke="#1b2732"
                      allowDecimals={false}
                    />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {distribution.map((entry) => (
                        <Cell
                          key={entry.label}
                          fill={
                            entry.label === "-1R"
                              ? "#ff5470"
                              : entry.label === "0R"
                                ? "#22e0d0"
                                : "#12e06a"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="panel h-full p-6">
              <p className="eyebrow">Net R by month</p>
              <div className="mt-6 h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byMonth} margin={{ left: -22, right: 6 }}>
                    <XAxis dataKey="month" tick={axisStyle} stroke="#1b2732" />
                    <YAxis tick={axisStyle} stroke="#1b2732" />
                    <Tooltip
                      {...tooltipStyle}
                      formatter={(value: number) => [`${value}R`, "Net"]}
                    />
                    <Bar dataKey="netR" radius={[6, 6, 0, 0]} fill="#12e06a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="panel h-full p-6">
              <p className="eyebrow">Win rate by session</p>
              <div className="mt-6 grid gap-4">
                {bySession.map((row) => (
                  <div key={row.session}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white">{row.session}</span>
                      <span className="font-mono text-muted-foreground">
                        {row.winRate}% · {row.netR >= 0 ? "+" : ""}
                        {row.netR}R · {row.trades} trades
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ftm-line/60">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-ftm-green to-ftm-cyan"
                        style={{ width: `${row.winRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell pb-12">
        <SectionHeading
          eyebrow="Pair performance"
          title="Where the edge actually comes from."
          description="Trade filtering by pair, ranked by net R rather than by win rate — a high win rate on a small sample proves nothing."
        />
        <Reveal delay={0.06}>
          <div className="panel mt-8 overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b border-ftm-line/70 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3">Pair</th>
                  <th className="px-5 py-3">Trades</th>
                  <th className="px-5 py-3">Win rate</th>
                  <th className="px-5 py-3">Net R</th>
                  <th className="px-5 py-3">Contribution</th>
                </tr>
              </thead>
              <tbody>
                {byPair.map((row) => (
                  <tr
                    key={row.pair}
                    className="border-b border-ftm-line/40 last:border-0"
                  >
                    <td className="px-5 py-3 text-white">{row.pair}</td>
                    <td className="px-5 py-3 font-mono text-muted-foreground">
                      {row.trades}
                    </td>
                    <td className="px-5 py-3 font-mono text-muted-foreground">
                      {row.winRate.toFixed(0)}%
                    </td>
                    <td
                      className={
                        row.netR >= 0
                          ? "px-5 py-3 font-mono text-bull"
                          : "px-5 py-3 font-mono text-bear"
                      }
                    >
                      {row.netR >= 0 ? "+" : ""}
                      {row.netR}R
                    </td>
                    <td className="px-5 py-3">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ftm-line/60">
                        <div
                          className={
                            row.netR >= 0 ? "h-full bg-bull" : "h-full bg-bear"
                          }
                          style={{
                            width: `${Math.min(
                              (Math.abs(row.netR) /
                                Math.max(
                                  ...byPair.map((p) => Math.abs(p.netR)),
                                )) *
                                100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <section className="shell pb-24">
        <div className="panel grid gap-8 p-6 md:p-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Expectancy calculator</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white">
              Why win rate alone means nothing.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Drag the inputs to see what actually drives expectancy. My own
              numbers are loaded as the starting point: a{" "}
              {stats.winRate.toFixed(0)}% win rate with an average winner of{" "}
              {stats.avgWin.toFixed(1)}R.
            </p>
            <div className="mt-7 grid gap-6">
              <label className="block">
                <span className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Win rate
                  </span>
                  <span className="font-mono text-sm text-ftm-green">
                    {winRate}%
                  </span>
                </span>
                <input
                  type="range"
                  min={20}
                  max={90}
                  step={1}
                  value={winRate}
                  onChange={(e) => setWinRate(Number(e.target.value))}
                  className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ftm-line accent-ftm-green"
                />
              </label>
              <label className="block">
                <span className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Average winner
                  </span>
                  <span className="font-mono text-sm text-ftm-green">
                    {avgWin}R
                  </span>
                </span>
                <input
                  type="range"
                  min={0.5}
                  max={6}
                  step={0.1}
                  value={avgWin}
                  onChange={(e) => setAvgWin(Number(e.target.value))}
                  className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ftm-line accent-ftm-green"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-ftm-line bg-ftm-ink/50 p-6">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Expectancy per trade
            </p>
            <p
              className={
                simulatedExpectancy >= 0
                  ? "mt-2 font-display text-5xl font-semibold text-bull"
                  : "mt-2 font-display text-5xl font-semibold text-bear"
              }
            >
              {simulatedExpectancy >= 0 ? "+" : ""}
              {simulatedExpectancy.toFixed(2)}R
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              At 0.5% risk per trade that is{" "}
              <span className="font-mono text-white">
                {(simulatedExpectancy * 0.5).toFixed(2)}%
              </span>{" "}
              of the account per trade, or{" "}
              <span className="font-mono text-white">
                {(simulatedExpectancy * 0.5 * 8).toFixed(2)}%
              </span>{" "}
              over a typical 8-trade month.
            </p>
            <p className="mt-4 rounded-xl border border-ftm-green/25 bg-ftm-green/[0.06] px-4 py-3 text-xs leading-relaxed text-ftm-green">
              A 40% win rate with 3R winners beats a 70% win rate with 0.5R
              winners. This is why my model targets liquidity pools instead of
              fixed pip counts.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
