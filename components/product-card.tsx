import Image from "next/image";

import { motion } from "framer-motion";

import { Check, Heart, Plus, Star } from "lucide-react";

import type { Product } from "@/types/product";

type Props = {
  product: Product;
  index: number;
  isAdded: boolean;
  isLiked: boolean;
  onAdd: (id: number) => void;
  onLike: (id: number) => void;
};

export function ProductCard({ product, index, isAdded, isLiked, onAdd, onLike }: Props) {
  return (
    <motion.article
      layout
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -6 }}
    >
      <div className="product-image">
        <Image
          src={product.image}
          fill
          alt={product.name}
          sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw"
        />
        {product.badge && <span className="badge">{product.badge}</span>}
        <button
          className={`heart ${isLiked ? "liked" : ""}`}
          aria-label={`Save ${product.name}`}
          onClick={() => onLike(product.id)}
        >
          <Heart fill={isLiked ? "currentColor" : "none"} />
        </button>
        <button className={`quick-add ${isAdded ? "done" : ""}`} onClick={() => onAdd(product.id)}>
          {isAdded ? (
            <>
              <Check /> Added
            </>
          ) : (
            <>
              <Plus /> Quick add
            </>
          )}
        </button>
      </div>
      <div className="product-info">
        <div>
          <p>
            {product.category} · {product.color}
          </p>
          <h3>{product.name}</h3>
        </div>
        <b>${product.price}</b>
      </div>
      <div className="rating">
        <Star size={13} fill="currentColor" /> {product.rating} <span>({product.reviews})</span>
      </div>
    </motion.article>
  );
}
