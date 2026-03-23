import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
// Self-hosted fonts (no Google Fonts dependency for Russia)
import "@fontsource/playfair-display/400.css";

import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/source-sans-3/300.css";
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/500.css";
import "@fontsource/source-sans-3/600.css";
import "@fontsource/source-sans-3/700.css";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 1000,
      // Don't refetch on window focus to reduce blocked requests
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

// Ensure React mounts even if other scripts fail
try {
  createRoot(document.getElementById("root")!).render(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  );
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
