import { useEffect } from "react";

import { NotFoundSection } from "../sections/PageSections";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "404";
  }, []);

  return <NotFoundSection />;
}
