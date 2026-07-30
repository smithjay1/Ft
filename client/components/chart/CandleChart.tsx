import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { seriesBounds, type Candle } from "@/lib/candles";
import type { LevelKind, ReplayLevel } from "@/data/replays";

const VIEW_W = 1000;
const VIEW_H = 420;
const PAD_RIGHT = 84;
const PAD_Y = 16;

const levelStyle: Record<
  LevelKind,
  { stroke: string; fill?: string; dash?: string; text: string }
> = {
  liquidity: { stroke: "#ff5470", dash: "6 6", text: "#ff8fa1" },
  poi: { stroke: "#22e0d0", fill: "rgba(34,224,208,0.10)", text: "#7cf0e6" },
  "order-block": {
    stroke: "#7c6bff",
    fill: "rgba(124,107,255,0.16)",
    text: "#b3a9ff",
  },
  fvg: { stroke: "#f5c451", fill: "rgba(245,196,81,0.16)", text: "#f7d488" },
  entry: { stroke: "#ffffff", dash: "4 4", text: "#ffffff" },
  stop: { stroke: "#ff5470", text: "#ff8fa1" },
  target: { stroke: "#12e06a", text: "#66f2a6" },
};

interface CandleChartProps {
  candles: Candle[];
  /** Number of candles to draw; the scale always uses the full series. */
  visible?: number;
  levels?: ReplayLevel[];
  digits?: number;
  showPriceAxis?: boolean;
  showLabels?: boolean;
  className?: string;
  compact?: boolean;
}

export function CandleChart({
  candles,
  visible,
  levels = [],
  digits = 4,
  showPriceAxis = true,
  showLabels = true,
  className,
  compact = false,
}: CandleChartProps) {
  const count = visible ?? candles.length;
  const { high, low } = useMemo(() => seriesBounds(candles), [candles]);
  const plotW = showPriceAxis ? VIEW_W - PAD_RIGHT : VIEW_W;
  const slot = plotW / Math.max(candles.length, 1);
  const bodyW = Math.max(slot * 0.58, 2);

  const y = (price: number) =>
    PAD_Y + ((high - price) / (high - low || 1)) * (VIEW_H - PAD_Y * 2);
  const x = (index: number) => slot * index + slot / 2;

  const activeLevels = levels.filter((level) => count > level.from);
  const lastVisible = candles[Math.min(count, candles.length) - 1];

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={cn("h-full w-full", className)}
      preserveAspectRatio="none"
      role="img"
      aria-label="Price chart"
    >
      {!compact && (
        <g>
          {Array.from({ length: 5 }, (_, i) => {
            const gy = PAD_Y + (i * (VIEW_H - PAD_Y * 2)) / 4;
            return (
              <line
                key={i}
                x1={0}
                x2={plotW}
                y1={gy}
                y2={gy}
                stroke="#1b2732"
                strokeWidth={1}
              />
            );
          })}
        </g>
      )}

      {activeLevels.map((level, i) => {
        const style = levelStyle[level.kind];
        const isZone = level.priceTo !== undefined;
        const top = isZone
          ? y(Math.max(level.price, level.priceTo!))
          : y(level.price);
        const bottom = isZone ? y(Math.min(level.price, level.priceTo!)) : top;
        return (
          <g key={`${level.kind}-${i}`}>
            {isZone ? (
              <rect
                x={0}
                y={top}
                width={plotW}
                height={Math.max(bottom - top, 2)}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={1}
                strokeDasharray="3 5"
              />
            ) : (
              <line
                x1={0}
                x2={plotW}
                y1={top}
                y2={top}
                stroke={style.stroke}
                strokeWidth={1.5}
                strokeDasharray={style.dash}
              />
            )}
            {showLabels && (
              <text
                x={6}
                y={top - 6 < 12 ? top + 14 : top - 6}
                fill={style.text}
                fontSize={13}
                fontFamily="JetBrains Mono, monospace"
              >
                {level.label}
              </text>
            )}
          </g>
        );
      })}

      <g>
        {candles.slice(0, count).map((candle, i) => {
          const bullish = candle.c >= candle.o;
          const color = bullish ? "#12e06a" : "#ff5470";
          const openY = y(candle.o);
          const closeY = y(candle.c);
          const top = Math.min(openY, closeY);
          const height = Math.max(Math.abs(closeY - openY), 1.5);
          return (
            <g key={i}>
              <line
                x1={x(i)}
                x2={x(i)}
                y1={y(candle.h)}
                y2={y(candle.l)}
                stroke={color}
                strokeWidth={1.2}
              />
              <rect
                x={x(i) - bodyW / 2}
                y={top}
                width={bodyW}
                height={height}
                fill={color}
                opacity={i === count - 1 ? 1 : 0.92}
              />
            </g>
          );
        })}
      </g>

      {showPriceAxis && lastVisible && (
        <g>
          <line
            x1={plotW}
            x2={plotW}
            y1={0}
            y2={VIEW_H}
            stroke="#1b2732"
            strokeWidth={1}
          />
          {Array.from({ length: 5 }, (_, i) => {
            const price = high - (i * (high - low)) / 4;
            const gy = PAD_Y + (i * (VIEW_H - PAD_Y * 2)) / 4;
            return (
              <text
                key={i}
                x={plotW + 10}
                y={gy + 4}
                fill="#6b7c8c"
                fontSize={13}
                fontFamily="JetBrains Mono, monospace"
              >
                {price.toFixed(digits)}
              </text>
            );
          })}
          <rect
            x={plotW + 4}
            y={y(lastVisible.c) - 11}
            width={PAD_RIGHT - 10}
            height={22}
            rx={4}
            fill={lastVisible.c >= lastVisible.o ? "#12e06a" : "#ff5470"}
          />
          <text
            x={plotW + 10}
            y={y(lastVisible.c) + 4}
            fill="#05070a"
            fontSize={13}
            fontWeight={600}
            fontFamily="JetBrains Mono, monospace"
          >
            {lastVisible.c.toFixed(digits)}
          </text>
        </g>
      )}
    </svg>
  );
}
