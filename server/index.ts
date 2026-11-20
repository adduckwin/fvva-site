import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { serveStaticSite } from "./static";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  serveStaticSite(app, staticPath);

  const port = Number(process.env.PORT || 3000);

  server.listen(port, process.env.HOST, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
