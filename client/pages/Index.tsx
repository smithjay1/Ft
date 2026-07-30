import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Compass,
  LineChart,
  Radar,
  ShieldCheck,
  Target,
  Timer,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TradeReplaySection } from "@/components/site/TradeReplay";
import { CandleChart } from "@/components/chart/CandleChart";
import { buildSeries } from "@/lib/candles";
import { computeStats, journal } from "@/data/journal";
import { milestones } from "@/data/milestones";

const heroCandles = buildSeries({
  seed: 990211,
  length: 64,
  start: 1.2612,
  volatility: 0.0011,
  drift: 0.019,
});

const tickerPairs = [
  "GBPUSD",
  "USDCAD",
  "EURUSD",
  "GBPJPY",
  "XAUUSD",
  "USDJPY",
  "AUDUSD",
  "EURJPY",
  "NAS100",
  "USDCHF",
];

const pillars = [
  {
    icon: Compass,
    title: "Liquidity Reversal Model",
    body: "Wait for liquidity to be engineered, then enter with confirmation instead of chasing price.",
    to: "/trading-edge",
    cta: "See the model",
  },
  {
    icon: BookOpen,
    title: "Every trade journaled",
    body: "Bias, before chart, entry reasoning, execution, after chart and the lesson — for wins and losses alike.",
    to: "/trade-journal",
    cta: "Open the journal",
  },
  {
    icon: Target,
    title: "The road to funded",
    body: "A public checklist of what is done, what is in progress and what still stands between me and a payout.",
    to: "/ftm-journey",
    cta: "Track the journey",
  },
];

const tools = [
  {
    icon: Radar,
    name: "PROPSCAN",
    body: "Scan prop firm rule sets against my actual trading stats to see which challenges my process survives.",
    to: "/propscan",
  },
  {
    icon: ShieldCheck,
    name: "FTM Account Finder",
    body: "Answer a few questions about capital and risk to find the FTM account type that fits my plan.",
    to: "/account-finder",
  },
  {
    icon: BarChart3,
    name: "Win Rate Analytics",
    body: "Win rate, expectancy, R distribution and equity curve computed live from the journal.",
    to: "/win-rate-analytics",
  },
  {
    icon: Timer,
    name: "Interactive Timeline",
    body: "Every milestone of the journey, filterable and clickable, from first lesson to first payout.",
    to: "/timeline",
  },
];

const comingSoon = [
  "AI Trading Statistics Dashboard",
  "Risk-to-Reward Performance",
  "Monthly Performance Reports",
  "Weekly Trade Recaps",
  "Trading Heatmaps",
  "Trade Filtering by Pair",
  "Economic News Archive",
  "Personal Trading Insights",
];

export default function Index() {
  const stats = computeStats(journal);
  const done = milestones.filter((m) => m.status === "done").length;

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-70" />
        <div className="absolute left-1/2 top-[-18rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(18,224,106,0.16),transparent_65%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ftm-black to-transparent" />

        <div className="shell relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              Forex trader · Smart Money Concepts · Public journal
            </motion.p>
            <motion.h1
              className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              The Road to My{" "}
              <span className="gradient-text glow-text">First Funded</span>{" "}
              Account.
            </motion.h1>
            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              I'm a Forex trader documenting every step of my journey — from
              analysis and execution to lessons learned — with one goal in mind:
              becoming a consistently profitable trader and earning my first
              funded account.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
            >
              <Link
                to="/ftm-journey"
                className="group inline-flex items-center gap-2 rounded-xl bg-ftm-green px-5 py-3 text-sm font-semibold text-ftm-black transition-all hover:bg-emerald-400 hover:shadow-[0_18px_45px_-18px_rgba(18,224,106,0.8)]"
              >
                Explore My Journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/trade-journal"
                className="inline-flex items-center gap-2 rounded-xl border border-ftm-line bg-ftm-panel/60 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-ftm-green/50"
              >
                View Trade Journal
                <LineChart className="h-4 w-4 text-ftm-green" />
              </Link>
            </motion.div>

            <motion.dl
              className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                { label: "Trades journaled", value: stats.total },
                { label: "Win rate", value: `${stats.winRate.toFixed(0)}%` },
                { label: "Net R", value: `+${stats.totalR.toFixed(1)}R` },
                {
                  label: "Milestones cleared",
                  value: `${done}/${milestones.length}`,
                },
              ].map((item) => (
                <div key={item.label}>
                  <dd className="stat-num">{item.value}</dd>
                  <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {item.label}
                  </dt>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            className="panel relative overflow-hidden"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-ftm-line/70 px-4 py-3">
              <span className="font-mono text-xs text-white">GBPUSD · 5M</span>
              <span className="font-mono text-[11px] text-ftm-green">
                Liquidity Reversal Model
              </span>
            </div>
            <div className="aspect-[1000/420] bg-ftm-ink/70">
              <CandleChart candles={heroCandles} digits={4} compact />
            </div>
            <div className="grid grid-cols-3 divide-x divide-ftm-line/70 border-t border-ftm-line/70">
              {[
                { label: "Model", value: "LRM" },
                { label: "Risk / trade", value: "0.5%" },
                { label: "Avg target", value: "1:3.4" },
              ].map((item) => (
                <div key={item.label} className="px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-0.5 font-mono text-sm text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-ftm-line/70 bg-ftm-ink/50 py-3">
        <div className="flex w-max animate-ticker gap-10">
          {[...tickerPairs, ...tickerPairs].map((pair, i) => (
            <span
              key={`${pair}-${i}`}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ftm-green/70" />
              {pair}
            </span>
          ))}
        </div>
      </div>

      <section className="section shell">
        <SectionHeading
          eyebrow="What this site is"
          title="A trading portfolio that documents the process, not just the results."
          description="Three things drive everything here: a tested model, an honest journal, and a public record of the road to a funded account."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <Link
                to={pillar.to}
                className="panel panel-hover group flex h-full flex-col p-6"
              >
                <pillar.icon className="h-6 w-6 text-ftm-green" />
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ftm-green">
                  {pillar.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="trade-replay" className="section shell">
        <SectionHeading
          eyebrow="Trade Replay"
          title="Watch the trade unfold candle by candle."
          description="Not a screenshot of a win — a replay. Liquidity gets taken, structure shifts, the entry appears only when the confirmation candle closes, and every step is explained as it happens."
        />
        <div className="mt-12">
          <TradeReplaySection />
        </div>
      </section>

      <section className="section shell">
        <SectionHeading
          eyebrow="Interactive tools"
          title="Standalone tools built for this journey."
          description="Each tool runs on the same journal data, so what you see reflects how I actually trade."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {tools.map((tool, i) => (
            <Reveal key={tool.name} delay={i * 0.06}>
              <Link
                to={tool.to}
                className="panel panel-hover group flex h-full items-start gap-4 p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ftm-green/25 bg-ftm-green/10">
                  <tool.icon className="h-5 w-5 text-ftm-green" />
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-base font-semibold text-white">
                      {tool.name}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-ftm-green transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                    {tool.body}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="panel grid gap-8 p-7 lg:grid-cols-[1fr_1fr] lg:p-10">
          <div>
            <p className="eyebrow">Road to my first FTM account</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">
              {done} of {milestones.length} milestones cleared.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              I haven't traded with FTM yet. Everything here reflects genuine
              interest — fast payouts, instant funding options and
              trader-friendly rules — rather than personal experience. The plan
              is to earn the opportunity, then share real results.
            </p>
            <Link
              to="/timeline"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ftm-green"
            >
              Open the interactive timeline
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="grid gap-2.5">
            {milestones.map((milestone) => (
              <li
                key={milestone.title}
                className="flex items-center gap-3 rounded-xl border border-ftm-line/70 bg-ftm-ink/50 px-4 py-3"
              >
                <span
                  className={
                    milestone.status === "done"
                      ? "font-mono text-sm text-ftm-green"
                      : "font-mono text-sm text-muted-foreground"
                  }
                >
                  {milestone.status === "done" ? "✅" : "⏳"}
                </span>
                <span
                  className={
                    milestone.status === "done"
                      ? "text-sm text-white"
                      : "text-sm text-muted-foreground"
                  }
                >
                  {milestone.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading eyebrow="Future updates" title="Coming soon." />
        <div className="mt-10 flex flex-wrap gap-2.5">
          {comingSoon.map((item) => (
            <span key={item} className="chip normal-case tracking-normal">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section shell pb-24">
        <div className="panel relative overflow-hidden p-8 text-center md:p-14">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(18,224,106,0.2),transparent_65%)] blur-2xl" />
          <div className="relative">
            <p className="eyebrow">Consistency before profits</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl font-semibold leading-snug text-white md:text-4xl">
              Profits are the result of consistency — so consistency is what I
              document.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-ftm-green px-5 py-3 text-sm font-semibold text-ftm-black transition-colors hover:bg-emerald-400"
              >
                Read my story
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/win-rate-analytics"
                className="inline-flex items-center gap-2 rounded-xl border border-ftm-line px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-ftm-green/50"
              >
                See the numbers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
