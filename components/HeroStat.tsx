import { RadialProgress } from "./RadialProgress";

interface HeroStatProps {
  percent: number | null;
  soldCount: number;
  totalCount: number;
}

export function HeroStat({ percent, soldCount, totalCount }: HeroStatProps) {
  const value = percent === null ? 0 : Math.round(percent * 100);
  const color = value >= 50 ? "text-emerald-400" : value >= 20 ? "text-amber-400" : "text-rose-400";

  return (
    <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-900/40 p-6 shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="relative shrink-0">
        <RadialProgress percent={value} colorClassName={color} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tracking-tight text-neutral-50">
            {percent === null ? "—" : `${value}%`}
          </span>
        </div>
      </div>
      <div>
        <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
          Rotación de inventario
        </p>
        <p className="mt-1 text-sm text-neutral-400">
          <span className="font-medium text-neutral-200">{soldCount}</span> vendidos de{" "}
          <span className="font-medium text-neutral-200">{totalCount}</span> artículos
        </p>
      </div>
    </div>
  );
}
