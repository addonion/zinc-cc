import Plans from "./components/Plans";
import { fetchApi } from "./lib/api";

export async function generateMetadata() {
  const fallback = {
    title: "Дизайн интерьера в Перми — студия ZINC",
    description: "Студия дизайна интерьера.",
  };

  try {
    const { data } = await getData();
    const seo = data.seo;

    return {
      title: seo?.metaTitle || fallback.title,
      description: seo?.metaDescription || fallback.description,
      alternates: {
        canonical: "/",
      },
    };
  } catch {
    return {
      ...fallback,
      alternates: {
        canonical: "/",
      },
    };
  }
}

export default async function Home() {
  const [phone, page] = await Promise.all([getPhone(), getData()]);
  const phoneNumber = phone.data.member.Phone;

  const { data } = page;
  const content = data.content;
  const steps = data.steps;

  return (
    <>
      {/* Заголовок страницы */}
      <div className="container mx-auto">
        <div className="pagetitle text-center text-white py-24">
          <h1>Дизайн интерьера в Перми</h1>
          <div>
            <b>
              <a href={`tel:+${phoneNumber.replace(/[+-\s]/g, "")}`}>{phoneNumber}</a>
            </b>
          </div>
        </div>
      </div>

      {/* Цены */}
      <section className="container mx-auto grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 text-white px-6 lg:px-0">
        <Plans />
      </section>

      <article className="line_box">
        <div className="container mx-auto">
          <div className="px-6 lg:px-0 lg:flex gap-24 py-6">
            {/* Зачем нужен дизайн интерьера? */}
            <div className="lg:w-2/3" dangerouslySetInnerHTML={{ __html: content }} />

            {/* Этапы работы: */}
            <div className="lg:w-1/3" dangerouslySetInnerHTML={{ __html: steps }} />
          </div>
        </div>
      </article>
    </>
  );
}

async function getPhone() {
  return fetchApi<{ data: { member: { Phone: string } } }>("/api/contact?populate=member");
}

async function getData() {
  return fetchApi<{ data: { seo: { metaTitle: string; metaDescription: string }; content: string; steps: string } }>(
    "/api/main-page?locale=ru&populate=seo",
  );
}
