import { useReveal } from "../lib/reveal";

export function Reveal({ as: Tag = "div", children, className = "", delay = 0 }) {
  const { ref, isVisible } = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "reveal--visible" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
