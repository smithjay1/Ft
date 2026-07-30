import { useMemo, useState } from "react";
import { AlertTriangle, Radar, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { computeStats, journal } from "@/data/journal";
import { scanRuleSet, type RuleSet } from "@/lib/propscan";

const defaultRuleSets: RuleSet[] = [
  {
    id: "instant",
    name: "Instant funding style",
    note: "Live from day one, tighter overall drawdown, no profit target to unlock trading.",
    profitTarget: 6,
    maxDailyLoss: 4,
    maxOverallLoss: 6,
    minTradingDays: 3,
  },
  {
    id: "one-step",
    name: "1-step evaluation",
    note: "Single phase to a profit target with a static overall drawdown.",
    profitTarget: 10,
    maxDailyLoss: 5,
    maxOverallLoss: 10,
    minTradingDays: 4,
  },
  {
    id: "two-step",
    name: "2-step evaluation",
    note: "Phase one target modelled here; phase two is usually half the target.",
    profitTarget: 8,
    maxDailyLoss: 5,
    maxOverallLoss: 10,
    minTradingDays: 5,
  },
  {
    id: "aggressive",
    name: "Aggressive challenge",
    note: "High target with a tight daily loss cap — the stress test for my process.",
    profitTarget: 12,
    maxDailyLoss: 3,
    maxOverallLoss: 6,
    minTradingDays: 5,
  },
];

const RUNS = 600;

function verdict(passRate: number) {
  if (passRate >= 70)
    return {
      label: "Survives",
      className: "text-bull border-bull/35 bg-bull/10",
    };
  if (passRate >= 45)
    return {
      label: "Marginal",
      className: "text-[#f5c451] border-[#f5c451]/35 bg-[#f5c451]/10",
    };
  return {
    label: "Breaches",
    className: "text-bear border-bear/35 bg-bear/10",
  };
}

export default function PropScan() {
  const [riskPerTrade, setRiskPerTrade] = useState(0.5);
  const [tradesPerDay, setTradesPerDay] = useState(2);
  const [ruleSets, setRuleSets] = useState(defaultRuleSets);
  const [selectedId, setSelectedId] = useState(defaultRuleSets[1].id);

  const stats = useMemo(() => computeStats(journal), []);
  const results = useMemo(
    () =>
      ruleSets.map((rules) => ({
        rules,
        result: scanRuleSet(journal, rules, {
          riskPerTrade,
          tradesPerDay,
          runs: RUNS,
        }),
      })),
    [ruleSets, riskPerTrade, tradesPerDay],
  );

  const selected = results.find((r) => r.rules.id === selectedId) ?? results[0];

  const updateSelected = (patch: Partial<RuleSet>) =>
    setRuleSets((sets) =>
      sets.map((set) =>
        set.id === selected.rules.id ? { ...set, ...patch } : set,
      ),
    );

  return (
    <Layout>
      <PageHero
        eyebrow="PROPSCAN"
        title="Scan prop firm rule sets against my real trading data."
        description="PROPSCAN replays the R-multiple distribution from my journal thousands of times against a rule set to estimate how often my current process clears the objective without breaching a limit."
      >
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Trades in sample", value: stats.total },
            { label: "Win rate", value: `${stats.winRate.toFixed(0)}%` },
            { label: "Expectancy", value: `${stats.expectancy.toFixed(2)}R` },
            { label: "Simulations per rule set", value: RUNS.toLocaleString() },
          ].map((item) => (
            <span key={item.label} className="chip normal-case tracking-normal">
              {item.label}: <strong className="text-white">{item.value}</strong>
            </span>
          ))}
        </div>
      </PageHero>

      <section className="shell py-12">
        <div className="panel flex flex-col gap-6 p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid flex-1 gap-6 sm:grid-cols-2">
            <Slider
              label="Risk per trade"
              suffix="%"
              value={riskPerTrade}
              min={0.25}
              max={2}
              step={0.25}
              onChange={setRiskPerTrade}
            />
            <Slider
              label="Trades per day"
              value={tradesPerDay}
              min={1}
              max={5}
              step={1}
              onChange={setTradesPerDay}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setRiskPerTrade(0.5);
              setTradesPerDay(2);
              setRuleSets(defaultRuleSets);
            }}
            className="inline-flex items-center gap-2 self-start rounded-xl border border-ftm-line px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-ftm-green/50 hover:text-white lg:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to my plan
          </button>
        </div>
      </section>

      <section className="shell pb-12">
        <SectionHeading
          eyebrow="Scan results"
          title="Which rule sets does my process actually survive?"
        />
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[860px] border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 pb-2">Rule set</th>
                <th className="px-4 pb-2">Target</th>
                <th className="px-4 pb-2">Daily loss</th>
                <th className="px-4 pb-2">Overall loss</th>
                <th className="px-4 pb-2">Pass rate</th>
                <th className="px-4 pb-2">Avg days</th>
                <th className="px-4 pb-2">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ rules, result }) => {
                const tone = verdict(result.passRate);
                const active = rules.id === selected.rules.id;
                return (
                  <tr
                    key={rules.id}
                    onClick={() => setSelectedId(rules.id)}
                    className={cn(
                      "cursor-pointer bg-ftm-panel/60 text-sm transition-colors",
                      active
                        ? "text-white"
                        : "text-muted-foreground hover:text-white",
                    )}
                  >
                    <td
                      className={cn(
                        "rounded-l-xl border border-r-0 px-4 py-3 font-medium",
                        active ? "border-ftm-green/45" : "border-ftm-line",
                      )}
                    >
                      {rules.name}
                    </td>
                    <td
                      className={cn(
                        "border-y px-4 py-3 font-mono",
                        active ? "border-ftm-green/45" : "border-ftm-line",
                      )}
                    >
                      {rules.profitTarget}%
                    </td>
                    <td
                      className={cn(
                        "border-y px-4 py-3 font-mono",
                        active ? "border-ftm-green/45" : "border-ftm-line",
                      )}
                    >
                      {rules.maxDailyLoss}%
                    </td>
                    <td
                      className={cn(
                        "border-y px-4 py-3 font-mono",
                        active ? "border-ftm-green/45" : "border-ftm-line",
                      )}
                    >
                      {rules.maxOverallLoss}%
                    </td>
                    <td
                      className={cn(
                        "border-y px-4 py-3 font-mono text-white",
                        active ? "border-ftm-green/45" : "border-ftm-line",
                      )}
                    >
                      {result.passRate.toFixed(1)}%
                    </td>
                    <td
                      className={cn(
                        "border-y px-4 py-3 font-mono",
                        active ? "border-ftm-green/45" : "border-ftm-line",
                      )}
                    >
                      {result.avgDaysToTarget
                        ? result.avgDaysToTarget.toFixed(1)
                        : "—"}
                    </td>
                    <td
                      className={cn(
                        "rounded-r-xl border border-l-0 px-4 py-3",
                        active ? "border-ftm-green/45" : "border-ftm-line",
                      )}
                    >
                      <span
                        className={cn(
                          "rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                          tone.className,
                        )}
                      >
                        {tone.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="shell pb-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <div className="panel h-full p-6">
              <div className="flex items-center gap-2">
                <Radar className="h-4 w-4 text-ftm-green" />
                <p className="font-display text-base font-semibold text-white">
                  Tune the rule set
                </p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {selected.rules.note}
              </p>
              <div className="mt-6 grid gap-6">
                <Slider
                  label="Profit target"
                  suffix="%"
                  value={selected.rules.profitTarget}
                  min={4}
                  max={20}
                  step={1}
                  onChange={(v) => updateSelected({ profitTarget: v })}
                />
                <Slider
                  label="Max daily loss"
                  suffix="%"
                  value={selected.rules.maxDailyLoss}
                  min={2}
                  max={8}
                  step={0.5}
                  onChange={(v) => updateSelected({ maxDailyLoss: v })}
                />
                <Slider
                  label="Max overall loss"
                  suffix="%"
                  value={selected.rules.maxOverallLoss}
                  min={4}
                  max={14}
                  step={0.5}
                  onChange={(v) => updateSelected({ maxOverallLoss: v })}
                />
                <Slider
                  label="Minimum trading days"
                  value={selected.rules.minTradingDays}
                  min={0}
                  max={10}
                  step={1}
                  onChange={(v) => updateSelected({ minTradingDays: v })}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="panel h-full p-6">
              <p className="eyebrow">{selected.rules.name}</p>
              <div className="mt-4 flex items-end gap-3">
                <span className="font-display text-5xl font-semibold text-white">
                  {selected.result.passRate.toFixed(1)}%
                </span>
                <span className="pb-2 text-sm text-muted-foreground">
                  of simulated attempts clear the objective
                </span>
              </div>

              <div className="mt-6 grid gap-2.5">
                {[
                  {
                    label: "Objective reached",
                    value: selected.result.passRate,
                    className: "bg-bull",
                  },
                  {
                    label: "Daily loss breach",
                    value: selected.result.dailyBreaches,
                    className: "bg-bear",
                  },
                  {
                    label: "Overall drawdown breach",
                    value: selected.result.overallBreaches,
                    className: "bg-[#ff8fa1]",
                  },
                  {
                    label: "Ran out of runway",
                    value: selected.result.timeouts,
                    className: "bg-muted-foreground",
                  },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-mono text-white">
                        {row.value.toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ftm-line/60">
                      <div
                        className={cn("h-full rounded-full", row.className)}
                        style={{ width: `${Math.min(row.value, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Metric
                  label="Median outcome"
                  value={`${selected.result.medianReturn >= 0 ? "+" : ""}${selected.result.medianReturn.toFixed(2)}%`}
                />
                <Metric
                  label="Worst simulated drawdown"
                  value={`${selected.result.worstDrawdown.toFixed(2)}%`}
                />
                <Metric
                  label="Avg days to target"
                  value={
                    selected.result.avgDaysToTarget
                      ? selected.result.avgDaysToTarget.toFixed(1)
                      : "—"
                  }
                />
                <Metric label="Risk per trade" value={`${riskPerTrade}%`} />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="panel mt-6 flex items-start gap-3 p-5">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c451]" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              The presets are illustrative rule shapes, not quoted terms from
              any firm — always confirm the current objectives directly with the
              prop firm before paying a fee. Results are a simulation of my own
              historical R distribution and are not a prediction of future
              performance.
            </p>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-ftm-line bg-ftm-ink/60 px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-mono text-sm text-white">{value}</p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="font-mono text-sm text-ftm-green">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ftm-line accent-ftm-green"
      />
    </label>
  );
}
