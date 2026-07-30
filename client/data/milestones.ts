export type MilestoneStatus = "done" | "active" | "pending";
export type MilestoneTrack = "Education" | "Process" | "FTM";

export interface Milestone {
  id: string;
  title: string;
  status: MilestoneStatus;
  track: MilestoneTrack;
  period: string;
  summary: string;
  detail: string[];
  proof?: { label: string; value: string }[];
}

export const milestones: Milestone[] = [
  {
    id: "smc",
    title: "Learning Smart Money Concepts",
    status: "done",
    track: "Education",
    period: "2024 — 2025",
    summary:
      "Rebuilt my understanding of price from liquidity and market structure rather than indicators.",
    detail: [
      "Studied liquidity, market structure, break of structure, change of character, fair value gaps, order blocks, breaker blocks, premium and discount, inducement and institutional price delivery.",
      "The turning point was accepting that I cannot predict the market — I can only react to what price reveals about where liquidity sits.",
    ],
    proof: [
      { label: "Concepts documented", value: "9" },
      { label: "Backtested sessions", value: "180+" },
    ],
  },
  {
    id: "consistency",
    title: "Building consistency",
    status: "done",
    track: "Process",
    period: "2025",
    summary:
      "Fixed risk, fixed process, fixed routine — regardless of the previous trade's outcome.",
    detail: [
      "Risk per trade is capped at 0.5% (0.25% on indices and gold) and every position is planned before execution: defined entry, fixed stop, pre-planned target, loss accepted in advance.",
      "Consistency comes before profits. Profits are simply the result of consistency.",
    ],
    proof: [
      { label: "Risk per trade", value: "0.5%" },
      { label: "Plan adherence", value: "94%" },
    ],
  },
  {
    id: "lrm",
    title: "Developing my Liquidity Reversal Model",
    status: "done",
    track: "Process",
    period: "2025 — 2026",
    summary:
      "A repeatable model built around liquidity being engineered before price reverses into its intended direction.",
    detail: [
      "Top-down analysis from weekly direction down to a 5M or 1M confirmation, so I am always trading with the higher timeframe narrative.",
      "The model refuses to chase: liquidity must be taken first, then structure must shift, and only then do I enter with confirmation.",
    ],
    proof: [
      { label: "Model variations", value: "3" },
      { label: "Avg planned R", value: "1:3.4" },
    ],
  },
  {
    id: "journal",
    title: "Creating a complete trade journal",
    status: "done",
    track: "Process",
    period: "2026",
    summary:
      "Bias, before chart, entry reasoning, execution, after chart and lesson — for every single trade.",
    detail: [
      "Reviewing every trade is how recurring mistakes get identified and good habits get reinforced.",
      "Journaling also produced the data behind the analytics on this site — nothing here is hypothetical.",
    ],
    proof: [
      { label: "Entries", value: "18" },
      { label: "Reviewed", value: "100%" },
    ],
  },
  {
    id: "recaps",
    title: "Sharing weekly trade recaps",
    status: "done",
    track: "Process",
    period: "2026",
    summary:
      "Publishing the week's analysis, executions and mistakes publicly instead of privately.",
    detail: [
      "Publishing removes the option of quietly ignoring a bad week, which is exactly why it works.",
      "Recaps are what eventually turned this site into a timeline of my evolution as a trader.",
    ],
  },
  {
    id: "giveaway",
    title: "Win an FTM Giveaway",
    status: "active",
    track: "FTM",
    period: "In progress",
    summary:
      "This portfolio is my entry — an interactive record rather than a single graphic.",
    detail: [
      "I've followed FTM because of its reputation for fast payouts, instant funding options and trader-friendly rules.",
      "I haven't traded with FTM yet, so everything on this site reflects genuine interest rather than personal experience.",
    ],
  },
  {
    id: "challenge",
    title: "Complete my first FTM Challenge",
    status: "pending",
    track: "FTM",
    period: "Next",
    summary:
      "Pass the evaluation using the same risk parameters I already trade with.",
    detail: [
      "The plan is not to trade differently under evaluation — the plan is to keep risk at 0.5% and let the model do the work.",
      "PROPSCAN exists on this site specifically to check my journal against challenge rules before I ever pay a fee.",
    ],
  },
  {
    id: "funded",
    title: "Become Funded",
    status: "pending",
    track: "FTM",
    period: "Goal",
    summary:
      "Trade firm capital with the same process that earned the account.",
    detail: [
      "Being funded changes the account size, not the plan.",
      "The metrics on this site will keep updating once real funded data exists.",
    ],
  },
  {
    id: "payout",
    title: "Receive my First FTM Payout",
    status: "pending",
    track: "FTM",
    period: "Goal",
    summary:
      "The moment this journal stops being about potential and starts being about proof.",
    detail: [
      "When it happens, the payout will be documented here alongside the trades that produced it.",
      "Until then, this site stays honest about what has and has not been achieved.",
    ],
  },
];

export const statusMeta: Record<
  MilestoneStatus,
  { label: string; icon: string; className: string; dot: string }
> = {
  done: {
    label: "Complete",
    icon: "✅",
    className: "border-ftm-green/40 bg-ftm-green/[0.07] text-ftm-green",
    dot: "bg-ftm-green",
  },
  active: {
    label: "In progress",
    icon: "⏳",
    className: "border-ftm-cyan/40 bg-ftm-cyan/[0.07] text-ftm-cyan",
    dot: "bg-ftm-cyan",
  },
  pending: {
    label: "Upcoming",
    icon: "⏳",
    className: "border-ftm-line bg-ftm-ink/60 text-muted-foreground",
    dot: "bg-muted-foreground",
  },
};
