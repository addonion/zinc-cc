import { Pic, ProjectPageProps } from "../../types";
import ImageGallery from "../../components/ImageGallery";
import JsonLd from "../../components/JsonLd";
import { fetchApi } from "../../lib/api";
import { getImageSource } from "../../lib/media";
import { SITE_URL, orgRef } from "../../lib/schema";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = [];
    let page = 1;
    let pageCount = 1;

    do {
      const response = await fetchApi<{
        data: Array<{ slug: string }>;
        meta: { pagination: { pageCount: number } };
      }>(`/api/projects?fields[0]=slug&pagination[pageSize]=100&pagination[page]=${page}`);

      for (const project of response.data) {
        slugs.push({ slug: project.slug });
      }

      pageCount = response.meta.pagination.pageCount;
      page += 1;
    } while (page <= pageCount);

    return slugs;
  } catch {
    return [];
  }
}

export async function generateMetadata(props: ProjectPageProps) {
  const { slug } = await props.params;
  const { data } = await getData(props);
  const title = `${data.title} — дизайн интерьера | ZINC`;
  const description = `Проект «${data.title}»: фото интерьера студии ZINC. Дизайн квартир и домов в Перми — смотрите портфолио и состав дизайн-проекта.`;
  const firstPic = getFirstGalleryPic(data.content);

  return {
    title,
    description,
    alternates: {
      canonical: `/portfolio-intereri/${slug}/`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      ...(firstPic && {
        images: [getImageSource(firstPic).src],
      }),
    },
  };
}

export default async function Project(props: ProjectPageProps) {
  const { slug } = await props.params;
  const { data } = await getData(props);
  const media = data.content;

  return (
    <div className="container mx-auto">
      <JsonLd data={getProjectSchema(slug, data.title, media)} />

      <div className="pagetitle text-center text-white py-24">
        <h1>{data.title}</h1>
      </div>

      {media.map((block: MediaBlock) => {
        if (block.__component === "media.gallery" && block.gallery) {
          return <Gallery key={block.id} data={block.gallery} />;
        }
        if (block.__component === "media.3-d-tour" && block.ftp) {
          return <Tour3D key={block.id} data={block.ftp} title={data.title} />;
        }
        return null;
      })}
    </div>
  );
}

type MediaBlock = {
  id: number;
  __component: string;
  gallery?: Pic[];
  ftp?: string;
};

const Tour3D = ({ data, title }: { data: string; title: string }) => {
  return (
    <iframe
      id="inlineFrameExample"
      title={`3D-тур: ${title}`}
      loading="lazy"
      className="pb-24 w-full h-screen"
      src={data}
    />
  );
};

const Gallery = ({ data }: { data: Pic[] }) => {
  const gallery = data.map((item) => item);
  return (
    <div className="columns-2 md:columns-3 xl:columns-4 pb-24">
      <ImageGallery gallery={gallery} />
    </div>
  );
};

function getProjectSchema(slug: string, title: string, content: MediaBlock[]) {
  const url = `${SITE_URL}/portfolio-intereri/${slug}/`;
  const images = content
    .flatMap((block) => (block.__component === "media.gallery" ? (block.gallery ?? []) : []))
    .slice(0, 12)
    .map((pic) => getImageSource(pic).src);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: title,
        url,
        inLanguage: "ru-RU",
        genre: "Дизайн интерьера",
        creator: orgRef,
        ...(images.length > 0 && { image: images }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Портфолио интерьеров",
            item: `${SITE_URL}/portfolio-intereri/`,
          },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      },
    ],
  };
}

function getFirstGalleryPic(content: MediaBlock[]) {
  for (const block of content) {
    if (block.__component === "media.gallery" && block.gallery?.[0]) {
      return block.gallery[0];
    }
  }
}

async function getData(props: ProjectPageProps) {
  const { slug } = await props.params;

  let listing: { data: Array<{ documentId: string }> };
  try {
    listing = await getPostId(slug);
  } catch {
    notFound();
  }

  if (!listing.data[0]) {
    notFound();
  }

  try {
    return await fetchApi<{ data: { title: string; content: MediaBlock[] } }>(
      `/api/projects/${listing.data[0].documentId}?populate=content.gallery`,
    );
  } catch {
    notFound();
  }
}

async function getPostId(slug: string) {
  return fetchApi<{ data: Array<{ documentId: string }> }>(
    `/api/projects?filters[slug][$eq]=${encodeURIComponent(slug)}`,
  );
}
