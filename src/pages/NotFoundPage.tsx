import { notFoundContent } from "../content/site";
import { route } from "../lib/paths";

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-page__inner">
        <p className="not-found-page__eyebrow">NIVIM</p>
        <h1 className="figma-gradient-heading figma-gradient-heading--center">{notFoundContent.title}</h1>
        <p className="not-found-page__description">{notFoundContent.description}</p>
        <div className="not-found-page__actions">
          <a className="figma-light-button" href={route("/")}>
            {notFoundContent.homeLabel}
          </a>
          <a className="figma-light-button figma-light-button--ghost" href={route("/blog/")}>
            {notFoundContent.blogLabel}
          </a>
        </div>
      </div>
    </main>
  );
}
