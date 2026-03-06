/**
 * Contact page — Editorial Design
 * Messenger icons for Telegram and Max with direct links
 */
import { motion } from "framer-motion";
import { ArrowLeft, Send, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useMeta } from "@/hooks/useMeta";

const SASHA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663384785665/3ShoP3Y4fpqCsCeNyB6Wwy/САША_24b40fe3.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

function MaxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="12" cy="12" r="12" fill="currentColor" opacity="0.15"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3"/>
      <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">M</text>
    </svg>
  );
}

export default function Contact() {
  useMeta({
    title: "Контакты — запись на консультацию психолога",
    description: "Свяжитесь с психологом Александрой Федоровой через Telegram (@ALEKSA_FVVA) или мессенджер Max. Консультации по депрессии и тревоге методами КПТ и ACT.",
    keywords: "контакты психолога, запись к психологу, Александра Федорова, психолог телеграм, консультация психолога онлайн",
  });

  return (
    <div>
      {/* Header */}
      <section className="bg-[#1A3C34] py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#FDF8F0]/60 hover:text-[#FDF8F0] text-sm mb-6 no-underline transition-colors"
            >
              <ArrowLeft size={14} /> На главную
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl text-[#FDF8F0]">
              Связаться со мной
            </h1>
            <p className="text-[#FDF8F0]/70 mt-4 max-w-2xl text-lg">
              Выберите удобный для вас мессенджер. Я отвечу в течение 24 часов.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-16 bg-[#FDF8F0]">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* About card */}
            <motion.div
              custom={0}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-[#1A3C34]/5 mb-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="w-28 h-28 rounded-full overflow-hidden shrink-0 border-3 border-[#C4785B]">
                  <img
                    src={SASHA_IMG}
                    alt="Александра Федорова"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="font-serif text-2xl text-[#1A3C34] mb-1">
                    Александра Федорова
                  </h2>
                  <p className="text-[#C4785B] text-sm mb-3">
                    Психолог &middot; КПТ &middot; ACT
                  </p>
                  <p className="text-[#1A3C34]/70 text-sm leading-relaxed">
                    Работаю с депрессией, тревожными расстройствами, паническими
                    атаками. Помогаю обрести психологическую гибкость и вернуть
                    качество жизни.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#1A3C34]/50 justify-center md:justify-start">
                    <span className="bg-[#FDF8F0] px-3 py-1 rounded-full">Онлайн-консультации</span>
                    <span className="bg-[#FDF8F0] px-3 py-1 rounded-full">Сессия 50 минут</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Messenger buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Telegram */}
              <motion.a
                custom={1}
                variants={fadeUp}
                href="https://t.me/ALEKSA_FVVA"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-8 shadow-sm border border-[#1A3C34]/5 hover:shadow-lg hover:border-[#0088cc]/30 transition-all duration-300 no-underline block"
              >
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-[#0088cc] rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <TelegramIcon className="w-9 h-9 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#1A3C34] mb-1">
                      Telegram
                    </h3>
                    <p className="text-[#0088cc] text-sm font-medium">
                      @ALEKSA_FVVA
                    </p>
                  </div>
                </div>
                <p className="text-[#1A3C34]/60 text-sm leading-relaxed mb-5">
                  Напишите мне в Telegram для записи на консультацию или если у вас есть вопросы о формате работы.
                </p>
                <div className="flex items-center gap-2 text-[#0088cc] text-sm font-medium group-hover:gap-3 transition-all">
                  <Send size={16} />
                  Написать в Telegram
                  <ExternalLink size={14} className="opacity-50" />
                </div>
              </motion.a>

              {/* Max Messenger */}
              <motion.a
                custom={2}
                variants={fadeUp}
                href="https://max.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-8 shadow-sm border border-[#1A3C34]/5 hover:shadow-lg hover:border-[#FF6B35]/30 transition-all duration-300 no-underline block"
              >
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FF8F35] rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 32 32" className="w-9 h-9 text-white" fill="none">
                      <path d="M8 10L16 18L24 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 16L16 24L24 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#1A3C34] mb-1">
                      Мессенджер Max
                    </h3>
                    <p className="text-[#FF6B35] text-sm font-medium">
                      Александра Федорова
                    </p>
                  </div>
                </div>
                <p className="text-[#1A3C34]/60 text-sm leading-relaxed mb-5">
                  Вы также можете связаться со мной через мессенджер Max, если этот формат для вас удобнее.
                </p>
                <div className="flex items-center gap-2 text-[#FF6B35] text-sm font-medium group-hover:gap-3 transition-all">
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  Написать в Max
                  <ExternalLink size={14} className="opacity-50" />
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 bg-[#1A3C34] rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
          >
            <h3 className="font-serif text-2xl text-[#FDF8F0] mb-4">
              Как проходит первая консультация
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
              <div className="bg-[#FDF8F0]/10 rounded-xl p-6">
                <span className="text-[#C4785B] font-serif text-2xl">01</span>
                <h4 className="text-[#FDF8F0] font-medium mt-2 mb-2">
                  Знакомство
                </h4>
                <p className="text-[#FDF8F0]/60 text-sm">
                  Мы познакомимся, и вы расскажете о том, что вас беспокоит. Я
                  задам уточняющие вопросы, чтобы лучше понять вашу ситуацию.
                </p>
              </div>
              <div className="bg-[#FDF8F0]/10 rounded-xl p-6">
                <span className="text-[#C4785B] font-serif text-2xl">02</span>
                <h4 className="text-[#FDF8F0] font-medium mt-2 mb-2">
                  Оценка состояния
                </h4>
                <p className="text-[#FDF8F0]/60 text-sm">
                  Вместе мы определим основные проблемы и цели терапии. Я
                  расскажу, как могу помочь и какие методы будут наиболее
                  эффективны.
                </p>
              </div>
              <div className="bg-[#FDF8F0]/10 rounded-xl p-6">
                <span className="text-[#C4785B] font-serif text-2xl">03</span>
                <h4 className="text-[#FDF8F0] font-medium mt-2 mb-2">
                  План терапии
                </h4>
                <p className="text-[#FDF8F0]/60 text-sm">
                  Мы обсудим формат и частоту встреч, а также наметим первые шаги
                  на пути к улучшению вашего состояния.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
