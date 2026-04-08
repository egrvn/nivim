import { asset, route } from "../lib/paths";

type LogoProps = {
  light?: boolean;
  compact?: boolean;
};

export function Logo({ light = false, compact = false }: LogoProps) {
  const markUrl = asset("brand/nivim-mark.svg");
  const wordmarkUrl = asset("brand/nivim-wordmark.svg");

  return (
    <a
      className={`site-logo ${light ? "site-logo--light" : ""} ${compact ? "site-logo--compact" : ""}`}
      href={route("/")}
      aria-label="NIVIM"
    >
      <span
        className="site-logo__mark"
        aria-hidden="true"
        style={{ WebkitMaskImage: `url(${markUrl})`, maskImage: `url(${markUrl})` }}
      />
      {!compact ? (
        <span
          className="site-logo__wordmark"
          role="img"
          aria-label="NIVIM"
          style={{ WebkitMaskImage: `url(${wordmarkUrl})`, maskImage: `url(${wordmarkUrl})` }}
        />
      ) : null}
    </a>
  );
}
