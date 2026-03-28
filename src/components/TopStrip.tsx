import type { PageKey } from "../content/figma23120";

type TopStripProps = {
  page: Exclude<PageKey, "notFound">;
};

export function TopStrip({ page: _page }: TopStripProps) {
  return <div className="figma-top-strip" aria-hidden="true" />;
}
