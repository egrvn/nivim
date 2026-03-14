const BASE_URL = import.meta.env.BASE_URL || "/";

const EXTERNAL_PATTERN = /^(https?:)?\/\//i;

export function withBasePath(path = "") {
  const value = String(path);

  if (!value || EXTERNAL_PATTERN.test(value) || value.startsWith("data:")) {
    return value;
  }

  const normalized = value.replace(/^\/+/, "");
  return `${BASE_URL}${normalized}`;
}
