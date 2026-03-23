import { Link } from "react-router-dom";

import { useLeadModal } from "../app/Layout";
import { NeonWordmark } from "./NeonWordmark";
import { asset } from "../lib/assets";

export function Footer() {
  const { openLeadModal } = useLeadModal();

  return (
    <footer className="footer-shell">
      <div className="layout-shell">
        <section className="footer-cta">
          <div className="footer-cta__content">
            <p className="section-kicker">пора смотреть по настоящему</p>
            <h2 className="section-title section-title--large">VIDEL R1 создает то, чего не дает телевизор — атмосферу.</h2>
            <p className="section-copy max-w-2xl">
              Просто включи, сядь поудобнее и смотри, как дом оживает. Тот же эмоциональный масштаб, что и в Tilda-версии,
              только без её костылей.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="button button--primary" onClick={openLeadModal} type="button">
                Посмотреть в деле
              </button>
              <Link className="button button--ghost" to="/privacy-policy">
                правовая информация
              </Link>
            </div>
          </div>

          <div className="footer-cta__visual">
            <NeonWordmark />
            <img
              alt="VIDEL R1"
              className="footer-cta__projector"
              loading="lazy"
              src={asset("assets/tilda/tild6266-6634-4362-a265-393038303566__magnifics_upscale-xi.png")}
            />
            <img
              alt=""
              aria-hidden="true"
              className="footer-cta__beam"
              loading="lazy"
              src={asset("assets/tilda/tild6339-3638-4634-b565-656266663031___1_3.png")}
            />
          </div>
        </section>

        <div className="footer-meta">
          <div>
            <p className="footer-meta__label">Email для связи</p>
            <a className="footer-meta__value" href="mailto:support@nivim.tech">
              support@nivim.tech
            </a>
          </div>
          <div>
            <p className="footer-meta__label">Поддержка в Telegram</p>
            <a className="footer-meta__value" href="https://t.me/nivim_support_bot" rel="noreferrer" target="_blank">
              @nivim_support_bot
            </a>
          </div>
          <div>
            <p className="footer-meta__label">Режим работы</p>
            <p className="footer-meta__value">Ежедневно с 9:00 до 21:00 (МСК)</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
