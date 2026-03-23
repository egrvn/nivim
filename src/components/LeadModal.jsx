import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { contactMethods } from "../data/site-data";
import { submitLead } from "../lib/lead-submit";

const INITIAL_FORM = {
  name: "",
  contactMethod: "phone",
  contactValue: "",
  consent: false,
};

export function LeadModal({ isOpen, onClose }) {
  const [formState, setFormState] = useState(INITIAL_FORM);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dialogRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previouslyFocused = document.activeElement;

    const getFocusableElements = () =>
      Array.from(
        dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ) || [],
      );

    window.requestAnimationFrame(() => {
      getFocusableElements()[0]?.focus();
    });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusableElements();

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused instanceof HTMLElement && previouslyFocused.focus();
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setFormState(INITIAL_FORM);
      setErrorMessage("");
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const activeMethod = useMemo(
    () => contactMethods.find((method) => method.value === formState.contactMethod) || contactMethods[0],
    [formState.contactMethod],
  );

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formState.name.trim().length < 2) {
      setErrorMessage("Укажи имя, чтобы мы понимали, как к тебе обращаться.");
      return;
    }

    if (formState.contactValue.trim().length < 4) {
      setErrorMessage("Нужен рабочий контакт, иначе мы просто не сможем ответить.");
      return;
    }

    if (!formState.consent) {
      setErrorMessage("Без согласия на обработку данных форма не отправится.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await submitLead({
        name: formState.name.trim(),
        contactMethod: formState.contactMethod,
        contactValue: formState.contactValue.trim(),
        consent: formState.consent,
        pagePath: `${location.pathname}${location.hash}`,
        submittedAt: new Date().toISOString(),
      });

      setIsSuccess(true);
    } catch (error) {
      if (error.code === "LEAD_WEBHOOK_MISSING") {
        setErrorMessage(
          "Прием заявок временно недоступен. Пока webhook не подключен, напиши нам в Telegram: @nivim_support_bot или на support@nivim.tech.",
        );
      } else {
        setErrorMessage("Заявка не ушла. Попробуй еще раз или напиши напрямую в поддержку.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div aria-modal="true" className="modal-shell" role="dialog">
      <button aria-label="Закрыть диалог" className="modal-shell__backdrop" onClick={onClose} type="button" />
      <div
        aria-describedby="lead-modal-description"
        aria-labelledby="lead-modal-title"
        className="modal-card"
        ref={dialogRef}
        tabIndex={-1}
      >
        <button aria-label="Закрыть диалог" className="modal-card__close" onClick={onClose} type="button">
          ×
        </button>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="section-kicker text-[var(--color-accent)]">Так начинается кино...</p>
            <h2 className="section-title" id="lead-modal-title">
              Заказать
            </h2>
            <p className="section-copy max-w-xl" id="lead-modal-description">
              Повторяем механику Tilda popup нативно: имя, способ связи, согласие и аккуратная обработка ошибок.
            </p>
          </div>

          {isSuccess ? (
            <div className="success-box">
              <h3 className="success-box__title">Заявка принята</h3>
              <p className="success-box__text">Мы свяжемся с тобой в ближайшее время удобным способом.</p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="field">
                <span className="field__label">Имя</span>
                <input
                  className="field__input"
                  name="name"
                  onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Андрей / Елена"
                  type="text"
                  value={formState.name}
                />
              </label>

              <div className="space-y-3">
                <span className="field__label">Как связаться</span>
                <div className="contact-methods">
                  {contactMethods.map((method) => {
                    const isActive = method.value === formState.contactMethod;

                    return (
                      <button
                        className={`contact-methods__item ${isActive ? "contact-methods__item--active" : ""}`}
                        key={method.value}
                        onClick={() =>
                          setFormState((current) => ({
                            ...current,
                            contactMethod: method.value,
                            contactValue: "",
                          }))
                        }
                        type="button"
                      >
                        <span className="contact-methods__title">{method.label}</span>
                        <span className="contact-methods__caption">{method.hint}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="field">
                <span className="field__label">Контакт</span>
                <input
                  className="field__input"
                  name="contactValue"
                  onChange={(event) => setFormState((current) => ({ ...current, contactValue: event.target.value }))}
                  placeholder={activeMethod.placeholder}
                  type="text"
                  value={formState.contactValue}
                />
              </label>

              <label className="consent">
                <input
                  checked={formState.consent}
                  onChange={(event) => setFormState((current) => ({ ...current, consent: event.target.checked }))}
                  type="checkbox"
                />
                <span>
                  Я подтверждаю, что ознакомлен(а){" "}
                  <Link onClick={onClose} to="/privacy-policy">
                    с Согласием на обработку персональных данных и Политикой конфиденциальности
                  </Link>
                  , и выражаю согласие на обработку персональных данных.
                </span>
              </label>

              {errorMessage ? <p className="field__error">{errorMessage}</p> : null}

              <button className="button button--primary w-full justify-center" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Отправляем..." : "Заказать"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
