import "server-only";

import type { MetricsResponse } from "./types";

/**
 * Lee las métricas del backend de VintedLens. Server-only a propósito
 * (import "server-only" falla el build si esto se importa desde un
 * Client Component): la API key vive solo en variables de entorno del
 * servidor y no debe llegar nunca al bundle del navegador.
 */
export async function getMetrics(): Promise<MetricsResponse> {
  const endpoint = process.env.VINTEDLENS_API_ENDPOINT;
  const apiKey = process.env.VINTEDLENS_API_KEY;

  if (!endpoint || !apiKey) {
    throw new Error(
      "Faltan VINTEDLENS_API_ENDPOINT o VINTEDLENS_API_KEY en las variables de entorno del servidor.",
    );
  }

  const url = new URL("metrics", endpoint);
  const response = await fetch(url, {
    headers: { "x-api-key": apiKey },
  });

  if (!response.ok) {
    throw new Error(`La API de VintedLens respondió ${response.status}`);
  }

  return response.json() as Promise<MetricsResponse>;
}
