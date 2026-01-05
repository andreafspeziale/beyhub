export function Logo() {
  return (
    <div className="flex items-center gap-4">
      <svg
        width="64"
        height="64"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-foreground"
        aria-hidden="true"
      >
        <rect x="4" y="8" width="24" height="4" rx="2" fill="currentColor" />
        <rect x="6" y="14" width="20" height="4" rx="2" fill="currentColor" />
        <rect x="8" y="20" width="16" height="4" rx="2" fill="currentColor" />
      </svg>
      <span className="text-5xl font-bold tracking-tight">
        Bey<span className="text-primary">Hub</span>
      </span>
    </div>
  );
}
