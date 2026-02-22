export interface BookImage {
  src: string;
  alt: string;
}

export interface RelatedBook {
  title: string;
  price: number;
  original: number;
  rating: number;
  count: number;
  author: string;
}

export interface Review {
  name: string;
  date: string;
  rating: number;
  comment: string;
  helpful: number;
  avatar: string;
}

export interface RatingBreakdown {
  star: number;
  count: number;
  pct: number;
}

export interface ColorOption {
  name: string;
  img: string;
}
