import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "sashandra.91@mail.ru",
      name: "Александра Федорова",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createAnonContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("blog router", () => {
  it("public list endpoint is accessible without auth", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    // Should not throw - public endpoint
    const result = await caller.blog.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("public getBySlug endpoint is accessible without auth", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.blog.getBySlug({ slug: "nonexistent-slug" });
    // Should return undefined for non-existent slug, not throw
    expect(result).toBeUndefined();
  });

  it("adminList rejects non-admin users", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.blog.adminList()).rejects.toThrow();
  });

  it("adminList rejects anonymous users", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.blog.adminList()).rejects.toThrow();
  });

  it("create rejects non-admin users", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.blog.create({
        slug: "test",
        title: "Test",
        excerpt: "Test",
        category: "Test",
        content: "Test content",
        published: true,
      })
    ).rejects.toThrow();
  });

  it("delete rejects non-admin users", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.blog.delete({ id: 1 })).rejects.toThrow();
  });

  it("adminList is accessible for admin users", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.blog.adminList();
    expect(Array.isArray(result)).toBe(true);
  });
});
