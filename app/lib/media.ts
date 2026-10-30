import { Pic } from "../types";
import { getImageProps } from "next/image";

const IMAGE_FORMAT_PRIORITY = ["large", "medium", "small", "thumbnail"];
export const GALLERY_IMAGE_SIZES = "(min-width: 1536px) 372px, (min-width: 1280px) 308px, (min-width: 1024px) 330.67px, (min-width: 768px) 245.33px, (min-width: 640px) 312px, calc((100vw - 16px) / 2)";

export function normalizePic(pic: Pic, base: URL): Pic {
  const normalizeUrl = (url: string) => url.startsWith("/") ? new URL(url, base).href : url;

  return {
    ...pic,
    url: normalizeUrl(pic.url),
    formats: pic.formats && Object.fromEntries(
      Object.entries(pic.formats).map(([name, format]) => [name, { ...format, url: normalizeUrl(format.url) }]),
    ),
  };
}

export function getImageSource(pic: Pic, preferredFormats = IMAGE_FORMAT_PRIORITY) {
  const format = preferredFormats.map((name) => pic.formats?.[name]).find(Boolean);

  return {
    src: format?.url || pic.url,
    width: format?.width || pic.width,
    height: format?.height || pic.height,
  };
}

export function getResponsiveImageProps(
  pic: Pic,
  sizes = GALLERY_IMAGE_SIZES,
  preferredFormats = ["medium", "small", "thumbnail"],
) {
  const image = getImageSource(pic, preferredFormats);
  const formats = Object.values(pic.formats || {}).filter((format) =>
    format.url && format.width > 0 && format.height > 0 &&
    Math.max(format.width, format.height) <= 1920 &&
    Math.abs((format.width / format.height) / (pic.width / pic.height) - 1) < 0.02,
  );
  const candidates = formats.length > 0 && Math.max(pic.width, pic.height) <= 1920
    ? [...formats, pic]
    : formats;

  // Keep responsive optimization for originals with no usable CMS derivatives.
  if (!candidates.some((format) => Math.max(format.width, format.height) >= Math.min(750, Math.max(pic.width, pic.height)))) {
    return getImageProps({ src: pic.url, width: pic.width, height: pic.height, alt: "", sizes }).props;
  }

  const byWidth = [...new Map(candidates.map((format) => [format.width, format])).values()]
    .sort((a, b) => a.width - b.width);

  return {
    ...image,
    srcSet: byWidth.map((format) => `${format.url} ${format.width}w`).join(", "),
    sizes,
    loading: "lazy" as const,
    decoding: "async" as const,
  };
}
