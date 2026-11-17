import { launchState } from "../config";

/** Primary action. A disabled "BUY · SOON" button until BUY_URL is configured. */
export function BuyButton() {
  const { buyUrl, buyLabel } = launchState();
  if (buyUrl) {
    return (
      <a className="btn btn--primary" href={buyUrl} target="_blank" rel="noopener noreferrer">
        {buyLabel}
      </a>
    );
  }
  return (
    <button type="button" className="btn btn--primary" disabled>
      {buyLabel}
    </button>
  );
}
