import Blocks from "editorjs-blocks-react-renderer";

export async function generateMetadata() {
  return {
    title: "Дизайн проект дома, коттеджа и квартиры в Перми",
    description: "Дизайн проект — это финал всего дизайна, это воплощение всей проделанной работы. Вся необходимая документация для вашего ремонта.",
  };
}

export default async function Portfolio() {
  const { data } = await getData();
  const content = data.content;

  return (
    <>
      <div className="container mx-auto">
        <div className="pagetitle text-center text-white py-24">
          <h1>Дизайн проект</h1>
          <div>
            <b>финал дизайна интерьера</b>
          </div>
        </div>
      </div>

      <article className="line_box">
        <div className="container mx-auto px-6 lg:px-0">
          <div className="flex gap-24 py-6">
            {/* Зачем нужен дизайн интерьера? */}
            <div className="lg:w-2/3 lg:mx-auto" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </article>
    </>
  );
}

async function getData() {
  const res = await fetch(`${process.env.SERVER_HOST}/api/dizajn-proekt?locale=ru&populate=seo`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
