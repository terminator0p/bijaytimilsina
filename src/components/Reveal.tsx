"use client";
import { useReveal } from "@/hooks/useReveal";
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useReveal();
  return (
    <div className={`reveal ${className}`} ref={ref}>
      {children}
    </div>
  );
}
