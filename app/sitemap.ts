import type { MetadataRoute } from "next";
import { fetchApi } from "./lib/api";
import { SITE_URL } from "./lib/schema";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
  { url: `${SITE_URL}/portfolio-intereri/`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/dizajn-proekt/`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/contacts/`, changeFrequency: "yearly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [...staticRoutes, ...(await getProjectRoutes())];
}

async function getProjectRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const routes: MetadataRoute.Sitemap = [];
    let page = 1;
    let pageCount = 1;

    do {
      const response = await fetchApi<{
        data: Array<{ slug: string; updatedAt?: string }>;
        meta: { pagination: { pageCount: number } };
      }>(
        `/api/projects?fields[0]=slug&fields[1]=updatedAt&pagination[pageSize]=100&pagination[page]=${page}`,
      );

      for (const project of response.data) {
        routes.push({
          url: `${SITE_URL}/portfolio-intereri/${project.slug}/`,
          lastModified: parseDate(project.updatedAt),
          changeFrequency: "yearly",
          priority: 0.7,
        });
      }

      pageCount = response.meta.pagination.pageCount;
      page += 1;
    } while (page <= pageCount);

    return routes;
  } catch {
    return [];
  }
}

function parseDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? undefined : date;
}
