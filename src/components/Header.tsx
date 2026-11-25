"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
const links = [
  ["About", "/about/"],
  ["Expertise", "/services/"],
  ["Explore", "/projects/"],
  ["Contact", "/contact/"],
];
export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
        }
      }}
    >
      <Link className="brand" href="/" aria-label="Bijay Timilsina home">
        <span className="brand-mark">
          <img src="/images/spiderman/spider-logo.png" alt="" />
        </span>
        <span>
          BIJAY
          <br />
          <small>TIMILSINA</small>
        </span>
      </Link>
      <button
        className="menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        id="navigation"
        className={open ? "navigation open" : "navigation"}
        aria-label="Main navigation"
      >
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              path === href || `${path}/` === href ? "page" : undefined
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
      <a className="header-cta" href="mailto:timilsinabijaya24@gmail.com">
        Let’s talk
      </a>
    </header>
  );
}
