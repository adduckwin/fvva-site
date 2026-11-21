import { Link, useLocation } from "wouter";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CONTACT_LINKS } from "@/lib/practice";
import MaxButton from "./MaxButton";
import "./site-shell.css";

const navLinks = [
  { href: "/#podhod", label: "О подходе" },
  { href: "/blog", label: "Статьи" },
  { href: "/proverit-sebya", label: "Самопроверка" },
  { href: "/panicheskaya-ataka", label: "Помощь сейчас" },
];

const siteLinks = [
  { href: "/", label: "Главная" },
  ...navLinks,
  { href: "/contact", label: "Запись на консультацию" },
];
const resourceLinks = [
  { href: "/test/depression", label: "Тест на депрессию" },
  { href: "/test/anxiety", label: "Тест на тревогу" },
  { href: "/faq", label: "Частые вопросы" },
  { href: "/slovar", label: "Словарь терминов" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState<boolean>();

  const mainRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  // Wouter keeps the document mounted across routes. Track positions by
  // history entry so repeated visits to the same URL restore independently.
  useLayoutEffect(() => {
    const saved = new Map<string, number>();
    const restoreMode = history.scrollRestoration;
    history.scrollRestoration = "manual";
    let frame = 0;
    let tagging = false;

    function tagEntry() {
      const key = Math.random().toString(36).slice(2);
      tagging = true;
      try {
        history.replaceState({ ...history.state, fvvaScrollKey: key }, "");
      } finally {
        tagging = false;
      }
      return key;
    }

    let currentKey = history.state?.fvvaScrollKey || tagEntry();
    let currentUrl = new URL(window.location.href);

    function showPage(y?: number) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (y !== undefined) {
          window.scrollTo({ top: y, behavior: "instant" });
          return;
        }
        const main = mainRef.current;
        if (!main) return;
        let anchor: HTMLElement | null = null;
        try {
          anchor = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
        } catch {
          // Invalid URL escapes have no corresponding fragment.
        }
        const heading = anchor?.matches("section, article")
          ? anchor.querySelector<HTMLElement>("h1, h2, h3")
          : null;
        const target = heading || anchor || main.querySelector("h1") || main;
        if (target.tabIndex < 0) target.tabIndex = -1;
        target.focus({ preventScroll: true });
        if (anchor) anchor.scrollIntoView({ behavior: "instant" });
        else window.scrollTo({ top: 0, behavior: "instant" });
      });
    }

    function onPush() {
      saved.set(currentKey, window.scrollY);
      currentKey = tagEntry();
      currentUrl = new URL(window.location.href);
      showPage();
    }
    function onReplace() {
      if (tagging) return;
      const nextUrl = new URL(window.location.href);
      const searchOnly = currentUrl.pathname === nextUrl.pathname &&
        currentUrl.hash === nextUrl.hash && currentUrl.search !== nextUrl.search;
      currentUrl = nextUrl;
      currentKey = history.state?.fvvaScrollKey || tagEntry();
      if (searchOnly) cancelAnimationFrame(frame);
      else showPage();
    }
    function onPop() {
      saved.set(currentKey, window.scrollY);
      currentKey = history.state?.fvvaScrollKey || tagEntry();
      currentUrl = new URL(window.location.href);
      showPage(saved.get(currentKey));
    }

    if (window.location.hash) showPage();
    window.addEventListener("pushState", onPush, true);
    window.addEventListener("replaceState", onReplace, true);
    window.addEventListener("popstate", onPop, true);
    return () => {
      cancelAnimationFrame(frame);
      history.scrollRestoration = restoreMode;
      window.removeEventListener("pushState", onPush, true);
      window.removeEventListener("replaceState", onReplace, true);
      window.removeEventListener("popstate", onPop, true);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        onClick={(event) => {
          if (!mainRef.current) return;
          event.preventDefault();
          mainRef.current.focus({ preventScroll: true });
          mainRef.current.scrollIntoView({ block: "start", behavior: "instant" });
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-[60] focus:rounded-lg focus:bg-forest focus:px-4 focus:py-3 focus:text-cream"
      >
        Перейти к содержанию
      </a>
      <header
        className="site-header"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setMobileOpen(false);
        }}
      >
        <div className="container site-header__bar">
          <Link href="/" className="site-wordmark" onClick={() => setMobileOpen(false)}>
            <img className="site-imprint" src="/images/press-imprint.webp" width="144" height="92" alt="" />
            <span className="site-wordmark__name">Александра Федорова</span>
          </Link>
          <nav className="site-navigation" aria-label="Основная навигация">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} aria-current={location === href ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="site-header__actions">
            <Link
              href="/contact"
              className="site-booking-link"
              aria-current={location === "/contact" ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              Записаться
            </Link>
            <details
              className="site-menu"
              open={mobileOpen}
              onToggle={(event) => setMobileOpen(event.currentTarget.open)}
            >
              <summary
                ref={menuButton}
                className="site-menu-toggle"
                role="button"
                aria-label="Меню"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                <span className="site-menu-open">Меню</span>
                <span className="site-menu-close">Закрыть</span>
              </summary>
              <nav id="mobile-navigation" aria-label="Основная навигация" className="site-mobile-navigation">
                <div className="container">
                  {[...siteLinks, ...resourceLinks].map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      aria-current={location === href ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                  <MaxButton />
                </div>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main id="main-content" ref={mainRef} tabIndex={-1} className="flex-1 scroll-mt-24 [&_[id]]:scroll-mt-24">{children}</main>

      <footer className="site-footer">
        <div className="container">
          <div className="site-footer__grid">
            <div className="site-footer__identity">
              <Link href="/">Александра Федорова</Link>
              <p>Частная практика психолога</p>
              <div className="site-footer__contacts">
                <a href={CONTACT_LINKS.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
                <MaxButton />
                <a href={CONTACT_LINKS.vk} target="_blank" rel="noopener noreferrer">ВКонтакте</a>
              </div>
            </div>
            <nav aria-label="Навигация в подвале" className="site-footer__navigation">
              {siteLinks.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
            </nav>
            <nav aria-label="Полезные материалы" className="site-footer__navigation">
              {resourceLinks.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
            </nav>
          </div>
          <div className="site-footer__notes">
            <p>Результаты тестов носят информационный характер и не являются диагнозом. При необходимости обратитесь к специалисту.</p>
            <p>&copy; {new Date().getFullYear()} Александра Федорова</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
