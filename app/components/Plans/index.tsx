type TPlan = {
  id: number;
  attributes: {
    Name: string;
    Price: string;
  };
};

export default async function Plans() {
  const { data } = await getData();
  return (
    <>
      {data.map((plan: TPlan) => (
        <div className="card" key={plan.id}>
          <div className="title">{plan.attributes.Name}</div>
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

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
