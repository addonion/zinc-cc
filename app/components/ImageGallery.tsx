"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import { Pic } from "../types";
import { getImageSource } from "../lib/media";

type Gallery = {
  gallery: Pic[];
};

const ImageGallery: React.FC<Gallery> = ({ gallery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Pic | null>(null);

  const openModal = (pic: Pic) => {
    setSelectedImage(pic);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      {gallery.map((pic, index) => (
        <div key={pic.hash}>
          <button
            type="button"
            className="mb-4 block cursor-zoom-in border-0 bg-transparent p-0 text-left"
            aria-label={`Открыть изображение ${index + 1}`}
            onClick={() => openModal(pic)}
          >
            {(() => {
              const image = getImageSource(pic, ["medium", "small", "thumbnail"]);

              return (
                <Image
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={pic.alternativeText || `Изображение ${index + 1}`}
                />
              );
            })()}
          </button>
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal} pic={selectedImage} />
    </div>
  );
};

export default ImageGallery;
