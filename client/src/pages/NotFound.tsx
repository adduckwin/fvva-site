import "./secondary-pages.css";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useMeta } from "@/hooks/useMeta";

export default function NotFound() {
  useMeta({ title: "Страница не найдена", robots: "noindex,nofollow" });
  return (
    <div className="secondary-page min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl text-forest mb-4">
          Страница не найдена
        </h1>
        <p className="text-ink/65 mb-8 max-w-md mx-auto">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        <Button asChild className="secondary-action">
          <Link href="/">
            <ArrowLeft size={16} className="mr-2" /> На главную
          </Link>
        </Button>
      </div>
    </div>
  );
}
