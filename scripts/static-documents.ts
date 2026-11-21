import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import type { Plugin } from "vite";
import { sitemap } from "./public-paths";

export function staticDocumentsPlugin(projectRoot: string): Plugin {
  return {
    name: "fvva-static-documents",
    enforce: "post",
    configureServer(server) {
      server.middlewares.use("/sitemap.xml", (_req, res) => {
        res.setHeader("Content-Type", "application/xml; charset=utf-8");
        res.end(sitemap);
      });
    },
    async generateBundle(_, bundle) {
      const index = bundle["index.html"];
      if (!index || index.type !== "asset") throw new Error("Missing generated index.html");
      // Build a Node-only renderer with the same JSX and aliases as the site.
      // The temporary module is only used during the build.
      const scratch = await mkdtemp(path.join(tmpdir(), "fvva-render-"));
      try {
        const renderer = path.join(scratch, "render-pages.cjs");
        await build({
          absWorkingDir: projectRoot,
          entryPoints: ["scripts/render-pages.tsx"],
          outfile: renderer,
          bundle: true,
          platform: "node",
          // Vite already bundled the browser styles and their public assets.
          loader: { ".css": "empty" },
          format: "cjs",
          jsx: "automatic",
          tsconfig: "tsconfig.json",
          define: { "process.env.NODE_ENV": '"production"', "import.meta.env.SSR": "true" },
        });
        const { staticDocuments } = createRequire(import.meta.url)(renderer) as {
          staticDocuments(template: string): { fileName: string; source: string }[];
        };
        for (const file of staticDocuments(String(index.source))) {
          if (file.fileName === "index.html") index.source = file.source;
          else this.emitFile({ type: "asset", ...file });
        }
      } finally {
        await rm(scratch, { recursive: true, force: true });
      }
    },
  };
}
