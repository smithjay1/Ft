export type Path = "instant" | "one-step" | "two-step";

export interface AccountOption {
  id: string;
  path: Path;
  pathLabel: string;
  size: number;
  /** Illustrative fee band, not a quoted price. */
  feeBand: string;
  profitTarget: number;
  maxDailyLoss: number;
  maxOverallLoss: number;
  payoutSplit: string;
  firstPayout: string;
  bestFor: string;
}

export const accountOptions: AccountOption[] = [
  {
    id: "instant-5k",
    path: "instant",
    pathLabel: "Instant funding",
    size: 5000,
    feeBand: "Low",
    profitTarget: 0,
    maxDailyLoss: 4,
    maxOverallLoss: 5,
    payoutSplit: "Standard",
    firstPayout: "Fastest",
    bestFor:
      "Proving a process on live capital with the smallest possible outlay.",
  },
  {
    id: "instant-10k",
    path: "instant",
    pathLabel: "Instant funding",
    size: 10000,
    feeBand: "Low–Mid",
    profitTarget: 0,
    maxDailyLoss: 4,
    maxOverallLoss: 5,
    payoutSplit: "Standard",
    firstPayout: "Fastest",
    bestFor:
      "Traders who want live capital quickly without an evaluation phase.",
  },
  {
    id: "one-step-25k",
    path: "one-step",
    pathLabel: "1-step evaluation",
    size: 25000,
    feeBand: "Low–Mid",
    profitTarget: 10,
    maxDailyLoss: 5,
    maxOverallLoss: 10,
    payoutSplit: "High",
    firstPayout: "Fast",
    bestFor: "A single clear objective with room for a normal losing streak.",
  },
  {
    id: "one-step-50k",
    path: "one-step",
    pathLabel: "1-step evaluation",
    size: 50000,
    feeBand: "Mid",
    profitTarget: 10,
    maxDailyLoss: 5,
    maxOverallLoss: 10,
    payoutSplit: "High",
    firstPayout: "Fast",
    bestFor: "Consistent traders scaling up once the model is proven.",
  },
  {
    id: "two-step-50k",
    path: "two-step",
    pathLabel: "2-step evaluation",
    size: 50000,
    feeBand: "Mid",
    profitTarget: 8,
    maxDailyLoss: 5,
    maxOverallLoss: 10,
    payoutSplit: "Highest",
    firstPayout: "Standard",
    bestFor: "Patient traders happy to trade two phases for better terms.",
  },
  {
    id: "two-step-100k",
    path: "two-step",
    pathLabel: "2-step evaluation",
    size: 100000,
    feeBand: "Mid–High",
    profitTarget: 8,
    maxDailyLoss: 5,
    maxOverallLoss: 10,
    payoutSplit: "Highest",
    firstPayout: "Standard",
    bestFor: "Traders with a long track record and low risk per trade.",
  },
];

export interface Answers {
  budget: "small" | "medium" | "large";
  risk: "conservative" | "balanced" | "aggressive";
  consistency: "building" | "consistent" | "proven";
  priority: "speed" | "size" | "terms";
}

export const questions = [
  {
    key: "budget" as const,
    question: "How much are you comfortable putting toward an account fee?",
    options: [
      {
        value: "small",
        label: "As little as possible",
        hint: "Start small, prove it first",
      },
      {
        value: "medium",
        label: "A moderate amount",
        hint: "Balanced between fee and size",
      },
      {
        value: "large",
        label: "Whatever fits the goal",
        hint: "Optimising for account size",
      },
    ],
  },
  {
    key: "risk" as const,
    question: "What is your risk per trade?",
    options: [
      {
        value: "conservative",
        label: "0.25% – 0.5%",
        hint: "Slow, survivable, my own setting",
      },
      {
        value: "balanced",
        label: "0.5% – 1%",
        hint: "Standard prop-friendly risk",
      },
      {
        value: "aggressive",
        label: "Above 1%",
        hint: "Faster targets, tighter margin for error",
      },
    ],
  },
  {
    key: "consistency" as const,
    question: "How consistent is your track record?",
    options: [
      {
        value: "building",
        label: "Still building",
        hint: "Under 3 months of journaled data",
      },
      {
        value: "consistent",
        label: "Consistent",
        hint: "3–12 months, positive expectancy",
      },
      {
        value: "proven",
        label: "Proven",
        hint: "12+ months or previously funded",
      },
    ],
  },
  {
    key: "priority" as const,
    question: "What matters most on this attempt?",
    options: [
      {
        value: "speed",
        label: "Reaching a payout fast",
        hint: "Shortest path to live capital",
      },
      {
        value: "size",
        label: "Trading a larger account",
        hint: "Maximum buying power",
      },
      {
        value: "terms",
        label: "The best long-term terms",
        hint: "Split and scaling over speed",
      },
    ],
  },
];

/** Simple additive scoring — every point is explained back to the user. */
export function scoreAccounts(answers: Answers) {
  return accountOptions
    .map((option) => {
      const reasons: string[] = [];
      let score = 50;

      if (answers.budget === "small") {
        if (option.size <= 10000) {
          score += 18;
          reasons.push("Smallest fee band matches your budget answer.");
        } else if (option.size >= 100000) {
          score -= 22;
        }
      }
      if (answers.budget === "medium") {
        if (option.size >= 25000 && option.size <= 50000) {
          score += 16;
          reasons.push(
            "Mid-sized account keeps the fee proportional to the objective.",
          );
        }
      }
      if (answers.budget === "large") {
        if (option.size >= 50000) {
          score += 16;
          reasons.push(
            "Larger account size matches the capital you're prepared to commit.",
          );
        } else {
          score -= 8;
        }
      }

      if (answers.risk === "conservative") {
        if (option.path !== "instant") {
          score += 12;
          reasons.push(
            "Evaluation drawdown limits are comfortable at sub-0.5% risk.",
          );
        } else {
          score += 4;
        }
      }
      if (answers.risk === "aggressive") {
        if (option.maxOverallLoss <= 5) {
          score -= 20;
          reasons.push("Tight overall drawdown is risky above 1% per trade.");
        } else {
          score += 6;
        }
      }

      if (answers.consistency === "building") {
        if (option.size <= 10000) {
          score += 16;
          reasons.push(
            "A small account is the cheapest way to keep building evidence.",
          );
        } else if (option.size >= 100000) {
          score -= 24;
          reasons.push(
            "Large accounts amplify the cost of an unfinished process.",
          );
        }
      }
      if (
        answers.consistency === "consistent" &&
        option.size >= 25000 &&
        option.size <= 50000
      ) {
        score += 14;
        reasons.push("Your track record supports a mid-sized account.");
      }
      if (answers.consistency === "proven" && option.size >= 50000) {
        score += 18;
        reasons.push("A proven record justifies the largest sizes on offer.");
      }

      if (answers.priority === "speed") {
        if (option.path === "instant") {
          score += 20;
          reasons.push(
            "Instant funding removes the evaluation phase entirely.",
          );
        }
        if (option.path === "two-step") {
          score -= 16;
        }
      }
      if (answers.priority === "size" && option.size >= 50000) {
        score += 16;
        reasons.push("Largest buying power among the available options.");
      }
      if (answers.priority === "terms") {
        if (option.path === "two-step") {
          score += 18;
          reasons.push(
            "Two-phase evaluations typically carry the strongest terms.",
          );
        }
        if (option.path === "instant") {
          score -= 10;
        }
      }

      return {
        option,
        score: Math.max(5, Math.min(99, score)),
        reasons: reasons.slice(0, 3),
      };
    })
    .sort((a, b) => b.score - a.score);
}
