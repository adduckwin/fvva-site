import { SITE_ORIGIN } from "@shared/const";
import { CONTACT_LINKS } from "@/lib/practice";
import type { Article } from "@/lib/articles";

const practitioner = {
  "@type": "Person",
  "@id": SITE_ORIGIN + "/#alexandra-fedorova",
  name: "Александра Федорова",
  jobTitle: "Психолог",
  url: SITE_ORIGIN + "/",
};

function JsonLd({ value }: { value: object }) {
  const json = JSON.stringify(value).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function PractitionerSchema() {
  return <JsonLd value={{
    "@context": "https://schema.org",
    ...practitioner,
    image: SITE_ORIGIN + "/images/alexandra.jpg",
    sameAs: [CONTACT_LINKS.vk],
    alumniOf: { "@type": "EducationalOrganization", name: "РГГУ, Институт психологии им. Л. С. Выготского" },
  }} />;
}

export function ArticleSchema({ article, image }: { article: Article; image?: string }) {
  const url = SITE_ORIGIN + "/blog/" + article.slug;
  return <JsonLd value={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": url + "#article",
        mainEntityOfPage: url,
        headline: article.title,
        description: article.excerpt,
        articleSection: article.category,
        inLanguage: "ru",
        publisher: practitioner,
        image: image ? new URL(image, SITE_ORIGIN).href : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Статьи", item: SITE_ORIGIN + "/blog" },
          { "@type": "ListItem", position: 2, name: article.title, item: url },
        ],
      },
    ],
  }} />;
}
