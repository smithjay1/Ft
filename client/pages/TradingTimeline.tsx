import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { milestones, statusMeta, type MilestoneTrack } from "@/data/milestones";

const tracks: (MilestoneTrack | "All")[] = [
  "All",
  "Education",
  "Process",
  "FTM",
];

export default function TradingTimeline() {
  const [track, setTrack] = useState<MilestoneTrack | "All">("All");
  const [activeId, setActiveId] = useState(
    milestones.find((m) => m.status === "active")?.id ?? milestones[0].id,
  );

  const filtered = useMemo(
    () => milestones.filter((m) => track === "All" || m.track === track),
    [track],
  );
  const active = milestones.find((m) => m.id === activeId) ?? filtered[0];
  const done = milestones.filter((m) => m.status === "done").length;

  return (
    <Layout>
      <PageHero
        eyebrow="Interactive Trading Timeline"
        title="Every milestone, in order, with the detail behind it."
        description="Click any point on the timeline to see what actually happened at that stage — what I learned, what changed in my process, and what it unlocked."
      >
        <div className="flex flex-wrap items-center gap-2">
          {tracks.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTrack(option)}
              className={cn(
                "rounded-xl border px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors",
                track === option
                  ? "border-ftm-green/50 bg-ftm-green/10 text-ftm-green"
                  : "border-ftm-line text-muted-foreground hover:text-white",
              )}
            >
              {option}
            </button>
          ))}
          <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {done}/{milestones.length} complete
          </span>
        </div>
      </PageHero>

      <section className="shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="relative">
            <span className="absolute left-[13px] top-2 bottom-2 w-px bg-ftm-line" />
            <motion.span
              className="absolute left-[13px] top-2 w-px bg-gradient-to-b from-ftm-green to-ftm-cyan"
              initial={{ height: 0 }}
              whileInView={{ height: `${(done / milestones.length) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            <ul className="space-y-3">
              {filtered.map((milestone, i) => {
                const meta = statusMeta[milestone.status];
                const selected = milestone.id === active?.id;
                return (
                  <Reveal key={milestone.id} delay={Math.min(i * 0.04, 0.24)}>
                    <li>
                      <button
                        type="button"
                        onClick={() => setActiveId(milestone.id)}
                        className={cn(
                          "group flex w-full items-start gap-4 rounded-2xl border py-4 pl-4 pr-5 text-left transition-all",
                          selected
                            ? "border-ftm-green/45 bg-ftm-panel"
                            : "border-transparent hover:border-ftm-line hover:bg-ftm-panel/50",
                        )}
                      >
                        <span
                          className={cn(
                            "relative z-10 mt-1 h-[11px] w-[11px] shrink-0 rounded-full ring-4 ring-ftm-black",
                            meta.dot,
                          )}
                        />
                        <span className="flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-display text-sm font-semibold text-white">
                              {milestone.title}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                              {milestone.period}
                            </span>
                          </span>
                          <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                            {milestone.summary}
                          </span>
                        </span>
                      </button>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {active && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="panel p-6 md:p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={cn(
                      "chip normal-case tracking-normal",
                      statusMeta[active.status].className,
                    )}
                  >
                    {statusMeta[active.status].icon}{" "}
                    {statusMeta[active.status].label}
                  </span>
                  <span className="chip">{active.track}</span>
                  <span className="chip">{active.period}</span>
                </div>

                <h2 className="mt-5 font-display text-2xl font-semibold text-white md:text-3xl">
                  {active.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/90">
                  {active.summary}
                </p>

                <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  {active.detail.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {active.proof && (
                  <div className="mt-7 grid grid-cols-2 gap-3">
                    {active.proof.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-ftm-line bg-ftm-ink/60 px-4 py-3"
                      >
                        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1 font-display text-lg font-semibold text-white">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-7 flex items-center justify-between border-t border-ftm-line/70 pt-5">
                  <NavButton
                    label="Previous"
                    disabled={
                      milestones.findIndex((m) => m.id === active.id) === 0
                    }
                    onClick={() => {
                      const index = milestones.findIndex(
                        (m) => m.id === active.id,
                      );
                      if (index > 0) setActiveId(milestones[index - 1].id);
                    }}
                  />
                  <NavButton
                    label="Next"
                    disabled={
                      milestones.findIndex((m) => m.id === active.id) ===
                      milestones.length - 1
                    }
                    onClick={() => {
                      const index = milestones.findIndex(
                        (m) => m.id === active.id,
                      );
                      if (index < milestones.length - 1)
                        setActiveId(milestones[index + 1].id);
                    }}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

function NavButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-xl border border-ftm-line px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-ftm-green/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  );
}
