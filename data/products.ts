import type { Product } from "@/types/product";

export const categories = ["All", "Home", "Carry", "Kitchen", "Objects"];

export const products: Product[] = [
  {
    id: 1,
    name: "Dune Portable Lamp",
    category: "Home",
    price: 89,
    rating: 4.9,
    reviews: 128,
    badge: "Bestseller",
    color: "Sand",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    name: "Cloud Linen Throw",
    category: "Home",
    price: 64,
    rating: 4.8,
    reviews: 94,
    color: "Oat",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    name: "Sora Everyday Tote",
    category: "Carry",
    price: 72,
    rating: 4.9,
    reviews: 81,
    badge: "New",
    color: "Sienna",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    name: "Arc Desk Clock",
    category: "Objects",
    price: 48,
    rating: 4.7,
    reviews: 62,
    color: "Natural",
    image:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    name: "Mizu Ceramic Set",
    category: "Kitchen",
    price: 56,
    rating: 4.8,
    reviews: 113,
    badge: "Small batch",
    color: "Chalk",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    name: "Field Notes Folio",
    category: "Objects",
    price: 39,
    rating: 4.6,
    reviews: 47,
    color: "Olive",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
  },
];
