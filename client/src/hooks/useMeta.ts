import { createContext, useContext, useEffect } from "react";
import { useLocation } from "wouter";
import { SITE_ORIGIN } from "@shared/const";

interface MetaOptions {
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  robots?: string;
}

const SITE_NAME = "Психолог Александра Федорова";

function pageHead(options: MetaOptions, pathname: string) {
  const canonical = options.robots?.includes("noindex")
    ? undefined
    : SITE_ORIGIN + (pathname.replace(/\/+$/, "") || "/");
  const title = options.title.includes("Александра Федорова")
    ? options.title
    : `${options.title} | ${SITE_NAME}`;
  const image = new URL(options.ogImage || "/images/alexandra.jpg", SITE_ORIGIN).href;
  const property = {
    "og:site_name": SITE_NAME,
    "og:locale": "ru_RU",
    "og:type": options.ogType || "website",
    "og:title": options.ogTitle || options.title,
    "og:description": options.ogDescription || options.description,
    "og:url": canonical,
    "og:image": image,
  };
  const name = {
    description: options.description,
    keywords: options.keywords,
    robots: options.robots,
    "twitter:card": "summary_large_image",
    "twitter:title": property["og:title"],
    "twitter:description": property["og:description"],
    "twitter:image": image,
  };
  return { title, canonical, property, name };
}

export type PageHead = ReturnType<typeof pageHead>;
export const PrerenderMeta = createContext<((head: PageHead) => void) | null>(null);

export function useMeta(options: MetaOptions) {
  const [pathname] = useLocation();
  const collect = useContext(PrerenderMeta);
  if (collect) collect(pageHead(options, pathname));
  const { title, description, keywords, ogTitle, ogDescription, ogImage, ogType, robots } = options;

  useEffect(() => {
    const head = pageHead({ title, description, keywords, ogTitle, ogDescription, ogImage, ogType, robots }, pathname);
    document.title = head.title;
    for (const attr of ["name", "property"] as const) {
      for (const [key, value] of Object.entries(head[attr])) {
        let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
        if (!value) {
          element?.remove();
          continue;
        }
        if (!element) {
          element = document.createElement("meta");
          element.setAttribute(attr, key);
          document.head.appendChild(element);
        }
        element.content = value;
      }
    }
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!head.canonical) {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = head.canonical;
    }
  }, [pathname, title, description, keywords, ogTitle, ogDescription, ogImage, ogType, robots]);
}
