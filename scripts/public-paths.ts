import { publicPaths } from "../client/src/lib/publicPaths";
import { SITE_ORIGIN } from "../shared/const";

export { publicPaths };

const urls = publicPaths.map(path => `  <url><loc>${SITE_ORIGIN}${path}</loc></url>`).join("\n");
export const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
