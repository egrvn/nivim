import { TildaPage } from "../components/TildaPage";
import { tildaPages } from "../tilda/pages";

export function NotFoundPage() {
  return <TildaPage page={tildaPages.notFound} />;
}
