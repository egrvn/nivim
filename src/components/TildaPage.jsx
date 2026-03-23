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

function buildTildaCopyHtml(allrecords) {
  if (!allrecords) {
    return "";
  }

  const projectId = allrecords.getAttribute("data-tilda-project-id");
  const pageId = allrecords.getAttribute("data-tilda-page-id");

  if (!projectId || !pageId) {
    return "";
  }

  return `
    <div
      class="t-tildalabel"
      id="tildacopy"
      data-tilda-sign="${projectId}#${pageId}"
      style="display: block !important; visibility: visible !important; position: relative !important; width: 100% !important; pointer-events: all !important; opacity: 1 !important; margin: 0 !important; z-index: 1 !important"
    >
      <a href="https://tilda.cc/" class="t-tildalabel__link">
        <div class="t-tildalabel__wrapper">
          <div class="t-tildalabel__txtleft">Made on </div>
          <div class="t-tildalabel__wrapimg">
            <img src="https://static.tildacdn.com/img/tildacopy.png" class="t-tildalabel__img" fetchpriority="low" alt="" />
          </div>
          <div class="t-tildalabel__txtright">Tilda</div>
        </div>
      </a>
    </div>
  `;
}

function callTildaHook(name, callback) {
  if (typeof window.t_onFuncLoad === "function") {
    window.t_onFuncLoad(name, callback, 100);
    return;
  }

  if (typeof window[name] === "function") {
    callback();
  }
}

function initRecordAnimationState(controller) {
  if (!window.allrecords || window.isMobile || window.isSearchBot) {
    return;
  }

  if (window.allrecords.getAttribute("data-blocks-animationoff") === "yes") {
    return;
  }

  const allRecords = Array.from(document.querySelectorAll(".r"));

  allRecords.forEach((record) => {
    const style = record.getAttribute("style") || "";
    if (style.includes("background-color")) {
      record.setAttribute("data-animationappear", "off");
    }
  });

  let animatedRecords = allRecords.filter(
    (record) =>
      !record.getAttribute("data-animationappear") &&
      !record.getAttribute("data-screen-min") &&
      !record.getAttribute("data-screen-max"),
  );

  animatedRecords.forEach((record) => {
    const top = record.getBoundingClientRect().top + window.pageYOffset;
    const revealThreshold = window.pageYOffset + window.innerHeight + 300;

    record.classList.add(top > 1000 && top > revealThreshold ? "r_hidden" : "r_showed");
    record.classList.add("r_anim");
  });

  const revealRecords = () => {
    for (let index = animatedRecords.length - 1; index >= 0; index -= 1) {
      const record = animatedRecords[index];
      const offset = record.offsetHeight <= 100 ? window.pageYOffset + window.innerHeight : window.pageYOffset + window.innerHeight - 100;

      if (record.getBoundingClientRect().top + window.pageYOffset < offset) {
        record.classList.remove("r_hidden");
        record.classList.add("r_showed");
        animatedRecords = animatedRecords.filter((candidate) => candidate !== record);
      }
    }
  };

  const throttledReveal = typeof window.t_throttle === "function" ? window.t_throttle(revealRecords, 200) : revealRecords;

  window.addEventListener("scroll", throttledReveal, { signal: controller.signal });
  window.addEventListener("tildatab:change", throttledReveal, { signal: controller.signal });
  window.setTimeout(revealRecords);
}

function runTildaPostInit() {
  const allrecords = window.allrecords;

  if (!allrecords) {
    return { cleanup: () => {}, timers: [] };
  }

  window.tildaLazyMode = allrecords.getAttribute("data-tilda-lazy") || "no";
  window.lazy = window.tildaLazyMode === "yes" ? "y" : window.lazy || "n";

  const timers = [];
  const controller = typeof AbortController === "function" ? new AbortController() : null;
  const dispatchLayoutEvents = () => {
    window.dispatchEvent(new Event("resize"));
    window.dispatchEvent(new Event("scroll"));
    document.dispatchEvent(new Event("scroll"));
  };

  callTildaHook("t_animate__init", () => {
    window.t_animate__init();
  });

  callTildaHook("t_animationSBS__init", () => {
    window.t_animationSBS__init();
  });

  callTildaHook("t_form_phonemask__initPhoneMask", () => {
    window.t_form_phonemask__initPhoneMask();
  });

  callTildaHook("t_lazyload_update", () => {
    window.t_lazyload_update();
  });

  timers.push(window.setTimeout(dispatchLayoutEvents, 120));
  timers.push(
    window.setTimeout(() => {
      callTildaHook("t_lazyload_update", () => {
        window.t_lazyload_update();
      });
      dispatchLayoutEvents();
    }, 1800),
  );

  if (controller) {
    timers.push(window.setTimeout(() => initRecordAnimationState(controller), 60));
  }

  return {
    cleanup: () => {
      controller?.abort();
    },
    timers,
  };
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

    let postInit = { cleanup: () => {}, timers: [] };

    cleanupTildaArtifacts();
    container.innerHTML = rewrittenHtml;
    document.body.classList.add("t-body");
    document.body.style.margin = "0";
    document.documentElement.lang = "ru";
    window.allrecords = container.querySelector("#allrecords");
    if (window.allrecords && !container.querySelector("#tildacopy")) {
      container.insertAdjacentHTML("beforeend", buildTildaCopyHtml(window.allrecords));
    }
    executeScripts(container);
    postInit = runTildaPostInit();

    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    return () => {
      postInit.cleanup();
      postInit.timers.forEach((timer) => window.clearTimeout(timer));
      cleanupTildaArtifacts();
      container.innerHTML = "";
      window.allrecords = undefined;
    };
  }, [rewrittenHtml]);

  return <div ref={containerRef} />;
}
