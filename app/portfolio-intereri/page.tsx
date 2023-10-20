import { Project } from "../@types";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

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
        /** Достаём галерею из проекта */
        let gallery = project.attributes.content[0].gallery.data.map((item) => item.attributes);

        /** Берём 14 рандомных изображений */
        let randomGallery = [];
        for (let i = 0; i < 9; i++) {
          let randomIndex = Math.floor(Math.random() * gallery.length);
          randomGallery.push(gallery[randomIndex]);
          gallery.splice(randomIndex, 1);
        }

        return (
          <div key={project.id} className="mx-auto mb-24">
            <h2 className="mb-6 text-center text-white">
              <Link href={`/portfolio-intereri/${project.attributes.slug}/`}>{project.attributes.title}</Link>
            </h2>
            <div className="overflow-hidden h-[60vh]">
              <div className="columns-2 md:columns-3 xl:columns-4">
                {randomGallery.map((pic) => {
                  return (
                    <Link href={`/portfolio-intereri/${project.attributes.slug}/`} key={pic.hash}>
                      <Image
                        src={pic.formats.medium.url}
                        width={pic.formats.medium.width}
                        height={pic.formats.medium.height}
                        alt={project.attributes.title}
                        blurDataURL={pic.placeholder}
                        placeholder="blur"
                        className="mb-4"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link href={`/portfolio-intereri/${project.attributes.slug}/`} className={`${styles.more} text-center text-lg text-white`}>
              Смотреть весь проект
            </Link>
          </div>
        );
      })}
    </div>
  );
}

async function getData() {
  const res = await fetch(`${process.env.SERVER_HOST}/api/projects?populate[content][populate]=gallery&populate=picture`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
