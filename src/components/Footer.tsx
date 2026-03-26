import { useCart } from "../commerce/cart";
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
  const { itemCount } = useCart();

  return (
    <footer className="relative mt-24 pb-8 pt-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,239,239,0.2),transparent)]" />

      <div className="page-shell grid gap-8">
        <section className="footer-hero">
          <div className="footer-hero__glow" aria-hidden="true" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
            <div className="space-y-4">
              <p className="section-kicker">Контакты и поддержка</p>
              <h2 className="display-title display-title--section">Пора смотреть по-настоящему</h2>
              <p className="body-copy max-w-[42rem]">
                NIVIM завершает сайт спокойно и уверенно: с понятным контактом, честным разговором о продукте и без лишнего
                визуального шума.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button onClick={onLeadOpen}>Оставить контакт</Button>
              <Button href={siteMeta.telegramUrl} target="_blank" rel="noreferrer" variant="secondary">
                Написать в Telegram
              </Button>
            </div>
          </div>
        </section>

        <section className="footer-grid" id="contacts">
          <div className="space-y-3">
            <span className="brand-mark">NIVIM</span>
            <p className="text-sm leading-7 text-white/58">
              {siteMeta.modelName}
              <br />
              домашний проектор для кино, игр и спокойного большого экрана
            </p>
          </div>

          <div className="space-y-3">
            <p className="footer-label">Навигация</p>
            <div className="grid gap-2">
              {[...navigation, ...secondaryNavigation].map((item) => (
                <a key={item.label} className="footer-link" href={resolveHref(item.href)}>
                  {item.label}
                </a>
              ))}
              <a className="footer-link" href={route("/cart/")}>
                Корзина {itemCount > 0 ? `(${itemCount})` : ""}
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="footer-label">Контакты</p>
            <div className="grid gap-2">
              <a className="footer-link" href={`mailto:${siteMeta.email}`}>
                {siteMeta.email}
              </a>
              <a className="footer-link" href={siteMeta.telegramUrl} rel="noreferrer" target="_blank">
                {siteMeta.telegramHandle}
              </a>
              <p className="text-sm leading-7 text-white/58">{siteMeta.supportHours}</p>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
