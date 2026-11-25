"use client";
import { useRef, type PointerEvent } from "react";
export default function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    ref.current?.style.setProperty("--portrait-x", `${x * 7}deg`);
    ref.current?.style.setProperty("--portrait-y", `${-y * 5}deg`);
  }
  function reset() {
    ref.current?.style.setProperty("--portrait-x", "0deg");
    ref.current?.style.setProperty("--portrait-y", "0deg");
  }
  return (
    <div
      className="hero-portrait-stage"
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <div ref={ref} className="hero-portrait">
        <img
          src="/images/portrait.jpg"
          width="474"
          height="511"
          alt="Bijay Timilsina in Pokhara"
          fetchPriority="high"
        />
        <div className="portrait-red-light" />
        <div className="portrait-web" />
        <span className="portrait-signature">BT / CREATIVE IDENTITY</span>
      </div>
      <span className="portrait-note">MOVE YOUR MOUSE · SCROLL TO EXPLORE</span>
    </div>
  );
}
