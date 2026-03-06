/**
 * Layout component — Editorial Design style
 * Deep forest green (#1A3C34) navigation, cream background, Playfair Display headings
 */
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/blog", label: "Блог" },
  { href: "/test/depression", label: "Тест на депрессию" },
  { href: "/test/anxiety", label: "Тест на тревогу" },
  { href: "/contact", label: "Контакты" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1A3C34] text-[#FDF8F0] shadow-lg">
        <div className="container flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <span className="font-serif text-lg lg:text-xl font-semibold tracking-wide text-[#FDF8F0]">
              Александра Федорова
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 no-underline ${
                  location === link.href
                    ? "text-[#C4785B] border-b-2 border-[#C4785B] pb-1"
                    : "text-[#FDF8F0]/80 hover:text-[#FDF8F0] border-b-2 border-transparent pb-1"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-[#FDF8F0]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-[#1A3C34] border-t border-[#FDF8F0]/10"
            >
              <div className="container py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium tracking-wide uppercase py-2 no-underline ${
                      location === link.href
                        ? "text-[#C4785B]"
                        : "text-[#FDF8F0]/80"
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
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#1A3C34] text-[#FDF8F0]/80 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-xl text-[#FDF8F0] mb-4">
                Александра Федорова
              </h3>
              <p className="text-sm leading-relaxed">
                Психолог, специалист по когнитивно-поведенческой терапии (КПТ) и
                терапии принятия и ответственности (ACT). Помощь при депрессии и
                тревожных расстройствах.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#FDF8F0] mb-4">
                Навигация
              </h4>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm hover:text-[#C4785B] transition-colors no-underline text-[#FDF8F0]/80"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#FDF8F0] mb-4">
                Контакты
              </h4>
              <p className="text-sm mb-2">Telegram: @ALEKSA_FVVA</p>
              <p className="text-sm">Мессенджер Max</p>
            </div>
          </div>
          <div className="border-t border-[#FDF8F0]/10 mt-8 pt-8 text-center text-xs text-[#FDF8F0]/50">
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
      </footer>
    </div>
  );
}
