import { fetchApi } from "../lib/api";

interface Team {
  id: number;
  Name: string;
  Role: string;
  Phone?: string;
  Email: string;
}

export async function generateMetadata() {
  return {
    title: "Дизайн проект дома, коттеджа и квартиры в Перми",
    description: "Дизайн проект — это финал всего дизайна, это воплощение всей проделанной работы. Вся необходимая документация для вашего ремонта.",
  };
}

export default async function Portfolio() {
  const { data } = await getData();

  return (
    <>
      <div className="container mx-auto">
        <div className="pagetitle text-center text-white py-24">
          <h1>Контактная информация</h1>
          <div>
            <b>контакты, телефоны, почта и адрес</b>
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
        </div>
      </article>
    </>
  );
}

async function getData() {
  return fetchApi<{ data: Team[] }>("/api/teams");
}
