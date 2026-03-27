type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ align = "left", className = "", description, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`.trim()}>
      {eyebrow ? (
        <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[var(--text-muted)] sm:text-[11px]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-[var(--font-display)] text-[2.35rem] leading-[0.92] tracking-[0.05em] text-[var(--accent-soft)] sm:text-[3rem]">
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 max-w-[42rem] text-sm leading-7 text-[var(--text-soft)] sm:text-base ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
