const HEADER_OFFSET = 92;

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToHashTarget(hash) {
  if (!hash || hash === "#pokupka") {
    return;
  }

  const target = document.querySelector(hash);

  if (!target) {
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}
