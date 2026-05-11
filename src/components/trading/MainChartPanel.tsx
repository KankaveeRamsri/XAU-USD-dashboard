"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ChartToolbar } from "./ChartToolbar";
import { useXauusdChartData } from "@/hooks/useXauusdChartData";
import type { Timeframe } from "@/lib/trading/types";

// Dynamic import to avoid SSR issues with lightweight-charts
const CandlestickChart = dynamic(
  () =>
    import("./CandlestickChart").then((mod) => mod.CandlestickChart),
  { ssr: false }
);

function ChartSkeleton() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted/30 border-t-gold" />
        <p className="text-xs text-muted">Loading chart...</p>
      </div>
    </div>
  );
}

function ChartError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bearish-bg">
          <svg
            className="h-5 w-5 text-bearish"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-sm text-bearish">{message}</p>
        <button
          onClick={onRetry}
          className="rounded-lg border border-card-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/10"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export function MainChartPanel() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("1H");
  const { candles, isLoading, error, lastUpdated, refreshChartData } =
    useXauusdChartData(selectedTimeframe);

  return (
    <div className="flex h-full flex-col rounded-xl border border-card-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-card-border px-4 py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            XAUUSD Chart
          </h3>
          <span className="rounded bg-gold/10 px-1.5 py-0.5 text-[10px] font-medium text-gold">
            GOLD
          </span>
          <span className="rounded bg-muted/10 px-1.5 py-0.5 text-[10px] text-muted">
            Mock OHLC · Phase 2
          </span>
        </div>
      </div>

      {/* Toolbar: timeframe + refresh */}
      <ChartToolbar
        selectedTimeframe={selectedTimeframe}
        onTimeframeChange={setSelectedTimeframe}
        lastUpdated={lastUpdated}
        isLoading={isLoading}
        onRefresh={refreshChartData}
      />

      {/* Chart area */}
      <div className="relative flex flex-1 min-h-[300px] lg:min-h-[420px]">
        {error ? (
          <ChartError message={error} onRetry={refreshChartData} />
        ) : isLoading && candles.length === 0 ? (
          <ChartSkeleton />
        ) : candles.length > 0 ? (
          <CandlestickChart candles={candles} className="h-full w-full" />
        ) : null}
      </div>
    </div>
  );
}
