import Link from "next/link";
import { designer, socials } from "@/data/portfolio";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link href="/" className="footer-name">
          Bijay<span>.</span>
        </Link>
        <p>
          <a href={designer.url} target="_blank" rel="noreferrer">
            Developer, designer &amp; digital creator
          </a>
          <br />
          From Pokhara, Nepal.
        </p>
        <div>
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Bijay Timilsina</span>
        <a href={designer.url} target="_blank" rel="noreferrer">
          Designed
        </a>
        <a href="#main">Back to top</a>
      </div>
    </footer>
  );
}
