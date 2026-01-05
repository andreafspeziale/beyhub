export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="64"
        height="64"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-foreground"
        aria-hidden="true"
      >
        <rect x="2" y="8" width="28" height="4" rx="2" fill="currentColor" />
        <rect x="7" y="14" width="18" height="4" rx="2" fill="currentColor" />
        <rect x="12" y="20" width="8" height="4" rx="2" fill="currentColor" />
      </svg>
      <span className="text-5xl font-bold tracking-tight">
        Bey<span className="text-primary">Hub</span>
      </span>
    </div>
  );
}
