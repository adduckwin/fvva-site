import { Heart, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function CrisisSupport({ urgent = false }: { urgent?: boolean }) {
  return (
    <div className="glass-dark rounded-2xl p-6 md:p-7 border-l-2 border-l-terracotta mb-8">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-terracotta/15 flex items-center justify-center shrink-0">
          <Heart className="text-terracotta" size={20} />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg text-forest mb-2">
            {urgent ? "Поддержка прямо сейчас" : "С кем обсудить результат"}
          </h3>
          <p className="text-ink/75 text-sm leading-relaxed mb-4">
            {urgent
              ? "Если вы уже причинили себе вред или чувствуете, что можете сделать это в ближайшее время, вызовите местную экстренную службу сейчас. Если можете, попросите человека рядом побыть с вами и помочь вызвать помощь."
              : "Если вам тяжело, можно обсудить своё состояние с врачом или психологом и вместе выбрать следующий шаг."}
          </p>
          {urgent ? (
            <p className="text-ink/80 text-sm leading-relaxed">
              Даже если сейчас вы в безопасности, расскажите об этих мыслях
              человеку, которому доверяете, и как можно скорее обратитесь к врачу
              или в местную службу психического здоровья.
            </p>
          ) : (
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta hover:bg-terracotta-deep text-white px-6 py-3 text-sm font-medium transition-colors no-underline active:scale-[0.98]"
            >
              Запись на консультацию
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
