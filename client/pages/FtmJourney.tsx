import { Link } from "react-router-dom";
import { ArrowRight, Banknote, Gauge, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { milestones, statusMeta } from "@/data/milestones";

const reasons = [
  {
    icon: Zap,
    title: "Fast payouts",
    body: "A reputation for paying traders quickly is the first thing I look for in a firm.",
  },
  {
    icon: Banknote,
    title: "Instant funding options",
    body: "Routes to live capital that reward process rather than only exam-passing.",
  },
  {
    icon: Gauge,
    title: "Trader-friendly rules",
    body: "Rule sets that a 0.5%-risk, higher-timeframe process can realistically survive.",
  },
];

const comingSoon = [
  "AI Trading Statistics Dashboard",
  "Win Rate Analytics",
  "Risk-to-Reward Performance",
  "Monthly Performance Reports",
  "Interactive Trading Timeline",
  "Weekly Trade Recaps",
  "Trading Heatmaps",
  "Trade Filtering by Pair",
  "Economic News Archive",
  "Personal Trading Insights",
];

const shipped = new Set([
  "Win Rate Analytics",
  "Interactive Trading Timeline",
  "Trade Filtering by Pair",
]);

export default function FtmJourney() {
  const done = milestones.filter((m) => m.status === "done").length;
  const progress = Math.round((done / milestones.length) * 100);

  return (
    <Layout>
      <PageHero
        eyebrow="FTM Journey"
        title="Why FTM?"
        description="I haven't traded with FTM yet. Because of that, everything on this website reflects my genuine interest — not personal experience."
      />

      <section className="shell py-14">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              I've followed FTM because of its reputation for fast payouts,
              instant funding options, and trader-friendly rules. Those
              qualities make FTM a prop firm I'd genuinely like to experience
              for myself.
            </p>
            <p className="text-white">My goal is simple:</p>
            <p>
              Continue improving, earn the opportunity to trade with FTM, and
              eventually share real experiences backed by actual results rather
              than assumptions.
            </p>
            <Link
              to="/propscan"
              className="inline-flex items-center gap-2 pt-1 text-sm font-semibold text-ftm-green"
            >
              Scan my stats against challenge rules in PROPSCAN
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>

          <div className="grid gap-3">
            {reasons.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 0.07}>
                <div className="panel flex items-start gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ftm-green/25 bg-ftm-green/10">
                    <reason.icon className="h-4 w-4 text-ftm-green" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-white">
                      {reason.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {reason.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading
          eyebrow="Road To My First FTM Account"
          title={`${done} of ${milestones.length} milestones cleared — ${progress}% of the way there.`}
          description="No stage is marked complete until it is genuinely complete. The remaining steps are the ones that turn this from a plan into proof."
        />

        <Reveal delay={0.06}>
          <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-ftm-line/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-ftm-green to-ftm-cyan"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {milestones.map((milestone, i) => {
            const meta = statusMeta[milestone.status];
            return (
              <Reveal key={milestone.id} delay={Math.min(i * 0.04, 0.24)}>
                <div
                  className={cn(
                    "panel h-full p-5",
                    milestone.status === "active" && "border-ftm-cyan/40",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "chip normal-case tracking-normal",
                        meta.className,
                      )}
                    >
                      {meta.icon} {meta.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {milestone.track}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-base font-semibold text-white">
                    {milestone.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {milestone.summary}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <Link
            to="/timeline"
            className="panel panel-hover mt-6 flex items-center justify-between gap-4 p-6"
          >
            <div>
              <p className="font-display text-base font-semibold text-white">
                Open the interactive trading timeline
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Click through each milestone to see the detail, evidence and
                what came next.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-ftm-green" />
          </Link>
        </Reveal>
      </section>

      <section className="section shell pb-24">
        <SectionHeading
          eyebrow="Future Updates"
          title="Coming soon."
          description="This site is not finished — that's the point. Items already live are marked, the rest are queued."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoon.map((item, i) => {
            const live = shipped.has(item);
            return (
              <Reveal key={item} delay={Math.min(i * 0.04, 0.24)}>
                <div className="panel flex items-center justify-between gap-3 px-5 py-4">
                  <span className="text-sm text-white">{item}</span>
                  <span
                    className={cn(
                      "flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                      live
                        ? "border-ftm-green/35 bg-ftm-green/10 text-ftm-green"
                        : "border-ftm-line text-muted-foreground",
                    )}
                  >
                    {live && <Sparkles className="h-3 w-3" />}
                    {live ? "Live" : "Queued"}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
