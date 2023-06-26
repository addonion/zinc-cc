import { ProjectPageProps } from "../../@types";

export default async function Project(props: ProjectPageProps) {
  const { data } = await getData(props);
  console.log(data.attributes.content);

  return (
    <div className="container mx-auto">
      <div className="pagetitle text-center text-white py-24">
        <h1>Проект: «{data.attributes.title}»</h1>
      </div>

      <div className="columns-2 md:columns-3 xl:columns-4"></div>
    </div>
  );
}

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
