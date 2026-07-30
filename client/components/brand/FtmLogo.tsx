import { cn } from "@/lib/utils";

interface FtmLogoProps {
  className?: string;
  /** Animate the outer ring + breathing motion (used by the intro sequence). */
  animated?: boolean;
}

/**
 * FTM mark: a rotating segmented ring around a monogram built from an
 * upward candle/arrow, referencing price delivery to the upside.
 */
export function FtmLogo({ className, animated = false }: FtmLogoProps) {
  return (
    <div className={cn("relative aspect-square", className)}>
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <linearGradient id="ftm-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#12e06a" />
            <stop offset="55%" stopColor="#22e0d0" />
            <stop offset="100%" stopColor="#0a8c45" />
          </linearGradient>
          <linearGradient id="ftm-mark" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0a8c45" />
            <stop offset="100%" stopColor="#12e06a" />
          </linearGradient>
        </defs>

        <g
          className={
            animated ? "origin-center animate-spin-slow" : "origin-center"
          }
        >
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="url(#ftm-ring)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="150 42 92 42"
            opacity="0.95"
          />
          <circle
            cx="100"
            cy="100"
            r="78"
            fill="none"
            stroke="#12e06a"
            strokeWidth="1"
            strokeDasharray="2 10"
            opacity="0.5"
          />
        </g>

        <g
          className={
            animated ? "origin-center animate-breathe" : "origin-center"
          }
        >
          <path
            d="M100 44 L128 92 H112 V150 H88 V92 H72 Z"
            fill="url(#ftm-mark)"
          />
          <rect
            x="60"
            y="158"
            width="80"
            height="5"
            rx="2.5"
            fill="#12e06a"
            opacity="0.55"
          />
        </g>
      </svg>
    </div>
  );
}

export function FtmWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <FtmLogo className="h-8 w-8" />
      <span className="font-display text-base font-semibold tracking-tight text-white">
        FTM<span className="text-ftm-green">Journey</span>
      </span>
    </span>
  );
}
