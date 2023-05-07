export async function generateMetadata() {
  return {
    title: "Дизайн проект дома, коттеджа и квартиры в Перми",
    description: "Дизайн проект — это финал всего дизайна, это воплощение всей проделанной работы. Вся необходимая документация для вашего ремонта.",
  };
}

export default async function Portfolio() {
  const { data } = await getData();

  return (
    <div className="container mx-auto">
      <div className="pagetitle text-center text-white py-24">
        <h1>Контактная информация</h1>
        <div>
          <b>контакты, телефоны, почта и адрес</b>
        </div>
      </div>
    </div>
  );
}

async function getData() {
  const res = await fetch(`${process.env.SERVER_HOST}/api/projects?populate[Content][populate]=Gallery&populate=picture`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
