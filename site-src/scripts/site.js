const body = document.body;

document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initMenu();
  initModal();
  initAccordion();
  initTabs();
  initFeed();
  initLeadForm();
});

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const mediaReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (mediaReduced || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -48px 0px" },
  );

  items.forEach((item) => observer.observe(item));
}

function initMenu() {
  const panel = document.querySelector("[data-mobile-panel]");
  const toggle = document.querySelector("[data-menu-toggle]");
  if (!panel || !toggle) return;

  const closeButtons = document.querySelectorAll("[data-menu-close]");
  const links = panel.querySelectorAll("a");

  const closeMenu = () => {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    body.style.overflow = "";
  };

  const openMenu = () => {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    if (panel.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  closeButtons.forEach((button) => button.addEventListener("click", closeMenu));
  links.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      closeMenu();
    }
  });
}

function initModal() {
  const modal = document.querySelector("[data-modal]");
  if (!modal) return;

  const openers = document.querySelectorAll("[data-modal-open]");
  const closers = document.querySelectorAll("[data-modal-close]");
  const firstInput = modal.querySelector("input, button, a");

  const closeModal = () => {
    modal.hidden = true;
    body.style.overflow = "";
  };

  const openModal = () => {
    modal.hidden = false;
    body.style.overflow = "hidden";
    window.setTimeout(() => firstInput?.focus(), 40);
  };

  openers.forEach((button) =>
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    }),
  );

  closers.forEach((button) => button.addEventListener("click", closeModal));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}

function initAccordion() {
  const items = document.querySelectorAll("[data-accordion-item]");
  items.forEach((item) => {
    const button = item.querySelector("[data-accordion-trigger]");
    const content = item.querySelector("[data-accordion-content]");
    if (!button || !content) return;

    button.addEventListener("click", () => {
      const isOpen = item.getAttribute("data-open") === "true";
      item.setAttribute("data-open", String(!isOpen));
      button.setAttribute("aria-expanded", String(!isOpen));
      content.hidden = isOpen;
    });
  });
}

function initTabs() {
  const triggers = document.querySelectorAll("[data-tab-trigger]");
  if (!triggers.length) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const tabId = trigger.getAttribute("data-tab-trigger");
      const panels = document.querySelectorAll("[data-tab-panel]");

      triggers.forEach((button) => {
        const isActive = button === trigger;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
      });

      panels.forEach((panel) => {
        const isActive = panel.getAttribute("data-tab-panel") === tabId;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    });
  });
}

function initFeed() {
  const button = document.querySelector("[data-feed-more]");
  if (!button) return;

  button.addEventListener("click", () => {
    const hiddenCards = Array.from(document.querySelectorAll("[data-feed-hidden='true']"));
    hiddenCards.slice(0, 3).forEach((card) => {
      card.dataset.feedHidden = "false";
      card.classList.remove("is-hidden");
    });

    if (!document.querySelector("[data-feed-hidden='true']")) {
      button.hidden = true;
    }
  });
}

function initLeadForm() {
  const form = document.querySelector("[data-lead-form]");
  const status = document.querySelector("[data-form-status]");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const contactMethod = String(formData.get("contactMethod") || "").trim();
    const contactValue = String(formData.get("contactValue") || "").trim();
    const consent = formData.get("consent");

    if (!name || !contactMethod || !contactValue || !consent) {
      status.textContent = "Пожалуйста, заполните имя, контакт и подтвердите согласие на обработку данных.";
      return;
    }

    const subject = encodeURIComponent(`Запрос на демонстрацию NIVIM — ${name}`);
    const bodyText = [
      `Имя: ${name}`,
      `Способ связи: ${contactMethod}`,
      `Контакт: ${contactValue}`,
      `Страница: ${window.location.href}`,
      "",
      "Комментарий:",
      "Хочу увидеть NIVIM вживую и получить консультацию по модели VIDEL R1.",
    ].join("\n");
    const bodyValue = encodeURIComponent(bodyText);

    status.textContent = "Открываем почтовый клиент. Если письмо не открылось автоматически, напишите нам на support@nivim.tech.";
    window.location.href = `mailto:support@nivim.tech?subject=${subject}&body=${bodyValue}`;
  });
}
