/** Wordmark: "routr" with a lime slash. Links home (top of page). */
export function Logo() {
  return (
    <a className="logo" href="#top" aria-label="routr/ home">
      <span aria-hidden="true">
        routr<span className="logo__slash">/</span>
      </span>
    </a>
  );
}
