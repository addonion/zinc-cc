import { Pic, Project } from "../types";
import { fetchApi, getApiUrl } from "../lib/api";
import Link from "next/link";
import styles from "./style.module.css";
import { getResponsiveImageProps, normalizePic } from "../lib/media";
import { SITE_URL, defaultOpenGraph, getProjectPath } from "../lib/schema";

export async function generateMetadata() {
  const title = "Портфолио дизайна интерьера в Перми — квартиры и дома";
  const description = "Портфолио студии дизайна интерьера ZINC в Перми: реализованные проекты квартир и домов. Смотрите интерьеры, созданные нашей командой.";

  return {
    title,
    description,
    alternates: {
      canonical: "/portfolio-intereri/",
    },
    openGraph: {
      ...defaultOpenGraph,
      title,
      description,
      url: `${SITE_URL}/portfolio-intereri/`,
    },
  };
}

export default async function Portfolio() {
  const { data } = await getData();

  return (
    <div className="container mx-auto">
      <div className="pagetitle text-center text-white py-24">
        <h1>Портфолио интерьеров — Пермь</h1>
        <div>
          <b>работы, полные уюта</b>
        </div>
      </div>

      {data.map((project: Project, projectIndex) => {
        const randomGallery = getPreviewGallery(project);

        return (
          <div key={project.id} className="mx-auto mb-24">
            <h2 className="mb-6 text-center text-white">
              <Link href={getProjectPath(project.slug)}>{project.title}</Link>
            </h2>
            <div className="overflow-hidden h-[60vh]">
              <div className="columns-2 md:columns-3 xl:columns-4">
                {randomGallery.map((pic, index) => {
                  if (!pic) {
                    return null
                  }
                  const image = getResponsiveImageProps(pic);

                  return (
                    <Link href={getProjectPath(project.slug)} key={pic.hash}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- CMS supplies responsive image files. */}
                      <img
                        {...image}
                        alt={pic.alternativeText?.trim() ? pic.alternativeText : `${project.title} — фото ${index + 1}`}
                        className="mb-4"
                        loading={projectIndex === 0 && index === 0 ? "eager" : "lazy"}
                        fetchPriority={projectIndex === 0 && index === 0 ? "high" : undefined}
                      />
                    </Link>
                  )
                })}
              </div>
            </div>

            <Link href={getProjectPath(project.slug)} className={`${styles.more} text-center text-lg text-white`}>
              Смотреть весь проект
            </Link>
          </div>
        );
      })}
    </div>
  );
}

async function getData() {
  const data: Project[] = [];
  const base = getApiUrl("/");
  let page = 1;
  let pageCount = 1;

  do {
    const response = await fetchApi<{
      data: Project[];
      meta: { pagination: { pageCount: number } };
    }>(`/api/projects?populate=content.gallery&filters[slug][$ne]=qwe&pagination[pageSize]=25&pagination[page]=${page}`);

    data.push(...response.data);
    pageCount = response.meta.pagination.pageCount;
    page += 1;
  } while (page <= pageCount);

  return {
    data: data.map((project) => ({
      ...project,
      content: project.content.map((block) => block.gallery ? {
        ...block,
        gallery: block.gallery.map((pic) => normalizePic(pic, base)),
      } : block),
    })),
  };
}

function getPreviewGallery(project: Project) {
  const gallery = project.content[0].gallery;

  return [...gallery]
    .sort((a, b) => seededScore(project.slug, a.hash) - seededScore(project.slug, b.hash))
    .slice(0, 9);
}

function seededScore(seed: string, value: Pic["hash"]) {
  const source = `${seed}:${value}`;
  let hash = 0;

  for (let i = 0; i < source.length; i++) {
    hash = (hash * 31 + source.charCodeAt(i)) >>> 0;
  }

  return hash;
}
