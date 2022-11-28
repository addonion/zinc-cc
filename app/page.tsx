import Image from "next/image";
import Blocks from "editorjs-blocks-react-renderer";
import styles from "./page.module.css";

export default async function Home() {
  const [{ data }, phone] = await getData();
  const content = JSON.parse(data.attributes.Content);
  const after = JSON.parse(data.attributes.After);
  const phoneNumber = phone.data.attributes.Phone;

  return (
    <>
      {/* Заголовок страницы */}
      <div className="container mx-auto pagetitle_box">
        <div className="pagetitle">
          <h1>Дизайн интерьера</h1>
          <h3>
            <span></span>
            <b>
              <a href={`tel:+${phoneNumber.replace(/[+-\s]/g, "")}`}>{phoneNumber}</a>
            </b>
            <span></span>
          </h3>
        </div>
      </div>

      <section className="line_box">
        <div className="container mx-auto">
          <Blocks data={content} />
        </div>
      </section>

      <section className="container columns-3 mx-auto">
        <div className="card">
          <div className="title">«Лайт»</div>

          <div className="price">
            1200 ₽ за м<sup>2</sup>
          </div>
        </div>

        <div className="card">
          <div className="title">«Медиум»</div>

          <div className="price">
            1500 ₽ за м<sup>2</sup>
          </div>
        </div>

        <div className="card">
          <div className="title">«Максимум»</div>

          <div className="price">
            2000 ₽ за м<sup>2</sup>
          </div>
        </div>
      </section>

      <section className="line_box">
        <div className="container mx-auto">
          <Blocks data={after} />
        </div>
      </section>
    </>
  );
}

async function getData() {
  const res = await fetch("http://server.zinc.cc/api/main-page");
  const phone = await fetch("https://server.zinc.cc/api/contact?fields=phone");

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return Promise.all([res.json(), phone.json()]);
}
