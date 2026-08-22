import type { AiSummary } from "@/lib/types";

import { SparkleIcon } from "./icons";

export function AiSummaryCard({ summary }: { summary: AiSummary }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/50 to-neutral-900/70 p-6 shadow-xl shadow-indigo-950/30 backdrop-blur-sm">
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl"
        aria-hidden
      />
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-2.5 py-1 text-xs font-medium text-indigo-300">
          <span aria-hidden="true">
            <SparkleIcon className="h-3 w-3" />
          </span>
          Resumen IA
        </span>
      </div>
      <p className="leading-relaxed text-neutral-200">{summary.summary}</p>

      {summary.suggestions.length > 0 && (
        <ul className="mt-4 max-h-72 space-y-4 overflow-y-auto border-t border-indigo-500/15 pt-4 pr-1">
          {summary.suggestions.map((item) => (
            <li key={item.item_id} className="flex gap-3 text-sm">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <div>
                <span className="font-medium text-neutral-100">{item.title}</span>
                <p className="mt-0.5 leading-relaxed text-neutral-400">{item.suggestion}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
