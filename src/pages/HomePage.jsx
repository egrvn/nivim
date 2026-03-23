import { useEffect } from "react";

import { useLeadModal } from "../app/Layout";
import { homePage } from "../data/site-data";
import {
  FaqSection,
  FeatureSection,
  HomeHeroSection,
  ProductSection,
  ReviewSection,
  ScenarioSection,
  SetupSection,
  StorySection,
} from "../sections/HomeSections";

export function HomePage() {
  const { openLeadModal } = useLeadModal();

  useEffect(() => {
    document.title = "NIVIM - Так начинается кино...";
  }, []);

  return (
    <>
      <HomeHeroSection hero={homePage.hero} onLeadOpen={openLeadModal} />
      <ScenarioSection scenarios={homePage.scenarios} />
      <StorySection blocks={homePage.storyBlocks} />
      <SetupSection steps={homePage.steps} />
      <FeatureSection features={homePage.features} />
      <ProductSection onLeadOpen={openLeadModal} product={homePage.product} />
      <ReviewSection blogStrip={homePage.blogStrip} reviews={homePage.reviews} />
      <FaqSection faq={homePage.faq} />
    </>
  );
}
