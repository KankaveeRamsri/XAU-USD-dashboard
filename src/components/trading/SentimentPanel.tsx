import { Card } from "./Card";
import { Badge } from "./Badge";
import type { SentimentData } from "@/lib/trading/types";

interface SentimentPanelProps {
  data: SentimentData;
}

function directionColor(dir: string) {
  if (dir === "Weakening" || dir === "Falling") return "bullish" as const;
  if (dir === "Strengthening" || dir === "Rising") return "bearish" as const;
  return "neutral" as const;
}

export function SentimentPanel({ data }: SentimentPanelProps) {
  return (
    <Card title="Market Sentiment" subtitle="Cross-asset indicators">
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-lg bg-background px-3 py-2">
          <div>
            <p className="text-xs font-medium text-foreground">DXY</p>
            <p className="text-[10px] text-muted font-mono">{data.dxy.value}</p>
          </div>
          <Badge variant={directionColor(data.dxy.direction)}>
            {data.dxy.direction}
          </Badge>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-background px-3 py-2">
          <div>
            <p className="text-xs font-medium text-foreground">US 10Y Yield</p>
            <p className="text-[10px] text-muted font-mono">
              {data.us10Y.value}
            </p>
          </div>
          <Badge variant={directionColor(data.us10Y.direction)}>
            {data.us10Y.direction}
          </Badge>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-background px-3 py-2">
          <span className="text-xs font-medium text-foreground">
            Gold Bias
          </span>
          <Badge
            variant={
              data.goldBias === "Bullish"
                ? "bullish"
                : data.goldBias === "Bearish"
                  ? "bearish"
                  : "neutral"
            }
          >
            {data.goldBias}
          </Badge>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-background px-3 py-2">
          <span className="text-xs font-medium text-foreground">
            Risk Sentiment
          </span>
          <Badge
            variant={
              data.riskSentiment === "Risk-Off"
                ? "bearish"
                : data.riskSentiment === "Defensive"
                  ? "gold"
                  : "bullish"
            }
          >
            {data.riskSentiment}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
