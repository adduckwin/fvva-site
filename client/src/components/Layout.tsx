/**
 * Layout component — Liquid Glass shell over the warm editorial palette.
 * Floating glass header bar, glass mobile menu, glass footer panel.
 * Glass material + tokens live in index.css (.glass-dark, palette mesh).
 */
import { Link, useLocation } from "wouter";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CONTACT_LINKS } from "@/lib/practice";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import MaxButton from "./MaxButton";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/blog", label: "Блог" },
  { href: "/test/depression", label: "Тест на депрессию" },
  { href: "/test/anxiety", label: "Тест на тревогу" },
  { href: "/panicheskaya-ataka", label: "Помощь сейчас" },
  { href: "/contact", label: "Контакты" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const mainRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

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
      {/* Floating glass header */}
      <header
        className="sticky top-0 z-50 pt-2 lg:pt-3"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setMobileOpen(false);
        }}
      >
        <div className="container">
          <div className="glass-dark rounded-2xl px-4 lg:px-6">
            <div className="flex items-center justify-between min-h-14 lg:min-h-16">
              <Link href="/" className="flex items-center gap-3 no-underline">
                <span className="font-serif text-lg lg:text-xl font-medium tracking-wide text-cream">
                  Александра{" "}
                  <span className="text-terracotta-light">Федорова</span>
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={location === link.href ? "page" : undefined}
                    className={`group relative text-xs font-medium tracking-[0.13em] uppercase transition-colors duration-300 no-underline pb-1 ${
                      location === link.href
                        ? "text-terracotta-light"
                        : "text-cream/80 hover:text-cream"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`pointer-events-none absolute left-0 -bottom-0.5 h-px bg-terracotta-light transition-all duration-300 ${
                        location === link.href
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                ))}
              </nav>

              {/* Mobile menu button */}
              <button
                ref={menuButton}
                type="button"
                className="lg:hidden min-h-11 min-w-11 inline-flex items-center justify-center text-cream"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Меню"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <motion.nav
            id="mobile-navigation"
            aria-label="Основная навигация"
            aria-hidden={!mobileOpen}
            inert={!mobileOpen}
            initial={false}
            animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="glass-dark mt-2 max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-2xl p-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={location === link.href ? "page" : undefined}
                  className={`text-sm font-medium tracking-wide uppercase py-2 no-underline ${
                    location === link.href
                      ? "text-terracotta-light"
                      : "text-cream/80"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        </div>
      </header>

      {/* Main content */}
      <main id="main-content" ref={mainRef} tabIndex={-1} className="flex-1 scroll-mt-24 [&_[id]]:scroll-mt-24">{children}</main>

      {/* Glass footer */}
      <footer className="pt-12 pb-8">
        <div className="container">
          <div className="glass-dark rounded-3xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
              <h3 className="font-serif text-xl text-forest mb-4">
                Александра Федорова
              </h3>
              <p className="text-sm leading-relaxed text-ink/80">
                Психолог · КПТ, ACT и CFT. Помощь при тревоге, апатии,
                последствиях травмы и высокой самокритике. Онлайн.
              </p>
              </div>
              <div>
                <h4 className="font-serif text-lg text-forest mb-4">Навигация</h4>
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-ink/80 hover:text-terracotta-text transition-colors no-underline w-fit"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/faq"
                    className="text-sm text-ink/80 hover:text-terracotta-text transition-colors no-underline w-fit"
                  >
                    Частые вопросы
                  </Link>
                  <Link
                    href="/proverit-sebya"
                    className="text-sm text-ink/80 hover:text-terracotta-text transition-colors no-underline w-fit"
                  >
                    Быстрая самопроверка
                  </Link>
                  <Link
                    href="/slovar"
                    className="text-sm text-ink/80 hover:text-terracotta-text transition-colors no-underline w-fit"
                  >
                    Словарь терминов
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="font-serif text-lg text-forest mb-4">Контакты</h4>
                <a
                  href={CONTACT_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-2 block w-fit text-sm text-ink/80 hover:text-terracotta-text hover:underline"
                >
                  Telegram @ALEKSA_FVVA
                </a>
                <a
                  href={CONTACT_LINKS.max}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-fit text-sm text-ink/80 hover:text-terracotta-text hover:underline"
                >
                  Написать в MAX
                </a>
                <a
                  href={CONTACT_LINKS.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink/80 hover:text-terracotta-text transition-colors no-underline inline-block mt-2"
                >
                  ВКонтакте: vk.com/fedorovaapsy
                </a>
              </div>
            </div>
            <div className="border-t border-ink/10 mt-8 pt-6 text-center text-xs text-ink/50">
              <p>
                Результаты тестов носят информационный характер и не являются
                диагнозом. При необходимости обратитесь к специалисту.
              </p>
              <p className="mt-2">
                &copy; {new Date().getFullYear()} Александра Федорова. Все права
                защищены.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <MaxButton />
    </div>
  );
}
