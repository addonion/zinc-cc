import React from "react";
import styles from "./style.module.css";

export default async function MainGallery() {
  const { data } = await getData();
  return (
    <div className={`mx-auto columns-2 md:columns-3 lg:columns-8 ${styles.gallery}`}>
      {data.map((project: any) => (
        <div key={project.id}>
          <img src={project.attributes.picture.data.attributes.formats.thumbnail.url} alt={project.attributes.Title} />
        </div>
      ))}
      {data.map((project: any) => (
        <div key={project.id}>
          <img src={project.attributes.picture.data.attributes.formats.thumbnail.url} alt={project.attributes.Title} />
        </div>
      ))}
      {data.map((project: any) => (
        <div key={project.id}>
          <img src={project.attributes.picture.data.attributes.formats.thumbnail.url} alt={project.attributes.Title} />
        </div>
      ))}
      {data.map((project: any) => (
        <div key={project.id}>
          <img src={project.attributes.picture.data.attributes.formats.thumbnail.url} alt={project.attributes.Title} />
        </div>
      ))}
      {data.map((project: any) => (
        <div key={project.id}>
          <img src={project.attributes.picture.data.attributes.formats.thumbnail.url} alt={project.attributes.Title} />
        </div>
      ))}
      {data.map((project: any) => (
        <div key={project.id}>
          <img src={project.attributes.picture.data.attributes.formats.thumbnail.url} alt={project.attributes.Title} />
        </div>
      ))}
      {data.map((project: any) => (
        <div key={project.id}>
          <img src={project.attributes.picture.data.attributes.formats.thumbnail.url} alt={project.attributes.Title} />
        </div>
      ))}
      {data.map((project: any) => (
        <div key={project.id}>
          <img src={project.attributes.picture.data.attributes.formats.thumbnail.url} alt={project.attributes.Title} />
        </div>
      ))}
      {data.map((project: any) => (
        <div key={project.id}>
          <img src={project.attributes.picture.data.attributes.formats.thumbnail.url} alt={project.attributes.Title} />
        </div>
      ))}
      {data.map((project: any) => (
        <div key={project.id}>
          <img src={project.attributes.picture.data.attributes.formats.thumbnail.url} alt={project.attributes.Title} />
        </div>
      ))}
      {data.map((project: any) => (
        <div key={project.id}>
          <img src={project.attributes.picture.data.attributes.formats.thumbnail.url} alt={project.attributes.Title} />
        </div>
      ))}
      {data.map((project: any) => (
        <div key={project.id}>
          <img src={project.attributes.picture.data.attributes.formats.thumbnail.url} alt={project.attributes.Title} />
        </div>
      ))}
      {data.map((project: any) => (
        <div key={project.id}>
          <img src={project.attributes.picture.data.attributes.formats.thumbnail.url} alt={project.attributes.Title} />
        </div>
      ))}
    </div>
  );
}

async function getData() {
  const res = await fetch(`${process.env.SERVER_HOST}/api/projects?populate=picture`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
