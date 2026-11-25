"use client";
import { useEffect, useState } from "react";

export default function SpiderIntro() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    try {
      if (sessionStorage.getItem("bijay-spider-intro")) return;
      sessionStorage.setItem("bijay-spider-intro", "seen");
    } catch {
      /* Storage is optional; the intro still dismisses on its timer. */
    }
    setVisible(true);
    const timeout = setTimeout(() => setVisible(false), 3200);
    const dismiss = () => setVisible(false);
    preference.addEventListener("change", dismiss);
    return () => {
      clearTimeout(timeout);
      preference.removeEventListener("change", dismiss);
    };
  }, []);
  if (!visible) return null;
  return (
    <div className="spider-intro sp-intro" aria-label="Portfolio introduction">
      <div className="web-texture intro-web" />
      <div>
        <div className="intro-logo" aria-hidden="true">
          <img
            className="logo-base"
            src="/images/spiderman/spider-logo.png"
            alt=""
          />
          <span className="logo-fill" />
        </div>
        <strong>BIJAY TIMILSINA</strong>
        <span className="intro-caption">A NEW WORLD OF POSSIBILITIES</span>
        <div className="intro-track" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
