import { launchState } from "../config";

/** "CA: coming soon" until CONTRACT_ADDRESS is set; then the full address, linked when EXPLORER_URL is set. */
export function ContractAddress() {
  const { live, address, explorerUrl, caLabel } = launchState();
  if (!live || !address) return <p className="ca">{caLabel}</p>;
  return (
    <p className="ca">
      CA:{" "}
      {explorerUrl ? (
        <a className="ca__value" href={explorerUrl} target="_blank" rel="noopener noreferrer">
          {address}
        </a>
      ) : (
        <span className="ca__value">{address}</span>
      )}
    </p>
  );
}
