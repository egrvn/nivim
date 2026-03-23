export function asset(path) {
  const trimmedPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${trimmedPath}`;
}
