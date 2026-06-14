/**
 * CrisisSupport — спокойный поддерживающий блок для тяжёлых результатов тестов
 * и при ненулевом ответе на пункт о тяжёлых мыслях.
 * Без телефонов: мягкое сообщение и прямая ссылка на связь с Александрой.
 */
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function CrisisSupport() {
  return (
    <div className="glass-dark rounded-2xl p-6 md:p-7 border-l-2 border-l-terracotta mb-8">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-terracotta/15 flex items-center justify-center shrink-0">
          <Heart className="text-terracotta" size={20} />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg text-forest mb-2">
            Вам сейчас тяжело — и вы не одни
          </h3>
          <p className="text-ink/75 text-sm leading-relaxed mb-4">
            То, что вы чувствуете, — это состояние, а не вы, и оно может меняться.
            Не обязательно переносить это в одиночку — можно написать Александре,
            и она ответит.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta hover:bg-terracotta-deep text-white px-6 py-3 text-sm font-medium transition-colors no-underline active:scale-[0.98]"
          >
            Написать Александре
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
