/**
 * Layout component — Liquid Glass shell over the warm editorial palette.
 * Floating glass header bar, glass mobile menu, glass footer panel.
 * Glass material + tokens live in index.css (.glass-dark, palette mesh).
 */
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Floating glass header */}
      <header className="sticky top-0 z-50 pt-2 lg:pt-3">
        <div className="container">
          <div className="glass-dark rounded-2xl px-4 lg:px-6">
            <div className="flex items-center justify-between h-14 lg:h-16">
              <Link href="/" className="flex items-center gap-3 no-underline">
                <span className="font-serif text-lg lg:text-xl font-medium tracking-wide text-cream">
                  Александра&nbsp;
                  <span className="text-terracotta-light">Федорова</span>
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
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
                className="lg:hidden p-2 text-cream"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Меню"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden mt-2"
              >
                <div className="glass-dark rounded-2xl p-4 flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
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
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

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
                <p className="text-sm mb-2 text-ink/80">
                  Telegram: @ALEKSA_FVVA
                </p>
                <p className="text-sm text-ink/80">Мессенджер Max</p>
                <a
                  href="https://vk.com/fedorovaapsy"
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
