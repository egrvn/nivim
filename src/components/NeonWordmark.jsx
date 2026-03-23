export function NeonWordmark({ className = "", compact = false }) {
  return (
    <div className={`neon-wordmark ${compact ? "neon-wordmark--compact" : ""} ${className}`.trim()} aria-hidden="true">
      <span>N</span>
      <span>i</span>
      <span>V</span>
      <span>i</span>
      <span>M</span>
    </div>
  );
}
