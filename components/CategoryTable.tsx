import type { CategoryMetrics } from "@/lib/types";

function formatPrice(value: number | null, currency: string): string {
  return value === null ? "—" : `${value.toFixed(2)} ${currency}`;
}

function formatDays(value: number | null): string {
  return value === null ? "—" : `${value.toFixed(1)} días`;
}

function formatRate(value: number | null): string {
  return value === null ? "—" : `${(value * 100).toFixed(0)}%`;
}

interface CategoryTableProps {
  categories: Record<string, CategoryMetrics>;
  currency: string;
}

export function CategoryTable({ categories, currency }: CategoryTableProps) {
  const rows = Object.values(categories).sort((a, b) => b.total_count - a.total_count);

  if (rows.length === 0) {
    return <p className="text-neutral-400">No hay categorías todavía.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-900 text-neutral-400">
          <tr>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Vendidos</th>
            <th className="px-4 py-3">Precio medio</th>
            <th className="px-4 py-3">Tiempo en catálogo</th>
            <th className="px-4 py-3">Rotación</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {rows.map((row) => (
            <tr key={row.category} className="text-neutral-200">
              <td className="px-4 py-3 font-medium capitalize">
                {row.category}
                {row.low_rotation && (
                  <span className="ml-2 rounded-full bg-amber-900/50 px-2 py-0.5 text-xs text-amber-300">
                    rotación baja
                  </span>
                )}
              </td>
              <td className="px-4 py-3">{row.total_count}</td>
              <td className="px-4 py-3">{row.sold_count}</td>
              <td className="px-4 py-3">{formatPrice(row.avg_listing_price, currency)}</td>
              <td className="px-4 py-3">{formatDays(row.avg_days_to_sell)}</td>
              <td className="px-4 py-3">{formatRate(row.sell_through_rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
