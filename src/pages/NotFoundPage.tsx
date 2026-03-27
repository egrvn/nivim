import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { notFoundContent } from "../content/site";
import { route } from "../lib/paths";

export function NotFoundPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-white">
      <div className="page-noise" aria-hidden="true" />
      <div className="page-glow page-glow--left" aria-hidden="true" />
      <div className="page-glow page-glow--right" aria-hidden="true" />

      <main className="px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <Reveal className="surface-glass mx-auto max-w-[860px] rounded-[2.8rem] px-6 py-16 text-center sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--text-muted)]">404</p>
          <h1 className="mt-5 font-[var(--font-display)] text-[3rem] leading-[0.94] tracking-[0.05em] text-[var(--accent-soft)] sm:text-[4rem]">{notFoundContent.title}</h1>
          <p className="mx-auto mt-5 max-w-[36rem] text-base leading-8 text-[var(--text-soft)]">{notFoundContent.description}</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a className="cta-button cta-button--primary" href={route("/")}>
              {notFoundContent.homeLabel}
            </a>
            <a className="cta-button cta-button--secondary" href={route("/blog/")}>
              {notFoundContent.blogLabel}
            </a>
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
