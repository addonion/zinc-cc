import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import Plans from "../components/Plans";
import { SITE_URL, orgRef } from "../lib/schema";

const title = "Дизайн-проект квартиры в Перми — ZINC";
const description = "Дизайн-проект квартиры в Перми: планировка, мебель, освещение, 3D-тур и чертежи. Примеры квартир из портфолио ZINC, состав проекта и тарифы.";
const url = `${SITE_URL}/dizajn-kvartiry/`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/dizajn-kvartiry/" },
};

export default function ApartmentDesign() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "@id": `${url}#service`,
            name: "Дизайн интерьера квартиры",
            description,
            url,
            provider: orgRef,
            areaServed: { "@type": "City", name: "Пермь" },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Дизайн квартиры", item: url },
            ],
          },
        ],
      }} />

      <div className="container mx-auto px-6 lg:px-0">
        <div className="pagetitle text-center text-white py-24">
          <h1>Дизайн интерьера квартиры в Перми</h1>
          <b>планировка и интерьер для повседневной жизни</b>
        </div>
      </div>

      <section className="container mx-auto px-6 lg:px-0 text-white" id="stoimost">
        <h2 className="mb-6 text-center">Стоимость дизайн-проекта квартиры</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          <Plans />
        </div>
        <p className="mt-6">Тарифы дизайн-проекта указаны за квадратный метр. Авторский надзор указан отдельно. Точный состав пакета, общую стоимость и условия сопровождения согласуем в договоре.</p>
      </section>

      <article className="line_box">
        <div className="container mx-auto px-6 lg:px-0 py-6">
          <div className="lg:w-2/3 lg:mx-auto space-y-10">
            <nav aria-label="Хлебные крошки">
              <Link href="/">Главная</Link> / Дизайн квартиры
            </nav>
            <section>
              <h2>Сначала — как вы будете жить в квартире</h2>
              <p>В ZINC работа над интерьером начинается с технического задания и обмеров. На основе ваших задач готовим варианты планировки, затем прорабатываем стиль, мебель, освещение и рабочие чертежи.</p>
              <p>Для квартиры полезно заранее обсудить число жильцов, привычки семьи, рабочие места и хранение. Расстановка мебели помогает проверить, где останутся проходы, как откроются двери и какое пространство потребуется для ежедневных дел.</p>
              <p>В существующей квартире отправной точкой становятся реальные размеры, расположение окон и инженерных коммуникаций. Пожелания по перепланировке стоит обозначить до согласования планировочного решения.</p>
            </section>
            <section>
              <h2>Что вы получаете в дизайн-проекте</h2>
              <p>Планировочное решение связывает комнаты, мебель и хранение. Стилистические коллажи помогают выбрать материалы и настроение интерьера. В 3D-туре можно посмотреть, как эти решения сочетаются в пространстве.</p>
              <p>Рабочая документация включает планы отделки, освещения, розеток и выключателей, а также чертежи мебели под заказ. Ведомость материалов собирает выбранные позиции. Точный состав выбранного пакета закрепляем в договоре.</p>
              <p><Link href="/dizajn-proekt/">Посмотреть все этапы и состав дизайн-проекта</Link>.</p>
            </section>
            <section>
              <h2>Примеры квартир из портфолио</h2>
              <p>Посмотрите разные квартиры, чтобы обсудить на встрече близкие вам решения:</p>
              <ul className="pl-6">
                <li><Link href="/portfolio-intereri/Surname/">ЖК «Фамилия» — трёхкомнатная квартира</Link></li>
                <li><Link href="/portfolio-intereri/Aviator/">Квартира в ЖК «Авиатор»</Link></li>
                <li><Link href="/portfolio-intereri/Siberian/">Реконструкция квартиры на ул. Сибирской</Link></li>
              </ul>
              <Link href="/portfolio-intereri/">Все проекты и реализации студии</Link>
            </section>
            <section>
              <h2>Стоимость и первая встреча</h2>
              <p>Актуальные цены пакетов «Технический» и «Полный» приведены в <Link href="#stoimost">блоке стоимости выше</Link>. Выбор пакета обсудим с учётом вашей квартиры и задач ремонта.</p>
              <p>Первая консультация бесплатная. Для обсуждения полезно подготовить план квартиры, пожелания по помещениям и примеры интерьеров, которые вам нравятся.</p>
              <p><Link href="/contacts/">Связаться с дизайнером и договориться о встрече</Link>.</p>
            </section>
            <section>
              <h2>Чем дизайн-проект отличается от 3D-визуализации?</h2>
              <p>Визуализация показывает будущий интерьер. Дизайн-проект также содержит планировочное решение и рабочие чертежи: по ним строители могут определить объём работ, а поставщики — подобрать материалы и мебель. Поэтому изображения и документацию рассматривают вместе.</p>
              <p>Перед первой встречей посмотрите <Link href="/podgotovka-k-dizajn-proektu/">список материалов и вопросов для обсуждения с дизайнером</Link>.</p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
