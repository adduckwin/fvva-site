/**
 * Admin page — Static mode stub
 * Backend is not available in static deployment.
 * Shows a friendly message and redirects to home.
 */
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useMeta } from "@/hooks/useMeta";

export default function Admin() {
  useMeta({ title: "Админ-панель" });

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FDF8F0]">
      <div className="text-center max-w-md mx-auto p-8">
        <Shield className="mx-auto mb-4 text-[#1A3C34]" size={48} />
        <h1 className="font-serif text-3xl text-[#1A3C34] mb-4">
          Админ-панель
        </h1>
        <p className="text-[#1A3C34]/70 mb-8">
          Админ-панель недоступна в текущем режиме работы сайта.
          Статьи блога обновляются через код проекта.
        </p>
        <Link href="/">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1A3C34] text-white hover:bg-[#152F29] transition-colors cursor-pointer">
            <ArrowLeft size={16} />
            На главную
          </button>
        </Link>
      </div>
    </div>
  );
}
