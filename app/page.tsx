import Plans from "./components/Plans";

export async function generateMetadata() {
  const { data } = await getData();
  const seo = data.seo;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
  };
}

export default async function Home() {
  const phone = await getPhone();
  const phoneNumber = phone.data.member.Phone;

  const { data } = await getData();
  const content = data.content;
  const steps = data.steps;

  return (
    <>
      {/* Заголовок страницы */}
      <div className="container mx-auto">
        <div className="pagetitle text-center text-white py-24">
          <h1>Дизайн интерьера</h1>
          <div>
            <b>
              <a href={`tel:+${phoneNumber.replace(/[+-\s]/g, "")}`}>{phoneNumber}</a>
            </b>
          </div>
        </div>
      </div>

      {/* Цены */}
      <section className="container columns-4 mx-auto text-white px-6 lg:px-0">
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
  const res = await fetch(`${process.env.SERVER_HOST}/api/contact?populate=member`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getData() {
  const res = await fetch(`${process.env.SERVER_HOST}/api/main-page?locale=ru&populate=seo`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
