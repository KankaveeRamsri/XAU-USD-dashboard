interface BadgeProps {
  variant: "bullish" | "bearish" | "neutral" | "gold" | "high" | "medium" | "low" | "active" | "inactive" | "default";
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeProps["variant"], string> = {
  bullish: "bg-bullish-bg text-bullish border-bullish/20",
  bearish: "bg-bearish-bg text-bearish border-bearish/20",
  neutral: "bg-muted/20 text-muted-foreground border-muted/30",
  gold: "bg-gold/10 text-gold border-gold/20",
  high: "bg-bearish-bg text-bearish border-bearish/20",
  medium: "bg-gold/10 text-gold border-gold/20",
  low: "bg-bullish-bg text-bullish border-bullish/20",
  active: "bg-bullish-bg text-bullish border-bullish/20",
  inactive: "bg-muted/10 text-muted border-muted/30",
  default: "bg-card border-card-border text-muted-foreground",
};

export function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
