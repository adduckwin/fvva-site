import { createRoot, hydrateRoot } from "react-dom/client";
import { AnimatePresence } from "framer-motion";
import { Router } from "wouter";
import App from "./App";
// Self-hosted fonts (no Google Fonts dependency for Russia)
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/source-sans-3/300.css";
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/500.css";
import "@fontsource/source-sans-3/600.css";
import "@fontsource/source-sans-3/700.css";
import "./index.css";

// Ensure React mounts even if other scripts fail
try {
  const root = document.getElementById("root")!;
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  if (root.dataset.page === pathname) {
    hydrateRoot(root,
      <Router ssrPath={pathname}>
        <AnimatePresence initial={false}><App /></AnimatePresence>
      </Router>
    );
  } else {
    // Development and unknown URLs served by the static 404 handler.
    createRoot(root).render(<App />);
  }
} catch (e) {
  console.error("[App Mount Error]", e);
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <div style="text-align:center;padding:60px 20px;font-family:'Source Sans 3',sans-serif;max-width:600px;margin:0 auto;">
        <h1 style="font-family:'Playfair Display',serif;color:#1A3C34;font-size:2rem;">Психолог Александра Федорова</h1>
        <p style="color:#1A3C34;font-size:1.1rem;margin:20px 0;">Сайт временно недоступен. Пожалуйста, попробуйте позже.</p>
        <p style="margin:20px 0;"><a href="https://t.me/aleksa_fvva" style="color:#C4785B;font-size:1.1rem;">Написать в Telegram</a></p>
        <button onclick="location.reload()" style="background:#1A3C34;color:white;border:none;padding:12px 24px;border-radius:8px;cursor:pointer;font-size:1rem;">Обновить страницу</button>
      </div>
    `;
  }
}
