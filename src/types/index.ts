export interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface HomePage {
  title: string;
  description: string;
  heroImage?: SanityImage;
  features?: Feature[];
}

export interface Author {
  name: string;
  image?: SanityImage;
}

export interface Post {
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  body?: any;
  publishedAt: string;
  mainImage?: SanityImage;
  author?: Author;
}