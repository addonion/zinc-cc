"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Pic } from "../types";
import { getImageSource } from "../lib/media";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  pic: Pic | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, pic }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !pic) return null;

  const image = getImageSource(pic, ["large", "medium", "small"]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={pic.alternativeText || "Просмотр изображения"}
      onClick={onClose}
    >
      <div className="relative max-h-full max-w-full" onClick={(event) => event.stopPropagation()}>
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={pic.alternativeText || "Изображение проекта"}
          className="max-h-[90vh] w-auto"
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 bg-black/70 px-3 py-2 text-white"
          aria-label="Закрыть изображение"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default Modal;
