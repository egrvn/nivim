import { useEffect } from "react";

import { legalTabs } from "../data/site-data";
import { LegalTabsSection, PageHero } from "../sections/PageSections";

export function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Документы на сайт";
  }, []);

  return (
    <>
      <PageHero
        description="Политика конфиденциальности, согласие на обработку персональных данных и cookie-соглашение собраны в табовую структуру, как в экспорте Tilda."
        kicker="Документы"
        title="Правовая информация"
      />
      <LegalTabsSection tabs={legalTabs} />
    </>
  );
}
