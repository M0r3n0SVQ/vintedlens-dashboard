interface IconProps {
  className?: string;
}

// Iconos inline (sin librería externa) para no añadir una dependencia
// solo por 4 glifos estáticos — mismo criterio de "sin dependencias
// que no aporten" que el backend aplica a las Lambdas.

export function TagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <path
        d="M11.6 3H6.4A2.4 2.4 0 0 0 4 5.4v5.2c0 .64.25 1.25.7 1.7l8.4 8.4a2.4 2.4 0 0 0 3.39 0l4.61-4.61a2.4 2.4 0 0 0 0-3.4l-8.4-8.4A2.4 2.4 0 0 0 11.6 3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <circle cx="12" cy="12" r="9" strokeLinecap="round" />
      <path d="m8.5 12.5 2.4 2.4 4.6-5.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RefreshIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <path
        d="M4.5 12a7.5 7.5 0 0 1 12.6-5.5M19.5 12a7.5 7.5 0 0 1-12.6 5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17 3.5V7h-3.5M7 20.5V17h3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CoinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <circle cx="12" cy="12" r="8.5" strokeLinecap="round" />
      <path d="M12 7.5v9M14.5 9.75c0-1-.9-1.75-2.5-1.75s-2.5.75-2.5 1.75.9 1.5 2.5 1.75c1.6.25 2.5.7 2.5 1.75S13.6 15 12 15s-2.5-.5-2.5-1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LogoMark({ className }: IconProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-950/50 ${className ?? ""}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.75} className="h-1/2 w-1/2">
        <circle cx="11" cy="11" r="6.5" strokeLinecap="round" />
        <path d="m20 20-3.8-3.8" strokeLinecap="round" />
        <circle cx="11" cy="11" r="2.25" fill="white" stroke="none" />
      </svg>
    </div>
  );
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11 2.5c.2 2.9 1 4.9 2.4 6.1 1.4 1.2 3.5 1.9 6.6 2.1-3.1.2-5.2.9-6.6 2.1-1.4 1.2-2.2 3.2-2.4 6.1-.2-2.9-1-4.9-2.4-6.1-1.4-1.2-3.5-1.9-6.6-2.1 3.1-.2 5.2-.9 6.6-2.1 1.4-1.2 2.2-3.2 2.4-6.1Z" />
    </svg>
  );
}
