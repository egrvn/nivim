import { useEffect } from "react";

import { aboutPage } from "../data/site-data";
import { AboutValues, PageHero } from "../sections/PageSections";

export function AboutPage() {
  useEffect(() => {
    document.title = "Мы создаем не просто технику - мы создаем атмосферу";
  }, []);

  return (
    <>
      <PageHero description={aboutPage.intro} image={aboutPage.image} kicker="О компании" title={aboutPage.title} />
      <AboutValues image={aboutPage.image} manifesto={aboutPage.mission} sideImage={aboutPage.sideImage} values={aboutPage.values} />
    </>
  );
}
