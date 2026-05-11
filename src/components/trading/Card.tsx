interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function Card({ title, subtitle, children, className = "", action }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-card-border bg-card p-4 ${className}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}
