import Link from "next/link";
import { fetchApi } from "../lib/api";

export async function generateMetadata() {
  const fallback = {
    title: "Дизайн проект дома, коттеджа и квартиры в Перми",
    description: "Дизайн проект — это финал всего дизайна, это воплощение всей проделанной работы. Вся необходимая документация для вашего ремонта.",
  };

  try {
    const { data } = await getData();
    const seo = data.seo;

    return {
      title: seo?.metaTitle || fallback.title,
      description: seo?.metaDescription || fallback.description,
      alternates: {
        canonical: "/dizajn-proekt/",
      },
    };
  } catch {
    return {
      ...fallback,
      alternates: {
        canonical: "/dizajn-proekt/",
      },
    };
  }
}

export default async function Portfolio() {
  const { data } = await getData();
  const content = data.content;

  return (
    <>
      <div className="container mx-auto">
        <div className="pagetitle text-center text-white py-24">
          <h1>Дизайн-проект интерьера в Перми</h1>
          <div>
            <b>финал дизайна интерьера</b>
          </div>
        </div>
      </div>

      <article className="line_box">
        <div className="container mx-auto px-6 lg:px-0">
          <div className="flex gap-24 py-6">
            {/* Зачем нужен дизайн интерьера? */}
            <div className="lg:w-2/3 lg:mx-auto">
              <div dangerouslySetInnerHTML={{ __html: content }} />
              <nav aria-label="Дизайн-проект по типу объекта" className="mt-10 space-y-2">
                <p><Link href="/dizajn-kvartiry/">Дизайн-проект квартиры в Перми: стоимость и примеры</Link></p>
                <p><Link href="/">Дизайн интерьера дома и коттеджа в Перми</Link></p>
              </nav>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

async function getData() {
  return fetchApi<{ data: { seo?: { metaTitle?: string; metaDescription?: string }; content: string } }>(
    "/api/dizajn-proekt?locale=ru&populate=seo",
  );
}
