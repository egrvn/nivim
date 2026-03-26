import { navigation, secondaryNavigation, siteMeta } from "../content/site";
import { homeAnchor, route } from "../lib/paths";
import { Button } from "./Button";

type FooterProps = {
  onLeadOpen: () => void;
};

function resolveHref(path: string) {
  if (path === "/#product") {
    return homeAnchor("product");
  }

  if (path === "/#contacts") {
    return homeAnchor("contacts");
  }

  return route(path);
}

export function Footer({ onLeadOpen }: FooterProps) {
  return (
    <footer className="relative mt-24 pb-8 pt-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,239,239,0.25),transparent)]" />
      <div className="mx-auto grid w-full max-w-[1248px] gap-8 px-4 sm:px-6">
        <section className="card-surface relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <div className="footer-glow" aria-hidden="true" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-end">
            <div className="space-y-4">
              <p className="section-kicker">Контакты и поддержка</p>
              <h2 className="display-title text-3xl sm:text-4xl">Пора смотреть по-настоящему</h2>
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                NIVIM закрывает сайт спокойно и уверенно: без визуального шума, с честным разговором о продукте и быстрым
                каналом связи, когда хочется перейти от чтения к просмотру.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button onClick={onLeadOpen}>Оставить контакт</Button>
              <Button href={siteMeta.telegramUrl} variant="secondary">
                Написать в Telegram
              </Button>
            </div>
          </div>
        </section>

        <div className="grid gap-6 rounded-[32px] border border-white/8 bg-white/[0.03] px-6 py-6 backdrop-blur-md sm:grid-cols-3 sm:px-8">
          <div className="space-y-3">
            <span className="brand-mark">NIVIM</span>
            <p className="text-sm leading-7 text-white/58">
              {siteMeta.modelName}
              <br />
              Full HD, Android 12, 1000 ANSI
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/46">Навигация</p>
            <div className="grid gap-2">
              {[...navigation, ...secondaryNavigation].map((item) => (
                <a key={item.label} className="text-sm text-white/78 transition hover:text-white" href={resolveHref(item.href)}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3" id="contacts">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/46">Контакты</p>
            <div className="grid gap-2">
              <a className="text-sm text-white/86 transition hover:text-white" href={`mailto:${siteMeta.email}`}>
                {siteMeta.email}
              </a>
              <a className="text-sm text-white/86 transition hover:text-white" href={siteMeta.telegramUrl} rel="noreferrer" target="_blank">
                {siteMeta.telegramHandle}
              </a>
              <p className="text-sm leading-7 text-white/58">{siteMeta.supportHours}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
