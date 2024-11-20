// components/ImageGallery.tsx
'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import Image from "next/image";
import { Pic } from '../@types';

type Gallery = {
  gallery: Pic['attributes'][]
}

const ImageGallery: React.FC<Gallery> = ({ gallery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Pic['attributes'] | null>(null);

  const openModal = (pic: Pic['attributes']) => {
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
          <Image
            src={pic.formats.medium.url}
            width={pic.formats.medium.width}
            height={pic.formats.medium.height}
            alt={`Изображение ${index + 1}`}
            blurDataURL={pic.placeholder}
            placeholder="blur"
            className="mb-4 cursor-pointer"
            onClick={() => openModal(pic)}
          />
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal} pic={selectedImage} />
    </div>
  );
};

export default ImageGallery;
