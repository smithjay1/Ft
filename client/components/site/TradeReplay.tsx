import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import { CandleChart } from "@/components/chart/CandleChart";
import { replays, type ReplayTrade } from "@/data/replays";

const SPEEDS = [1, 2, 4] as const;
const BASE_INTERVAL = 420;

const legend = [
  { label: "Liquidity", className: "bg-bear" },
  { label: "Point of Interest", className: "bg-ftm-cyan" },
  { label: "Order Block", className: "bg-[#7c6bff]" },
  { label: "Fair Value Gap", className: "bg-[#f5c451]" },
  { label: "Entry / SL / TP", className: "bg-white" },
];

function ReplayPlayer({ trade }: { trade: ReplayTrade }) {
  const [visible, setVisible] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = trade.candles.length;
  const finished = visible >= total;

  useEffect(() => {
    if (!playing || finished) return;
    const id = window.setInterval(
      () => setVisible((v) => Math.min(v + 1, total)),
      BASE_INTERVAL / speed,
    );
    return () => window.clearInterval(id);
  }, [playing, finished, speed, total]);

  useEffect(() => {
    if (finished) setPlaying(false);
  }, [finished]);

  // Start the replay only once it is actually on screen.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          setPlaying(true);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const activeStep = useMemo(() => {
    const reached = trade.steps.filter((step) => step.at <= visible - 1);
    return reached[reached.length - 1] ?? trade.steps[0];
  }, [trade.steps, visible]);

  const restart = () => {
    setVisible(1);
    setPlaying(true);
  };

  return (
    <div ref={containerRef} className="panel overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ftm-line/70 px-5 py-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="font-display text-lg font-semibold text-white">
              {trade.title}
            </h3>
            <span
              className={cn(
                "rounded-md px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider",
                trade.direction === "Buy"
                  ? "bg-bull/15 text-bull"
                  : "bg-bear/15 text-bear",
              )}
            >
              {trade.direction}
            </span>
            <span className="chip">{trade.rr}</span>
          </div>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {trade.session} · 5M execution
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => (finished ? restart() : setPlaying((p) => !p))}
            className="flex items-center gap-1.5 rounded-lg bg-ftm-green px-3 py-2 text-xs font-semibold text-ftm-black transition-colors hover:bg-emerald-400"
            aria-label={playing ? "Pause replay" : "Play replay"}
          >
            {playing ? (
              <Pause className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
            {playing ? "Pause" : finished ? "Replay" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setVisible((v) => Math.min(v + 1, total));
            }}
            className="flex items-center gap-1.5 rounded-lg border border-ftm-line px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-ftm-green/50 hover:text-white"
            aria-label="Next candle"
          >
            <SkipForward className="h-3.5 w-3.5" />
            Next candle
          </button>
          <button
            type="button"
            onClick={restart}
            className="flex items-center gap-1.5 rounded-lg border border-ftm-line px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-ftm-green/50 hover:text-white"
            aria-label="Restart replay"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restart
          </button>
          <div className="flex overflow-hidden rounded-lg border border-ftm-line">
            {SPEEDS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSpeed(option)}
                className={cn(
                  "px-2.5 py-2 font-mono text-[11px] transition-colors",
                  speed === option
                    ? "bg-ftm-green/15 text-ftm-green"
                    : "text-muted-foreground hover:text-white",
                )}
              >
                {option}x
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative aspect-[1000/420] w-full bg-ftm-ink/70">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <CandleChart
          candles={trade.candles}
          visible={visible}
          levels={trade.levels}
          digits={trade.digits}
          className="absolute inset-0"
        />
      </div>

      <div className="h-1 w-full bg-ftm-line/60">
        <div
          className="h-full bg-gradient-to-r from-ftm-green to-ftm-cyan transition-all duration-200"
          style={{ width: `${(visible / total) * 100}%` }}
        />
      </div>

      <div className="grid gap-5 px-5 py-5 lg:grid-cols-[1.2fr_1fr]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="rounded-xl border border-ftm-green/25 bg-ftm-green/[0.06] p-4"
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-ftm-green">
              Step {trade.steps.indexOf(activeStep) + 1} of {trade.steps.length}
            </p>
            <p className="mt-2 font-display text-base font-semibold text-white">
              {activeStep.title}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {activeStep.detail}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
          {[
            { label: "Entry", value: trade.entry.toFixed(trade.digits) },
            { label: "Stop", value: trade.stop.toFixed(trade.digits) },
            { label: "Target", value: trade.target.toFixed(trade.digits) },
            { label: "Result", value: trade.result },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-ftm-line bg-ftm-ink/60 p-3"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-ftm-line/70 px-5 py-3">
        {legend.map((item) => (
          <span
            key={item.label}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
          >
            <span className={cn("h-2 w-2 rounded-sm", item.className)} />
            {item.label}
          </span>
        ))}
      </div>

      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ftm-line/70 bg-ftm-ink/40"
          >
            <div className="grid gap-6 p-5 lg:grid-cols-2">
              <div>
                <p className="eyebrow">Before — at entry</p>
                <div className="mt-3 aspect-[1000/420] overflow-hidden rounded-xl border border-ftm-line bg-ftm-black/60">
                  <CandleChart
                    candles={trade.candles.slice(0, trade.splitAt + 1)}
                    levels={trade.levels.filter((l) => l.from <= trade.splitAt)}
                    digits={trade.digits}
                    showLabels={false}
                    compact
                  />
                </div>
              </div>
              <div>
                <p className="eyebrow">After — trade complete</p>
                <div className="mt-3 aspect-[1000/420] overflow-hidden rounded-xl border border-ftm-line bg-ftm-black/60">
                  <CandleChart
                    candles={trade.candles}
                    levels={trade.levels}
                    digits={trade.digits}
                    showLabels={false}
                    compact
                  />
                </div>
              </div>
              <div>
                <p className="eyebrow">Entry reasoning</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {trade.reasoning.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ftm-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow">Lessons learned</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {trade.lessons.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ftm-cyan" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 rounded-xl border border-ftm-green/30 bg-ftm-green/[0.07] px-4 py-3 font-mono text-xs uppercase tracking-wider text-ftm-green">
                  Final result: {trade.result} · {trade.rr}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TradeReplaySection() {
  return (
    <div className="grid gap-8">
      {replays.map((trade) => (
        <ReplayPlayer key={trade.id} trade={trade} />
      ))}
    </div>
  );
}

export { ReplayPlayer };
