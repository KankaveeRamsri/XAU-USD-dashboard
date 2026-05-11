import { Card } from "./Card";
import { Badge } from "./Badge";
import type { TradeSetup } from "@/lib/trading/types";

interface TradeSetupCardProps {
  data: TradeSetup;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </div>
  );
}

export function TradeSetupCard({ data }: TradeSetupCardProps) {
  const isLong = data.direction === "Long";

  return (
    <Card
      title="Trade Setup"
      subtitle={data.status}
      action={
        <Badge variant={isLong ? "bullish" : "bearish"}>
          {isLong ? "↑" : "↓"} {data.direction}
        </Badge>
      }
    >
      <div className="divide-y divide-card-border">
        <Row
          label="Entry Zone"
          value={
            <span className="font-mono">
              {data.entryZone[0].toFixed(0)} - {data.entryZone[1].toFixed(0)}
            </span>
          }
        />
        <Row
          label="Stop Loss"
          value={
            <span className="font-mono text-bearish">
              {data.stopLoss.toFixed(0)}
            </span>
          }
        />
        <Row
          label="Take Profit 1"
          value={
            <span className="font-mono text-bullish">
              {data.takeProfit1.toFixed(0)}
            </span>
          }
        />
        <Row
          label="Take Profit 2"
          value={
            <span className="font-mono text-bullish">
              {data.takeProfit2.toFixed(0)}
            </span>
          }
        />
        <Row
          label="Risk / Reward"
          value={
            <span className="font-mono text-gold">{data.riskReward}</span>
          }
        />
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-background px-3 py-2">
        <span className="text-xs text-muted">Status</span>
        <Badge variant="gold">{data.status}</Badge>
      </div>
    </Card>
  );
}
