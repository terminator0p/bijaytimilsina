import Link from "next/link";
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
      <div className="page-intro">
        <Link href="/">Home</Link>
        <span> / {label}</span>
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  );
}
