interface MarketMetricCardProps {
  label: string;
  value: React.ReactNode;
}

export function MarketMetricCard({ label, value }: MarketMetricCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
