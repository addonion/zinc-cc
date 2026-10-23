import { Pic } from "../types";

const IMAGE_FORMAT_PRIORITY = ["large", "medium", "small", "thumbnail"];

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
