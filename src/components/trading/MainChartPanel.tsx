"use client";

import { useState } from "react";

const TIMEFRAMES = ["1m", "5m", "15m", "1H", "4H", "1D"] as const;

export function MainChartPanel() {
  const [activeTimeframe, setActiveTimeframe] = useState<string>("1H");

  return (
    <div className="flex h-full flex-col rounded-xl border border-card-border bg-card">
      <div className="flex items-center justify-between border-b border-card-border px-4 py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            XAUUSD Chart
          </h3>
          <span className="rounded bg-gold/10 px-1.5 py-0.5 text-[10px] font-medium text-gold">
            GOLD
          </span>
        </div>
        <div className="flex items-center gap-1">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                activeTimeframe === tf
                  ? "bg-gold/20 text-gold"
                  : "text-muted hover:bg-muted/10 hover:text-foreground"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center p-4 min-h-[300px] lg:min-h-[400px]">
        {/* Grid background */}
        <div
          className="absolute inset-4 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Mock candlestick pattern */}
        <div className="flex items-end gap-2 h-48 sm:h-56">
          {[
            { body: 24, wick: 40, up: true },
            { body: 18, wick: 35, up: false },
            { body: 30, wick: 48, up: true },
            { body: 14, wick: 28, up: false },
            { body: 22, wick: 38, up: true },
            { body: 26, wick: 42, up: true },
            { body: 16, wick: 32, up: false },
            { body: 34, wick: 52, up: true },
            { body: 20, wick: 36, up: true },
            { body: 12, wick: 24, up: false },
            { body: 28, wick: 44, up: true },
            { body: 18, wick: 30, up: false },
            { body: 32, wick: 50, up: true },
            { body: 22, wick: 38, up: true },
            { body: 16, wick: 28, up: false },
            { body: 26, wick: 42, up: true },
            { body: 20, wick: 34, up: true },
            { body: 14, wick: 26, up: false },
            { body: 36, wick: 54, up: true },
            { body: 24, wick: 40, up: true },
          ].map((candle, i) => (
            <div key={i} className="flex flex-col items-center" style={{ height: candle.wick * 2.2 }}>
              <div
                className="w-px"
                style={{
                  height: `${candle.wick - candle.body / 2}px`,
                  backgroundColor: candle.up
                    ? "var(--bullish)"
                    : "var(--bearish)",
                  opacity: 0.5,
                }}
              />
              <div
                className="w-2.5 rounded-sm sm:w-3"
                style={{
                  height: `${candle.body}px`,
                  backgroundColor: candle.up
                    ? "var(--bullish)"
                    : "var(--bearish)",
                  opacity: 0.8,
                }}
              />
              <div
                className="w-px flex-1"
                style={{
                  backgroundColor: candle.up
                    ? "var(--bullish)"
                    : "var(--bearish)",
                  opacity: 0.5,
                }}
              />
            </div>
          ))}
        </div>

        {/* Phase notice */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <p className="text-xs text-muted text-center">
            Candlestick chart integration will be added in Phase 2
          </p>
        </div>
      </div>
    </div>
  );
}
