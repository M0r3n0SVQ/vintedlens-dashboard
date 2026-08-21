import type { ReactNode } from "react";

type Tone = "neutral" | "emerald" | "violet" | "amber";

const TONE_STYLES: Record<Tone, string> = {
  neutral: "text-neutral-400 bg-neutral-800/80",
  emerald: "text-emerald-400 bg-emerald-500/10",
  violet: "text-violet-400 bg-violet-500/10",
  amber: "text-amber-400 bg-amber-500/10",
};

interface MetricCardProps {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
  tone?: Tone;
}

export function MetricCard({ label, value, hint, icon, tone = "neutral" }: MetricCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 transition-colors hover:border-neutral-700">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-neutral-400">{label}</p>
        {icon && (
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${TONE_STYLES[tone]}`}>
            <span className="h-4 w-4">{icon}</span>
          </span>
        )}
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-50">{value}</p>
      {hint && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}
