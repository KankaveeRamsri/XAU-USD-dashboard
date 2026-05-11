import { TimeframeSelector } from "./TimeframeSelector";
import type { Timeframe } from "@/lib/trading/types";

interface ChartToolbarProps {
  selectedTimeframe: Timeframe;
  onTimeframeChange: (tf: Timeframe) => void;
  lastUpdated: string | null;
  isLoading: boolean;
  onRefresh: () => void;
}

function formatTime(iso: string | null): string {
  if (!iso) return "--";
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function ChartToolbar({
  selectedTimeframe,
  onTimeframeChange,
  lastUpdated,
  isLoading,
  onRefresh,
}: ChartToolbarProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-card-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <TimeframeSelector
          selected={selectedTimeframe}
          onChange={onTimeframeChange}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-muted">
          {isLoading ? "Loading..." : `Updated: ${formatTime(lastUpdated)}`}
        </span>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-card-border transition-colors hover:bg-muted/10 disabled:opacity-40"
          title="Refresh chart data"
        >
          <svg
            className={`h-3.5 w-3.5 text-muted ${isLoading ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
