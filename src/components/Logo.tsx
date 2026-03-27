import { route } from "../lib/paths";

type LogoProps = {
  light?: boolean;
};

export function Logo({ light = false }: LogoProps) {
  return (
    <a
      className={`inline-flex items-center transition-transform duration-200 hover:-translate-y-0.5 ${light ? "text-[var(--accent-soft)]" : "text-slate-950"}`}
      href={route("/")}
      aria-label="NIVIM"
    >
      <span className="font-[var(--font-display)] text-[1.22rem] tracking-[0.38em] text-current uppercase">NIVIM</span>
    </a>
  );
}
