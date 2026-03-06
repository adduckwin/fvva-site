import { useEffect } from "react";

interface MetaOptions {
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
}

const BASE_TITLE = "Психолог Александра Федорова";

/**
 * Sets document <title>, meta description, keywords, and Open Graph tags.
 * Cleans up on unmount by restoring the base title and removing injected tags.
 */
export function useMeta(opts: MetaOptions) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${opts.title} | ${BASE_TITLE}`;

    const tags: HTMLMetaElement[] = [];

    function setMeta(name: string, content: string, property = false) {
      // Remove existing tag if present
      const attr = property ? "property" : "name";
      const existing = document.querySelector(`meta[${attr}="${name}"]`);
      if (existing) existing.remove();

      const el = document.createElement("meta");
      if (property) {
        el.setAttribute("property", name);
      } else {
        el.setAttribute("name", name);
      }
      el.content = content;
      document.head.appendChild(el);
      tags.push(el);
    }

    if (opts.description) {
      setMeta("description", opts.description);
    }
    if (opts.keywords) {
      setMeta("keywords", opts.keywords);
    }

    // Open Graph
    setMeta("og:title", opts.ogTitle || opts.title, true);
    setMeta("og:type", opts.ogType || "article", true);
    if (opts.ogDescription || opts.description) {
      setMeta("og:description", (opts.ogDescription || opts.description)!, true);
    }
    if (opts.ogImage) {
      setMeta("og:image", opts.ogImage, true);
    }
    setMeta("og:site_name", BASE_TITLE, true);

    return () => {
      document.title = prev;
      tags.forEach((t) => t.remove());
    };
  }, [opts.title, opts.description, opts.keywords, opts.ogTitle, opts.ogDescription, opts.ogImage, opts.ogType]);
}
