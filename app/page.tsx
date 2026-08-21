import { AiSummaryCard } from "@/components/AiSummaryCard";
import { CategorySection } from "@/components/CategorySection";
import { CheckIcon, CoinIcon, RefreshIcon, TagIcon } from "@/components/icons";
import { MetricCard } from "@/components/MetricCard";
import { getMetrics } from "@/lib/api";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function Home() {
  let data;
  try {
    data = await getMetrics();
  } catch (error) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-2xl font-semibold text-neutral-50">VintedLens</h1>
        <p className="mt-4 rounded-lg border border-red-900 bg-red-950/50 p-4 text-red-300">
          No se pudieron cargar las métricas: {(error as Error).message}
        </p>
      </main>
    );
  }

  if (!data.latest) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-2xl font-semibold text-neutral-50">VintedLens</h1>
        <p className="mt-4 text-neutral-400">
          Todavía no hay métricas. Sube un CSV a <code>raw/</code> en el pipeline para empezar.
        </p>
      </main>
    );
  }

  const { overall, by_category, currency, generated_at } = data.latest;
  const { ai_summary } = data;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-50">VintedLens</h1>
          <p className="mt-1 text-neutral-400">Inventario y ventas de LoopVTG en Vinted</p>
        </div>
        <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-900/60 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Datos en vivo
        </span>
      </header>

      <section className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricCard
          label="Artículos"
          value={String(overall.total_count)}
          icon={<TagIcon className="h-full w-full" />}
        />
        <MetricCard
          label="Vendidos"
          value={String(overall.sold_count)}
          icon={<CheckIcon className="h-full w-full" />}
          tone="emerald"
        />
        <MetricCard
          label="Rotación"
          value={
            overall.sell_through_rate === null
              ? "—"
              : `${(overall.sell_through_rate * 100).toFixed(0)}%`
          }
          icon={<RefreshIcon className="h-full w-full" />}
          tone="violet"
        />
        <MetricCard
          label="Precio medio"
          value={
            overall.avg_listing_price === null
              ? "—"
              : `${overall.avg_listing_price.toFixed(2)} ${currency}`
          }
          icon={<CoinIcon className="h-full w-full" />}
          tone="amber"
        />
      </section>

      {ai_summary && (
        <section className="mb-10">
          <AiSummaryCard summary={ai_summary} />
        </section>
      )}

      <section className="mb-6">
        <CategorySection categories={by_category} currency={currency} />
      </section>

      <footer className="mt-10 text-xs text-neutral-500">
        Generado el {formatDate(generated_at)} · {data.history.length} informe(s) anterior(es)
      </footer>
    </main>
  );
}
