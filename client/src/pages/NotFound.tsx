import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useMeta } from "@/hooks/useMeta";

export default function NotFound() {
  useMeta({ title: "Страница не найдена", robots: "noindex,nofollow" });
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="glass-dark rounded-3xl p-10 md:p-12 text-center max-w-md mx-auto">
        <p className="eyebrow eyebrow-center mb-4">404</p>
        <h1 className="text-3xl md:text-4xl text-forest mb-4">
          Страница не найдена
        </h1>
        <p className="text-ink/65 mb-8 max-w-md mx-auto">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link href="/">
          <Button className="rounded-full bg-forest hover:bg-forest-deep text-cream">
            <ArrowLeft size={16} className="mr-2" /> На главную
          </Button>
        </Link>
      </div>
    </div>
  );
}
