import { TOKEN, X_HANDLE } from "./config";
import { Logo } from "./components/Logo";
import { BuyButton } from "./components/BuyButton";
import { ContractAddress } from "./components/ContractAddress";
import { XLink } from "./components/XLink";
import { RouterDemo } from "./components/RouterDemo";

const NAV = [
  { href: "#how", label: "How it works" },
  { href: "#swarm", label: "Swarm" },
  { href: "#tokenomics", label: "Tokenomics" },
  { href: "#roadmap", label: "Roadmap" },
];

const STEPS = [
  {
    title: "Liquidity funds compute",
    body: "Liquidity in the $ROUTR / IMD pool on Uniswap v4 is the budget the swarm runs on.",
  },
  {
    title: "Agents send requests",
    body: "An agent sends its inference request to routr/ with a preference: cheapest, fastest or balanced.",
  },
  {
    title: "routr/ routes and pays",
    body: "routr/ picks the model provider that fits the preference and pays for the inference from the pool.",
  },
];

const ALLOCATION = [
  { key: "pool", label: "Pool", share: 80, note: "$ROUTR / IMD liquidity on Uniswap v4" },
  { key: "swarm", label: "Swarm", share: 10, note: "Reserved for the swarm" },
  { key: "team", label: "Team", share: 10, note: "Team allocation" },
] as const;

const ROADMAP = [
  { title: "Launch $ROUTR", body: "Token on Ethereum mainnet, paired with IMD on Uniswap v4." },
  { title: "Routing layer", body: "routr/ routes agent requests to model providers and pays from the pool." },
  { title: "Agents marketplace", body: "A marketplace where agents are listed and paid for in $ROUTR." },
];

const fmtTokens = (n: number) => n.toLocaleString("en-US");

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header wrap" id="top">
        <Logo />
        <nav aria-label="Sections" className="site-nav">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <XLink variant="plain" label={X_HANDLE} />
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero__copy">
            <h1 id="hero-title" className="hero__title">
              The swarm is <span className="accent">coming…</span>
            </h1>
            <p className="hero__lead">
              Routr Network ({TOKEN.ticker}) is the routing layer for AI agent swarms: every request goes to the
              cheapest, fastest or most balanced model provider, paid from a Uniswap v4 pool.
            </p>
            <div className="hero__actions">
              <BuyButton />
              <XLink />
            </div>
            <ContractAddress />
          </div>
          <figure className="terminal">
            <pre>
              <code>
              <span className="t-dim">$</span> routr route --prefer balanced{"\n"}
              <span className="t-dim">&gt;</span> request   agent-07{"\n"}
              <span className="t-dim">&gt;</span> provider  <span className="accent">provider-c</span>
              {"\n"}
              <span className="t-dim">&gt;</span> paid by   ROUTR/IMD pool{"\n"}
              <span className="t-dim">&gt;</span> status    <span className="accent">routed</span>
              <span className="cursor" aria-hidden="true" />
              </code>
            </pre>
            <figcaption className="terminal__caption">Example route. Live routing: coming soon.</figcaption>
          </figure>
        </section>

        <section id="how" className="section wrap" aria-labelledby="how-title">
          <h2 id="how-title">Pool in, inference out</h2>
          <p className="section__lead">Three steps take a request from an agent to a model provider.</p>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <RouterDemo />
        </section>

        <section id="swarm" className="section wrap" aria-labelledby="swarm-title">
          <h2 id="swarm-title">One endpoint for every agent</h2>
          <p className="section__lead">
            The swarm is the set of AI agents that send their work through routr/. Each agent asks for inference once;
            routr/ decides where it runs.
          </p>
          <ul className="features">
            <li>
              <h3>One request format</h3>
              <p>Agents talk to routr/, not to each provider separately.</p>
            </li>
            <li>
              <h3>A preference per request</h3>
              <p>Cheapest for bulk work, fastest for live replies, balanced for everything else.</p>
            </li>
            <li>
              <h3>Paid by the pool</h3>
              <p>Inference is paid from the AMM pool, so agents do not carry their own provider bills.</p>
            </li>
          </ul>
          <p className="soon-note">
            <span className="badge">Coming soon</span> Live swarm activity will appear here once routing is live.
          </p>
        </section>

        <section id="tokenomics" className="section wrap" aria-labelledby="tokenomics-title">
          <h2 id="tokenomics-title">1B {TOKEN.ticker}, paired with IMD</h2>
          <p className="section__lead">
            Fixed supply of {fmtTokens(TOKEN.totalSupply)} tokens on {TOKEN.chain}. Most of it sits in the pool that
            funds compute.
          </p>
          <div className="alloc-bar" aria-hidden="true">
            {ALLOCATION.map((a) => (
              <span key={a.key} className={`alloc-bar__seg alloc-bar__seg--${a.key}`} style={{ flexGrow: a.share }} />
            ))}
          </div>
          <dl className="alloc">
            {ALLOCATION.map((a) => (
              <div key={a.key} className="alloc__row">
                <dt>
                  <span className={`swatch swatch--${a.key}`} aria-hidden="true" />
                  {a.label}
                </dt>
                <dd className="alloc__share num">{a.share}%</dd>
                <dd className="alloc__amount num">{fmtTokens((TOKEN.totalSupply * a.share) / 100)}</dd>
                <dd className="alloc__note">{a.note}</dd>
              </div>
            ))}
          </dl>
          <dl className="facts">
            <div>
              <dt>Pair</dt>
              <dd>{TOKEN.ticker} / {TOKEN.pairedWith}</dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>{TOKEN.dex}</dd>
            </div>
            <div>
              <dt>Chain</dt>
              <dd>{TOKEN.chain}</dd>
            </div>
            <div>
              <dt>Contract</dt>
              <dd>
                <span className="badge">Coming soon</span>
              </dd>
            </div>
          </dl>
        </section>

        <section id="roadmap" className="section wrap" aria-labelledby="roadmap-title">
          <h2 id="roadmap-title">From pool to marketplace</h2>
          <p className="section__lead">Nothing below is live yet. Each step ships in order.</p>
          <ol className="roadmap">
            {ROADMAP.map((r, i) => (
              <li key={r.title} className="roadmap__item">
                <span className="step__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>
                    {r.title} <span className="badge">Coming soon</span>
                  </h3>
                  <p>{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="site-footer wrap">
        <div className="site-footer__brand">
          <Logo />
          <ContractAddress />
        </div>
        <XLink variant="plain" label={`${X_HANDLE} on X`} />
        <p className="site-footer__legal">Not financial advice.</p>
      </footer>
    </>
  );
}
