import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { navigation } from "../data/site-data";
import { useLeadModal } from "../app/Layout";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openLeadModal } = useLeadModal();

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="layout-shell">
        <div className="site-header__inner">
          <Link aria-label="NIVIM" className="brand-chip" to="/">
            <span className="brand-chip__word">NIVIM</span>
          </Link>

          <nav className="site-header__nav" aria-label="Основная навигация">
            {navigation.map((item) => (
              <NavLink
                className={({ isActive }) => `site-header__link ${isActive ? "site-header__link--active" : ""}`.trim()}
                key={item.label}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <button className="button button--primary" onClick={openLeadModal} type="button">
              Заказать
            </button>
            <button
              aria-expanded={isMenuOpen}
              aria-label="Открыть меню"
              className="menu-toggle"
              onClick={() => setIsMenuOpen((value) => !value)}
              type="button"
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <div aria-hidden={!isMenuOpen} className={`mobile-drawer ${isMenuOpen ? "mobile-drawer--open" : ""}`}>
          <button
            aria-label="Закрыть мобильное меню"
            className="mobile-drawer__backdrop"
            onClick={() => setIsMenuOpen(false)}
            type="button"
          />
          <div className="mobile-drawer__panel">
            <div className="space-y-4">
              {navigation.map((item) => (
                <NavLink
                  className="mobile-drawer__link"
                  key={item.label}
                  onClick={() => setIsMenuOpen(false)}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <button
              className="button button--primary w-full"
              onClick={() => {
                setIsMenuOpen(false);
                openLeadModal();
              }}
              type="button"
            >
              Заказать
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
