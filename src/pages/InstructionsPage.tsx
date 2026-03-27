import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { instructionsContent } from "../content/site";

function InstructionsHero() {
  return (
    <section className="px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <div className="surface-glass mx-auto max-w-[1220px] rounded-[2.6rem] px-6 py-12 sm:px-10">
        <Reveal>
          <SectionHeading title={instructionsContent.hero.title} description={instructionsContent.hero.description} />
        </Reveal>
      </div>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <Reveal>
          <SectionHeading eyebrow="Quick start" title="Три коротких шага до первого просмотра" />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {instructionsContent.quickStart.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.05}>
              <article className="surface-glass rounded-[2rem] p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/44">{item.number}</p>
                <h3 className="mt-4 text-[1.75rem] font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/68">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DiagnosticsSection() {
  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <Reveal>
          <SectionHeading title="Если что-то пошло не так" description="Пара типовых сценариев, с которыми чаще всего сталкиваются после первого включения." />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {instructionsContent.diagnostics.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="surface-glass rounded-[2rem] p-8">
                <h3 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/66">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportChannels() {
  return (
    <section className="section-spacing px-4 pb-8 sm:px-6 lg:px-8">
      <div className="surface-glass mx-auto max-w-[1220px] rounded-[2.5rem] px-6 py-10 sm:px-8 lg:px-10">
        <Reveal>
          <SectionHeading title="Подключаемся лично, если нужен человек, а не справка" description={instructionsContent.supportTitle} />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {instructionsContent.contacts.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="rounded-[2rem] border border-white/10 bg-[#0b0d18] p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/42">{item.title}</p>
                <div className="mt-6 space-y-3">
                  {item.body.map((line) => (
                    <p key={line} className="text-sm leading-7 text-white/72">
                      {line}
                    </p>
                  ))}
                </div>
                <a className="cta-button cta-button--secondary mt-8" href={item.href} rel="noreferrer" target={item.href.startsWith("http") ? "_blank" : undefined}>
                  {item.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstructionsPage() {
  return (
    <PageShell page="instructions">
      <InstructionsHero />
      <QuickStartSection />
      <DiagnosticsSection />
      <SupportChannels />
    </PageShell>
  );
}
