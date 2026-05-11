import { Card } from "./Card";

export function RiskCalculator() {
  return (
    <Card title="Risk Calculator" subtitle="Calculate position size">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-muted">
              Account Balance
            </label>
            <div className="rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground font-mono">
              $10,000
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Risk %</label>
            <div className="rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground font-mono">
              1.0%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1 block text-xs text-muted">Entry</label>
            <div className="rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-foreground font-mono">
              2365
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Stop Loss</label>
            <div className="rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-bearish font-mono">
              2355
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">
              Take Profit
            </label>
            <div className="rounded-lg border border-card-border bg-background px-3 py-2 text-sm text-bullish font-mono">
              2390
            </div>
          </div>
        </div>

        <div className="space-y-2 rounded-lg border border-card-border bg-background p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Recommended Lot Size</span>
            <span className="text-sm font-semibold text-gold font-mono">
              0.35
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Estimated Loss</span>
            <span className="text-sm font-medium text-bearish font-mono">
              $100.00
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Risk / Reward</span>
            <span className="text-sm font-medium text-bullish font-mono">
              1:2.5
            </span>
          </div>
        </div>

        <button
          className="w-full rounded-lg bg-gold/10 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold/20"
          disabled
        >
          Interactive calculator coming in Phase 5
        </button>
      </div>
    </Card>
  );
}
