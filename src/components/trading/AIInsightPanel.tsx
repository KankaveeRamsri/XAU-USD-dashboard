import { Card } from "./Card";
import { Badge } from "./Badge";
import type { AIInsight } from "@/lib/trading/types";

interface AIInsightPanelProps {
  data: AIInsight;
}

export function AIInsightPanel({ data }: AIInsightPanelProps) {
  return (
    <Card
      title="AI Market Insight"
      subtitle={`Updated ${data.lastUpdated}`}
      action={
        <Badge variant={data.bias === "Bullish" ? "bullish" : data.bias === "Bearish" ? "bearish" : "neutral"}>
          {data.bias}
        </Badge>
      }
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-background px-3 py-2">
          <span className="text-xs text-muted">Confidence</span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-20 rounded-full bg-muted/20">
              <div
                className="h-1.5 rounded-full bg-gold"
                style={{ width: `${data.confidence}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gold">
              {data.confidence}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-background px-3 py-2">
          <span className="text-xs text-muted">Risk Level</span>
          <Badge
            variant={
              data.riskLevel === "High"
                ? "bearish"
                : data.riskLevel === "Medium"
                  ? "gold"
                  : "bullish"
            }
          >
            {data.riskLevel}
          </Badge>
        </div>

        <div className="space-y-1.5 pt-1">
          <span className="text-xs font-medium text-muted-foreground">
            Key Factors
          </span>
          <ul className="space-y-1.5">
            {data.reasons.map((reason, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-gold/10 bg-gold/5 px-3 py-2">
          <p className="text-xs text-gold-light">
            <span className="font-medium">Suggested: </span>
            {data.suggestedAction}
          </p>
        </div>
      </div>
    </Card>
  );
}
