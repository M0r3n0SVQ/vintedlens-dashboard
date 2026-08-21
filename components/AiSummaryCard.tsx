import type { AiSummary } from "@/lib/types";

export function AiSummaryCard({ summary }: { summary: AiSummary }) {
  return (
    <div className="rounded-lg border border-indigo-900/60 bg-indigo-950/30 p-5">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-indigo-900/60 px-2 py-0.5 text-xs font-medium text-indigo-300">
          Resumen IA
        </span>
      </div>
      <p className="text-neutral-200">{summary.summary}</p>

      {summary.suggestions.length > 0 && (
        <ul className="mt-4 space-y-3 border-t border-indigo-900/40 pt-4">
          {summary.suggestions.map((item) => (
            <li key={item.item_id} className="text-sm text-neutral-300">
              <span className="font-medium text-neutral-100">{item.title}</span>
              <p className="mt-0.5 text-neutral-400">{item.suggestion}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
