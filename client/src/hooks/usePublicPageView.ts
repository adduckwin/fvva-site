import { useEffect } from "react";
import { onConsentChange, productionOrigin, recordView } from "@/lib/analytics";

export function usePublicPageView(pathname: string) {
  useEffect(() => {
    if (!productionOrigin()) return;
    const refresh = () => recordView(window.location.pathname);
    const onShow = (event: PageTransitionEvent) => {
      if (event.persisted) recordView(window.location.pathname, true);
    };
    const unsubscribe = onConsentChange(refresh);
    window.addEventListener("pageshow", onShow);
    document.addEventListener("prerenderingchange", refresh);
    recordView(pathname);
    return () => {
      unsubscribe();
      window.removeEventListener("pageshow", onShow);
      document.removeEventListener("prerenderingchange", refresh);
    };
  }, [pathname]);
}
