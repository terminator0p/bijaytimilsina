export default function SpiderMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 240"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M100 76 88 87 87 119 100 166 113 119 112 87Z M92 71 96 59 104 59 108 71 104 84 96 84Z" />
      <path d="m91 91-32-17-9-49-9-16 1 65 38 30Zm-7 17L34 92 22 47 13 34l8 70 62 19Zm0 19-52 14-10 58 8 24 14-69 45-13Zm8 16-26 27 2 50 12 18-2-61 20-22Z" />
      <path d="m109 91 32-17 9-49 9-16-1 65-38 30Zm7 17 50-16 12-45 9-13-8 70-62 19Zm0 19 52 14 10 58-8 24-14-69-45-13Zm-8 16 26 27-2 50-12 18 2-61-20-22Z" />
    </svg>
  );
}
