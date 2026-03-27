import { PageShell, useLeadModal } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { aboutContent, homeContent } from "../content/site";
import { asset } from "../lib/paths";

function AboutHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="surface-glass mx-auto grid max-w-[1220px] gap-10 rounded-[2.6rem] px-6 py-12 lg:grid-cols-2 lg:items-end lg:px-10">
        <Reveal>
          <SectionHeading title={aboutContent.hero.title} description={aboutContent.hero.description} />
        </Reveal>
        <Reveal delay={0.12}>
          <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_18%_18%,rgba(26,62,114,0.22),transparent_34%),linear-gradient(180deg,#090a13,#0f1020)]">
            <img alt="" aria-hidden="true" className="absolute inset-x-0 top-0 w-full opacity-45" src={asset("figma/inner-hero.png")} />
            <img alt="" aria-hidden="true" className="absolute inset-x-0 bottom-0 w-full opacity-55 mix-blend-screen" src={asset("figma/inner-wave.png")} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(26,62,114,0.28),transparent_26%)]" aria-hidden="true" />
            <div className="relative flex min-h-[22rem] items-end justify-end p-6 sm:p-8">
              <img
                alt="VIDEL R1"
                className="w-full max-w-[25.5rem] object-contain drop-shadow-[0_28px_80px_rgba(6,8,20,0.5)]"
                src={asset(homeContent.hero.featuredShot)}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutManifesto() {
  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[0.8fr,1.2fr]">
        <Reveal>
          <SectionHeading eyebrow="Манифест" title="Мы делаем технику, которая быстрее приводит к моменту" />
        </Reveal>
        <div className="space-y-6">
          {aboutContent.manifesto.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 0.06}>
              <p className="text-base leading-8 text-white/72">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutValues() {
  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <Reveal>
          <SectionHeading title="Три принципа, на которых держится NIVIM" />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {aboutContent.values.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="surface-glass rounded-[2rem] p-8">
                <img alt="" aria-hidden="true" className="size-12 opacity-88" src={asset(item.icon)} />
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/68">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutStory() {
  const openLead = useLeadModal();

  return (
    <section className="section-spacing px-4 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1220px] gap-6 lg:grid-cols-2">
        {aboutContent.storyBlocks.map((block, index) => (
          <Reveal key={block.title} delay={index * 0.05}>
            <article className="surface-glass rounded-[2rem] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/44">NIVIM</p>
              <h3 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.03em] text-white">{block.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/68">{block.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mx-auto mt-10 flex max-w-[1220px] justify-start">
        <button className="cta-button cta-button--primary" type="button" onClick={openLead}>
          Поговорить о подборе
        </button>
      </Reveal>
    </section>
  );
}

export function AboutPage() {
  return (
    <PageShell page="about">
      <AboutHero />
      <AboutManifesto />
      <AboutValues />
      <AboutStory />
    </PageShell>
  );
}
