import { categoryColor } from "@/lib/categoryColors";
import type { CategoryMetrics } from "@/lib/types";

function formatPrice(value: number | null, currency: string): string {
  return value === null ? "—" : `${value.toFixed(2)} ${currency}`;
}

function formatDays(value: number | null): string {
  return value === null ? "—" : `${value.toFixed(1)} días`;
}

// Rojo/ámbar/verde en vez de un solo tono para que la tabla se lea de
// un vistazo sin tener que comparar los números categoría a
// categoría — el corte en 20/50% es el mismo umbral visual que ya
// usa "rotación baja" en el backend (low_sell_through_threshold).
function rateTone(value: number): string {
  if (value < 0.2) return "bg-rose-500";
  if (value < 0.5) return "bg-amber-500";
  return "bg-emerald-500";
}

function RotationRate({ value }: { value: number | null }) {
  if (value === null) {
    return <span className="text-neutral-500">—</span>;
  }

  const percent = Math.round(value * 100);

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-neutral-800">
        <div
          className={`h-full rounded-full ${rateTone(value)} transition-[width] duration-700 ease-out`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      <span className="tabular-nums text-neutral-300">{percent}%</span>
    </div>
  );
}

interface CategoryTableProps {
  categories: Record<string, CategoryMetrics>;
  currency: string;
}

export function CategoryTable({ categories, currency }: CategoryTableProps) {
  const names = Object.keys(categories);
  const rows = Object.values(categories).sort((a, b) => b.total_count - a.total_count);

  if (rows.length === 0) {
    return <p className="text-neutral-400">No hay categorías todavía.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-neutral-900/70 shadow-xl shadow-black/20 backdrop-blur-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/[0.03] text-neutral-500">
          <tr>
            <th className="px-4 py-3 text-xs font-medium tracking-wide uppercase">Categoría</th>
            <th className="px-4 py-3 text-xs font-medium tracking-wide uppercase">Total</th>
            <th className="px-4 py-3 text-xs font-medium tracking-wide uppercase">Vendidos</th>
            <th className="px-4 py-3 text-xs font-medium tracking-wide uppercase">Precio medio</th>
            <th className="px-4 py-3 text-xs font-medium tracking-wide uppercase">Tiempo en catálogo</th>
            <th className="px-4 py-3 text-xs font-medium tracking-wide uppercase">Rotación</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row) => {
            const color = categoryColor(row.category, names);
            return (
              <tr key={row.category} className="text-neutral-200 transition-colors hover:bg-white/[0.03]">
                <td className="px-4 py-3 font-medium">
                  <span className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${color.bg}`} />
                    <span className="capitalize">{row.category}</span>
                    {row.low_rotation && (
                      <span className="rounded-full bg-amber-900/50 px-2 py-0.5 text-xs font-normal text-amber-300">
                        rotación baja
                      </span>
                    )}
                  </span>
                </td>
                <td className="px-4 py-3 tabular-nums">{row.total_count}</td>
                <td className="px-4 py-3 tabular-nums">{row.sold_count}</td>
                <td className="px-4 py-3 tabular-nums">{formatPrice(row.avg_listing_price, currency)}</td>
                <td className="px-4 py-3 tabular-nums">{formatDays(row.avg_days_to_sell)}</td>
                <td className="px-4 py-3">
                  <RotationRate value={row.sell_through_rate} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
