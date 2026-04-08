import { route } from "../lib/paths";

type LogoProps = {
  light?: boolean;
  size?: "sm" | "md";
};

export function Logo({ light = false, size = "md" }: LogoProps) {
  return (
    <a
      className={`site-logo site-logo--${size} ${light ? "site-logo--light" : ""}`}
      href={route("/")}
      aria-label="NIVIM"
    >
      <span className="site-logo__wordmark" aria-hidden="true">
        NIVIM
      </span>
      <span className="site-logo__dot" aria-hidden="true" />
    </a>
  );
}
