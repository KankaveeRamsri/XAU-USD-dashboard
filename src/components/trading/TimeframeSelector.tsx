import type { Timeframe } from "@/lib/trading/types";

const TIMEFRAMES: Timeframe[] = ["1m", "5m", "15m", "1H", "4H", "1D"];

interface TimeframeSelectorProps {
  selected: Timeframe;
  onChange: (tf: Timeframe) => void;
}

export function TimeframeSelector({ selected, onChange }: TimeframeSelectorProps) {
  return (
    <div className="flex items-center gap-1">
      {TIMEFRAMES.map((tf) => (
        <button
          key={tf}
          onClick={() => onChange(tf)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            selected === tf
              ? "bg-gold/20 text-gold"
              : "text-muted hover:bg-muted/10 hover:text-foreground"
          }`}
        >
          {tf}
        </button>
      ))}
    </div>
  );
}
