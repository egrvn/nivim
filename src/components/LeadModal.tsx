import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { leadMethods, siteMeta } from "../content/site";
import { buildLeadMailto } from "../lib/mailto";
import { route } from "../lib/paths";
import { Button } from "./Button";

type LeadModalProps = {
  open: boolean;
  onClose: () => void;
};

const initialState = {
  name: "",
  method: leadMethods[0].value,
  contact: "",
  note: "",
  consent: false,
};

export function LeadModal({ open, onClose }: LeadModalProps) {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      setState(initialState);
      setError("");
      setStatus("");
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const focusableElements = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const items = focusableElements();

      if (!items.length) {
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => {
      focusableElements()[0]?.focus();
    });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  const activeMethod = useMemo(
    () => leadMethods.find((item) => item.value === state.method) ?? leadMethods[0],
    [state.method],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (state.name.trim().length < 2) {
      setError("Нужно имя. Иначе письмо будет выглядеть как спам, а не как нормальный запрос.");
      return;
    }

    if (state.contact.trim().length < 4) {
      setError("Нужен рабочий контакт. Иначе это просто красивый клик без продолжения.");
      return;
    }

    if (!state.consent) {
      setError("Без согласия на обработку данных форма дальше не пойдёт.");
      return;
    }

    setError("");
    setStatus("Открываем почтовый клиент. Если не сработало, напишите нам напрямую в Telegram.");

    window.location.href = buildLeadMailto({
      name: state.name.trim(),
      method: state.method,
      contact: state.contact.trim(),
      note: state.note.trim(),
      page: window.location.href,
    });
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-[rgba(6,7,10,0.84)] p-4 backdrop-blur-xl"
        >
          <button aria-label="Закрыть форму" className="absolute inset-0" onClick={onClose} type="button" />
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="card-surface relative z-10 w-full max-w-[720px] p-6 sm:p-8"
            ref={dialogRef}
            role="dialog"
            aria-labelledby="lead-modal-title"
            aria-modal="true"
          >
            <button
              aria-label="Закрыть форму"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white/80"
              onClick={onClose}
              type="button"
            >
              ×
            </button>

            <div className="space-y-4">
              <p className="section-kicker">Запросить демонстрацию</p>
              <h2 className="display-title text-3xl sm:text-4xl" id="lead-modal-title">
                Покажем NIVIM без лишней технодрамы
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                Оставьте имя и удобный канал. Дальше откроем готовое письмо и не заставим вас продираться через бессмысленный
                form-flow ради form-flow.
              </p>
            </div>

            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/82">Имя</span>
                <input
                  className="field-input"
                  name="name"
                  onChange={(event) => setState((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Как к вам обращаться"
                  type="text"
                  value={state.name}
                />
              </label>

              <div className="grid gap-2">
                <span className="text-sm font-semibold text-white/82">Канал связи</span>
                <div className="grid gap-2 sm:grid-cols-2">
                  {leadMethods.map((method) => {
                    const active = method.value === state.method;
                    return (
                      <button
                        key={method.value}
                        className={`rounded-[22px] border px-4 py-3 text-left transition ${
                          active
                            ? "border-[rgba(95,138,214,0.65)] bg-[rgba(38,67,113,0.35)] text-white shadow-[var(--shadow-glow)]"
                            : "border-white/10 bg-white/5 text-white/72 hover:border-white/20 hover:bg-white/7"
                        }`}
                        onClick={() => setState((current) => ({ ...current, method: method.value, contact: "" }))}
                        type="button"
                      >
                        <span className="block text-sm font-semibold">{method.value}</span>
                        <span className="mt-1 block text-xs leading-6 text-white/56">{method.placeholder}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/82">Контакт</span>
                <input
                  className="field-input"
                  name="contact"
                  onChange={(event) => setState((current) => ({ ...current, contact: event.target.value }))}
                  placeholder={activeMethod.placeholder}
                  type="text"
                  value={state.contact}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/82">Комментарий</span>
                <textarea
                  className="field-input min-h-28 resize-y"
                  name="note"
                  onChange={(event) => setState((current) => ({ ...current, note: event.target.value }))}
                  placeholder="Если хотите, кратко опишите сценарий: комната, интерес к модели, вопросы по покупке."
                  value={state.note}
                />
              </label>

              <label className="flex items-start gap-3 rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-white/64">
                <input
                  checked={state.consent}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
                  onChange={(event) => setState((current) => ({ ...current, consent: event.target.checked }))}
                  type="checkbox"
                />
                <span>
                  Я ознакомлен(а) с{" "}
                  <a className="text-white underline decoration-white/25 underline-offset-4" href={route("/privacy-policy/")}>
                    политикой конфиденциальности
                  </a>{" "}
                  и согласен(на) на обработку данных для обратной связи.
                </span>
              </label>

              {error ? <p className="text-sm text-[#ffb3b3]">{error}</p> : null}
              {status ? <p className="text-sm text-[var(--color-text-muted)]">{status}</p> : null}

              <div className="flex flex-wrap gap-3">
                <Button type="submit">Подготовить письмо</Button>
                <Button href={siteMeta.telegramUrl} variant="secondary">
                  Написать в Telegram
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
