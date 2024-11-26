export interface ProjectPageProps {
  params: { slug: string },
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  content: [Content]
}

export interface Content {
  gallery: [Pic]
}

export interface Pic {
  id: number,
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    [key: string]: {
      hash: string;
      ext: string;
      mime: string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  placeholder: string;
}
