import Image from "next/image";
import Blocks from "editorjs-blocks-react-renderer";
import styles from "./page.module.css";
import Plans from "./components/Plans";
import { Suspense } from "react";

export default async function Home() {
  const [{ data }, phone] = await getData();
  const phoneNumber = phone.data.attributes.member.data.attributes.Phone;
  const content = JSON.parse(data.attributes.Content);
  const after = JSON.parse(data.attributes.After);

  return (
    <>
      {/* Заголовок страницы */}
      <div className="container mx-auto pagetitle_box">
        <div className="pagetitle text-center">
          <h1>Дизайн интерьера</h1>
          <div>
            <b>
              <a href={`tel:+${phoneNumber.replace(/[+-\s]/g, "")}`}>{phoneNumber}</a>
            </b>
          </div>
        </div>
      </div>

      {/* Зачем нужен дизайн интерьера? */}
      <section className="line_box">
        <div className="container mx-auto">
          <Blocks data={content} />
        </div>
      </section>

      {/* Цены */}
      <section className="container columns-3 mx-auto">
        {/* @ts-expect-error Server Component */}
        <Plans />
      </section>

      {/* Этапы работы: */}
      <section className="line_box">
        <div className="container mx-auto">
          <Blocks data={after} />
        </div>
      </section>
    </>
  );
}

async function getData() {
  const res = await fetch("http://server.zinc.cc/api/main-page?locale=ru");
  const phone = await fetch("https://server.zinc.cc/api/contact?populate=member");

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return Promise.all([res.json(), phone.json()]);
}
