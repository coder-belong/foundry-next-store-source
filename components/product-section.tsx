import { AnimatePresence, motion } from "framer-motion";

import { Search } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { categories } from "@/data/products";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
  category: string;
  liked: number[];
  added: number | null;
  onCategory: (value: string) => void;
  onAdd: (id: number) => void;
  onLike: (id: number) => void;
  onReset: () => void;
};

export function ProductSection(props: Props) {
  return (
    <section className="shop" id="shop">
      <div className="section-index">02 — THE OBJECT INDEX</div>
      <div className="section-head">
        <div>
          <p className="eyebrow">FRESHLY CURATED</p>
          <h2>Pieces worth keeping</h2>
        </div>
        <p>Fewer, better things—each chosen for its materials, utility, and enduring character.</p>
      </div>
      <div className="filter-row">
        <div className="tabs">
          {categories.map((item) => (
            <button
              key={item}
              className={props.category === item ? "active" : ""}
              onClick={() => props.onCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span>{props.products.length} pieces</span>
      </div>
      <motion.div layout className="product-grid">
        <AnimatePresence mode="popLayout">
          {props.products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isAdded={props.added === product.id}
              isLiked={props.liked.includes(product.id)}
              onAdd={props.onAdd}
              onLike={props.onLike}
            />
          ))}
        </AnimatePresence>
      </motion.div>
      {!props.products.length && (
        <div className="empty-search">
          <Search />
          <h3>No pieces found</h3>
          <p>Try a different search or browse all objects.</p>
          <button onClick={props.onReset}>View all</button>
        </div>
      )}
    </section>
  );
}
