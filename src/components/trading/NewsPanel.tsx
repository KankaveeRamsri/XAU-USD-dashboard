import { Card } from "./Card";
import { Badge } from "./Badge";
import type { NewsEvent } from "@/lib/trading/types";

interface NewsPanelProps {
  events: NewsEvent[];
}

export function NewsPanel({ events }: NewsPanelProps) {
  return (
    <Card title="News Calendar" subtitle="Upcoming USD events">
      <div className="space-y-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between rounded-lg bg-background px-3 py-2"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Badge variant={event.impact === "High" ? "high" : event.impact === "Medium" ? "medium" : "low"}>
                {event.impact}
              </Badge>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-foreground">
                  {event.event}
                </p>
                <p className="text-[10px] text-muted">
                  {event.currency} · {event.time}
                </p>
              </div>
            </div>
            {event.forecast && (
              <div className="text-right shrink-0 ml-2">
                <p className="text-[10px] text-muted">Fcst</p>
                <p className="text-xs font-mono text-foreground">
                  {event.forecast}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
