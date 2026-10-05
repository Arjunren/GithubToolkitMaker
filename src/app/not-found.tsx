import Link from "next/link";
export default function NotFound() {
  return (
    <div className="page-shell">
      <section className="hero">
        <span className="eyebrow">404</span>
        <h1>That tool is not in the box.</h1>
        <p>The page may have moved, or the address may be mistyped.</p>
        <div className="button-row">
          <Link className="hero-link" href="/">
            Back to the toolkit
          </Link>
        </div>
      </section>
    </div>
  );
}
