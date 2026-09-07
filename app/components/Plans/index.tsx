import { fetchApi } from "../../lib/api";
import { SITE_URL, orgRef } from "../../lib/schema";
import JsonLd from "../JsonLd";

interface TPlan {
  id: number;
  Name: string;
  Price: string;
}

// Авторский надзор тарифицируется не за квадратный метр, в отличие от пакетов дизайн-проекта
const NON_AREA_PLAN_ID = 4;

const isAreaPriced = (plan: TPlan) => plan.id !== NON_AREA_PLAN_ID;

export default async function Plans() {
  const { data } = await getData();

  return (
    <>
      <JsonLd data={getServiceSchema(data)} />

      {data.map((plan: TPlan) => (
        <div className="card" key={plan.id}>
          <div className="title text-sm">{plan.Name}</div>
          <div className="price">
            {formatPrice(plan.Price)} ₽{isAreaPriced(plan) && (<> за м<sup>2</sup></>)}
          </div>
        </div>
      ))}
    </>
  );
}

// Разделяем разряды тысяч пробелом, только если в числе больше 4 знаков (2400, но 20 000)
function formatPrice(price: string | number): string {
  const digits = String(price);

  if (digits.length <= 4) {
    return digits;
  }

  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function getServiceSchema(plans: TPlan[]) {
  const offers = plans.flatMap((plan) => {
    // API отдаёт Price числом, хотя в типе он строкой — приводим к строке до разбора
    const price = Number(String(plan.Price).replace(/[^\d.]/g, ""));

    if (!Number.isFinite(price) || price <= 0) {
      return [];
    }

    const perArea = isAreaPriced(plan);

    return [
      {
        "@type": "Offer",
        name: plan.Name,
        priceSpecification: {
          "@type": perArea ? "UnitPriceSpecification" : "PriceSpecification",
          price,
          priceCurrency: "RUB",
          // MTK — квадратный метр по UN/CEFACT
          ...(perArea && { unitCode: "MTK" }),
        },
      },
    ];
  });

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#design-service`,
    name: "Дизайн интерьера",
    serviceType: "Дизайн интерьера",
    provider: orgRef,
    areaServed: { "@type": "City", name: "Пермь" },
    ...(offers.length > 0 && { offers }),
  };
}

async function getData() {
  return fetchApi<{ data: TPlan[] }>("/api/plans?sort=id:asc");
}
