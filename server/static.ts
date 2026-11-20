import express, { type Express, type RequestHandler } from "express";
import { stat } from "node:fs/promises";
import path from "node:path";

/** Serve the same extensionless, prebuilt pages as the public Nginx site. */
export function serveStaticSite(app: Express, root: string) {
  const notFound: RequestHandler = (_req, res) => {
    res.status(404).set("Cache-Control", "no-cache").sendFile(path.join(root, "404.html"));
  };

  app.get(["/404", "/404.html"], notFound);
  app.get("/index", (req, res) => res.redirect(301, "/" + req.originalUrl.slice(req.path.length)));
  app.get(/^\/((?:[a-z0-9-]+\/)*[a-z0-9-]+)(?:\.html|\/)$/, async (req, res, next) => {
    const slug = req.params[0];
    try {
      if (!(await stat(path.join(root, slug + ".html"))).isFile()) return next();
      const query = req.originalUrl.slice(req.path.length);
      res.redirect(301, (slug === "index" ? "/" : "/" + slug) + query);
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") return next();
      next(error);
    }
  });
  app.use(express.static(root, { redirect: false }));

  // /blog is both a page (blog.html) and the directory of individual articles.
  app.get(/^\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\/?$/, (req, res, next) => {
    const page = req.path.slice(1).replace(/\/$/, "") + ".html";
    res.sendFile(page, { root }, (error) => {
      if (error) next("status" in error && error.status === 404 ? undefined : error);
    });
  });
  app.use(notFound);
}
