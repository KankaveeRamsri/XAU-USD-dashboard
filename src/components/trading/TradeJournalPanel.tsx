import { Card } from "./Card";
import { Badge } from "./Badge";
import type { TradeJournalSummary } from "@/lib/trading/types";

interface TradeJournalPanelProps {
  data: TradeJournalSummary;
}

export function TradeJournalPanel({ data }: TradeJournalPanelProps) {
  return (
    <Card title="Trade Journal" subtitle="Today&apos;s performance">
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-background px-3 py-2 text-center">
            <p className="text-lg font-bold text-foreground">
              {data.totalTrades}
            </p>
            <p className="text-[10px] text-muted">Trades</p>
          </div>
          <div className="rounded-lg bg-background px-3 py-2 text-center">
            <p className="text-lg font-bold text-bullish">
              {data.winRate.toFixed(1)}%
            </p>
            <p className="text-[10px] text-muted">Win Rate</p>
          </div>
          <div className="rounded-lg bg-background px-3 py-2 text-center">
            <p className="text-lg font-bold text-bullish">
              ${data.netPnL.toFixed(0)}
            </p>
            <p className="text-[10px] text-muted">Net P/L</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            Recent Trades
          </span>
          {data.recentTrades.slice(0, 3).map((trade) => (
            <div
              key={trade.id}
              className="flex items-center justify-between rounded-lg bg-background px-3 py-1.5"
            >
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    trade.direction === "Long" ? "bullish" : "bearish"
                  }
                >
                  {trade.direction}
                </Badge>
                <span className="text-[10px] text-muted">{trade.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted">
                  {trade.entry.toFixed(1)} → {trade.exit.toFixed(1)}
                </span>
                <span
                  className={`text-xs font-medium font-mono ${
                    trade.pnl >= 0 ? "text-bullish" : "text-bearish"
                  }`}
                >
                  {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(0)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          className="w-full rounded-lg border border-card-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/5 hover:text-foreground"
          disabled
        >
          Full journal coming soon
        </button>
      </div>
    </Card>
  );
}
