import { useEffect } from "react";

import { blogPage, blogPosts } from "../data/site-data";
import { BlogGrid, PageHero } from "../sections/PageSections";

export function BlogPage() {
  useEffect(() => {
    document.title = "Блог";
  }, []);

  return (
    <>
      <PageHero description={blogPage.subtitle} kicker="Блог" title={blogPage.title} />
      <BlogGrid posts={blogPosts} />
    </>
  );
}
