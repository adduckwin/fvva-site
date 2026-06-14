/**
 * Contact page — Liquid Glass over the warm editorial palette.
 * Messenger cards for Telegram and Max. Messenger brand colors are kept
 * intentionally (Telegram blue, Max orange); page chrome uses glass + tokens.
 */
import { motion } from "framer-motion";
import { ArrowLeft, Send, ExternalLink, Video, Clock, CalendarDays, Wallet, UserCheck, Lock } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useMeta } from "@/hooks/useMeta";
import { PRACTICE_FACTS } from "@/lib/practice";

const FACT_ICONS: Record<string, typeof Video> = {
  format: Video,
  duration: Clock,
  frequency: CalendarDays,
  price: Wallet,
  first: UserCheck,
  privacy: Lock,
};

const SASHA_IMG = "/images/sasha.jpg";
const BOOKING_MESSAGE = "Здравствуйте! Хочу записаться на консультацию.";

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
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export default function Contact() {
  useMeta({
    title: "Контакты — запись на консультацию психолога",
    description:
      "Свяжитесь с психологом Александрой Федоровой через Telegram (@ALEKSA_FVVA) или мессенджер Max. Консультации по депрессии и тревоге методами КПТ и ACT.",
    keywords:
      "контакты психолога, запись к психологу, Александра Федорова, психолог телеграм, консультация психолога онлайн",
  });

  const copyTemplate = () => {
    navigator.clipboard
      ?.writeText(BOOKING_MESSAGE)
      .then(() =>
        toast.success(
          "Готовое сообщение скопировано — вставьте его в чат и отправьте"
        )
      )
      .catch(() => {});
  };

  return (
    <div>
      {/* Header */}
      <section className="pt-4 lg:pt-6 pb-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-dark rounded-3xl p-8 md:p-12"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-cream/60 hover:text-cream text-sm mb-6 no-underline transition-colors"
            >
              <ArrowLeft size={14} /> На главную
            </Link>
            <h1 className="text-4xl md:text-5xl text-cream">
              Связаться со мной
            </h1>
            <p className="text-cream/75 mt-4 max-w-2xl text-lg">
              Выберите удобный для вас мессенджер. Я отвечу в течение 24 часов.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-12">
        <div className="container">
          <motion.div initial="hidden" animate="visible" className="max-w-4xl mx-auto">
            {/* About card */}
            <motion.div
              custom={0}
              variants={fadeUp}
              className="glass-dark rounded-2xl p-8 md:p-10 mb-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="w-28 h-28 rounded-full overflow-hidden shrink-0 ring-2 ring-terracotta">
                  <img
                    src={SASHA_IMG}
                    alt="Александра Федорова"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl text-forest mb-1">
                    Александра Федорова
                  </h2>
                  <p className="text-terracotta text-sm mb-3">
                    Психолог &middot; КПТ &middot; ACT
                  </p>
                  <p className="text-ink/70 text-sm leading-relaxed">
                    Работаю с депрессией, тревожными расстройствами, паническими
                    атаками. Помогаю обрести психологическую гибкость и вернуть
                    качество жизни.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground justify-center md:justify-start">
                    <span className="bg-forest/5 px-3 py-1 rounded-full">
                      Онлайн-консультации
                    </span>
                    <span className="bg-forest/5 px-3 py-1 rounded-full">
                      Сессия 50 минут
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reassurance + ready-made first message */}
            <motion.div
              custom={1}
              variants={fadeUp}
              className="glass-dark rounded-2xl p-5 md:p-6 mb-8 text-center"
            >
              <p className="text-ink/75 text-sm leading-relaxed">
                Первая встреча — это знакомство, она{" "}
                <span className="text-forest font-medium">
                  ни к чему не обязывает
                </span>
                . Не знаете, с чего начать — нажмите на мессенджер ниже, и
                готовое первое сообщение скопируется само. Останется вставить и
                отправить.
              </p>
              <p className="text-muted-foreground text-sm italic mt-2">
                «{BOOKING_MESSAGE}»
              </p>
            </motion.div>

            {/* Formats & conditions */}
            <motion.div custom={1} variants={fadeUp} className="mb-8">
              <h2 className="font-serif text-xl text-forest mb-4 text-center md:text-left">
                Форматы и условия
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRACTICE_FACTS.map((f) => {
                  const Icon = FACT_ICONS[f.key];
                  return (
                    <div key={f.key} className="glass-dark rounded-2xl p-5 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-terracotta/12 flex items-center justify-center shrink-0">
                        <Icon className="text-terracotta" size={18} />
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs uppercase tracking-wide mb-0.5">
                          {f.label}
                        </div>
                        <div className="text-forest text-sm font-medium leading-snug">
                          {f.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Messenger buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Telegram */}
              <motion.a
                custom={2}
                variants={fadeUp}
                onClick={copyTemplate}
                href="https://t.me/ALEKSA_FVVA"
                target="_blank"
                rel="noopener noreferrer"
                className="group glass rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1 no-underline block"
              >
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-[#0088cc] rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <TelegramIcon className="w-9 h-9 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-forest mb-1">Telegram</h3>
                    <p className="text-[#0088cc] text-sm font-medium">
                      @ALEKSA_FVVA
                    </p>
                  </div>
                </div>
                <p className="text-ink/65 text-sm leading-relaxed mb-5">
                  Напишите мне в Telegram для записи на консультацию или если у
                  вас есть вопросы о формате работы.
                </p>
                <div className="flex items-center gap-2 text-[#0088cc] text-sm font-medium group-hover:gap-3 transition-all">
                  <Send size={16} />
                  Написать в Telegram
                  <ExternalLink size={14} className="opacity-50" />
                </div>
              </motion.a>

              {/* Max Messenger */}
              <motion.a
                custom={3}
                variants={fadeUp}
                onClick={copyTemplate}
                href="https://max.ru/u/f9LHodD0cOKoOcVdY7nuS0tflUZbFozx6cdcx1vdjY4DPD1D1_7ad0ciLo0"
                target="_blank"
                rel="noopener noreferrer"
                className="group glass rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1 no-underline block"
              >
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FF8F35] rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 32 32" className="w-9 h-9 text-white" fill="none">
                      <path d="M8 10L16 18L24 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 16L16 24L24 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl text-forest mb-1">Мессенджер Max</h3>
                    <p className="text-[#FF6B35] text-sm font-medium">
                      Александра Федорова
                    </p>
                  </div>
                </div>
                <p className="text-ink/65 text-sm leading-relaxed mb-5">
                  Вы также можете связаться со мной через мессенджер Max, если
                  этот формат для вас удобнее.
                </p>
                <div className="flex items-center gap-2 text-[#FF6B35] text-sm font-medium group-hover:gap-3 transition-all">
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Написать в Max
                  <ExternalLink size={14} className="opacity-50" />
                </div>
              </motion.a>
            </div>

            {/* VK community */}
            <motion.a
              custom={4}
              variants={fadeUp}
              href="https://vk.com/fedorovaapsy"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-2xl p-6 mt-6 flex items-center gap-5 transition-transform duration-300 hover:-translate-y-1 no-underline"
            >
              <div className="w-14 h-14 bg-[#0077FF] rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-semibold text-lg tracking-tight">
                  VK
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl text-forest mb-1">
                  Сообщество ВКонтакте
                </h3>
                <p className="text-ink/65 text-sm leading-relaxed">
                  Полезные материалы и публикации о тревоге, депрессии и
                  психотерапии.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[#0077FF] text-sm font-medium shrink-0 group-hover:gap-3 transition-all">
                Открыть
                <ExternalLink size={14} className="opacity-50" />
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
