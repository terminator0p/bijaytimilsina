"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** One passive listener, with DOM updates batched to the next animation frame. */
export default function ScrollMotion() {
  const progress = useRef<HTMLDivElement>(null);
  const path = usePathname();
  useEffect(() => {
    const bar = progress.current;
    if (!bar) return;
    const hero = document.querySelector<HTMLElement>(".hero");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0;
      bar.style.transform = `scaleX(${ratio})`;
      if (hero) {
        const amount = preference.matches
          ? 0
          : Math.min(
              1,
              Math.max(
                0,
                -hero.getBoundingClientRect().top / hero.offsetHeight,
              ),
            );
        hero.style.setProperty("--hero-drift", `${amount * 90}px`);
        hero.style.setProperty("--hero-turn", `${amount * 9}deg`);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      hero?.style.removeProperty("--hero-drift");
      hero?.style.removeProperty("--hero-turn");
    };
  }, [path]);
  return <div ref={progress} className="scroll-progress" aria-hidden="true" />;
}
