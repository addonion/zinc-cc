"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { Pic } from "../types";
import { getResponsiveImageProps } from "../lib/media";

type Gallery = {
  gallery: Pic[];
  title: string;
  eager?: boolean;
};

const ImageGallery: React.FC<Gallery> = ({ gallery, title, eager }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Pic | null>(null);

  const openModal = (pic: Pic, alternativeText: string) => {
    setSelectedImage({ ...pic, alternativeText });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      {gallery.map((pic, index) => {
        const alt = pic.alternativeText?.trim() ? pic.alternativeText : `${title} — фото ${index + 1}`;
        const image = getResponsiveImageProps(pic);

        return (
          <div key={pic.hash}>
            <button
              type="button"
              className="mb-4 block cursor-zoom-in border-0 bg-transparent p-0 text-left"
              aria-label={`Открыть: ${alt}`}
              onClick={() => openModal(pic, alt)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- CMS supplies responsive image files. */}
              <img
                {...image}
                alt={alt}
                loading={eager && index === 0 ? "eager" : "lazy"}
                fetchPriority={eager && index === 0 ? "high" : undefined}
              />
            </button>
          </div>
        );
      })}

      <Modal isOpen={isModalOpen} onClose={closeModal} pic={selectedImage} />
    </div>
  );
};

export default ImageGallery;
