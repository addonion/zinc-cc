import { Pic } from "../types";

const IMAGE_FORMAT_PRIORITY = ["large", "medium", "small", "thumbnail"];

export function getImageSource(pic: Pic, preferredFormats = IMAGE_FORMAT_PRIORITY) {
  const format = preferredFormats.map((name) => pic.formats?.[name]).find(Boolean);

  return {
    src: format?.url || pic.url,
    width: format?.width || pic.width,
    height: format?.height || pic.height,
  };
}
