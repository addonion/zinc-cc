import Image from "next/image";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <>
      {/* Заголовок страницы */}
      <div className="pagetitle_box">
        <div className="pagetitle">
          <h1>Дизайн интерьера</h1>
          <h3>
            <span></span>
            <b>
              <a href="tel:+79091004652" style={{ color: "#fff", textDecoration: "none" }}>
                +7 909 100-46-52
              </a>
            </b>
            <span></span>
          </h3>
        </div>
      </div>
    </>
  );
}
