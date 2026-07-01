/**
 * Home page — Liquid Glass over the warm editorial palette.
 * Floating glass panels (.glass / .glass-dark) over the index.css palette mesh.
 * Sections, copy and scoring logic unchanged from the editorial pass.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Heart,
  BookOpen,
  GraduationCap,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMeta } from "@/hooks/useMeta";

const HERO_BG = "/images/hero-bg.jpg";
const CBT_IMG = "/images/cbt-illustration.jpg";
const TEST_BG = "/images/test-section-bg.jpg";
const DEPRESSION_IMG = "/images/blog-depression.jpg";
const ANXIETY_IMG = "/images/blog-anxiety.jpg";
const RGGU_IMG = "/images/rggu-building.jpg";
const ALEXANDRA_IMG = "/images/alexandra.jpg";

const EDUCATION = [
  {
    school: "РГГУ · Институт психологии им. Л. С. Выготского",
    program:
      "Специальная психология; практическая психология и консультирование. Диплом о высшем образовании.",
    year: "2013",
  },
  {
    school: "Институт психологии Smart",
    program:
      "Психолог-консультант с применением методов КПТ. Профессиональная переподготовка.",
    year: "2025",
  },
  {
    school: "СПб институт ДПО для психологов и психотерапевтов",
    program:
      "«КПТ второй и третьей волны: работа с эмоциями — от реструктуризации мышления до сострадания и принятия».",
    year: "2025",
  },
  {
    school: "СПб институт ДПО для психологов и психотерапевтов",
    program:
      "«Методы третьей волны КПТ при работе с травмой: ACT, схема-подход, CFT, DBT».",
    year: "2026",
  },
  {
    school: "OEAEP, Чехия",
    program:
      "Психология эмиграции, кросскультурная психология и консультирование. Международный диплом MBA.",
    year: "2026",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0, 0, 0.2, 1] as const,
    },
  }),
};

export default function Home() {
  useMeta({
    title: "Психолог Александра Федорова — помощь при тревоге и сниженном настроении",
    description:
      "Психолог Александра Федорова. Помощь при тревоге, апатии, последствиях травмы и высокой самокритике — методами КПТ, ACT и CFT. Онлайн-консультации, тесты Бека.",
    keywords:
      "психолог, сниженное настроение, апатия, тревога, КПТ, ACT, CFT, ПТСР, психология эмиграции, Александра Федорова, когнитивно-поведенческий подход, тест Бека, психолог онлайн",
    ogType: "website",
    ogImage: HERO_BG,
  });

  return (
    <div>
      {/* Hero — glass card over an atmospheric image */}
      <section className="relative -mt-[78px] min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-forest/70 via-forest/45 to-transparent" />
        </div>
        <div className="container relative z-10 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            className="glass-dark rounded-3xl p-8 md:p-12 max-w-2xl"
          >
            <motion.span
              custom={0}
              variants={fadeUp}
              className="eyebrow text-terracotta-light mb-5"
            >
              Психолог · КПТ · ACT · CFT
            </motion.span>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="text-cream leading-[1.08] mb-6 text-[clamp(2.4rem,5.5vw,4.25rem)]"
            >
              Бережная помощь
              <br />
              при <em className="italic text-terracotta-light">тревоге</em> и
              апатии
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-cream/85 text-lg md:text-xl leading-relaxed mb-9 max-w-xl font-light"
            >
              Помогаю справиться с тревогой, апатией и последствиями
              сложного опыта с помощью доказательных методов — КПТ, ACT и CFT.
            </motion.p>
            <motion.div
              custom={3}
              variants={fadeUp}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact">
                <Button className="rounded-full bg-terracotta hover:bg-terracotta-deep text-white px-8 py-6 text-base font-medium transition-transform duration-200 hover:-translate-y-0.5">
                  Записаться на консультацию
                </Button>
              </Link>
              <Link href="/test/depression">
                <Button
                  variant="outline"
                  className="rounded-full bg-cream/15 backdrop-blur border-cream/30 text-cream hover:bg-cream/25 hover:text-cream px-8 py-6 text-base transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Пройти тест
                </Button>
              </Link>
            </motion.div>
            <motion.p
              custom={4}
              variants={fadeUp}
              className="text-cream/65 text-sm mt-4"
            >
              Полноценная работа начинается с первой сессии.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Normalization — you are not alone */}
      <section className="pt-16 pb-2">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="glass-dark rounded-3xl p-8 md:p-12 max-w-3xl mx-auto text-center"
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-2xl md:text-3xl text-forest mb-4"
            >
              Если вы читаете это — вы уже сделали первый шаг
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-ink/90 text-lg leading-relaxed"
            >
              Просить о помощи — не слабость. Тревога и апатия — это
              состояния, с которыми сталкиваются миллионы людей, и они поддаются
              работе. Не нужно ждать, пока станет «совсем плохо», и не нужно
              справляться в одиночку.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About — portrait + glass panel */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
            {/* Portrait — glass "tray" (double-bezel) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="glass-dark rounded-3xl p-2 lg:p-2.5"
            >
              <div className="relative h-full min-h-[340px] rounded-[1.35rem] overflow-hidden">
                <img
                  src={ALEXANDRA_IMG}
                  alt="Психолог Александра Федорова"
                  className="w-full h-full object-cover object-[50%_26%]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/35 to-transparent px-5 pb-5 pt-16">
                  <p className="font-serif text-cream text-xl leading-tight">
                    Александра Федорова
                  </p>
                  <p className="text-cream/80 text-sm mt-1">
                    Психолог · КПТ · ACT · CFT
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Approach — glass panel */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="glass-dark rounded-3xl p-8 md:p-10"
            >
            <motion.div custom={0} variants={fadeUp}>
              <span className="eyebrow">О подходе</span>
              <h2 className="text-3xl md:text-4xl text-forest mt-4 mb-6">
                Научно обоснованная помощь при апатии и тревоге
              </h2>
            </motion.div>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="dropcap text-lg leading-relaxed text-ink/90 mb-6"
            >
              Когда то, что раньше радовало, давно не радует. Когда найти смыслы
              в жизни не так просто как раньше. Когда затяжная апатия не отпускает,
              а тревога мешает жить. Я работаю с доказательными методами —
              КПТ, ACT, CFT — и помогаю разобраться, что поддерживает ваше
              состояние, и вместе найти путь обратно к себе.
            </motion.p>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-lg leading-relaxed text-ink/90"
            >
              Это не просто разговоры. Это бережная, структурированная работа,
              которая помогает вернуть ясность и опору.
            </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What to expect — first session */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-10"
          >
            <motion.span
              custom={0}
              variants={fadeUp}
              className="eyebrow eyebrow-center"
            >
              Чего ожидать
            </motion.span>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="text-3xl md:text-4xl text-forest mt-4"
            >
              Как проходит первая сессия
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-ink/90 max-w-2xl mx-auto mt-4 text-lg"
            >
              Полноценная работа начинается с первого шага. Вы рассказываете, что
              вас беспокоит, в удобном темпе. Я слушаю, задаю уточняющие вопросы,
              и вместе намечаем, с чего начать.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                n: "01",
                t: "Разговор",
                d: "Вы рассказываете, что вас беспокоит, в удобном для вас темпе. Я слушаю и задаю уточняющие вопросы.",
              },
              {
                n: "02",
                t: "Что поддерживает",
                d: "Вместе смотрим, что поддерживает ваше состояние и какие методы могут помочь именно вам.",
              },
              {
                n: "03",
                t: "План",
                d: "Намечаем формат и первые шаги. Вы решаете, хотите ли продолжать.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                custom={i}
                variants={fadeUp}
                className="glass-dark rounded-2xl p-6"
              >
                <span className="font-serif text-2xl text-terracotta">
                  {s.n}
                </span>
                <h3 className="text-lg text-forest mt-2 mb-2">{s.t}</h3>
                <p className="text-ink/90 text-sm leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Methods — glass cards + framed image */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.span
              custom={0}
              variants={fadeUp}
              className="eyebrow eyebrow-center"
            >
              Методы работы
            </motion.span>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="text-3xl md:text-4xl text-forest mt-4"
            >
              Три доказательных подхода
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                custom={0}
                variants={fadeUp}
                className="glass-dark rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-forest to-forest-deep shadow-inner">
                    <Brain className="text-cream" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl text-forest mb-2">
                      Когнитивно-поведенческий подход (КПТ)
                    </h3>
                    <p className="text-ink/90 leading-relaxed">
                      КПТ помогает выявить и изменить негативные паттерны
                      мышления, которые поддерживают апатию и тревогу. Мы
                      работаем с автоматическими мыслями, убеждениями и
                      поведенческими стратегиями, формируя более адаптивные
                      способы реагирования.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                custom={1}
                variants={fadeUp}
                className="glass-dark rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-terracotta to-terracotta-light shadow-inner">
                    <Heart className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl text-forest mb-2">
                      Практика принятия и ответственности (ACT)
                    </h3>
                    <p className="text-ink/90 leading-relaxed">
                      ACT учит принимать сложные эмоции и мысли, не борясь с
                      ними, а направляя энергию на действия, соответствующие
                      вашим ценностям. Подход развивает психологическую гибкость
                      и помогает жить более осмысленно.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                custom={2}
                variants={fadeUp}
                className="glass-dark rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#6b9b76] to-[#4c785a] shadow-inner">
                    <Sprout className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl text-forest mb-2">
                      Подход, сфокусированный на сострадании (CFT)
                    </h3>
                    <p className="text-ink/90 leading-relaxed">
                      CFT помогает мягче относиться к себе: работать с
                      самокритикой, чувством вины и стыда, формировать ощущение
                      внутренней безопасности и эмоциональную устойчивость.
                      Особенно полезна тем, кто слишком требователен к себе.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden ring-1 ring-white/40 shadow-xl min-h-[320px]"
            >
              <img
                src={CBT_IMG}
                alt="Когнитивно-поведенческий подход"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education — dark glass panel */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="glass-dark rounded-3xl p-8 md:p-12 max-w-3xl mx-auto text-center overflow-hidden"
          >
            <img
              src={RGGU_IMG}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-10"
            />
            <div className="relative">
              <motion.div custom={0} variants={fadeUp}>
                <GraduationCap
                  className="mx-auto mb-4 text-terracotta-text"
                  size={40}
                />
                <span className="eyebrow eyebrow-center text-terracotta-text">
                  Образование
                </span>
              </motion.div>
              <motion.h2
                custom={1}
                variants={fadeUp}
                className="text-3xl md:text-4xl mt-4 mb-7 text-forest"
              >
                Образование и квалификация
              </motion.h2>
              <motion.div
                custom={2}
                variants={fadeUp}
                className="text-left space-y-5 max-w-xl mx-auto"
              >
                {EDUCATION.map((e, i) => (
                  <div
                    key={i}
                    className="border-l-2 border-terracotta-light/40 pl-4"
                  >
                    <p className="text-ink font-medium leading-snug">
                      {e.school}
                    </p>
                    <p className="text-ink/80 text-sm leading-relaxed mt-0.5">
                      {e.program}
                    </p>
                    <p className="text-terracotta-text text-sm font-serif italic mt-1">
                      {e.year}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tests CTA — image tiles */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={TEST_BG}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.span
              custom={0}
              variants={fadeUp}
              className="eyebrow eyebrow-center"
            >
              Самодиагностика
            </motion.span>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="text-3xl md:text-4xl text-forest mt-4 mb-4"
            >
              Пройдите тесты Бека онлайн
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-ink/90 max-w-2xl mx-auto text-lg"
            >
              Шкалы депрессии и тревоги Бека — признанные инструменты
              самодиагностики. Тесты анонимны, данные не сохраняются.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                href: "/test/depression",
                img: DEPRESSION_IMG,
                title: "Шкала депрессии Бека",
              },
              {
                href: "/test/anxiety",
                img: ANXIETY_IMG,
                title: "Шкала тревоги Бека",
              },
            ].map((t, i) => (
              <motion.div key={t.href} custom={i} variants={fadeUp}>
                <Link href={t.href} className="no-underline block group">
                  <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={t.img}
                      alt={t.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/90 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl text-cream mb-2">{t.title}</h3>
                      <p className="text-cream/80 text-sm mb-3">
                        21 вопрос &middot; 10 минут
                      </p>
                      <span className="inline-flex items-center gap-2 text-terracotta-light text-sm font-medium">
                        Пройти тест <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog preview — glass icon cards */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <motion.span custom={0} variants={fadeUp} className="eyebrow">
                Блог
              </motion.span>
              <motion.h2
                custom={1}
                variants={fadeUp}
                className="text-3xl md:text-4xl text-forest mt-4"
              >
                Полезные статьи
              </motion.h2>
            </div>
            <motion.div custom={2} variants={fadeUp} className="hidden md:block">
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="rounded-full border-forest text-forest hover:bg-forest hover:text-cream"
                >
                  Все статьи <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                slug: "chto-takoe-depressiya",
                title: "Сниженное настроение: как распознать и что делать",
                excerpt:
                  "Сниженное настроение — это не просто грусть. Узнайте, какие признаки указывают на то, что стоит обратиться за помощью.",
                icon: <BookOpen size={20} />,
              },
              {
                slug: "trevoga-norma-ili-rasstrojstvo",
                title: "Тревога: где граница между нормой и расстройством",
                excerpt:
                  "Тревога — естественная реакция организма. Но когда она становится хронической, это сигнал обратить на себя внимание.",
                icon: <Heart size={20} />,
              },
              {
                slug: "kak-kpt-pomogaet",
                title: "Как КПТ помогает при апатии и тревоге",
                excerpt:
                  "Когнитивно-поведенческий подход — один из самых изученных методов. Разбираемся, как он работает и чего ожидать от подхода.",
                icon: <Brain size={20} />,
              },
            ].map((article, i) => (
              <motion.div key={article.slug} custom={i} variants={fadeUp}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="no-underline block group h-full"
                >
                  <div className="glass-dark rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 h-full">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-cream bg-gradient-to-br from-forest to-forest-deep group-hover:from-terracotta group-hover:to-terracotta-light transition-colors">
                      {article.icon}
                    </div>
                    <h3 className="text-lg text-forest mb-3 group-hover:text-terracotta transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-ink/90 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/blog">
              <Button
                variant="outline"
                className="rounded-full border-forest text-forest hover:bg-forest hover:text-cream"
              >
                Все статьи <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — solid terracotta anchor panel */}
      <section className="py-12">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-terracotta rounded-3xl p-10 md:p-14 text-center shadow-lg"
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-3xl md:text-4xl text-white mb-4"
            >
              Готовы сделать первый шаг?
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-white/85 text-lg mb-8 max-w-xl mx-auto font-light"
            >
              Запишитесь на первую консультацию. Вместе мы найдём путь к вашему
              благополучию.
            </motion.p>
            <motion.div custom={2} variants={fadeUp}>
              <Link href="/contact">
                <Button className="rounded-full bg-forest hover:bg-forest-deep text-white px-10 py-6 text-base font-medium transition-transform duration-200 hover:-translate-y-0.5">
                  Связаться со мной
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
