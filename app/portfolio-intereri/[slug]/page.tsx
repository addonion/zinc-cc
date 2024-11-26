import { ProjectPageProps } from "../../@types";
import ImageGallery from "../../components/ImageGallery";

export default async function Project(props: ProjectPageProps) {
  const { data } = await getData(props);
  const media = data.content;

  return (
    <div className="container mx-auto">
      <div className="pagetitle text-center text-white py-24">
        <h1>Проект: «{data.title}»</h1>
      </div>

      {media.map((block: any) => {
        if (block.__component === "media.gallery") return <Gallery key={block.id} data={block.gallery} />;
        if (block.__component === "media.3-d-tour") return <Tour3D key={block.id} data={block.ftp} />;
      })}
    </div>
  );
}

const Tour3D = ({ data }: { data: any }) => {
  return <iframe id="inlineFrameExample" title="Inline Frame Example" className="pb-24 w-full h-screen" src={data} />;
};

const Gallery = ({ data }: { data: any }) => {
  const gallery = data.map((item: any) => item);
  return (
    <div className="columns-2 md:columns-3 xl:columns-4 pb-24">
      <ImageGallery gallery={gallery} />
    </div>
  );
};

async function getData(props: ProjectPageProps) {
  const { data } = await getPostId(props.params.slug);
  const res = await fetch(`${process.env.SERVER_HOST}/api/projects/${data[0].documentId}?populate=content.gallery`);

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
