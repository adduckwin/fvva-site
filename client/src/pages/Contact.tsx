/**
 * Contact page — Editorial Design
 * QR codes for Telegram and Max messenger
 */
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { Link } from "wouter";

const TELEGRAM_QR = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663384785665/trMGCIWCcHrHSHjI.jpg?Expires=1804361729&Signature=WHKk7Y9jKZLtVBKuA9-SWXUqUaJ0NiZt5EI3CBH1rcyUgm7aEdC~~b3HSFfUuJcZk~Otw0l7WIQ2q~73w2~2wIiN40xTkwWQLMHgdydgRbh~dA~WEVpfyVAbMzJr~PHYWEx80aYZNBIkiBSOz6blEawoRA8vLOa3t6OxejdkkIRYBf8rQ-eS7XuKXDB-6zs~nxGkpdOSVX1nYi6h6A~Sz0lMS2zckmRUAvLU9JhWMmsUd4OKQh24SkrgqWayX~VotGoHU-Vb~cEpS~tFmyO9NTwSVgo3Au25szPGLTnk1nvMzLxFTS8UDG7p390ElB1L6sTpjyUYkTWxhfGPY8br0w__&Key-Pair-Id=K2HSFNDJXOU9YS";
const MAX_QR = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663384785665/zyRItrxdDiEbRkqH.png?Expires=1804361729&Signature=cztF19QqTwB0JuLIkz~NsJAaVgal~amAOiKgSE5mSRso1UrLemWDGWpp-rdVXsiCCr7n6VW~wJHkzPpmC2JaL4NF-6MDGB8iCj8sRP5FPK1mu6iXNwjqkBqrySkJdliaBllu0GVr6aW5zLSyWyw6xpWZcRPqUn2Y-uI3i-oKfRt2CENNlRZ8~Bp2agQtzzPebTk0~yzEKxtjLctyZETzEoBt403BhZ01LJEs-0BFkKsebUoc8rSCoWCmyKgfNLW-pUwuznKTD5Dbl5U4G5bYLTPYELn8OvOclLwdd9fo4h2JfsXt169auIhWxFTit56QXn4uM2JVsBybW9R3-QpX9Q__&Key-Pair-Id=K2HSFNDJXOU9YS";
const SASHA_IMG = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663384785665/FvJWuxSjZGXMebLm.jpg?Expires=1804361729&Signature=Hkt7PYTSfD~s7vo8jzoUOxioSF0UuEfVtxV~UqINFnETsoIaRp1fQMmBGfjlG56ejschSoRZhAYuZ0AQOxerUatfgJhooHO0lBGYWVZMPV74Ke9kx8W5si4ELjlRmWMKOb0uSMuC4nTTj77nBFzHLkXp7nIf-qPc~~YsEFLW~pAyv3Smof0kEgiKzneqWJB0M9B3~cdUyjUB1q2fP0516~vpPiWcYGmtR8Hbk-2sNdULg1EnbtKm-Ogg1dIY9m7Y1aWgockukECWFUhzsqYqSEEn5iZSVb6PyE457d~O8TpkM6BbYyj7p2YhJ-8abHuTQdoSMmTzsR~LcDrBuVAbWw__&Key-Pair-Id=K2HSFNDJXOU9YS";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

export default function Contact() {
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
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            {/* About card */}
            <motion.div
              custom={0}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 shadow-sm border border-[#1A3C34]/5"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-3 border-[#C4785B]">
                <img
                  src={SASHA_IMG}
                  alt="Александра Федорова"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h2 className="font-serif text-xl text-[#1A3C34] text-center mb-2">
                Александра Федорова
              </h2>
              <p className="text-[#C4785B] text-sm text-center mb-4">
                Психолог &middot; КПТ &middot; ACT
              </p>
              <p className="text-[#1A3C34]/70 text-sm leading-relaxed text-center">
                Работаю с депрессией, тревожными расстройствами, паническими
                атаками. Помогаю обрести психологическую гибкость и вернуть
                качество жизни.
              </p>
              <div className="mt-6 pt-6 border-t border-[#1A3C34]/5">
                <p className="text-[#1A3C34]/50 text-xs text-center">
                  Формат: онлайн-консультации
                </p>
                <p className="text-[#1A3C34]/50 text-xs text-center mt-1">
                  Длительность сессии: 50 минут
                </p>
              </div>
            </motion.div>

            {/* Telegram QR */}
            <motion.div
              custom={1}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 shadow-sm border border-[#1A3C34]/5 text-center"
            >
              <div className="w-12 h-12 bg-[#0088cc] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Send className="text-white" size={24} />
              </div>
              <h3 className="font-serif text-xl text-[#1A3C34] mb-2">
                Telegram
              </h3>
              <p className="text-[#1A3C34]/60 text-sm mb-6">
                @ALEKSA_FVVA
              </p>
              <div className="bg-[#FDF8F0] rounded-xl p-4 inline-block">
                <img
                  src={TELEGRAM_QR}
                  alt="QR-код Telegram"
                  className="w-56 h-56 object-contain mx-auto rounded-lg"
                />
              </div>
              <p className="text-[#1A3C34]/50 text-xs mt-4">
                Отсканируйте QR-код или найдите в поиске Telegram
              </p>
              <a
                href="https://t.me/ALEKSA_FVVA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-[#0088cc] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#0077b5] transition-colors no-underline"
              >
                Написать в Telegram
              </a>
            </motion.div>

            {/* Max QR */}
            <motion.div
              custom={2}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 shadow-sm border border-[#1A3C34]/5 text-center"
            >
              <div className="w-12 h-12 bg-[#FF6B35] rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-white" size={24} />
              </div>
              <h3 className="font-serif text-xl text-[#1A3C34] mb-2">
                Мессенджер Max
              </h3>
              <p className="text-[#1A3C34]/60 text-sm mb-6">
                Александра Федорова
              </p>
              <div className="bg-[#FDF8F0] rounded-xl p-4 inline-block">
                <img
                  src={MAX_QR}
                  alt="QR-код мессенджера Max"
                  className="w-56 h-56 object-contain mx-auto rounded-lg"
                />
              </div>
              <p className="text-[#1A3C34]/50 text-xs mt-4">
                Отсканируйте QR-код камерой телефона
              </p>
            </motion.div>
          </motion.div>

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 bg-[#1A3C34] rounded-2xl p-8 md:p-12 text-center"
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
