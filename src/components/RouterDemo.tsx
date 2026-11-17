import { useId, useState } from "react";
import { PREFERENCES, SAMPLE_PROVIDERS, route, type Preference } from "../routing";

const fmt = (n: number) => `${n.toFixed(1)}×`;

/**
 * Interactive explainer: pick a routing preference and see which sample
 * provider routr/ would choose. Native radio inputs give arrow-key support.
 */
export function RouterDemo() {
  const [preference, setPreference] = useState<Preference>("cheapest");
  const name = useId();
  const chosen = route(preference);
  const rule = PREFERENCES.find((p) => p.value === preference)!.rule;

  return (
    <div className="demo">
      <fieldset className="segmented">
        <legend className="demo__legend">Pick a routing preference</legend>
        {PREFERENCES.map((p) => (
          <label key={p.value} className="segmented__option">
            <input
              type="radio"
              name={name}
              value={p.value}
              checked={preference === p.value}
              onChange={() => setPreference(p.value)}
            />
            <span>{p.label}</span>
          </label>
        ))}
      </fieldset>

      <table className="demo__table">
        <caption className="demo__caption">Sample providers with relative values, for illustration only</caption>
        <thead>
          <tr>
            <th scope="col">Provider</th>
            <th scope="col">Cost</th>
            <th scope="col">Latency</th>
            <th scope="col">
              <span className="visually-hidden">Routing result</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {SAMPLE_PROVIDERS.map((p) => {
            const isChosen = p.id === chosen.id;
            return (
              <tr key={p.id} className={isChosen ? "is-chosen" : undefined} data-provider={p.id}>
                <th scope="row">{p.name}</th>
                <td className="num">{fmt(p.cost)}</td>
                <td className="num">{fmt(p.latency)}</td>
                <td className="demo__pick">{isChosen ? "routed" : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="demo__result" role="status" aria-live="polite">
        <code>
          route --prefer {preference} → {chosen.name.toLowerCase().replace(" ", "-")}
        </code>
        <span className="demo__why">
          {chosen.name} has the {rule}. Inference is paid from the pool.
        </span>
      </p>
    </div>
  );
}
