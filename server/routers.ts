import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  blog: router({
    // Public: list published articles
    list: publicProcedure.query(async () => {
      return db.getAllArticles(true);
    }),

    // Public: get article by slug
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return db.getArticleBySlug(input.slug);
      }),

    // Admin: list all articles (including unpublished)
    adminList: adminProcedure.query(async () => {
      return db.getAllArticles(false);
    }),

    // Admin: create article
    create: adminProcedure
      .input(z.object({
        slug: z.string().min(1),
        title: z.string().min(1),
        excerpt: z.string().min(1),
        category: z.string().min(1),
        content: z.string().min(1),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        metaKeywords: z.string().optional(),
        image: z.string().optional(),
        published: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        await db.createArticle({
          slug: input.slug,
          title: input.title,
          excerpt: input.excerpt,
          category: input.category,
          content: input.content,
          metaTitle: input.metaTitle ?? null,
          metaDescription: input.metaDescription ?? null,
          metaKeywords: input.metaKeywords ?? null,
          image: input.image ?? null,
          published: input.published,
        });
        return { success: true };
      }),

    // Admin: update article
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        slug: z.string().min(1).optional(),
        title: z.string().min(1).optional(),
        excerpt: z.string().min(1).optional(),
        category: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        metaKeywords: z.string().optional(),
        image: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateArticle(id, data);
        return { success: true };
      }),

    // Admin: delete article
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteArticle(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
