'use client';

import React, { useEffect } from 'react';
import Image from "next/image";
import { Pic } from '../@types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  pic: Pic['attributes'] | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, pic }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !pic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative">
        <Image
          src={pic.formats.large.url}
          width={pic.formats.large.width}
          height={pic.formats.large.height}
          alt={`Изображение`}
          blurDataURL={pic.placeholder}
          placeholder="blur"
          className="mb-4 cursor-pointer"
          onClick={onClose}
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full px-2 py-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;