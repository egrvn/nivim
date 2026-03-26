import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { motion } from "framer-motion";

type BaseProps = PropsWithChildren<{
  className?: string;
  variant?: "primary" | "secondary";
}>;

type LinkProps = BaseProps & {
  href: string;
  onClick?: never;
};

type NativeButtonProps = BaseProps & {
  href?: never;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

type ButtonProps = LinkProps | NativeButtonProps;

const baseClassName =
  "inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold tracking-[0.08em] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80";

const variants = {
  primary:
    "bg-[linear-gradient(135deg,var(--color-accent),#2f72ba)] text-white shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:brightness-110",
  secondary:
    "border border-white/12 bg-white/5 text-[var(--color-text)] backdrop-blur-md hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/8",
};

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const className = `${baseClassName} ${variants[variant]} ${props.className ?? ""}`;

  if ("href" in props && props.href) {
    return (
      <motion.a whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} className={className} href={props.href}>
        {props.children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      className={className}
      onClick={props.onClick}
      type={("type" in props ? props.type : undefined) ?? "button"}
    >
      {props.children}
    </motion.button>
  );
}
