import { useEffect, useMemo, useRef } from "react";

const BASE_URL = import.meta.env.BASE_URL;
const TILDA_BASE = `${BASE_URL}tilda/`;
const INTERNAL_ROUTES = new Map([
  ["/", BASE_URL],
  ["", BASE_URL],
  ["page120333936.html", BASE_URL],
  ["/o-kompanii", `${BASE_URL}o-kompanii`],
  ["o-kompanii", `${BASE_URL}o-kompanii`],
  ["page120459556.html", `${BASE_URL}o-kompanii`],
  ["/podderjka", `${BASE_URL}podderjka`],
  ["podderjka", `${BASE_URL}podderjka`],
  ["page120426526.html", `${BASE_URL}podderjka`],
  ["/blog", `${BASE_URL}blog`],
  ["blog", `${BASE_URL}blog`],
  ["page120464476.html", `${BASE_URL}blog`],
  ["/privacy-policy", `${BASE_URL}privacy-policy`],
  ["/privacy-policy/", `${BASE_URL}privacy-policy`],
  ["privacy-policy", `${BASE_URL}privacy-policy`],
  ["privacy-policy/", `${BASE_URL}privacy-policy`],
  ["page120334036.html", `${BASE_URL}privacy-policy`],
]);

function rewriteAssetText(value) {
  if (!value) {
    return value;
  }

  return value
    .replace(/(["'(=])images\//g, `$1${TILDA_BASE}images/`)
    .replace(/(["'(=])css\//g, `$1${TILDA_BASE}css/`)
    .replace(/(["'(=])js\//g, `$1${TILDA_BASE}js/`);
}

function rewriteLinkTarget(value) {
  if (!value) {
    return value;
  }

  if (
    value.startsWith("#") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("javascript:")
  ) {
    return value;
  }

  if (value.startsWith("images/") || value.startsWith("css/") || value.startsWith("js/")) {
    return `${TILDA_BASE}${value}`;
  }

  return INTERNAL_ROUTES.get(value) ?? value;
}

function rewriteTildaHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html;

  template.content.querySelectorAll("[href]").forEach((element) => {
    element.setAttribute("href", rewriteLinkTarget(element.getAttribute("href")));
  });

  template.content.querySelectorAll("[src]").forEach((element) => {
    element.setAttribute("src", rewriteLinkTarget(element.getAttribute("src")));
  });

  template.content.querySelectorAll("[style]").forEach((element) => {
    element.setAttribute("style", rewriteAssetText(element.getAttribute("style")));
  });

  template.content.querySelectorAll("style, script").forEach((element) => {
    element.textContent = rewriteAssetText(element.textContent ?? "");
  });

  return template.innerHTML;
}

function cleanupTildaArtifacts() {
  document.querySelectorAll(".t360__progress").forEach((element) => element.remove());
  document.body.classList.remove("t-body_scroll-locked");
  document.body.style.overflow = "";
}

function executeScripts(container) {
  container.querySelectorAll("script").forEach((script) => {
    const replacement = document.createElement("script");

    Array.from(script.attributes).forEach((attribute) => {
      replacement.setAttribute(attribute.name, attribute.value);
    });

    replacement.textContent = script.textContent ?? "";
    script.replaceWith(replacement);
  });
}

export function TildaPage({ page }) {
  const containerRef = useRef(null);
  const rewrittenHtml = useMemo(() => rewriteTildaHtml(page.html), [page.html]);

  useEffect(() => {
    document.title = page.title;

    const descriptionNode = document.querySelector('meta[name="description"]');
    if (descriptionNode) {
      descriptionNode.setAttribute("content", page.description || "");
    }
  }, [page.description, page.title]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    cleanupTildaArtifacts();
    container.innerHTML = rewrittenHtml;
    document.body.classList.add("t-body");
    document.body.style.margin = "0";
    document.documentElement.lang = "ru";
    window.allrecords = container.querySelector("#allrecords");
    executeScripts(container);

    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    return () => {
      cleanupTildaArtifacts();
      container.innerHTML = "";
      window.allrecords = undefined;
    };
  }, [rewrittenHtml]);

  return <div ref={containerRef} />;
}
