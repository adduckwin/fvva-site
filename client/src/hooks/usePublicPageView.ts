import { useEffect, useRef } from "react";
import { SITE_ORIGIN } from "@shared/const";
import { articles } from "@/lib/articles";

const publicSections = new Set(["/", "/blog", "/faq", "/slovar", "/contact"]);
const publishedArticles = new Set(articles.map(article => "/blog/" + article.slug));

export function usePublicPageView(pathname: string) {
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (window.location.origin !== SITE_ORIGIN || navigator.doNotTrack === "1" ||
        ("globalPrivacyControl" in navigator && navigator.globalPrivacyControl === true)) return;

    const section = publishedArticles.has(pathname) ? "/blog" : pathname;
    if (!publicSections.has(section)) {
      lastPath.current = null;
      return;
    }

    function record() {
      if (window.location.pathname !== pathname) return;
      const pageUrl = SITE_ORIGIN + section;
      const pixel = new URL("https://mc.yandex.ru/watch/108242561");
      pixel.searchParams.set("page-url", pageUrl);
      // The pixel only receives the public section, even when the real URL
      // contains a search term or the visitor came straight from a test.
      void fetch(pixel, {
        mode: "no-cors",
        credentials: "omit",
        cache: "no-store",
        referrer: pageUrl,
        referrerPolicy: "unsafe-url",
      }).catch(() => {});
      lastPath.current = pathname;
    }

    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) record();
    }

    if ("prerendering" in document && document.prerendering) {
      document.addEventListener("prerenderingchange", record, { once: true });
    } else if (lastPath.current !== pathname) {
      record();
    }
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("prerenderingchange", record);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [pathname]);
}
