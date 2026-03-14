import { withBasePath } from "../utils/asset-path";

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} type
 * @property {string} name
 * @property {string} subtitle
 * @property {number} price
 * @property {number} [oldPrice]
 * @property {string} stock
 * @property {string} sku
 * @property {number} rating
 * @property {number} reviews
 * @property {string} image
 * @property {string[]} [gallery]
 * @property {string[]} [badges]
 * @property {string[]} [shortSpecs]
 * @property {[string, string][]} [specs]
 * @property {string} description
 * @property {string[]} [included]
 */

const fallbackData = {
  brand: {
    name: "NIVIM",
    productName: "VIDEL R1",
    phone: "+7 (495) 188-74-11",
    email: "support@nivim.tech",
    telegram: "@nivim_support_bot",
    address: "Москва, Нижняя Сыромятническая, 10",
    hours: "Ежедневно с 09:00 до 21:00 (МСК)",
  },
  products: [],
  principles: [],
  reviews: [],
  faq: [],
  documents: [],
  instructions: [],
  articles: [],
  deliveryOptions: [],
  paymentMethods: [],
  promoCodes: {},
};

const rawData = typeof window !== "undefined" && window.NIVIM_DATA ? window.NIVIM_DATA : fallbackData;

const withPublicPath = (value) => {
  if (typeof value !== "string") return value;
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;
  if (value.startsWith("assets/") || value.startsWith("/assets/")) return withBasePath(value);
  return value;
};

/** @type {{ brand: typeof fallbackData.brand, products: Product[] }} */
export const siteData = {
  ...rawData,
  products: (rawData.products || []).map((product) => ({
    ...product,
    image: withPublicPath(product.image),
    gallery: (product.gallery || []).map(withPublicPath),
  })),
  articles: (rawData.articles || []).map((article) => ({
    ...article,
    cover: withPublicPath(article.cover),
  })),
};

export const brand = siteData.brand;
export const products = siteData.products;
export const articles = siteData.articles;
export const documentsList = siteData.documents;
export const faqItems = siteData.faq;
export const principles = siteData.principles;
export const reviews = siteData.reviews;
export const instructions = siteData.instructions;
export const deliveryOptions = siteData.deliveryOptions;
export const paymentMethods = siteData.paymentMethods;
export const promoCodes = siteData.promoCodes;
