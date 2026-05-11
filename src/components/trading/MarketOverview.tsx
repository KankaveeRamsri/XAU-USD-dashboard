import { Badge } from "./Badge";
import { MarketMetricCard } from "./MarketMetricCard";
import { TrendBadge, VolatilityBadge, SessionBadge } from "./MarketStatusBadge";
import type { MarketData } from "@/lib/trading/types";

interface MarketOverviewProps {
  data: MarketData | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  onRefresh: () => void;
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-muted/20" />
          <div className="space-y-2">
            <div className="h-5 w-24 rounded bg-muted/20" />
            <div className="h-3 w-36 rounded bg-muted/20" />
          </div>
        </div>
        <div className="space-y-2 text-right">
          <div className="h-8 w-32 rounded bg-muted/20" />
          <div className="h-4 w-28 rounded bg-muted/20" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-card-border pt-4 sm:grid-cols-4 lg:grid-cols-7">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-12 rounded bg-muted/20" />
            <div className="h-4 w-16 rounded bg-muted/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bearish-bg">
        <svg className="h-5 w-5 text-bearish" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
  );
}

function formatTimestamp(iso: string | null): string {
  if (!iso) return "--";
  const date = new Date(iso);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function MarketOverview({ data, isLoading, error, lastUpdated, onRefresh }: MarketOverviewProps) {
  return (
    <div className="rounded-xl border border-card-border bg-card p-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">Market Overview</h3>
          {data && <SessionBadge session={data.session} />}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted">
            {isLoading ? "Updating..." : `Updated: ${formatTimestamp(lastUpdated ?? data?.updatedAt ?? null)}`}
          </span>
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-card-border transition-colors hover:bg-muted/10 disabled:opacity-40"
            title="Refresh market data"
          >
            <svg
              className={`h-3.5 w-3.5 text-muted ${isLoading ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3">
        {error ? (
          <ErrorState message={error} onRetry={onRefresh} />
        ) : isLoading && !data ? (
          <Skeleton />
        ) : data ? (
          <MarketDataContent data={data} />
        ) : null}
      </div>
    </div>
  );
}

function MarketDataContent({ data }: { data: MarketData }) {
  const isPositive = data.dailyChangePercent >= 0;
  const changeColor = isPositive ? "text-bullish" : data.dailyChangePercent === 0 ? "text-muted-foreground" : "text-bearish";
  const changeSign = isPositive ? "+" : "";

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
            <span className="text-lg font-bold text-gold">Au</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">{data.symbol}</h2>
              <TrendBadge trend={data.trend} />
            </div>
            <p className="text-xs text-muted">{data.displayName}</p>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground font-mono">
            {data.price.toFixed(2)}
          </span>
          <span className={`text-sm font-semibold ${changeColor}`}>
            {changeSign}{data.dailyChange.toFixed(2)} ({changeSign}{data.dailyChangePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-card-border pt-4 sm:grid-cols-4 lg:grid-cols-7">
        <MarketMetricCard label="Open" value={data.open.toFixed(2)} />
        <MarketMetricCard label="High" value={data.dailyHigh.toFixed(2)} />
        <MarketMetricCard label="Low" value={data.dailyLow.toFixed(2)} />
        <MarketMetricCard label="Prev Close" value={data.previousClose.toFixed(2)} />
        <MarketMetricCard label="Spread" value={`${data.spread} pts`} />
        <MarketMetricCard
          label="Volatility"
          value={<VolatilityBadge level={data.volatility} />}
        />
        <MarketMetricCard
          label="Trend"
          value={<TrendBadge trend={data.trend} />}
        />
      </div>
    </>
  );
}
