import JsonLd from "../components/JsonLd";
import { fetchApi } from "../lib/api";
import { SITE_URL, orgRef } from "../lib/schema";

interface Team {
  id: number;
  Name: string;
  Role: string;
  Phone?: string;
  Email: string;
}

export async function generateMetadata() {
  return {
    title: "Контакты студии дизайна ZINC в Перми",
    description: "Дизайнер Екатерина Зубакова. Тел. +7 909 100-46-52, info@zinc.cc. Офис: ул. Чернышевского, 28, 5 этаж, Пермь. Первая встреча бесплатно.",
    alternates: {
      canonical: "/contacts/",
    },
  };
}

export default async function Portfolio() {
  const { data } = await getData();

  return (
    <>
      <JsonLd data={getContactsSchema(data)} />

      <div className="container mx-auto">
        <div className="pagetitle text-center text-white py-24">
          <h1>Контакты студии дизайна интерьера ZINC</h1>
          <div>
            <b>контакты, телефоны, почта и адрес</b>
          </div>
        </div>
      </div>

      <article className="line_box">
        <div className="container mx-auto px-6 lg:px-0">
          <div className="flex gap-24 py-6">
            {data.map((team: Team) => {
              const { Name, Role, Phone, Email } = team
              return (
                <div key={team.id} className="lg:w-1/3 lg:mx-auto">
                  <h2>{Name}</h2>
                  <p>{Role}</p>
                  <p>
                    Телефон: {Phone && <a href={`tel:+${Phone.replace(/[+-\s]/g, "")}`}>{Phone}</a>}
                  </p>
                  <p>
                    Email: <a href={`mailto:${Email}`}>{Email}</a>
                  </p>
                </div>
              )
            })}
          </div>
          <p className="lg:w-1/3 lg:mx-auto">Адрес: ул. Чернышевского, 28, 5 этаж, Пермь</p>
        </div>
      </article>
    </>
  );
}

function getContactsSchema(team: Team[]) {
  const url = `${SITE_URL}/contacts/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${url}#page`,
        url,
        name: "Контакты студии дизайна интерьера ZINC",
        inLanguage: "ru-RU",
        about: orgRef,
      },
      ...team.map((member) => ({
        "@type": "Person",
        name: member.Name,
        jobTitle: member.Role,
        email: member.Email,
        ...(member.Phone && { telephone: member.Phone }),
        worksFor: orgRef,
      })),
    ],
  };
}

async function getData() {
  return fetchApi<{ data: Team[] }>("/api/teams");
}
