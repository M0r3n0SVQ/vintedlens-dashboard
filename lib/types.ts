export interface CategoryMetrics {
  category: string;
  total_count: number;
  sold_count: number;
  listed_count: number;
  reserved_count: number;
  removed_count: number;
  avg_listing_price: number | null;
  avg_sale_price: number | null;
  avg_days_to_sell: number | null;
  sell_through_rate: number | null;
  low_rotation: boolean;
}

export interface MetricsSnapshot {
  generated_at: string;
  source_key: string;
  currency: string;
  low_sell_through_threshold: number;
  valid_row_count: number;
  invalid_row_count: number;
  overall: CategoryMetrics;
  by_category: Record<string, CategoryMetrics>;
}

export interface ItemSuggestion {
  item_id: string;
  title: string;
  suggestion: string;
}

export interface AiSummary {
  generated_at: string;
  source_key: string;
  compared_to: string | null;
  summary: string;
  suggestions: ItemSuggestion[];
}

export interface MetricsResponse {
  latest: MetricsSnapshot | null;
  history: MetricsSnapshot[];
  ai_summary: AiSummary | null;
}
