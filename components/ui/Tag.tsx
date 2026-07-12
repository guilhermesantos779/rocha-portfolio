export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-fg-subtle/60 px-3.5 py-1.5 text-xs uppercase tracking-wide text-fg-muted">
      {children}
    </span>
  );
}
