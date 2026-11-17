/**
 * Launch configuration for Routr Network ($ROUTR).
 *
 * CONTRACT_ADDRESS is the one switch for showing the token contract. While it
 * is null the site shows "CA: coming soon" in the hero and the footer.
 * BUY_URL and EXPLORER_URL stay null until launch too, so the page renders no
 * DEX or Etherscan link and the BUY button stays disabled as "BUY · SOON".
 *
 * To launch: set CONTRACT_ADDRESS to the deployed Ethereum mainnet token
 * address (0x followed by 40 hex characters), set BUY_URL to the swap page
 * and EXPLORER_URL to the token's Etherscan page, then run `npm run build`.
 */
export const CONTRACT_ADDRESS: string | null = null;
export const BUY_URL: string | null = null;
export const EXPLORER_URL: string | null = null;

export const TOKEN = {
  name: "Routr Network",
  ticker: "$ROUTR",
  chain: "Ethereum mainnet",
  pairedWith: "IMD",
  dex: "Uniswap v4",
  totalSupply: 1_000_000_000,
} as const;

export const X_HANDLE = "@routr_network";
export const X_URL = "https://x.com/routr_network";

const ADDRESS_PATTERN = /^0x[0-9a-fA-F]{40}$/;
const HTTPS_PATTERN = /^https:\/\/\S+$/;

export interface LaunchInput {
  address: string | null;
  buyUrl: string | null;
  explorerUrl: string | null;
}

export interface LaunchState {
  /** True once a well-formed contract address is configured. */
  live: boolean;
  /** Text shown wherever a CA would appear. */
  caLabel: string;
  address: string | null;
  explorerUrl: string | null;
  /** Null keeps the BUY button disabled. */
  buyUrl: string | null;
  buyLabel: string;
}

const DEFAULTS: LaunchInput = { address: CONTRACT_ADDRESS, buyUrl: BUY_URL, explorerUrl: EXPLORER_URL };

/** Derives everything the page shows about the contract from the values above. */
export function launchState(input: LaunchInput = DEFAULTS): LaunchState {
  const live = input.address !== null && ADDRESS_PATTERN.test(input.address);
  const buyUrl = live && input.buyUrl && HTTPS_PATTERN.test(input.buyUrl) ? input.buyUrl : null;
  const explorerUrl = live && input.explorerUrl && HTTPS_PATTERN.test(input.explorerUrl) ? input.explorerUrl : null;
  return {
    live,
    caLabel: live ? `CA: ${input.address}` : "CA: coming soon",
    address: live ? input.address : null,
    explorerUrl,
    buyUrl,
    buyLabel: buyUrl ? "Buy $ROUTR" : "BUY · SOON",
  };
}
