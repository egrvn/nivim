const baseUrl = import.meta.env.BASE_URL;

export function route(path: string) {
  if (!path || path === "/") {
    return baseUrl;
  }

  return `${baseUrl}${path.replace(/^\//, "")}`;
}

export function homeAnchor(id: string) {
  return `${baseUrl}#${id.replace(/^#/, "")}`;
}

export function asset(path: string) {
  return route(path.replace(/^assets\//, ""));
}

export function absoluteUrl(path: string) {
  const cleanPath = path === "/" ? "" : path.replace(/^\//, "");
  return cleanPath ? `https://egrvn.github.io/nivim/${cleanPath}` : "https://egrvn.github.io/nivim/";
}
