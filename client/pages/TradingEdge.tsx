import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CandleChart } from "@/components/chart/CandleChart";
import { replays } from "@/data/replays";

const concepts = [
  {
    name: "Liquidity",
    body: "Where orders rest, and therefore where price is drawn.",
  },
  {
    name: "Market Structure",
    body: "The sequence of highs and lows that defines order flow.",
  },
  {
    name: "Break of Structure",
    body: "Continuation — structure delivering in the same direction.",
  },
  {
    name: "Change of Character",
    body: "The first sign the current order flow is finished.",
  },
  {
    name: "Fair Value Gaps",
    body: "Inefficiency left by displacement, often revisited.",
  },
  {
    name: "Order Blocks",
    body: "The candle that caused the displacement, used as an entry.",
  },
  {
    name: "Breaker Blocks",
    body: "Failed supply or demand flipped into the opposite role.",
  },
  {
    name: "Premium & Discount",
    body: "Where price sits inside its dealing range.",
  },
  {
    name: "Inducement",
    body: "The obvious level that traps early entries before the real move.",
  },
  {
    name: "Institutional price delivery",
    body: "How price actually moves between liquidity pools.",
  },
];

const topDown = [
  { tf: "Weekly", body: "Identify overall market direction." },
  { tf: "Daily", body: "Refine directional bias." },
  { tf: "4H", body: "Locate major liquidity pools and Points of Interest." },
  { tf: "1H / 15M", body: "Wait for price to enter my area of interest." },
  { tf: "5M / 1M", body: "Wait patiently for confirmation before execution." },
];

const riskRules = [
  "Defined entry",
  "Fixed stop-loss",
  "Pre-planned take-profit",
  "Accepting the loss before entering",
];

const journalFields = [
  "Market bias",
  "Before chart",
  "Entry reasoning",
  "Execution",
  "After chart",
  "Lessons learned",
];

export default function TradingEdge() {
  const featured = replays[0];

  return (
    <Layout>
      <PageHero
        eyebrow="My Trading Edge"
        title="Liquidity Reversal Model (LRM)"
        description="My primary trading model focuses on identifying areas where liquidity is likely to be taken before price reverses into its intended direction."
      />

      <section className="shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Rather than chasing moves, I prefer waiting for liquidity to be
              engineered before entering with confirmation. This helps improve
              both precision and risk-to-reward.
            </p>
            <p>
              Instead of predicting the market, I focus on reacting to what
              price reveals. The sweep is the setup; the structure shift is the
              trigger.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { label: "Sweep", value: "Liquidity taken" },
                { label: "Shift", value: "MSS / CHoCH" },
                { label: "Entry", value: "FVG / OB" },
              ].map((item) => (
                <div key={item.label} className="panel px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ftm-green">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs text-white">{item.value}</p>
                </div>
              ))}
            </div>
            <Link
              to="/#trade-replay"
              className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-ftm-green"
            >
              Watch the model in a live replay
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-ftm-line/70 px-4 py-3">
                <span className="font-mono text-xs text-white">
                  {featured.pair} · anatomy of the model
                </span>
                <span className="font-mono text-[11px] text-ftm-green">
                  {featured.rr}
                </span>
              </div>
              <div className="aspect-[1000/420] bg-ftm-ink/70">
                <CandleChart
                  candles={featured.candles}
                  levels={featured.levels}
                  digits={featured.digits}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading
          eyebrow="Smart Money Concepts"
          title="My analysis is built around Smart Money Concepts."
          description="These are the ten things I pay close attention to on every chart, in this order of importance."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {concepts.map((concept, i) => (
            <Reveal key={concept.name} delay={(i % 5) * 0.05}>
              <div className="panel panel-hover h-full p-5">
                <span className="font-mono text-[11px] text-ftm-green">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-display text-sm font-semibold text-white">
                  {concept.name}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {concept.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section shell">
        <SectionHeading
          eyebrow="Top-Down Analysis"
          title="Every trade begins with higher timeframes."
          description="This process keeps me trading with the higher timeframe narrative rather than against it."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {topDown.map((step, i) => (
            <Reveal key={step.tf} delay={i * 0.07}>
              <div className="panel relative h-full p-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-semibold text-ftm-green">
                    {step.tf}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    Step {i + 1}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
                {i < topDown.length - 1 && (
                  <ArrowRight className="absolute -right-3.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-ftm-line lg:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="panel h-full p-7">
              <ShieldCheck className="h-6 w-6 text-ftm-green" />
              <p className="eyebrow mt-5">Risk Management</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white">
                Protecting capital matters more than chasing profits.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Risk management is the foundation of my trading. Every position
                is planned before execution. That includes:
              </p>
              <ul className="mt-5 grid gap-2.5">
                {riskRules.map((rule) => (
                  <li
                    key={rule}
                    className="flex items-center gap-3 rounded-xl border border-ftm-line/70 bg-ftm-ink/50 px-4 py-3 text-sm text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-ftm-green" />
                    {rule}
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl border border-ftm-green/25 bg-ftm-green/[0.06] px-4 py-3 text-sm text-ftm-green">
                A good trade isn't determined by whether it wins. A good trade
                is one that follows the plan.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="panel h-full p-7">
              <p className="eyebrow">Trade Journaling</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white">
                Every trade I take is reviewed.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Each journal entry includes:
              </p>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {journalFields.map((field, i) => (
                  <div
                    key={field}
                    className="rounded-xl border border-ftm-line/70 bg-ftm-ink/50 px-4 py-3"
                  >
                    <span className="font-mono text-[10px] text-ftm-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1 text-sm text-white">{field}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
                My journal allows me to identify recurring mistakes while
                reinforcing good habits. Continuous improvement comes from
                reviewing what the market teaches.
              </p>
              <Link
                to="/trade-journal"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ftm-green"
              >
                Read the journal
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
