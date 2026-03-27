import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { Tabs } from "../components/Tabs";
import { privacyContent } from "../content/site";

export function PrivacyPage() {
  return (
    <PageShell page="privacy">
      <section className="px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="surface-glass mx-auto max-w-[1220px] rounded-[2.6rem] px-6 py-12 sm:px-10">
          <Reveal>
            <SectionHeading title={privacyContent.title} description={privacyContent.intro} />
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <Tabs
              tabs={privacyContent.tabs.map((tab) => ({
                id: tab.id,
                label: tab.label,
                content: (
                  <div className="grid gap-6">
                    {tab.sections.map((section) => (
                      <article key={section.title} className="surface-glass rounded-[2rem] p-8">
                        <h3 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-white">{section.title}</h3>
                        <p className="mt-4 whitespace-pre-line text-sm leading-7 text-white/68">{section.body}</p>
                      </article>
                    ))}
                  </div>
                ),
              }))}
            />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
