import { Card } from "./Card";
import type { SupportResistanceLevel } from "@/lib/trading/types";

interface SupportResistancePanelProps {
  data: SupportResistanceLevel;
}

export function SupportResistancePanel({ data }: SupportResistancePanelProps) {
  return (
    <Card title="Support & Resistance" subtitle="Key price levels">
      <div className="space-y-3">
        {/* Resistance */}
        <div>
          <span className="mb-1.5 block text-xs font-medium text-bearish">
            Resistance
          </span>
          <div className="space-y-1">
            {data.resistance.map((level, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md bg-bearish-bg px-3 py-1.5"
              >
                <span className="text-xs text-muted">R{data.resistance.length - i}</span>
                <span className="text-xs font-mono font-medium text-bearish">
                  {level.toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current price */}
        <div className="flex items-center justify-center rounded-md border border-gold/20 bg-gold/5 py-1.5">
          <span className="text-xs font-mono font-bold text-gold">
            {data.currentPrice.toFixed(2)}
          </span>
        </div>

        {/* Support */}
        <div>
          <span className="mb-1.5 block text-xs font-medium text-bullish">
            Support
          </span>
          <div className="space-y-1">
            {data.support.map((level, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md bg-bullish-bg px-3 py-1.5"
              >
                <span className="text-xs text-muted">S{i + 1}</span>
                <span className="text-xs font-mono font-medium text-bullish">
                  {level.toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
