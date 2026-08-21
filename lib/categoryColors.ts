// Paleta cíclica para identificar categorías visualmente (puntos en la
// tabla, barras del gráfico) — determinista por orden alfabético, así
// una categoría siempre tiene el mismo color entre recargas sin tener
// que guardar un mapeo a mano por cada una que aparezca en el CSV.
const PALETTE = [
  { text: "text-indigo-400", bg: "bg-indigo-500" },
  { text: "text-emerald-400", bg: "bg-emerald-500" },
  { text: "text-amber-400", bg: "bg-amber-500" },
  { text: "text-rose-400", bg: "bg-rose-500" },
  { text: "text-cyan-400", bg: "bg-cyan-500" },
  { text: "text-violet-400", bg: "bg-violet-500" },
  { text: "text-orange-400", bg: "bg-orange-500" },
  { text: "text-teal-400", bg: "bg-teal-500" },
];

export function categoryColor(category: string, allCategories: string[]): { text: string; bg: string } {
  const sorted = [...allCategories].sort();
  const index = sorted.indexOf(category);
  return PALETTE[(index < 0 ? 0 : index) % PALETTE.length];
}
