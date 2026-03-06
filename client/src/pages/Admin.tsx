/**
 * Admin page — Blog management for Aleksandra
 * Protected by admin role check. Only accessible after Manus OAuth login.
 */
import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  LogIn,
  ArrowLeft,
  Save,
  X,
  Loader2,
  Shield,
} from "lucide-react";
import { Link } from "wouter";
import { useMeta } from "@/hooks/useMeta";

type ArticleForm = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  image: string;
  published: boolean;
};

const emptyForm: ArticleForm = {
  slug: "",
  title: "",
  excerpt: "",
  category: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  image: "",
  published: true,
};

export default function Admin() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [editMode, setEditMode] = useState<"list" | "create" | "edit">("list");
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<ArticleForm>(emptyForm);

  useMeta({ title: "Админ-панель блога" });

  const isAdmin = user?.role === "admin";

  const {
    data: articles,
    isLoading: articlesLoading,
    refetch,
  } = trpc.blog.adminList.useQuery(undefined, {
    enabled: isAdmin,
    retry: false,
  });

  const createMutation = trpc.blog.create.useMutation({
    onSuccess: () => {
      toast.success("Статья создана");
      setEditMode("list");
      setForm(emptyForm);
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Статья обновлена");
      setEditMode("list");
      setForm(emptyForm);
      setEditId(null);
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => {
      toast.success("Статья удалена");
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSubmit = () => {
    if (!form.title || !form.slug || !form.content || !form.excerpt || !form.category) {
      toast.error("Заполните обязательные поля: заголовок, slug, отрывок, категория, содержание");
      return;
    }

    if (editMode === "create") {
      createMutation.mutate({
        ...form,
        metaTitle: form.metaTitle || undefined,
        metaDescription: form.metaDescription || undefined,
        metaKeywords: form.metaKeywords || undefined,
        image: form.image || undefined,
      });
    } else if (editMode === "edit" && editId !== null) {
      updateMutation.mutate({
        id: editId,
        ...form,
        metaTitle: form.metaTitle || undefined,
        metaDescription: form.metaDescription || undefined,
        metaKeywords: form.metaKeywords || undefined,
        image: form.image || undefined,
      });
    }
  };

  const handleEdit = (article: NonNullable<typeof articles>[number]) => {
    setForm({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      content: article.content,
      metaTitle: article.metaTitle || "",
      metaDescription: article.metaDescription || "",
      metaKeywords: article.metaKeywords || "",
      image: article.image || "",
      published: article.published,
    });
    setEditId(article.id);
    setEditMode("edit");
  };

  const handleDelete = (id: number, title: string) => {
    if (confirm(`Удалить статью "${title}"?`)) {
      deleteMutation.mutate({ id });
    }
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[а-яё]/gi, (char) => {
        const map: Record<string, string> = {
          а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo",
          ж: "zh", з: "z", и: "i", й: "j", к: "k", л: "l", м: "m",
          н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
          ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "shch",
          ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
        };
        return map[char.toLowerCase()] || char;
      })
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // Auto-generate slug when title changes in create mode
  useEffect(() => {
    if (editMode === "create" && form.title) {
      setForm((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
    }
  }, [form.title, editMode]);

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#FDF8F0]">
        <Loader2 className="animate-spin text-[#1A3C34]" size={40} />
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#FDF8F0]">
        <div className="text-center max-w-md mx-auto p-8">
          <Shield className="mx-auto mb-4 text-[#1A3C34]" size={48} />
          <h1 className="font-serif text-3xl text-[#1A3C34] mb-4">
            Вход в админ-панель
          </h1>
          <p className="text-[#1A3C34]/70 mb-8">
            Для управления блогом необходимо войти в систему.
          </p>
          <a href={getLoginUrl()}>
            <Button className="bg-[#1A3C34] hover:bg-[#152F29] text-white px-8 py-5">
              <LogIn size={18} className="mr-2" /> Войти
            </Button>
          </a>
        </div>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#FDF8F0]">
        <div className="text-center max-w-md mx-auto p-8">
          <Shield className="mx-auto mb-4 text-red-500" size={48} />
          <h1 className="font-serif text-3xl text-[#1A3C34] mb-4">
            Доступ запрещён
          </h1>
          <p className="text-[#1A3C34]/70 mb-8">
            У вас нет прав для доступа к админ-панели. Эта страница доступна
            только для администратора сайта.
          </p>
          <Link href="/">
            <Button className="bg-[#1A3C34] hover:bg-[#152F29] text-white">
              <ArrowLeft size={16} className="mr-2" /> На главную
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Editor form
  if (editMode === "create" || editMode === "edit") {
    const isSaving = createMutation.isPending || updateMutation.isPending;
    return (
      <div className="bg-[#FDF8F0] min-h-screen">
        <div className="bg-[#1A3C34] py-6">
          <div className="container max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setEditMode("list");
                  setForm(emptyForm);
                  setEditId(null);
                }}
                className="text-[#FDF8F0]/60 hover:text-[#FDF8F0] transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="font-serif text-xl text-[#FDF8F0]">
                {editMode === "create" ? "Новая статья" : "Редактирование статьи"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setEditMode("list");
                  setForm(emptyForm);
                  setEditId(null);
                }}
                className="text-[#FDF8F0]/60 hover:text-[#FDF8F0] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="container max-w-4xl mx-auto py-8">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <Label className="text-[#1A3C34] font-medium">Заголовок *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Заголовок статьи"
                className="mt-1 bg-white border-[#1A3C34]/20 focus:border-[#C4785B]"
              />
            </div>

            {/* Slug */}
            <div>
              <Label className="text-[#1A3C34] font-medium">Slug (URL) *</Label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="url-statyi"
                className="mt-1 bg-white border-[#1A3C34]/20 focus:border-[#C4785B] font-mono text-sm"
              />
            </div>

            {/* Category */}
            <div>
              <Label className="text-[#1A3C34] font-medium">Категория *</Label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Депрессия, Тревога, Повседневная жизнь..."
                className="mt-1 bg-white border-[#1A3C34]/20 focus:border-[#C4785B]"
              />
            </div>

            {/* Excerpt */}
            <div>
              <Label className="text-[#1A3C34] font-medium">Краткое описание *</Label>
              <Textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Краткое описание для карточки статьи"
                rows={3}
                className="mt-1 bg-white border-[#1A3C34]/20 focus:border-[#C4785B]"
              />
            </div>

            {/* Content */}
            <div>
              <Label className="text-[#1A3C34] font-medium">
                Содержание * (Markdown)
              </Label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="## Заголовок&#10;&#10;Текст статьи в формате Markdown..."
                rows={20}
                className="mt-1 bg-white border-[#1A3C34]/20 focus:border-[#C4785B] font-mono text-sm"
              />
            </div>

            {/* Image URL */}
            <div>
              <Label className="text-[#1A3C34] font-medium">URL изображения</Label>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
                className="mt-1 bg-white border-[#1A3C34]/20 focus:border-[#C4785B]"
              />
            </div>

            {/* SEO Section */}
            <div className="border-t border-[#1A3C34]/10 pt-6">
              <h3 className="font-serif text-lg text-[#1A3C34] mb-4">
                SEO мета-теги
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-[#1A3C34]/70 text-sm">Meta Title</Label>
                  <Input
                    value={form.metaTitle}
                    onChange={(e) =>
                      setForm({ ...form, metaTitle: e.target.value })
                    }
                    placeholder="SEO заголовок страницы"
                    className="mt-1 bg-white border-[#1A3C34]/20 focus:border-[#C4785B]"
                  />
                </div>
                <div>
                  <Label className="text-[#1A3C34]/70 text-sm">
                    Meta Description
                  </Label>
                  <Textarea
                    value={form.metaDescription}
                    onChange={(e) =>
                      setForm({ ...form, metaDescription: e.target.value })
                    }
                    placeholder="SEO описание страницы"
                    rows={2}
                    className="mt-1 bg-white border-[#1A3C34]/20 focus:border-[#C4785B]"
                  />
                </div>
                <div>
                  <Label className="text-[#1A3C34]/70 text-sm">
                    Meta Keywords
                  </Label>
                  <Input
                    value={form.metaKeywords}
                    onChange={(e) =>
                      setForm({ ...form, metaKeywords: e.target.value })
                    }
                    placeholder="ключевое слово 1, ключевое слово 2"
                    className="mt-1 bg-white border-[#1A3C34]/20 focus:border-[#C4785B]"
                  />
                </div>
              </div>
            </div>

            {/* Published toggle */}
            <div className="flex items-center gap-3 border-t border-[#1A3C34]/10 pt-6">
              <Switch
                checked={form.published}
                onCheckedChange={(checked) =>
                  setForm({ ...form, published: checked })
                }
              />
              <Label className="text-[#1A3C34] font-medium">Опубликовано</Label>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleSubmit}
                disabled={isSaving}
                className="bg-[#1A3C34] hover:bg-[#152F29] text-white px-8 py-5"
              >
                {isSaving ? (
                  <Loader2 size={18} className="animate-spin mr-2" />
                ) : (
                  <Save size={18} className="mr-2" />
                )}
                {editMode === "create" ? "Создать статью" : "Сохранить изменения"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEditMode("list");
                  setForm(emptyForm);
                  setEditId(null);
                }}
                className="border-[#1A3C34]/20 text-[#1A3C34]"
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Articles list
  return (
    <div className="bg-[#FDF8F0] min-h-screen">
      <div className="bg-[#1A3C34] py-6">
        <div className="container max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-[#FDF8F0]">
              Управление блогом
            </h1>
            <p className="text-[#FDF8F0]/60 text-sm mt-1">
              {user?.email || user?.name}
            </p>
          </div>
          <Button
            onClick={() => setEditMode("create")}
            className="bg-[#C4785B] hover:bg-[#B06A4F] text-white"
          >
            <Plus size={18} className="mr-2" /> Новая статья
          </Button>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto py-8">
        {articlesLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#1A3C34]" size={40} />
          </div>
        ) : !articles || articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#1A3C34]/60 text-lg mb-4">
              Статей пока нет. Создайте первую!
            </p>
            <Button
              onClick={() => setEditMode("create")}
              className="bg-[#1A3C34] text-white"
            >
              <Plus size={18} className="mr-2" /> Создать статью
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl p-6 border border-[#1A3C34]/5 flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#C4785B] text-xs font-medium tracking-wider uppercase">
                      {article.category}
                    </span>
                    {!article.published && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                        Черновик
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg text-[#1A3C34] mb-1">
                    {article.title}
                  </h3>
                  <p className="text-[#1A3C34]/50 text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                  <p className="text-[#1A3C34]/30 text-xs mt-2 font-mono">
                    /blog/{article.slug}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(article)}
                    className="p-2 text-[#1A3C34]/50 hover:text-[#1A3C34] hover:bg-[#1A3C34]/5 rounded-lg transition-colors"
                    title="Редактировать"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id, article.title)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Удалить"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
