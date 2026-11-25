"use client";
import { useEffect, useRef } from "react";

/** Reveal individual content blocks once, without hiding server-rendered content. */
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = new Set<HTMLElement>();
    const reveal = (element: HTMLElement) => {
      element.classList.add("revealed");
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        }),
      { threshold: 0, rootMargin: "0px 0px -35px 0px" },
    );
    const collect = () => {
      // Filters can insert new cards after the section has mounted.
      targets.forEach((element) => {
        if (!root.contains(element)) {
          observer.unobserve(element);
          targets.delete(element);
        }
      });
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        if (targets.has(element)) return;
        targets.add(element);
        const index = Array.from(element.parentElement?.children ?? []).indexOf(
          element,
        );
        element.style.setProperty(
          "--reveal-delay",
          `${Math.min(index, 3) * 80}ms`,
        );
        if (preference.matches) {
          reveal(element);
          return;
        }
        element.classList.add("reveal-ready");
        observer.observe(element);
      });
    };
    const preferenceChanged = () => {
      if (preference.matches) targets.forEach(reveal);
    };
    // Keyboard focus must never land on visually hidden controls.
    const focus = (event: FocusEvent) => {
      if (event.target instanceof Element) {
        const element = event.target.closest<HTMLElement>("[data-reveal]");
        if (element) reveal(element);
      }
    };
    collect();
    const mutations = new MutationObserver(collect);
    mutations.observe(root, { childList: true, subtree: true });
    preference.addEventListener("change", preferenceChanged);
    root.addEventListener("focusin", focus);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", preferenceChanged);
      root.removeEventListener("focusin", focus);
      targets.forEach((element) => {
        element.classList.remove("reveal-ready", "revealed");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);
  return ref;
}
