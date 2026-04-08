import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";

type LeadModalProps = {
  open: boolean;
  onClose: () => void;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function LeadModal({ open, onClose }: LeadModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const nameId = useId();
  const contactId = useId();
  const noteId = useId();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [preferred, setPreferred] = useState<"email" | "telegram">("email");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Заявка с сайта NIVIM — ${name || "без имени"}`);
    const body = encodeURIComponent(
      [
        `Имя: ${name || "Не указано"}`,
        `Предпочтительный способ связи: ${preferred === "email" ? "Email" : "Telegram"}`,
        `Контакт: ${contact || "Не указан"}`,
        "",
        "Комментарий:",
        note || "Без комментария",
      ].join("\n"),
    );

    return `mailto:support@nivim.tech?subject=${subject}&body=${body}`;
  }, [contact, name, note, preferred]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const focusables = dialog?.querySelectorAll<HTMLElement>(focusableSelector);
    focusables?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const nodes = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));

      if (nodes.length === 0) {
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(5,7,16,0.92)] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            className="relative w-full max-w-[36rem] overflow-hidden rounded-[24px] border border-[rgba(149,186,230,0.22)] bg-[linear-gradient(180deg,rgba(13,18,36,0.98),rgba(6,8,18,0.98))] p-6 text-white shadow-[0_48px_120px_rgba(4,6,20,0.72)] sm:p-8"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-x-6 top-0 h-40 rounded-full bg-[radial-gradient(circle_at_top,rgba(26,62,114,0.34),transparent_62%)]" />
            <button
              className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-[rgba(227,239,239,0.1)] bg-[rgba(227,239,239,0.05)] text-[var(--text-soft)] transition-colors duration-200 hover:text-[var(--accent-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              type="button"
              onClick={onClose}
              aria-label="Закрыть окно"
            >
              ×
            </button>

            <div className="relative space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--text-muted)]">NIVIM · заявка</p>
                <h2 id="lead-modal-title" className="max-w-[18ch] font-[var(--font-display)] text-3xl leading-[0.92] tracking-[0.04em] text-[var(--accent-soft)] sm:text-4xl">
                  Поможем выбрать конфигурацию и показать VIDEL R1 в деле
                </h2>
                <p className="max-w-[34rem] text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                  Оставь контакт и коротко опиши, где планируешь использовать проектор. Мы вернёмся с рекомендацией и удобным способом связи.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-[var(--text-soft)]" htmlFor={nameId}>
                  <span className="font-medium text-[var(--accent-soft)]">Имя</span>
                  <input
                    id={nameId}
                    className="w-full rounded-2xl border border-[rgba(227,239,239,0.1)] bg-[rgba(10,11,16,0.32)] px-4 py-3 text-[var(--accent-soft)] outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-[rgba(227,239,239,0.38)]"
                    placeholder="Как к тебе обратиться"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </label>

                <label className="space-y-2 text-sm text-[var(--text-soft)]" htmlFor={contactId}>
                  <span className="font-medium text-[var(--accent-soft)]">Контакт</span>
                  <input
                    id={contactId}
                    className="w-full rounded-2xl border border-[rgba(227,239,239,0.1)] bg-[rgba(10,11,16,0.32)] px-4 py-3 text-[var(--accent-soft)] outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-[rgba(227,239,239,0.38)]"
                    placeholder="Email или Telegram"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                  />
                </label>
              </div>

              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-[var(--accent-soft)]">Как удобнее связаться</legend>
                <div className="flex flex-wrap gap-3">
                  {[
                    { key: "email", label: "Email" },
                    { key: "telegram", label: "Telegram" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                        preferred === item.key
                          ? "bg-[var(--accent-soft)] text-[var(--page-bg)]"
                          : "border border-[rgba(227,239,239,0.1)] bg-[rgba(227,239,239,0.04)] text-[var(--text-soft)] hover:text-[var(--accent-soft)]"
                      }`}
                      type="button"
                      onClick={() => setPreferred(item.key as "email" | "telegram")}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="space-y-2 text-sm text-[var(--text-soft)]" htmlFor={noteId}>
                <span className="font-medium text-[var(--accent-soft)]">Комментарий</span>
                <textarea
                  id={noteId}
                  className="min-h-32 w-full rounded-[24px] border border-[rgba(227,239,239,0.1)] bg-[rgba(10,11,16,0.32)] px-4 py-3 text-[var(--accent-soft)] outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-[rgba(227,239,239,0.38)]"
                  placeholder="Например: хочу кино по вечерам, нужен хороший вариант для светлой комнаты или нужна консультация по экрану."
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[var(--accent-soft)] px-5 text-sm font-semibold text-[var(--page-bg)] transition-transform duration-200 hover:-translate-y-0.5" href={mailtoHref}>
                  Открыть письмо
                </a>
                <a
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-[rgba(227,239,239,0.1)] bg-[rgba(227,239,239,0.04)] px-5 text-sm font-semibold text-[var(--accent-soft)] transition-colors duration-200 hover:bg-white/10"
                  href="https://t.me/nivim_support_bot"
                  rel="noreferrer"
                  target="_blank"
                >
                  Написать в Telegram
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
