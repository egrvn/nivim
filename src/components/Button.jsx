import { Link } from "react-router-dom";

export function Button({
  children,
  className = "",
  href,
  onClick,
  to,
  type = "button",
  variant = "primary",
}) {
  const classes = `button button--${variant} ${className}`.trim();

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );
  }

  if (href) {
    const isExternal = /^https?:|^mailto:|^tel:/.test(href);

    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        rel={isExternal ? "noreferrer" : undefined}
        target={isExternal ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
