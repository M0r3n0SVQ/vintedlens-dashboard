import { categoryColor } from "@/lib/categoryColors";
import type { CategoryMetrics } from "@/lib/types";

interface CategoryChartProps {
  categories: Record<string, CategoryMetrics>;
}

// Gráfico de barras horizontales del mix de inventario por categoría
// (recuento de artículos, no precio) — responde "¿en qué tengo
// metido el catálogo?" de un vistazo, complementario a la tabla de
// abajo, que ya cubre el detalle de precio/rotación por categoría.
export function CategoryChart({ categories }: CategoryChartProps) {
  const names = Object.keys(categories);
  const rows = Object.values(categories).sort((a, b) => b.total_count - a.total_count);
  const max = Math.max(...rows.map((row) => row.total_count), 1);

  if (rows.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-sm">
      <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">Mix de inventario</p>
      <h2 className="mt-1 text-lg font-medium text-neutral-100">Artículos por categoría</h2>

      <div className="mt-5 space-y-3">
        {rows.map((row) => {
          const color = categoryColor(row.category, names);
          const width = (row.total_count / max) * 100;

          return (
            <div key={row.category} className="flex items-center gap-3">
              <span className="w-24 shrink-0 truncate text-sm text-neutral-400 capitalize">
                {row.category}
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-neutral-800">
                <div
                  className={`h-full rounded-full ${color.bg} transition-[width] duration-700 ease-out`}
                  style={{ width: `${width}%` }}
                />
              </div>
              <span className="w-6 shrink-0 text-right text-sm tabular-nums text-neutral-300">
                {row.total_count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
