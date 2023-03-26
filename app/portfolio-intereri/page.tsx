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

      {data.map((project: any) => {
        let gallery = project.attributes.Content[0].Gallery.data.map((item) => item.attributes);
        console.log();

        return (
          <div className={`mx-auto columns-2 md:columns-3 xl:columns-4 mb-24`} key={project.id}>
            {gallery.map((pic) => (
              <div key={pic.hash}>
                <img src={pic.formats.medium.url} alt={project.attributes.Title} className="mb-4" />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

async function getData() {
  const res = await fetch(`${process.env.SERVER_HOST}/api/projects?populate[Content][populate]=Gallery&populate=picture`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
