import { createRoot, hydrateRoot } from "react-dom/client";
import { Router } from "wouter";
import App from "./App";
import "./index.css";

// Ensure React mounts even if other scripts fail
try {
  const root = document.getElementById("root")!;
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  if (root.dataset.page === pathname) {
    hydrateRoot(root,
      <Router ssrPath={pathname}>
        <App />
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
      <div style="text-align:center;padding:60px 20px;font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;">
        <h1 style="font-family:system-ui,sans-serif;color:#292830;font-size:2rem;">Психолог Александра Федорова</h1>
        <p style="color:#292830;font-size:1.1rem;margin:20px 0;">Сайт временно недоступен. Пожалуйста, попробуйте позже.</p>
        <p style="margin:20px 0;"><a href="https://t.me/aleksa_fvva" style="color:#424b81;font-size:1.1rem;">Написать в Telegram</a></p>
        <button onclick="location.reload()" style="background:#292830;color:white;border:none;padding:12px 24px;border-radius:8px;cursor:pointer;font-size:1rem;">Обновить страницу</button>
      </div>
    `;
  }
}
