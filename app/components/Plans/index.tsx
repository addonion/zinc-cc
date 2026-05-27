import { fetchApi } from "../../lib/api";

interface TPlan {
  id: number;
  Name: string;
  Price: string;
}

export default async function Plans() {
  const { data } = await getData();

  return (
    <>
      {data.map((plan: TPlan) => (
        <div className="card" key={plan.id}>
          <div className="title text-sm">{plan.Name}</div>
          <div className="price">
            {plan.Price} ₽ за м<sup>2</sup>
          </div>
        </div>
      ))}
    </>
  );
}

async function getData() {
  return fetchApi<{ data: TPlan[] }>("/api/plans");
}
