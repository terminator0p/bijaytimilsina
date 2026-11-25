import Link from "next/link";
import Header from "@/components/Header";
export default function PageShell({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="standalone">
      <Header />
      <div className="page-intro">
        <Link href="/" className="page-home-link">Home</Link>
        <span> / {label}</span>
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  );
}
