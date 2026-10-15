export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  color: string;
};

export type Cart = Record<number, number>;
