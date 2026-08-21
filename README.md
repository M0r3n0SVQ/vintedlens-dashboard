# VintedLens Dashboard

Frontend en Next.js que consume el pipeline serverless de
[VintedLens](https://github.com/M0r3n0SVQ/VintedLens) como backend:
lee las métricas de inventario/ventas de LoopVTG (rotación, precio
medio, tiempo en catálogo) a través de su API HTTP y las muestra en
un dashboard de solo lectura.

Proyecto de portfolio — Fase 5 (opcional) de VintedLens, reutilizando
patrones de **Plendu** (Next.js + Vercel) para conectar ambos
proyectos en vez de dejarlos como piezas sueltas.

## Arquitectura

```
Navegador → Next.js (Vercel) → [server-side] → API Gateway → Lambda → S3 (VintedLens)
```

El dashboard **nunca** llama a la API desde el navegador: todo el
fetch ocurre en Server Components, en el servidor de Vercel. La clave
de la API (`VINTEDLENS_API_KEY`) vive solo como variable de entorno
de servidor y no lleva el prefijo `NEXT_PUBLIC_`, así que Next.js no
la incluye en el bundle de cliente. `lib/api.ts` importa
[`server-only`](https://www.npmjs.com/package/server-only), que hace
fallar el build si ese módulo se importa alguna vez desde un Client
Component — un error de build en vez de una fuga silenciosa de la
clave.

Verificado manualmente: la clave no aparece en el HTML renderizado ni
en ninguna petición de red visible desde el navegador.

## Qué muestra

- **Métricas por categoría**: precio medio de listado/venta, días
  medios hasta la venta, sell-through rate y aviso de rotación baja,
  con filtro por categoría (`CategorySection`, client component).
- **Historial**: hasta 10 informes anteriores, para ver evolución.
- **Resumen de IA** (`AiSummaryCard`): si la Lambda de reporting de
  VintedLens ya se ha ejecutado, la API expone su último resumen en
  `ai_summary` (puede ser `null` si aún no hay ninguno). El dashboard
  lo pinta como un resumen en texto más una lista de sugerencias
  **por artículo concreto** (título real, no categoría genérica) —
  el mismo cambio que se hizo en el backend para que las sugerencias
  no repitan cosas que el título ya tiene.

## Desarrollo local

Requiere el backend de VintedLens ya desplegado (ver ese repo).

```bash
npm install
cp .env.local.example .env.local   # rellena con los outputs de terraform
npm run dev
```

Variables necesarias en `.env.local` (no versionado):

| Variable | De dónde sale |
|---|---|
| `VINTEDLENS_API_ENDPOINT` | `terraform output api_endpoint` en VintedLens |
| `VINTEDLENS_API_KEY` | `terraform output -raw api_key` en VintedLens |

## Despliegue

Pensado para Vercel, conectando este repo directamente (import
project en vercel.com) y configurando las mismas dos variables de
entorno de arriba en el proyecto de Vercel — no en el repo.

## Stack técnico

Next.js (App Router, Server Components) · TypeScript estricto ·
Tailwind CSS · Vercel
