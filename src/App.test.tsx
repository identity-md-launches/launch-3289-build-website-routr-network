// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { App } from "./App";

afterEach(cleanup);

describe("<App />", () => {
  it("shows CA: coming soon in the hero and the footer, and no address", () => {
    const { container } = render(<App />);
    expect(screen.getAllByText("CA: coming soon")).toHaveLength(2);
    expect(within(container.querySelector(".hero")! as HTMLElement).getByText("CA: coming soon")).toBeTruthy();
    expect(within(container.querySelector("footer")! as HTMLElement).getByText("CA: coming soon")).toBeTruthy();
    expect(container.textContent).not.toMatch(/0x[0-9a-fA-F]{40}/);
  });

  it("has no Etherscan or DEX links", () => {
    const { container } = render(<App />);
    const hrefs = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href") ?? "");
    for (const h of hrefs) expect(h).not.toMatch(/etherscan|uniswap\.org|dexscreener|dextools|geckoterminal/i);
  });

  it("renders BUY · SOON as a disabled button", () => {
    render(<App />);
    const buy = screen.getByRole("button", { name: "BUY · SOON" }) as HTMLButtonElement;
    expect(buy.disabled).toBe(true);
  });

  it("links every X mention to https://x.com/routr_network", () => {
    const { container } = render(<App />);
    const xLinks = [...container.querySelectorAll("a")].filter((a) => /x\.com|twitter/i.test(a.href) || /@routr_network/.test(a.textContent ?? ""));
    expect(xLinks.length).toBeGreaterThanOrEqual(3);
    for (const a of xLinks) {
      expect(a.getAttribute("href")).toBe("https://x.com/routr_network");
      expect(a.textContent).toContain("@routr_network");
      expect(a.getAttribute("rel")).toContain("noopener");
    }
  });

  it("nav and skip links point at sections that exist", () => {
    const { container } = render(<App />);
    const internal = [...container.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute("href")!.slice(1));
    expect(internal.length).toBeGreaterThanOrEqual(5);
    for (const id of internal) expect(container.querySelector(`#${id}`), `#${id}`).not.toBeNull();
  });

  it("has one h1 and no skipped heading levels", () => {
    const { container } = render(<App />);
    const levels = [...container.querySelectorAll("h1,h2,h3,h4")].map((h) => Number(h.tagName[1]));
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    levels.reduce((prev, l) => {
      expect(l - prev).toBeLessThanOrEqual(1);
      return l;
    });
  });

  it("shows the tokenomics from the brief", () => {
    const { container } = render(<App />);
    const text = container.querySelector("#tokenomics")!.textContent!;
    expect(text).toContain("1,000,000,000");
    expect(text).toContain("80%");
    expect(text).toContain("800,000,000");
    expect(text.match(/10%/g)).toHaveLength(2);
    expect(text).toContain("$ROUTR / IMD");
    expect(text).toContain("Uniswap v4");
  });

  it("roadmap includes the agents marketplace paid in $ROUTR, marked coming soon", () => {
    const { container } = render(<App />);
    const roadmap = container.querySelector("#roadmap")!;
    expect(roadmap.textContent).toMatch(/Agents marketplace/);
    expect(roadmap.textContent).toMatch(/paid for in \$ROUTR/);
    expect(within(roadmap as HTMLElement).getAllByText("Coming soon")).toHaveLength(3);
  });

  it("router demo routes by the chosen preference and announces it", () => {
    render(<App />);
    const status = screen.getByRole("status");
    const radio = (name: string) => screen.getByRole("radio", { name }) as HTMLInputElement;
    expect(radio("Cheapest").checked).toBe(true);
    expect(status.textContent).toContain("provider-a");

    fireEvent.click(radio("Fastest"));
    expect(radio("Fastest").checked).toBe(true);
    expect(status.textContent).toContain("provider-b");
    expect(document.querySelector('tr.is-chosen')!.getAttribute("data-provider")).toBe("b");

    fireEvent.click(radio("Balanced"));
    expect(status.textContent).toContain("provider-c");
    expect(document.querySelectorAll("tr.is-chosen")).toHaveLength(1);
  });
});
