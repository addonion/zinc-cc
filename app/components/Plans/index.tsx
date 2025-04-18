interface TPlan {
  id: number;
  attributes: {
    Name: string;
    Price: string;
  };
}

export default async function Plans() {
  const { data } = await getData();
  return (
    <>
      {data.map((plan: TPlan) => (
        <div className="card" key={plan.id}>
          <div className="title text-sm">{plan.attributes.Name}</div>
          <div className="price">
            {plan.attributes.Price} ₽ за м<sup>2</sup>
          </div>
        </div>
      ))}
    </>
  );
}

async function getData() {
  const res = await fetch(`${process.env.SERVER_HOST}/api/plans`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
