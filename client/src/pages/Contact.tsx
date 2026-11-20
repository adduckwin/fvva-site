import { motion } from "framer-motion";
import { ArrowLeft, Copy, ExternalLink, Video, Clock, CalendarDays, Wallet, UserCheck, Lock } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useMeta } from "@/hooks/useMeta";
import { CONTACT_LINKS, PRACTICE, PRACTICE_FACTS } from "@/lib/practice";

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

export default function Contact() {
  useMeta({
    title: "Контакты — запись на консультацию психолога",
    description:
      "Свяжитесь с психологом Александрой Федоровой через Telegram (@ALEKSA_FVVA) или мессенджер Max. Консультации по тревоге и сниженному настроению методами КПТ и ACT.",
    keywords:
      "контакты психолога, запись к психологу, Александра Федорова, психолог телеграм, консультация психолога онлайн",
  });

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(BOOKING_MESSAGE);
      toast.success("Сообщение скопировано");
    } catch {
      toast.error("Выделите текст сообщения и скопируйте его вручную");
    }
  }

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
              {PRACTICE.reply}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={CONTACT_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 font-medium text-cream hover:bg-forest-deep"
              >
                Написать в Telegram <ExternalLink aria-hidden="true" size={16} />
              </a>
              <a
                href={CONTACT_LINKS.max}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 font-medium text-forest hover:bg-cream-dark"
              >
                Написать в MAX <ExternalLink aria-hidden="true" size={16} />
              </a>
            </div>
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
                    Работаю с апатией, тревожными расстройствами, паническими
                    атаками. Помогаю обрести психологическую гибкость и вернуть
                    качество жизни.
                  </p>

                </div>
              </div>
            </motion.div>

            {/* Reassurance + ready-made first message */}
            <motion.div
              custom={1}
              variants={fadeUp}
              className="glass-dark rounded-2xl p-5 md:p-6 mb-8 text-center"
            >
              <p className="font-medium text-forest">Первое сообщение для записи</p>
              <p className="mt-2 select-all text-ink/80">«{BOOKING_MESSAGE}»</p>
              <button
                type="button"
                onClick={copyTemplate}
                className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-forest/30 px-4 text-sm font-medium text-forest hover:bg-forest/5"
              >
                <Copy aria-hidden="true" size={16} /> Скопировать текст
              </button>
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

            {/* VK community */}
            <motion.a
              custom={4}
              variants={fadeUp}
              href={CONTACT_LINKS.vk}
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
                   Полезные материалы и публикации о тревоге, апатии и
                   психологии.
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
