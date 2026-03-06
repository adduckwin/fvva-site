/**
 * Home page — Editorial Design
 * Hero with Alexandra's photo, About section, Methods (CBT/ACT), Education, Tests CTA, Blog preview
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Heart, BookOpen, GraduationCap, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMeta } from "@/hooks/useMeta";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663384785665/3ShoP3Y4fpqCsCeNyB6Wwy/hero-bg-dXo9LMeWHMi9W5Mb64eQn8.webp";
const CBT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663384785665/3ShoP3Y4fpqCsCeNyB6Wwy/cbt-illustration-Vsva5MoBuVjgshu8Wn5TAx.webp";
const TEST_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663384785665/3ShoP3Y4fpqCsCeNyB6Wwy/test-section-bg-mbkAt6tMDaoBZKeZjwCtQL.webp";
const DEPRESSION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663384785665/3ShoP3Y4fpqCsCeNyB6Wwy/blog-depression-Pu5MMRsUqY9xHfEgrZPRfn.webp";
const ANXIETY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663384785665/3ShoP3Y4fpqCsCeNyB6Wwy/blog-anxiety-iMHxqrrbVmvhkS2gkZebNY.webp";
const RGGU_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663384785665/3ShoP3Y4fpqCsCeNyB6Wwy/rggu-building_df7c8ed6.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

export default function Home() {
  useMeta({
    title: "Психолог Александра Федорова — помощь при депрессии и тревоге",
    description: "Психолог Александра Федорова. Профессиональная помощь при депрессии и тревоге методами когнитивно-поведенческой терапии (КПТ) и терапии принятия и ответственности (ACT). Пройдите тесты Бека онлайн.",
    keywords: "психолог, депрессия, тревога, КПТ, ACT, Александра Федорова, когнитивно-поведенческая терапия, тест Бека, психолог онлайн",
    ogType: "website",
    ogImage: HERO_BG,
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A3C34]/90 via-[#1A3C34]/70 to-transparent" />
        </div>
        <div className="container relative z-10 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-[#C4785B] font-medium tracking-widest uppercase text-sm mb-4"
            >
              Психолог &middot; КПТ &middot; ACT
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#FDF8F0] leading-tight mb-6"
            >
              Александра
              <br />
              <span className="italic">Федорова</span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-[#FDF8F0]/85 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
            >
              Помогаю справиться с депрессией и тревогой с помощью
              доказательных методов — когнитивно-поведенческой терапии и
              терапии принятия и ответственности.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button className="bg-[#C4785B] hover:bg-[#B06A4F] text-white px-8 py-6 text-base font-medium">
                  Записаться на консультацию
                </Button>
              </Link>
              <Link href="/test/depression">
                <Button
                  variant="outline"
                  className="border-[#FDF8F0]/40 text-[#FDF8F0] hover:bg-[#FDF8F0]/10 px-8 py-6 text-base"
                >
                  Пройти тест
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About / Approach Section */}
      <section className="py-20 bg-[#FDF8F0]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl"
          >
            <motion.div custom={0} variants={fadeUp}>
              <span className="text-[#C4785B] font-medium tracking-widest uppercase text-sm">
                О подходе
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1A3C34] mt-3 mb-6">
                Научно обоснованная помощь при депрессии и тревоге
              </h2>
            </motion.div>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-lg leading-relaxed text-[#1A3C34]/80 mb-6"
            >
              Я работаю в рамках двух доказательных подходов — когнитивно-поведенческой
              терапии (КПТ) и терапии принятия и ответственности (ACT). Эти методы
              имеют обширную научную базу и признаны одними из наиболее эффективных
              при работе с депрессивными и тревожными расстройствами.
            </motion.p>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-lg leading-relaxed text-[#1A3C34]/80"
            >
              Моя задача — помочь вам понять механизмы, которые поддерживают
              ваше состояние, и вместе найти путь к более осознанной и
              наполненной жизни. Терапия — это не просто разговоры, это
              структурированная работа с мыслями, эмоциями и поведением.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Methods Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              custom={0}
              variants={fadeUp}
              className="text-[#C4785B] font-medium tracking-widest uppercase text-sm"
            >
              Методы работы
            </motion.span>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl md:text-4xl text-[#1A3C34] mt-3"
            >
              Два доказательных подхода
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div
                custom={0}
                variants={fadeUp}
                className="bg-[#FDF8F0] p-8 rounded-xl border border-[#1A3C34]/10"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#1A3C34] rounded-lg flex items-center justify-center shrink-0">
                    <Brain className="text-[#FDF8F0]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#1A3C34] mb-2">
                      Когнитивно-поведенческая терапия (КПТ)
                    </h3>
                    <p className="text-[#1A3C34]/70 leading-relaxed">
                      КПТ помогает выявить и изменить негативные паттерны мышления,
                      которые поддерживают депрессию и тревогу. Мы работаем с
                      автоматическими мыслями, убеждениями и поведенческими
                      стратегиями, постепенно формируя более адаптивные способы
                      реагирования на жизненные ситуации.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                custom={1}
                variants={fadeUp}
                className="bg-[#FDF8F0] p-8 rounded-xl border border-[#1A3C34]/10"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#C4785B] rounded-lg flex items-center justify-center shrink-0">
                    <Heart className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#1A3C34] mb-2">
                      Терапия принятия и ответственности (ACT)
                    </h3>
                    <p className="text-[#1A3C34]/70 leading-relaxed">
                      ACT учит принимать сложные эмоции и мысли, не борясь с ними,
                      а направляя энергию на действия, соответствующие вашим
                      ценностям. Этот подход помогает развить психологическую
                      гибкость и жить более осмысленной жизнью, даже когда
                      внутренний мир причиняет боль.
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
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={CBT_IMG}
                alt="Когнитивно-поведенческая терапия"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-[#1A3C34] text-[#FDF8F0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={RGGU_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div custom={0} variants={fadeUp}>
              <GraduationCap className="mx-auto mb-4 text-[#C4785B]" size={40} />
              <span className="text-[#C4785B] font-medium tracking-widest uppercase text-sm">
                Образование
              </span>
            </motion.div>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl md:text-4xl mt-3 mb-8"
            >
              Институт психологии им. Л.С. Выготского
            </motion.h2>
            <motion.div
              custom={2}
              variants={fadeUp}
              className="bg-[#FDF8F0]/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#FDF8F0]/10"
            >
              <p className="text-lg leading-relaxed mb-4">
                Высшее психологическое образование получено в Институте психологии
                имени Л.С. Выготского при Российском государственном гуманитарном
                университете (РГГУ).
              </p>
              <p className="text-[#C4785B] font-serif text-xl italic">
                2008 — 2013
              </p>
              <p className="text-[#FDF8F0]/70 mt-4 text-sm">
                Институт носит имя выдающегося советского психолога Льва Семёновича
                Выготского, чьи работы по культурно-исторической психологии оказали
                огромное влияние на развитие мировой психологической науки.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tests CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={TEST_BG} alt="" className="w-full h-full object-cover opacity-30" />
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
              className="text-[#C4785B] font-medium tracking-widest uppercase text-sm"
            >
              Самодиагностика
            </motion.span>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl md:text-4xl text-[#1A3C34] mt-3 mb-4"
            >
              Пройдите тесты Бека онлайн
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-[#1A3C34]/70 max-w-2xl mx-auto text-lg"
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
            <motion.div custom={0} variants={fadeUp}>
              <Link href="/test/depression" className="no-underline block group">
                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={DEPRESSION_IMG}
                    alt="Тест на депрессию"
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A3C34]/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-xl text-[#FDF8F0] mb-2">
                      Шкала депрессии Бека
                    </h3>
                    <p className="text-[#FDF8F0]/80 text-sm mb-3">
                      21 вопрос &middot; 10 минут
                    </p>
                    <span className="inline-flex items-center gap-2 text-[#C4785B] text-sm font-medium">
                      Пройти тест <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div custom={1} variants={fadeUp}>
              <Link href="/test/anxiety" className="no-underline block group">
                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={ANXIETY_IMG}
                    alt="Тест на тревогу"
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A3C34]/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-xl text-[#FDF8F0] mb-2">
                      Шкала тревоги Бека
                    </h3>
                    <p className="text-[#FDF8F0]/80 text-sm mb-3">
                      21 вопрос &middot; 10 минут
                    </p>
                    <span className="inline-flex items-center gap-2 text-[#C4785B] text-sm font-medium">
                      Пройти тест <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <motion.span
                custom={0}
                variants={fadeUp}
                className="text-[#C4785B] font-medium tracking-widest uppercase text-sm"
              >
                Блог
              </motion.span>
              <motion.h2
                custom={1}
                variants={fadeUp}
                className="font-serif text-3xl md:text-4xl text-[#1A3C34] mt-3"
              >
                Полезные статьи
              </motion.h2>
            </div>
            <motion.div custom={2} variants={fadeUp} className="hidden md:block">
              <Link href="/blog">
                <Button variant="outline" className="border-[#1A3C34] text-[#1A3C34] hover:bg-[#1A3C34] hover:text-[#FDF8F0]">
                  Все статьи <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                slug: "chto-takoe-depressiya",
                title: "Что такое депрессия и как её распознать",
                excerpt: "Депрессия — это не просто плохое настроение. Узнайте, какие симптомы указывают на депрессивное расстройство и когда стоит обратиться за помощью.",
                icon: <BookOpen size={20} />,
              },
              {
                slug: "trevoga-norma-ili-rasstrojstvo",
                title: "Тревога: где граница между нормой и расстройством",
                excerpt: "Тревога — естественная реакция организма. Но когда она становится хронической, это сигнал о необходимости обратить на себя внимание.",
                icon: <Heart size={20} />,
              },
              {
                slug: "kak-kpt-pomogaet",
                title: "Как КПТ помогает при депрессии и тревоге",
                excerpt: "Когнитивно-поведенческая терапия — один из самых изученных методов. Разбираемся, как она работает и чего ожидать от терапии.",
                icon: <Brain size={20} />,
              },
            ].map((article, i) => (
              <motion.div key={article.slug} custom={i} variants={fadeUp}>
                <Link href={`/blog/${article.slug}`} className="no-underline block group">
                  <div className="bg-[#FDF8F0] rounded-xl p-6 border border-[#1A3C34]/5 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="w-10 h-10 bg-[#1A3C34] rounded-lg flex items-center justify-center mb-4 text-[#FDF8F0] group-hover:bg-[#C4785B] transition-colors">
                      {article.icon}
                    </div>
                    <h3 className="font-serif text-lg text-[#1A3C34] mb-3 group-hover:text-[#C4785B] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[#1A3C34]/60 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/blog">
              <Button variant="outline" className="border-[#1A3C34] text-[#1A3C34]">
                Все статьи <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#C4785B]">
        <div className="container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="font-serif text-3xl md:text-4xl text-white mb-4"
            >
              Готовы сделать первый шаг?
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-white/85 text-lg mb-8 max-w-xl mx-auto"
            >
              Запишитесь на первую консультацию. Вместе мы найдём путь к вашему
              благополучию.
            </motion.p>
            <motion.div custom={2} variants={fadeUp}>
              <Link href="/contact">
                <Button className="bg-[#1A3C34] hover:bg-[#152F29] text-white px-10 py-6 text-base font-medium">
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
