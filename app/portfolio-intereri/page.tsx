import { Pic, Project } from "../types";
import { fetchApi } from "../lib/api";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";
import { getImageSource } from "../lib/media";

export async function generateMetadata() {
  return {
    title: "Портфолио: Интерьеры созданные в студии",
    description: "У нас богатое портфолио работ в области дизайна интерьера, есть и классические работы, но больше мы склоняемся к современному стилю.",
  };
}

export default async function Portfolio() {
  const { data } = await getData();

  return (
    <div className="container mx-auto">
      <div className="pagetitle text-center text-white py-24">
        <h1>Портфолио</h1>
        <div>
          <b>работы, полные уюта</b>
        </div>
      </div>

      {data.map((project: Project) => {
        const randomGallery = getPreviewGallery(project);

        return (
          <div key={project.id} className="mx-auto mb-24">
            <h2 className="mb-6 text-center text-white">
              <Link href={`/portfolio-intereri/${project.slug}/`}>{project.title}</Link>
            </h2>
            <div className="overflow-hidden h-[60vh]">
              <div className="columns-2 md:columns-3 xl:columns-4">
                {randomGallery.map((pic) => {
                  if (!pic) {
                    return null
                  }
                  const image = getImageSource(pic, ["medium", "small", "thumbnail"]);

                  return (
                    <Link href={`/portfolio-intereri/${project.slug}/`} key={pic.hash}>
                      <Image
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt={pic.alternativeText || project.title}
                        className="mb-4"
                      />
                    </Link>
                  )
                })}
              </div>
            </div>

            <Link href={`/portfolio-intereri/${project.slug}/`} className={`${styles.more} text-center text-lg text-white`}>
              Смотреть весь проект
            </Link>
          </div>
        );
      })}
    </div>
  );
}

async function getData() {
  return fetchApi<{ data: Project[] }>("/api/projects?populate=content.gallery");
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
