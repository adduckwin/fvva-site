import { AnimatePresence } from "framer-motion";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "../client/src/App";
import { PrerenderMeta, type PageHead } from "../client/src/hooks/useMeta";
import { publicPaths, sitemap } from "./public-paths";
import { SITE_ORIGIN } from "../shared/const";

function Head({ title, canonical, name, property }: PageHead) {
  return <>
    <title>{title}</title>
    {canonical === SITE_ORIGIN + "/" && <>
      <meta name="google-site-verification" content="gTejAmDgFXA-K8FQnNupahrW1K3y2mQquNLIxy1Tvss" />
      <meta name="yandex-verification" content="7ad7ffe81607f17b" />
    </>}
    {canonical && <link rel="canonical" href={canonical} />}
    {Object.entries(name).map(([key, content]) =>
      content && <meta key={key} name={key} content={content} />
    )}
    {Object.entries(property).map(([key, content]) =>
      content && <meta key={key} property={key} content={content} />
    )}
  </>;
}

function renderPage(template: string, path: string) {
  let metadata: PageHead | undefined;
  const body = renderToString(
    <PrerenderMeta.Provider value={head => { metadata = head; }}>
      <Router ssrPath={path}>
        <AnimatePresence initial={false}><App /></AnimatePresence>
      </Router>
    </PrerenderMeta.Provider>,
  );
  if (body.includes("<!--$?-->") || body.includes("<!--$!-->")) {
    throw new Error(`Prerender left a client-only Suspense fallback on ${path}`);
  }
  if (!metadata || !body.includes("<h1")) throw new Error(`No page content or metadata for ${path}`);
  if (path !== "/404" && metadata.canonical !== SITE_ORIGIN + path) {
    throw new Error(`Route does not have its own canonical URL: ${path}`);
  }
  const notice = path.startsWith("/test/") || path === "/proverit-sebya"
    ? '<noscript><p class="container py-4">Чтобы ответить на вопросы и получить результат, включите JavaScript в браузере.</p></noscript>'
    : "";
  const head = renderToStaticMarkup(<Head {...metadata} />);
  return template
    .replace(/<title>.*?<\/title>/, () => head)
    .replace('<div id="root"></div>', () => `${notice}<div id="root" data-page="${path}">${body}</div>`);
}

export function staticDocuments(template: string) {
  if (!template.includes('<div id="root"></div>')) throw new Error("Missing app root in HTML template");
  const files = [];
  for (const path of [...publicPaths, "/404"]) {
    files.push({
      fileName: path === "/" ? "index.html" : `${path.slice(1)}.html`,
      source: renderPage(template, path),
    });
  }
  files.push({ fileName: "sitemap.xml", source: sitemap });
  return files;
}
