export default async function Head() {
  const { data } = await getData();

  return (
    <>
      <title>{data.attributes.seo.metaTitle}</title>
      <meta name="description" content={data.attributes.seo.metaDescription} />
      <meta name="keywords" content={data.attributes.seo.keywords} />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
    </>
  );
}

async function getData() {
  const res = await fetch("http://server.zinc.cc/api/main-page/?populate=seo");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
