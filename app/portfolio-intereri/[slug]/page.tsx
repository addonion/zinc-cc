import { ProjectPageProps } from "../../@types";
import Image from "next/image";
import Link from "next/link";

export default async function Project(props: ProjectPageProps) {
  const { data } = await getData(props);
  const media = data.attributes.content;

  return (
    <div className="container mx-auto">
      <div className="pagetitle text-center text-white py-24">
        <h1>Проект: «{data.attributes.title}»</h1>
      </div>

      {media.map((block: any) => {
        if (block.__component === "media.gallery") return <Gallery data={block.gallery.data} />;
        if (block.__component === "media.3-d-tour") return <Tour3D data={block.ftp} />;
      })}
    </div>
  );
}

const Tour3D = ({ data }: { data: any }) => {
  return <iframe id="inlineFrameExample" title="Inline Frame Example" className="pb-24 w-full h-screen" src={data} />;
};

const Gallery = ({ data }: { data: any }) => {
  const gallery = data.map((item: any) => item.attributes);
  return (
    <div className="columns-2 md:columns-3 xl:columns-4 pb-24">
      {gallery.map((pic: any) => {
        return (
          <div key={pic.hash}>
            <Image src={pic.formats.medium.url} width={pic.formats.medium.width} height={pic.formats.medium.height} alt="Изображение" blurDataURL={pic.placeholder} placeholder="blur" className="mb-4" />
          </div>
        );
      })}
    </div>
  );
};

async function getData(props: ProjectPageProps) {
  const { data } = await getPostId(props.params.slug);
  const res = await fetch(`${process.env.SERVER_HOST}/api/projects/${data[0].id}?populate[content][populate]=gallery&populate=picture`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getPostId(slug: string) {
  const res = await fetch(`${process.env.SERVER_HOST}/api/projects?filters[slug][$eq]=${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
