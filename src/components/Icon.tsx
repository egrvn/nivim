import { asset } from "../lib/paths";

type IconProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  tone?: "frost" | "accent" | "ink";
  className?: string;
};

export function Icon({ name, size = "md", tone = "frost", className = "" }: IconProps) {
  const url = asset(name);
  const classes = ["site-icon", `site-icon--${size}`, `site-icon--${tone}`, className].filter(Boolean).join(" ");

  return (
    <span
      className={classes}
      role="img"
      aria-hidden="true"
      style={{ WebkitMaskImage: `url(${url})`, maskImage: `url(${url})` }}
    />
  );
}
