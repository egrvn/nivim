import { TildaPage } from "../components/TildaPage";
import { tildaPages } from "../tilda/pages";

export function HomePage() {
  return <TildaPage page={tildaPages.home} />;
}
