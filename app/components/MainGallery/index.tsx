import React from "react";
import styles from "./style.module.css";

export default async function MainGallery() {
  const { data } = await getData();

  return (
    <div className={`mx-auto columns-3 md:columns-4 xl:columns-6 ${styles.gallery}`}>
      {data.map((project: any) => {
        return (
          <div key={project.id}>
            <img src={project.attributes.picture.data.attributes.formats.small.url} alt={project.attributes.Title} />
          </div>
        );
      })}
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
