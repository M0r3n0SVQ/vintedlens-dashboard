"use client";

import { useState } from "react";

import type { CategoryMetrics } from "@/lib/types";

import { CategoryTable } from "./CategoryTable";

interface CategorySectionProps {
  categories: Record<string, CategoryMetrics>;
  currency: string;
}

export function CategorySection({ categories, currency }: CategorySectionProps) {
  const [selected, setSelected] = useState<string>("all");
  const categoryNames = Object.keys(categories).sort();

  const filtered =
    selected === "all"
      ? categories
      : Object.fromEntries(Object.entries(categories).filter(([key]) => key === selected));

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">Detalle</p>
          <h2 className="text-lg font-medium text-neutral-100">Por categoría</h2>
        </div>
        <select
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          className="rounded-lg border border-white/10 bg-neutral-900/70 px-3 py-1.5 text-sm text-neutral-200 backdrop-blur-sm transition-colors hover:border-white/20 focus:border-indigo-600 focus:outline-none"
        >
          <option value="all">Todas las categorías</option>
          {categoryNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <CategoryTable categories={filtered} currency={currency} />
    </div>
  );
}
