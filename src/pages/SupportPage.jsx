import { useEffect } from "react";

import { supportPage } from "../data/site-data";
import { PageHero, SupportResources } from "../sections/PageSections";

export function SupportPage() {
  useEffect(() => {
    document.title = "Инструкции";
  }, []);

  return (
    <>
      <PageHero description={supportPage.subtitle} image={supportPage.image} kicker="Поддержка" title={supportPage.title} />
      <SupportResources image={supportPage.image} resources={supportPage.resources} supportContacts={supportPage.supportContacts} />
    </>
  );
}
