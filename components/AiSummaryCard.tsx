import type { AiSummary } from "@/lib/types";

import { SparkleIcon } from "./icons";

export function AiSummaryCard({ summary }: { summary: AiSummary }) {
  return (
    <div className="rounded-xl border border-indigo-900/60 bg-gradient-to-b from-indigo-950/40 to-indigo-950/10 p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-900/60 px-2.5 py-1 text-xs font-medium text-indigo-300">
          <SparkleIcon className="h-3 w-3" />
          Resumen IA
        </span>
      </div>
      <p className="leading-relaxed text-neutral-200">{summary.summary}</p>

      {summary.suggestions.length > 0 && (
        <ul className="mt-4 space-y-4 border-t border-indigo-900/40 pt-4">
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
