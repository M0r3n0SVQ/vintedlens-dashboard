import { AiSummaryCard } from "@/components/AiSummaryCard";
import { CategoryChart } from "@/components/CategoryChart";
import { CategorySection } from "@/components/CategorySection";
import { HeroStat } from "@/components/HeroStat";
import { CheckIcon, CoinIcon, LogoMark, TagIcon } from "@/components/icons";
import { MetricCard } from "@/components/MetricCard";
import { getMetrics } from "@/lib/api";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <LogoMark className="h-10 w-10" />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-50">VintedLens</h1>
        <p className="text-sm text-neutral-400">Inventario y ventas de LoopVTG en Vinted</p>
      </div>
    </div>
  );
}

export default async function Home() {
  let data;
  try {
    data = await getMetrics();
  } catch (error) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <Brand />
        <p className="mt-6 rounded-lg border border-red-900 bg-red-950/50 p-4 text-red-300">
          No se pudieron cargar las métricas: {(error as Error).message}
        </p>
      </main>
    );
  }

  if (!data.latest) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <Brand />
        <p className="mt-6 text-neutral-400">
          Todavía no hay métricas. Sube un CSV a <code>raw/</code> en el pipeline para empezar.
        </p>
      </main>
    );
  }

  const { overall, by_category, currency, generated_at } = data.latest;
  const { ai_summary } = data;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-10 flex items-start justify-between gap-4 border-b border-white/5 pb-8">
        <Brand />
        <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-900/60 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Datos en vivo
        </span>
      </header>

      <section className="animate-fade-in-up mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
        <HeroStat
          percent={overall.sell_through_rate}
          soldCount={overall.sold_count}
          totalCount={overall.total_count}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
            label="Precio medio"
            value={
              overall.avg_listing_price === null
                ? "—"
                : `${overall.avg_listing_price.toFixed(2)} ${currency}`
            }
            icon={<CoinIcon className="h-full w-full" />}
            tone="amber"
          />
        </div>
      </section>

      <section
        className="animate-fade-in-up mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start"
        style={{ animationDelay: "80ms" }}
      >
        <CategoryChart categories={by_category} />
        {ai_summary ? (
          <AiSummaryCard summary={ai_summary} />
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-neutral-500">
            Todavía no hay resumen de IA. Se genera en el próximo informe programado.
          </div>
        )}
      </section>

      <section className="animate-fade-in-up mb-6" style={{ animationDelay: "160ms" }}>
        <CategorySection categories={by_category} currency={currency} />
      </section>

      <footer className="mt-10 text-xs text-neutral-500">
        Generado el {formatDate(generated_at)} · {data.history.length} informe(s) anterior(es)
      </footer>
    </main>
  );
}
