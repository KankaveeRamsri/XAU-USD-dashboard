import type { Timeframe, OhlcCandle } from "./types";

// Simple seeded PRNG for deterministic mock data per timeframe
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const TIMEFRAME_CONFIG: Record<
  Timeframe,
  { count: number; intervalMs: number; volatility: number; seed: number }
> = {
  "1m": { count: 120, intervalMs: 60_000, volatility: 1.5, seed: 1001 },
  "5m": { count: 100, intervalMs: 300_000, volatility: 3.0, seed: 2002 },
  "15m": { count: 80, intervalMs: 900_000, volatility: 5.0, seed: 3003 },
  "1H": { count: 72, intervalMs: 3_600_000, volatility: 8.0, seed: 4004 },
  "4H": { count: 60, intervalMs: 14_400_000, volatility: 14.0, seed: 5005 },
  "1D": { count: 90, intervalMs: 86_400_000, volatility: 22.0, seed: 6006 },
};

export function getMockXauusdCandles(timeframe: Timeframe): OhlcCandle[] {
  const config = TIMEFRAME_CONFIG[timeframe];
  const rand = seededRandom(config.seed);
  const now = new Date();
  // Anchor the latest candle to a rounded boundary
  const latestTime = Math.floor(now.getTime() / config.intervalMs) * config.intervalMs;
  const startTime = latestTime - (config.count - 1) * config.intervalMs;

  const candles: OhlcCandle[] = [];
  let prevClose = 2345.0;

  for (let i = 0; i < config.count; i++) {
    const timestamp = startTime + i * config.intervalMs;

    // Slight drift bias
    const drift = (rand() - 0.48) * config.volatility * 0.3;
    const open = prevClose + drift;
    const range = config.volatility * (0.3 + rand() * 0.7);
    const bodySize = range * (0.2 + rand() * 0.4);

    let close: number;
    let high: number;
    let low: number;

    if (rand() > 0.45) {
      // Bullish candle
      close = open + bodySize;
      high = Math.max(open, close) + range * rand() * 0.3;
      low = Math.min(open, close) - range * rand() * 0.25;
    } else {
      // Bearish candle
      close = open - bodySize;
      high = Math.max(open, close) + range * rand() * 0.25;
      low = Math.min(open, close) - range * rand() * 0.3;
    }

    // Ensure high >= max(open, close) and low <= min(open, close)
    high = Math.max(high, open, close);
    low = Math.min(low, open, close);

    // Keep price in a realistic gold range
    const clampedClose = Math.max(2280, Math.min(2450, close));
    const clampedHigh = Math.max(clampedClose, Math.min(2460, high));
    const clampedLow = Math.max(2270, Math.min(clampedClose, low));
    const clampedOpen = Math.max(clampedLow, Math.min(clampedHigh, open));

    const volume = Math.round(800 + rand() * 4000);

    // Format time for lightweight-charts
    let timeValue: string;
    if (timeframe === "1D") {
      const d = new Date(timestamp);
      timeValue = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
    } else {
      timeValue = Math.floor(timestamp / 1000).toString();
    }

    candles.push({
      time: timeValue,
      open: parseFloat(clampedOpen.toFixed(2)),
      high: parseFloat(clampedHigh.toFixed(2)),
      low: parseFloat(clampedLow.toFixed(2)),
      close: parseFloat(clampedClose.toFixed(2)),
      volume,
    });

    prevClose = clampedClose;
  }

  return candles;
}
