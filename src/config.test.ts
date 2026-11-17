import { describe, expect, it } from "vitest";
import { BUY_URL, CONTRACT_ADDRESS, EXPLORER_URL, X_URL, launchState } from "./config";

describe("launch config", () => {
  it("ships with no contract address, buy link or explorer link", () => {
    expect(CONTRACT_ADDRESS).toBeNull();
    expect(BUY_URL).toBeNull();
    expect(EXPLORER_URL).toBeNull();
  });

  it("stays in coming-soon mode while the address is unset", () => {
    const s = launchState();
    expect(s).toMatchObject({ live: false, caLabel: "CA: coming soon", buyLabel: "BUY · SOON" });
    expect(s.explorerUrl).toBeNull();
    expect(s.buyUrl).toBeNull();
  });

  it("stays in coming-soon mode for a malformed address", () => {
    const urls = { buyUrl: "https://example.com/swap", explorerUrl: "https://example.com/token" };
    for (const address of ["0x123", "not an address", ""]) {
      const s = launchState({ address, ...urls });
      expect(s.live).toBe(false);
      expect(s.buyUrl).toBeNull();
      expect(s.caLabel).toBe("CA: coming soon");
    }
  });

  it("points X at @routr_network", () => expect(X_URL).toBe("https://x.com/routr_network"));
});
