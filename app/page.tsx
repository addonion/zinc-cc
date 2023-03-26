import Image from "next/image";
import Blocks from "editorjs-blocks-react-renderer";
import styles from "./page.module.css";
import Plans from "./components/Plans";
import MainGallery from "./components/MainGallery";

export async function generateMetadata() {
  const [{ data }] = await getData();
  const seo = data.attributes.seo;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
  };
}

export default async function Home() {
  const [{ data }, phone] = await getData();
  const phoneNumber = phone.data.attributes.member.data.attributes.Phone;
  const content = JSON.parse(data.attributes.Content);
  const after = JSON.parse(data.attributes.After);

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

      {/* Последние работы */}
      <section>
        {/* @ts-expect-error Async Server Component */}
        <MainGallery />
      </section>

      {/* Цены */}
      <section className="container columns-3 mx-auto text-white">
        {/* @ts-expect-error Server Component */}
        <Plans />
      </section>

      <article className="line_box">
        <div className="container mx-auto">
          <div className="flex gap-24 py-6">
            {/* Зачем нужен дизайн интерьера? */}
            <div className="w-2/3">
              <Blocks data={content} />
            </div>
            {/* Этапы работы: */}
            <div className="w-1/3">
              <Blocks data={after} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

async function getData() {
  const res = await fetch(`${process.env.SERVER_HOST}/api/main-page?locale=ru&populate=seo`);
  const phone = await fetch(`${process.env.SERVER_HOST}/api/contact?populate=member`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return Promise.all([res.json(), phone.json()]);
}
