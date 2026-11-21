import { Link, useLocation } from "wouter";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CONTACT_LINKS } from "@/lib/practice";
import { ArrowRight, Menu, X } from "lucide-react";
import MaxButton from "./MaxButton";
import "./site-shell.css";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/blog", label: "Блог" },
  { href: "/test/depression", label: "Тест на депрессию" },
  { href: "/test/anxiety", label: "Тест на тревогу" },
  { href: "/panicheskaya-ataka", label: "Помощь сейчас" },
];

const mobileLinks = [...navLinks, { href: "/contact", label: "Контакты" }];
const footerLinks = [
  ...mobileLinks,
  { href: "/faq", label: "Частые вопросы" },
  { href: "/proverit-sebya", label: "Быстрая самопроверка" },
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
        const target = anchor || main.querySelector("h1") || main;
        if (target.tabIndex < 0) target.tabIndex = -1;
        target.focus({ preventScroll: true });
        if (anchor) anchor.scrollIntoView({ behavior: "instant" });
        else window.scrollTo({ top: 0, behavior: "instant" });
      });
    }

    function onPush() {
      saved.set(currentKey, window.scrollY);
      currentKey = tagEntry();
      showPage();
    }
    function onReplace() {
      if (tagging) return;
      currentKey = history.state?.fvvaScrollKey || tagEntry();
      showPage();
    }
    function onPop() {
      saved.set(currentKey, window.scrollY);
      currentKey = history.state?.fvvaScrollKey || tagEntry();
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
            <span className="site-wordmark__name">Александра Федорова</span>
            <span className="site-wordmark__practice">Психолог · КПТ</span>
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
              Записаться <ArrowRight size={15} aria-hidden="true" />
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
                <Menu className="site-menu-icon" size={22} aria-hidden="true" />
                <X className="site-menu-close" size={22} aria-hidden="true" />
              </summary>
              <nav id="mobile-navigation" aria-label="Основная навигация" className="site-mobile-navigation">
                <div className="container">
                  {mobileLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      aria-current={location === href ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                  <MaxButton inMenu />
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
              <h2>Александра Федорова</h2>
              <p>Психолог · КПТ, ACT и CFT. Помощь при тревоге, апатии, последствиях травмы и высокой самокритике. Онлайн.</p>
            </div>
            <div>
              <h3 className="site-footer__label">Навигация</h3>
              <nav aria-label="Навигация в подвале" className="site-footer__navigation">
                {footerLinks.map(({ href, label }) => (
                  <Link key={href} href={href}>{label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="site-footer__label">Контакты</h3>
              <div className="site-footer__contacts">
                <a href={CONTACT_LINKS.telegram} target="_blank" rel="noopener noreferrer">Telegram @ALEKSA_FVVA</a>
                <a href={CONTACT_LINKS.max} target="_blank" rel="noopener noreferrer">Написать в MAX</a>
                <a href={CONTACT_LINKS.vk} target="_blank" rel="noopener noreferrer">ВКонтакте: vk.com/fedorovaapsy</a>
              </div>
            </div>
          </div>
          <div className="site-footer__notes">
            <p>Результаты тестов носят информационный характер и не являются диагнозом. При необходимости обратитесь к специалисту.</p>
            <p>&copy; {new Date().getFullYear()} Александра Федорова. Все права защищены.</p>
          </div>
        </div>
      </footer>
      <MaxButton />
    </div>
  );
}
