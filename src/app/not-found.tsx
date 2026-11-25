import Link from "next/link";
export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404 · OUTSIDE THE ORBIT</p>
      <h1>
        A little
        <br />
        <em>off course.</em>
      </h1>
      <p>This page doesn’t exist. Let’s find your way back.</p>
      <Link href="/" className="button primary">
        Back to home
      </Link>
    </section>
  );
}
