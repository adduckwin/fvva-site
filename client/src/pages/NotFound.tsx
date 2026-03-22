import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#FDF8F0]">
      <div className="text-center px-4">
        <p className="text-[#C4785B] font-medium tracking-widest uppercase text-sm mb-4">
          404
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-[#1A3C34] mb-4">
          Страница не найдена
        </h1>
        <p className="text-[#1A3C34]/60 mb-8 max-w-md mx-auto">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link href="/">
          <Button className="bg-[#1A3C34] hover:bg-[#152F29] text-[#FDF8F0]">
            <ArrowLeft size={16} className="mr-2" /> На главную
          </Button>
        </Link>
      </div>
    </div>
  );
}
