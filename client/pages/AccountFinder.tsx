import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { questions, scoreAccounts, type Answers } from "@/data/accounts";

type PartialAnswers = Partial<Answers>;

const currency = (value: number) =>
  value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`;

export default function AccountFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PartialAnswers>({});

  const complete = questions.every((q) => answers[q.key]);
  const ranked = complete ? scoreAccounts(answers as Answers) : [];
  const current = questions[Math.min(step, questions.length - 1)];
  const showResults = complete && step >= questions.length;

  const choose = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current.key]: value }) as PartialAnswers);
    setStep((s) => s + 1);
  };

  return (
    <Layout>
      <PageHero
        eyebrow="FTM Account Finder"
        title="Find the account type that fits your plan — not the biggest one."
        description="Four questions about fee budget, risk per trade, track record and priority. The result explains why each account fits, so you can sanity-check the logic instead of trusting a number."
      />

      <section className="shell py-14">
        <div className="mb-8 flex items-center gap-2">
          {questions.map((q, i) => (
            <div key={q.key} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]",
                  answers[q.key]
                    ? "border-ftm-green/50 bg-ftm-green/15 text-ftm-green"
                    : i === step
                      ? "border-ftm-cyan/50 text-ftm-cyan"
                      : "border-ftm-line text-muted-foreground",
                )}
              >
                {answers[q.key] ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              {i < questions.length - 1 && (
                <span
                  className={cn(
                    "h-px flex-1",
                    answers[q.key] ? "bg-ftm-green/40" : "bg-ftm-line",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.32 }}
              className="panel p-6 md:p-8"
            >
              <p className="eyebrow">
                Question {Math.min(step + 1, questions.length)} of{" "}
                {questions.length}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white">
                {current.question}
              </h2>
              <div className="mt-7 grid gap-3 md:grid-cols-3">
                {current.options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => choose(option.value)}
                    className={cn(
                      "rounded-2xl border p-5 text-left transition-all",
                      answers[current.key] === option.value
                        ? "border-ftm-green/50 bg-ftm-green/[0.07]"
                        : "border-ftm-line bg-ftm-ink/50 hover:border-ftm-green/40",
                    )}
                  >
                    <p className="font-display text-base font-semibold text-white">
                      {option.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {option.hint}
                    </p>
                  </button>
                ))}
              </div>
              <div className="mt-7 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-white disabled:opacity-40"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
                {complete && (
                  <button
                    type="button"
                    onClick={() => setStep(questions.length)}
                    className="inline-flex items-center gap-2 rounded-xl bg-ftm-green px-4 py-2.5 text-xs font-semibold text-ftm-black"
                  >
                    See recommendation
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">Best match</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">
                    {ranked[0].option.pathLabel} ·{" "}
                    {currency(ranked[0].option.size)}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setStep(0);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-ftm-line px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-ftm-green/50 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Start over
                </button>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {ranked.slice(0, 3).map((entry, i) => (
                  <Reveal key={entry.option.id} delay={i * 0.06}>
                    <div
                      className={cn(
                        "panel h-full p-6",
                        i === 0 &&
                          "border-ftm-green/45 shadow-[0_20px_60px_-30px_rgba(18,224,106,0.5)]",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="chip normal-case tracking-normal">
                          {entry.option.pathLabel}
                        </span>
                        <span className="font-mono text-sm text-ftm-green">
                          {entry.score}% fit
                        </span>
                      </div>
                      <p className="mt-4 font-display text-2xl font-semibold text-white">
                        {currency(entry.option.size)}
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-2.5">
                        {[
                          {
                            label: "Profit target",
                            value: entry.option.profitTarget
                              ? `${entry.option.profitTarget}%`
                              : "None",
                          },
                          {
                            label: "Daily loss",
                            value: `${entry.option.maxDailyLoss}%`,
                          },
                          {
                            label: "Overall loss",
                            value: `${entry.option.maxOverallLoss}%`,
                          },
                          { label: "Fee band", value: entry.option.feeBand },
                        ].map((metric) => (
                          <div
                            key={metric.label}
                            className="rounded-lg border border-ftm-line bg-ftm-ink/60 px-3 py-2"
                          >
                            <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                              {metric.label}
                            </p>
                            <p className="mt-0.5 font-mono text-xs text-white">
                              {metric.value}
                            </p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {entry.option.bestFor}
                      </p>
                      {entry.reasons.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {entry.reasons.map((reason) => (
                            <li
                              key={reason}
                              className="flex gap-2 text-xs leading-relaxed text-muted-foreground"
                            >
                              <Check className="mt-0.5 h-3 w-3 shrink-0 text-ftm-green" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="panel mt-6 overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead>
                    <tr className="border-b border-ftm-line/70 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      <th className="px-5 py-3">Account</th>
                      <th className="px-5 py-3">Size</th>
                      <th className="px-5 py-3">Target</th>
                      <th className="px-5 py-3">Payout speed</th>
                      <th className="px-5 py-3">Split</th>
                      <th className="px-5 py-3">Fit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranked.map((entry) => (
                      <tr
                        key={entry.option.id}
                        className="border-b border-ftm-line/40 text-muted-foreground last:border-0"
                      >
                        <td className="px-5 py-3 text-white">
                          {entry.option.pathLabel}
                        </td>
                        <td className="px-5 py-3 font-mono">
                          {currency(entry.option.size)}
                        </td>
                        <td className="px-5 py-3 font-mono">
                          {entry.option.profitTarget
                            ? `${entry.option.profitTarget}%`
                            : "None"}
                        </td>
                        <td className="px-5 py-3">
                          {entry.option.firstPayout}
                        </td>
                        <td className="px-5 py-3">
                          {entry.option.payoutSplit}
                        </td>
                        <td className="px-5 py-3 font-mono text-ftm-green">
                          {entry.score}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="panel mt-6 flex items-start gap-3 p-5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c451]" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Account shapes here are illustrative categories used to reason
                  about fit — fees, targets, splits and drawdown rules change,
                  so confirm the current terms with the firm before buying
                  anything.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </Layout>
  );
}
