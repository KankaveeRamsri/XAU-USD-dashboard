import { Card } from "./Card";
import { Badge } from "./Badge";
import type { MarketSession } from "@/lib/trading/types";

interface SessionPanelProps {
  sessions: MarketSession[];
}

export function SessionPanel({ sessions }: SessionPanelProps) {
  return (
    <Card title="Market Sessions" subtitle="Forex trading hours">
      <div className="space-y-2">
        {sessions.map((session) => (
          <div
            key={session.name}
            className={`flex items-center justify-between rounded-lg px-3 py-2 ${
              session.isActive ? "bg-bullish-bg" : "bg-background"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  session.isActive
                    ? "bg-bullish shadow-[0_0_6px_rgba(34,197,94,0.5)]"
                    : "bg-muted/30"
                }`}
              />
              <div>
                <p className="text-xs font-medium text-foreground">
                  {session.city}
                </p>
                <p className="text-[10px] text-muted">{session.timezone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted font-mono">
                {session.open} - {session.close}
              </span>
              <Badge variant={session.isActive ? "active" : "inactive"}>
                {session.isActive ? "Active" : "Closed"}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
