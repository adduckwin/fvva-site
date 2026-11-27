import { SITE_ORIGIN } from "@shared/const";
import { publicPaths } from "./publicPaths";

const counterId = 108242561;
const tagUrl = "https://mc.yandex.ru/metrika/tag.js";
const paths = new Set(publicPaths);
const goals = ["booking_open", "contact_telegram", "contact_max", "booking_price", "booking_copy", "diary_download"] as const;
type Goal = (typeof goals)[number];
export type Consent = "granted" | "denied";
const consentKey = "fvva-analytics-consent";
const consentEvent = "fvva:analytics-consent";

type Metrica = {
  (id: number, method: "init" | "hit" | "reachGoal" | "destruct", ...args: unknown[]): void;
  a?: unknown[][];
  l?: number;
};
declare global {
  interface Window { ym?: Metrica }
}

let storageFallback: Consent | null = null;
let initialized = false;
let observedPath: string | undefined;
let atEntry = true;
let lastView: string | null = null;

export function productionOrigin() {
  return typeof window !== "undefined" && window.location.origin === SITE_ORIGIN;
}

export function privacySignal() {
  return navigator.doNotTrack === "1" ||
    ("globalPrivacyControl" in navigator && navigator.globalPrivacyControl === true);
}

export function getConsent(): Consent | null {
  if (storageFallback) return storageFallback;
  try {
    const stored = localStorage.getItem(consentKey);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

export function onConsentChange(listener: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === consentKey || event.key === null) listener();
  }
  window.addEventListener(consentEvent, listener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(consentEvent, listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function setConsent(choice: Consent) {
  if (!productionOrigin() || privacySignal()) return;
  if (choice === "denied") atEntry = false;
  try {
    localStorage.setItem(consentKey, choice);
    storageFallback = null;
  } catch {
    storageFallback = choice;
    if (choice === "denied") {
      try { localStorage.removeItem(consentKey); } catch { /* Storage is unavailable. */ }
    }
  }
  window.dispatchEvent(new Event(consentEvent));
}

function knownPath(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  return paths.has(path) ? path : null;
}

function canTrack() {
  return productionOrigin() && !privacySignal() && getConsent() === "granted" &&
    !("prerendering" in document && document.prerendering);
}

function entryReferrer() {
  if (!atEntry || !document.referrer) return null;
  try {
    const referrer = new URL(document.referrer);
    if (referrer.protocol !== "https:" && referrer.protocol !== "http:") return null;
    // A previous same-site document may have been visited before consent.
    return referrer.origin === SITE_ORIGIN ? null : referrer.origin + "/";
  } catch {
    return null;
  }
}

function initialize(url: string, referrer: string) {
  if (initialized) return;
  const queue: Metrica = (...args) => { (queue.a ??= []).push(args); };
  queue.l = Date.now();
  window.ym ??= queue;
  window.ym(counterId, "init", {
    defer: true, url, referrer, sendTitle: false, trackHash: false,
    clickmap: false, trackLinks: false, accurateTrackBounce: false,
    webvisor: false, ecommerce: false,
  });
  if (!document.querySelector(`script[src="${tagUrl}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.referrerPolicy = "no-referrer";
    script.src = tagUrl;
    document.head.append(script);
  }
  initialized = true;
}

export function trackGoal(goal: Goal) {
  if (!canTrack() || !initialized || !goals.includes(goal)) return;
  const path = knownPath(window.location.pathname);
  // reachGoal uses the URL of the previous virtual hit as its source page.
  if (!path || lastView !== path) return;
  window.ym?.(counterId, "reachGoal", goal);
}

export function recordView(pathname: string, restored = false) {
  if (!productionOrigin() || pathname !== window.location.pathname) return;
  if (observedPath !== undefined && observedPath !== pathname) atEntry = false;
  observedPath = pathname;
  if (!canTrack()) {
    if (getConsent() === "denied") atEntry = false;
    if (initialized) {
      initialized = false;
      lastView = null;
      if (window.ym?.a) window.ym.a.length = 0;
      window.ym?.(counterId, "destruct");
      // Keep a volatile refusal active for this document when storage is blocked.
      if (storageFallback !== "denied") window.location.reload();
    }
    return;
  }
  const path = knownPath(pathname);
  if (!path) {
    lastView = null;
    return;
  }
  if (lastView === path && !restored) return;
  const url = SITE_ORIGIN + path;
  // An empty referer makes the SDK fall back to document.referrer. A URL
  // equal to the hit URL is explicitly omitted by its request middleware.
  const referrer = lastView ? SITE_ORIGIN + lastView : entryReferrer() || url;
  initialize(url, referrer);
  window.ym?.(counterId, "hit", url, { referer: referrer });
  lastView = path;
  if (path === "/contact") trackGoal("booking_open");
}
