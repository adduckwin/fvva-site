import { articles } from "./articles";

export const publicPaths = [
  "/", "/blog", "/test/depression", "/test/anxiety", "/panicheskaya-ataka",
  "/faq", "/proverit-sebya", "/slovar", "/contact", "/psiholog-pri-trevoge",
  ...articles.map(article => `/blog/${article.slug}`),
];
