export default async function Head() {
  const { data } = await getData();
  const seo = data.attributes.seo;

  return (
    <>
      <title>{seo.metaTitle}</title>
      <meta name="description" content={seo.metaDescription} />
      <meta name="keywords" content={seo.keywords} />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
    </>
  );
}

async function getData() {
  const res = await fetch("http://server.zinc.cc/api/main-page/?populate=seo&locale=ru");

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
