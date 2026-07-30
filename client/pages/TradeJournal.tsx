import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CandleChart } from "@/components/chart/CandleChart";
import { buildSeries, hashSeed } from "@/lib/candles";
import {
  computeStats,
  journal,
  prettyDate,
  type JournalTrade,
  type TradeResult,
} from "@/data/journal";

const resultMeta: Record<TradeResult, { label: string; className: string }> = {
  TP: { label: "TP", className: "bg-bull/15 text-bull border-bull/30" },
  SL: { label: "SL", className: "bg-bear/15 text-bear border-bear/30" },
  BE: {
    label: "BE",
    className: "bg-ftm-cyan/15 text-ftm-cyan border-ftm-cyan/30",
  },
};

function charts(trade: JournalTrade) {
  const seed = hashSeed(trade.id);
  const bullish = trade.direction === "Buy";
  const magnitude = 0.006 * Math.max(Math.abs(trade.realizedR), 0.8);
  const outcomeDrift =
    trade.realizedR > 0
      ? bullish
        ? magnitude
        : -magnitude
      : trade.realizedR < 0
        ? bullish
          ? -magnitude * 0.6
          : magnitude * 0.6
        : magnitude * 0.15 * (bullish ? 1 : -1);

  const before = buildSeries({
    seed,
    length: 34,
    start: 1.25,
    volatility: 0.0009,
    drift: bullish ? -0.004 : 0.004,
  });
  const last = before[before.length - 1];
  const after = [
    ...before,
    ...buildSeries({
      seed: seed + 17,
      length: 26,
      start: last.c,
      volatility: 0.0009,
      drift: outcomeDrift,
    }),
  ];
  return { before, after };
}

export default function TradeJournal() {
  const [pair, setPair] = useState("All");
  const [result, setResult] = useState<"All" | TradeResult>("All");
  const [session, setSession] = useState("All");
  const [openId, setOpenId] = useState<string | null>(
    journal[journal.length - 1]?.id ?? null,
  );

  const pairs = useMemo(
    () => ["All", ...Array.from(new Set(journal.map((t) => t.pair))).sort()],
    [],
  );
  const sessions = useMemo(
    () => ["All", ...Array.from(new Set(journal.map((t) => t.session)))],
    [],
  );

  const filtered = useMemo(
    () =>
      [...journal]
        .sort((a, b) => b.date.localeCompare(a.date))
        .filter((t) => pair === "All" || t.pair === pair)
        .filter((t) => result === "All" || t.result === result)
        .filter((t) => session === "All" || t.session === session),
    [pair, result, session],
  );

  const stats = computeStats(filtered.length ? filtered : journal);

  return (
    <Layout>
      <PageHero
        eyebrow="Trade Journal"
        title="Every trade, reviewed — wins and losses."
        description="Each entry records the market bias, the before chart, the entry reasoning, the execution, the after chart, and the lesson the market charged me for."
      />

      <section className="shell py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Trades shown", value: filtered.length },
            { label: "Win rate", value: `${stats.winRate.toFixed(0)}%` },
            {
              label: "Net R",
              value: `${stats.totalR >= 0 ? "+" : ""}${stats.totalR.toFixed(1)}R`,
            },
            { label: "Expectancy", value: `${stats.expectancy.toFixed(2)}R` },
            { label: "Profit factor", value: stats.profitFactor.toFixed(2) },
          ].map((item) => (
            <div key={item.label} className="panel px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1.5 font-display text-xl font-semibold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="panel mt-6 flex flex-wrap items-center gap-4 px-5 py-4">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <Filter className="h-3.5 w-3.5 text-ftm-green" />
            Filters
          </span>
          <FilterGroup
            label="Pair"
            options={pairs}
            value={pair}
            onChange={setPair}
          />
          <FilterGroup
            label="Result"
            options={["All", "TP", "SL", "BE"]}
            value={result}
            onChange={(v) => setResult(v as "All" | TradeResult)}
          />
          <FilterGroup
            label="Session"
            options={sessions}
            value={session}
            onChange={setSession}
          />
        </div>
      </section>

      <section className="shell pb-24">
        <div className="grid gap-3">
          {filtered.map((trade, i) => {
            const open = openId === trade.id;
            const { before, after } = charts(trade);
            return (
              <Reveal key={trade.id} delay={Math.min(i * 0.03, 0.2)}>
                <article className="panel overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : trade.id)}
                    className="flex w-full flex-wrap items-center gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {prettyDate(trade.date)}
                    </span>
                    <span className="font-display text-base font-semibold text-white">
                      {trade.pair}
                    </span>
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                        trade.direction === "Buy"
                          ? "bg-bull/15 text-bull"
                          : "bg-bear/15 text-bear",
                      )}
                    >
                      {trade.direction}
                    </span>
                    <span className="chip hidden sm:inline-flex">
                      {trade.session}
                    </span>
                    <span className="chip hidden md:inline-flex">
                      {trade.entryTimeframe} entry
                    </span>
                    <span className="ml-auto flex items-center gap-3">
                      <span
                        className={cn(
                          "font-mono text-sm font-semibold",
                          trade.realizedR > 0
                            ? "text-bull"
                            : trade.realizedR < 0
                              ? "text-bear"
                              : "text-ftm-cyan",
                        )}
                      >
                        {trade.realizedR > 0 ? "+" : ""}
                        {trade.realizedR.toFixed(1)}R
                      </span>
                      <span
                        className={cn(
                          "rounded-md border px-2 py-0.5 font-mono text-[10px]",
                          resultMeta[trade.result].className,
                        )}
                      >
                        {resultMeta[trade.result].label}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          open && "rotate-180",
                        )}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden border-t border-ftm-line/70 bg-ftm-ink/40"
                      >
                        <div className="grid gap-6 p-5 lg:grid-cols-2">
                          <div>
                            <p className="eyebrow">Before chart</p>
                            <div className="mt-3 aspect-[1000/420] overflow-hidden rounded-xl border border-ftm-line bg-ftm-black/60">
                              <CandleChart
                                candles={before}
                                compact
                                showPriceAxis={false}
                              />
                            </div>
                          </div>
                          <div>
                            <p className="eyebrow">After chart</p>
                            <div className="mt-3 aspect-[1000/420] overflow-hidden rounded-xl border border-ftm-line bg-ftm-black/60">
                              <CandleChart
                                candles={after}
                                compact
                                showPriceAxis={false}
                              />
                            </div>
                          </div>

                          <div className="space-y-5">
                            <Field label="Market bias" body={trade.bias} />
                            <Field
                              label="Entry reasoning"
                              body={trade.reasoning}
                            />
                            <Field label="Execution" body={trade.execution} />
                          </div>

                          <div className="space-y-5">
                            <div className="rounded-xl border border-ftm-green/25 bg-ftm-green/[0.06] p-4">
                              <p className="eyebrow">Lesson learned</p>
                              <p className="mt-2 text-sm leading-relaxed text-white">
                                {trade.lesson}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              {[
                                { label: "Risk", value: `${trade.riskPct}%` },
                                {
                                  label: "Planned",
                                  value: `1:${trade.plannedRR}`,
                                },
                                { label: "Model", value: "LRM" },
                              ].map((item) => (
                                <div
                                  key={item.label}
                                  className="rounded-xl border border-ftm-line bg-ftm-black/50 px-4 py-3"
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
                            <div className="flex flex-wrap gap-2">
                              {trade.tags.map((tag) => (
                                <span key={tag} className="chip">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </Reveal>
            );
          })}

          {!filtered.length && (
            <p className="panel px-5 py-10 text-center text-sm text-muted-foreground">
              No trades match these filters.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-lg border px-2.5 py-1 font-mono text-[11px] transition-colors",
              value === option
                ? "border-ftm-green/50 bg-ftm-green/10 text-ftm-green"
                : "border-ftm-line text-muted-foreground hover:text-white",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
