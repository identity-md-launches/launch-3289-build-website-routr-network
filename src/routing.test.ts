import { describe, expect, it } from "vitest";
import { route, SAMPLE_PROVIDERS } from "./routing";

describe("route()", () => {
  it("picks the lowest cost for cheapest", () => expect(route("cheapest").id).toBe("a"));
  it("picks the lowest latency for fastest", () => expect(route("fastest").id).toBe("b"));
  it("picks the lowest cost × latency for balanced", () => expect(route("balanced").id).toBe("c"));
  it("refuses an empty provider list", () => expect(() => route("cheapest", [])).toThrow());
  it("uses three sample providers", () => expect(SAMPLE_PROVIDERS).toHaveLength(3));
});
