import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Accordion } from "../components/Accordion";
import { PageShell, useLeadModal } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { homeContent } from "../content/site";
import { asset, homeAnchor } from "../lib/paths";

function HeroSection() {
  const openLead = useLeadModal();

  return (
    <section className="relative overflow-hidden px-4 pb-18 pt-6 sm:px-6 lg:px-8 lg:pb-24">
      <div className="hero-sheen absolute inset-x-0 top-0 h-[44rem]" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1220px] gap-10 pt-16 lg:grid-cols-2 lg:items-start lg:pt-18">
        <Reveal className="relative z-10 max-w-[34rem] pt-2">
          <p className="text-sm font-semibold uppercase tracking-[0.36em] text-[var(--text-muted)]">{homeContent.hero.eyebrow}</p>
          <h1 className="mt-6 max-w-[8ch] font-[var(--font-display)] text-[3rem] leading-[0.94] tracking-[0.05em] text-[var(--accent-soft)] sm:text-[4.15rem] xl:text-[4.55rem]">
            {homeContent.hero.title}
          </h1>
          <p className="mt-6 max-w-[34rem] text-base leading-8 text-[var(--text-soft)] sm:text-lg">{homeContent.hero.description}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button className="cta-button cta-button--primary" type="button" onClick={openLead}>
              {homeContent.hero.primaryCta}
            </button>
            <a className="cta-button cta-button--secondary" href={homeAnchor("product")}>
              {homeContent.hero.secondaryCta}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {homeContent.hero.specs.map((spec) => (
              <span
                key={spec}
                className="rounded-full border border-[rgba(227,239,239,0.1)] bg-[rgba(227,239,239,0.05)] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[var(--text-soft)]"
              >
                {spec}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="relative flex justify-center lg:justify-end lg:pt-4" delay={0.12}>
          <div className="hero-visual surface-glass relative w-full max-w-[38rem] overflow-visible rounded-[2.25rem] p-4 sm:p-6">
            <div className="absolute inset-x-10 top-0 h-40 rounded-full bg-[radial-gradient(circle_at_top,rgba(26,62,114,0.35),transparent_72%)]" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[1.85rem] bg-[radial-gradient(circle_at_top,rgba(26,62,114,0.28),rgba(8,10,19,0.22)),linear-gradient(180deg,#070910,#0f1020)] px-6 pb-4 pt-14">
              <img alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-screen" src={asset(homeContent.hero.background)} />
              <div className="relative z-10 flex justify-center">
                <img alt="Проектор NIVIM VIDEL R1" className="w-full max-w-[30rem] drop-shadow-[0_36px_72px_rgba(26,29,70,0.5)]" src={asset(homeContent.hero.device)} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ScenariosSection() {
  return (
    <section id="product" className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <Reveal>
          <SectionHeading align="center" title={homeContent.scenarios.title} description={homeContent.scenarios.description} />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {homeContent.scenarios.cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.05}>
              <article className="group surface-glass relative overflow-hidden rounded-[2rem]">
                <div className="relative aspect-[1.54] overflow-hidden">
                  <img
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={asset(card.image)}
                    style={{ objectPosition: card.imagePosition ?? "center" }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,16,0.05),rgba(7,9,16,0.74)_80%)]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/42">Сценарий</p>
                  <h3 className="mt-3 text-[1.6rem] font-semibold tracking-[-0.03em] text-white">{card.title}</h3>
                  <p className="mt-3 max-w-[32rem] text-sm leading-7 text-white/72">{card.description}</p>
                  <p className="mt-4 text-sm font-medium text-white/88">{card.quote}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <Reveal>
          <SectionHeading align="center" title={homeContent.benefits.title} description={homeContent.benefits.description} />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {homeContent.benefits.cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.05}>
              <article className="surface-glass rounded-[2rem] p-8">
                <img alt="" aria-hidden="true" className="size-12 opacity-90" src={asset(card.icon)} />
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-white">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/68">{card.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsSection() {
  const [activeStep, setActiveStep] = useState(0);
  const current = homeContent.steps.items[activeStep];

  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[0.8fr,1.2fr] lg:items-start">
        <Reveal>
          <SectionHeading title={homeContent.steps.title} description={homeContent.steps.description} />

          <div className="mt-10 space-y-4">
            {homeContent.steps.items.map((item, index) => {
              const active = index === activeStep;
              return (
                <button
                  key={item.number}
                  className={`block w-full rounded-[2rem] border px-6 py-5 text-left transition-all duration-300 ${
                    active
                      ? "border-[rgba(227,239,239,0.18)] bg-[rgba(227,239,239,0.08)] shadow-[0_20px_60px_rgba(8,10,20,0.42)]"
                      : "border-[rgba(227,239,239,0.08)] bg-[rgba(227,239,239,0.03)] hover:border-[rgba(227,239,239,0.14)] hover:bg-[rgba(227,239,239,0.05)]"
                  }`}
                  type="button"
                  onMouseEnter={() => setActiveStep(index)}
                  onFocus={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/44">
                    {item.number} · {item.kicker}
                  </p>
                  <h3 className="mt-3 text-[1.7rem] font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">{item.description}</p>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="surface-glass relative overflow-hidden rounded-[2.4rem] p-4">
            <div className="pointer-events-none absolute inset-x-12 top-0 h-40 rounded-full bg-[radial-gradient(circle_at_top,rgba(26,62,114,0.3),transparent_65%)]" />
            <div className="relative aspect-[1.25] overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#090a13,#0d1020)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.image}
                  alt={current.title}
                  className="absolute inset-0 h-full w-full object-contain p-6 sm:p-8"
                  src={asset(current.image)}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,16,0.05),rgba(5,7,16,0.68))]" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/46">{current.number}</p>
                <h3 className="mt-3 text-[2rem] font-semibold tracking-[-0.03em] text-white">{current.title}</h3>
                <p className="mt-3 max-w-[28rem] text-sm leading-7 text-white/68">{current.description}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="demo" className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <Reveal>
          <SectionHeading title={homeContent.features.title} description={homeContent.features.description} />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {homeContent.features.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="feature-card rounded-[2rem] border border-white/10 p-7 backdrop-blur-xl">
                <img alt="" aria-hidden="true" className="size-12 opacity-88" src={asset(item.icon)} />
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/66">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  const openLead = useLeadModal();

  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="surface-glass mx-auto grid max-w-[1220px] gap-8 overflow-hidden rounded-[2.5rem] p-6 lg:grid-cols-2 lg:items-center lg:p-8">
        <Reveal>
          <SectionHeading eyebrow={homeContent.demo.eyebrow} title={homeContent.demo.title} description={homeContent.demo.description} />
          <button className="cta-button cta-button--primary mt-8" type="button" onClick={openLead}>
            Посмотреть в деле
          </button>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0d17]">
            <img alt="Видео-презентация NIVIM" className="aspect-[1.28] w-full object-cover" src={asset(homeContent.demo.media)} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,19,0.08),rgba(9,10,19,0.6))]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white shadow-[0_18px_40px_rgba(13,16,30,0.4)] backdrop-blur">
                ▶
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ValueSection() {
  const openLead = useLeadModal();

  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="surface-glass mx-auto grid max-w-[1220px] gap-8 overflow-hidden rounded-[2.5rem] p-6 lg:grid-cols-2 lg:items-center lg:p-10">
        <Reveal>
          <SectionHeading title={homeContent.value.title} description={homeContent.value.description} />

          <div className="mt-8 grid gap-3">
            {homeContent.value.specs.map((spec) => (
              <div key={spec} className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white/72">
                {spec}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/44">Цена</p>
              <p className="mt-2 text-[2.3rem] font-semibold tracking-[-0.03em] text-white">{homeContent.value.price}</p>
            </div>
            <button className="cta-button cta-button--primary" type="button" onClick={openLead}>
              {homeContent.value.cta}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(26,62,114,0.22),transparent_60%),linear-gradient(180deg,#090a13,#0f1020)] px-8 py-10">
            <img alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen" src={asset(homeContent.value.backdrop)} />
            <img alt="VIDEL R1" className="relative z-10 mx-auto w-full max-w-[28rem] drop-shadow-[0_32px_80px_rgba(8,10,20,0.5)]" src={asset(homeContent.value.image)} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <Reveal>
          <SectionHeading title={homeContent.testimonials.title} description={homeContent.testimonials.description} />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {homeContent.testimonials.items.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.06}>
              <article className="surface-glass rounded-[2rem] p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/44">{item.role}</p>
                <p className="mt-5 text-base leading-8 text-white/72">“{item.quote}”</p>
                <p className="mt-8 text-base font-semibold text-white">{item.name}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <Reveal>
          <SectionHeading title={homeContent.faq.title} description={homeContent.faq.description} />
        </Reveal>
        <div className="mt-12">
          <Accordion items={homeContent.faq.items} />
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="surface-glass mx-auto flex max-w-[1220px] flex-col gap-6 rounded-[2.5rem] px-6 py-10 sm:px-10 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <SectionHeading title={homeContent.support.title} description={homeContent.support.description} />
        </Reveal>
        <Reveal delay={0.12}>
          <a
            className="cta-button cta-button--secondary"
            href="https://t.me/nivim_support_bot"
            rel="noreferrer"
            target="_blank"
          >
            {homeContent.support.button}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function EditorialSection() {
  return (
    <section className="section-spacing px-4 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <Reveal>
          <SectionHeading title={homeContent.editorial.title} description={homeContent.editorial.description} />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {homeContent.editorial.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="surface-glass group overflow-hidden rounded-[2rem]">
                <div className="relative aspect-[1.06] overflow-hidden">
                  <img alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={asset(item.image)} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,19,0.06),rgba(9,10,19,0.72))]" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/66">{item.description}</p>
                  <a className="mt-6 inline-flex text-sm font-semibold text-white/84 transition-colors duration-200 hover:text-white" href={item.href}>
                    Читать материал
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <PageShell
      page="home"
      ctaDescription={homeContent.finalCta.description}
      ctaLabel={homeContent.finalCta.button}
      ctaTitle={homeContent.finalCta.title}
      showFooterCta
    >
      <HeroSection />
      <ScenariosSection />
      <BenefitsSection />
      <StepsSection />
      <FeaturesSection />
      <DemoSection />
      <ValueSection />
      <TestimonialsSection />
      <FaqSection />
      <SupportSection />
      <EditorialSection />
    </PageShell>
  );
}
