import { motion, useReducedMotion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";

import { Icon } from "../components/Icon";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { contactsContent } from "../content/site";

type FormState = {
  name: string;
  contact: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  contact: "",
  message: "",
};

function ContactsHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="contacts-hero">
      <div className="contacts-hero__background" aria-hidden="true">
        <motion.div
          className="contacts-hero__aurora contacts-hero__aurora--left"
          animate={reduceMotion ? undefined : { y: [0, 10, 0], opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 11, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="contacts-hero__aurora contacts-hero__aurora--right"
          animate={reduceMotion ? undefined : { y: [0, -8, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 13, ease: "easeInOut", repeat: Infinity, delay: -3 }}
        />
        <div className="contacts-hero__grid" />
      </div>

      <div className="site-container contacts-hero__inner">
        <Reveal>
          <p className="site-eyebrow">{contactsContent.hero.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="site-gradient-heading site-gradient-heading--left contacts-hero__title">
            {contactsContent.hero.title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="contacts-hero__description">{contactsContent.hero.description}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="contacts-hero__chips">
            {contactsContent.hero.chips.map((chip) => (
              <span key={chip} className="contacts-hero__chip">
                {chip}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactsChannels() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="contacts-section contacts-channels">
      <div className="site-container">
        <div className="contacts-channels__grid">
          {contactsContent.channels.map((channel, index) => (
            <Reveal key={channel.title} delay={0.06 + index * 0.06}>
              <motion.article
                className="contacts-channel"
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <header className="contacts-channel__head">
                  <span className="site-icon-frame site-icon-frame--accent">
                    <Icon name={channel.icon} size="md" tone="frost" />
                  </span>
                  <span className="contacts-channel__kicker">{channel.kicker}</span>
                </header>
                <h2 className="contacts-channel__title">{channel.title}</h2>
                <p className="contacts-channel__description">{channel.description}</p>
                <p className="contacts-channel__meta">{channel.meta}</p>
                <a
                  className="contacts-channel__cta"
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span>{channel.cta}</span>
                  <span aria-hidden="true">→</span>
                </a>
                <div className="contacts-channel__glow" aria-hidden="true" />
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactsTopics() {
  return (
    <section className="contacts-section contacts-topics">
      <div className="site-container">
        <div className="contacts-topics__head">
          <Reveal>
            <p className="site-eyebrow">{contactsContent.topics.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.04}>
            <h2 className="site-gradient-heading site-gradient-heading--left contacts-topics__title">
              {contactsContent.topics.title}
            </h2>
          </Reveal>
        </div>

        <div className="contacts-topics__grid">
          {contactsContent.topics.items.map((item, index) => (
            <Reveal key={item.title} delay={0.08 + index * 0.04}>
              <article className="contacts-topic">
                <span className="contacts-topic__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactsForm() {
  const [values, setValues] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (values.name.trim().length < 2) {
      next.name = "Укажите имя — минимум 2 символа";
    }
    if (values.contact.trim().length < 4) {
      next.contact = "Email или Telegram, чтобы мы могли ответить";
    }
    if (values.message.trim().length < 10) {
      next.message = "Опишите задачу — минимум 10 символов";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
      setValues(initialForm);
    }, 720);
  };

  return (
    <section className="contacts-section contacts-form-section">
      <div className="site-container">
        <div className="contacts-form-shell">
          <div className="contacts-form-shell__intro">
            <Reveal>
              <p className="site-eyebrow">{contactsContent.form.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="site-gradient-heading site-gradient-heading--left contacts-form-shell__title">
                {contactsContent.form.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="contacts-form-shell__description">{contactsContent.form.description}</p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <form className="contacts-form" onSubmit={handleSubmit} noValidate>
              <div className="contacts-form__field">
                <label htmlFor="contacts-form-name">{contactsContent.form.fields.name}</label>
                <input
                  id="contacts-form-name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange("name")}
                  placeholder={contactsContent.form.placeholders.name}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contacts-form-name-error" : undefined}
                  disabled={status === "submitting"}
                />
                {errors.name ? (
                  <p className="contacts-form__error" id="contacts-form-name-error">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="contacts-form__field">
                <label htmlFor="contacts-form-contact">{contactsContent.form.fields.contact}</label>
                <input
                  id="contacts-form-contact"
                  name="contact"
                  type="text"
                  value={values.contact}
                  onChange={handleChange("contact")}
                  placeholder={contactsContent.form.placeholders.contact}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={errors.contact ? "contacts-form-contact-error" : undefined}
                  disabled={status === "submitting"}
                />
                {errors.contact ? (
                  <p className="contacts-form__error" id="contacts-form-contact-error">
                    {errors.contact}
                  </p>
                ) : null}
              </div>

              <div className="contacts-form__field contacts-form__field--full">
                <label htmlFor="contacts-form-message">{contactsContent.form.fields.message}</label>
                <textarea
                  id="contacts-form-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange("message")}
                  placeholder={contactsContent.form.placeholders.message}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contacts-form-message-error" : undefined}
                  disabled={status === "submitting"}
                />
                {errors.message ? (
                  <p className="contacts-form__error" id="contacts-form-message-error">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="contacts-form__action">
                <button
                  className="site-light-button site-light-button--primary"
                  type="submit"
                  disabled={status === "submitting"}
                  aria-busy={status === "submitting"}
                >
                  <span>{status === "submitting" ? "Отправляем…" : contactsContent.form.cta}</span>
                  <span className="site-light-button__icon" aria-hidden="true">→</span>
                </button>
                <p className="contacts-form__note">{contactsContent.form.note}</p>
              </div>

              {status === "success" ? (
                <div className="contacts-form__success" role="status" aria-live="polite">
                  {contactsContent.form.success}
                </div>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactsClosing() {
  return (
    <section className="contacts-section contacts-closing">
      <div className="site-container">
        <div className="contacts-closing__shell">
          <Reveal>
            <p className="site-eyebrow">{contactsContent.closing.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.04}>
            <h2 className="site-gradient-heading site-gradient-heading--left contacts-closing__title">
              {contactsContent.closing.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="contacts-closing__description">{contactsContent.closing.description}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <a
              className="site-light-button site-light-button--primary"
              href={contactsContent.closing.href}
              target="_blank"
              rel="noreferrer"
            >
              <span>{contactsContent.closing.cta}</span>
              <span className="site-light-button__icon" aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ContactsPage() {
  return (
    <PageShell page="contacts">
      <ContactsHero />
      <ContactsChannels />
      <ContactsTopics />
      <ContactsForm />
      <ContactsClosing />
    </PageShell>
  );
}
