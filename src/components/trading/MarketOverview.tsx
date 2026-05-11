import { Badge } from "./Badge";
import type { MarketData } from "@/lib/trading/types";

interface MarketOverviewProps {
  data: MarketData;
}

function StatItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

export function MarketOverview({ data }: MarketOverviewProps) {
  const isPositive = data.dailyChangePercent >= 0;

  return (
    <div className="rounded-xl border border-card-border bg-card p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
            <span className="text-lg font-bold text-gold">Au</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">
                {data.symbol}
              </h2>
              <Badge variant={data.trend === "Bullish" ? "bullish" : data.trend === "Bearish" ? "bearish" : "neutral"}>
                {data.trend}
              </Badge>
            </div>
            <p className="text-xs text-muted">{data.currentSession}</p>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground font-mono">
            {data.price.toFixed(2)}
          </span>
          <span
            className={`text-sm font-semibold ${
              isPositive ? "text-bullish" : "text-bearish"
            }`}
          >
            {isPositive ? "+" : ""}
            {data.dailyChange.toFixed(2)} ({isPositive ? "+" : ""}
            {data.dailyChangePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-card-border pt-4 sm:grid-cols-4 lg:grid-cols-7">
        <StatItem label="Open" value={data.open.toFixed(2)} />
        <StatItem label="High" value={data.dailyHigh.toFixed(2)} />
        <StatItem label="Low" value={data.dailyLow.toFixed(2)} />
        <StatItem label="Prev Close" value={data.previousClose.toFixed(2)} />
        <StatItem label="Spread" value={`${data.spread} pts`} />
        <StatItem
          label="Volatility"
          value={
            <Badge
              variant={
                data.volatility === "High" || data.volatility === "Extreme"
                  ? "bearish"
                  : data.volatility === "Medium"
                    ? "gold"
                    : "bullish"
              }
            >
              {data.volatility}
            </Badge>
          }
        />
        <StatItem
          label="Trend"
          value={
            <Badge variant={data.trend === "Bullish" ? "bullish" : data.trend === "Bearish" ? "bearish" : "neutral"}>
              {data.trend}
            </Badge>
          }
        />
      </div>
    </div>
  );
}
