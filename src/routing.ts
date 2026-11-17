/**
 * The illustrative router shown in "How routing works".
 * Values are relative sample numbers for explanation only, not live data
 * and not real providers.
 */
export type Preference = "cheapest" | "fastest" | "balanced";

export interface Provider {
  id: string;
  name: string;
  /** Relative cost, 1.0 = lowest in the sample. */
  cost: number;
  /** Relative latency, 1.0 = lowest in the sample. */
  latency: number;
}

export const SAMPLE_PROVIDERS: readonly Provider[] = [
  { id: "a", name: "Provider A", cost: 1.0, latency: 2.5 },
  { id: "b", name: "Provider B", cost: 2.0, latency: 1.0 },
  { id: "c", name: "Provider C", cost: 1.3, latency: 1.3 },
];

export const PREFERENCES: readonly { value: Preference; label: string; rule: string }[] = [
  { value: "cheapest", label: "Cheapest", rule: "lowest cost" },
  { value: "fastest", label: "Fastest", rule: "lowest latency" },
  { value: "balanced", label: "Balanced", rule: "best cost × latency" },
];

const score: Record<Preference, (p: Provider) => number> = {
  cheapest: (p) => p.cost,
  fastest: (p) => p.latency,
  balanced: (p) => p.cost * p.latency,
};

/** Picks the provider with the lowest score for a preference. */
export function route(preference: Preference, providers: readonly Provider[] = SAMPLE_PROVIDERS): Provider {
  if (providers.length === 0) throw new Error("route() needs at least one provider");
  return providers.reduce((best, p) => (score[preference](p) < score[preference](best) ? p : best));
}
