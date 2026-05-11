import { Badge } from "./Badge";
import type { MarketTrend, VolatilityLevel, MarketSessionName } from "@/lib/trading/types";

interface TrendBadgeProps {
  trend: MarketTrend;
}

export function TrendBadge({ trend }: TrendBadgeProps) {
  const variant = trend === "Bullish" ? "bullish" : trend === "Bearish" ? "bearish" : "neutral";
  return <Badge variant={variant}>{trend}</Badge>;
}

interface VolatilityBadgeProps {
  level: VolatilityLevel;
}

export function VolatilityBadge({ level }: VolatilityBadgeProps) {
  const variant = level === "High" || level === "Extreme" ? "high" : level === "Medium" ? "medium" : "low";
  return <Badge variant={variant}>{level}</Badge>;
}

interface SessionBadgeProps {
  session: MarketSessionName;
}

export function SessionBadge({ session }: SessionBadgeProps) {
  const variant = session === "Closed" ? "inactive" : "active";
  return <Badge variant={variant}>{session}</Badge>;
}
