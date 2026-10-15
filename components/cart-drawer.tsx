import Image from "next/image";

import { motion } from "framer-motion";

import { ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react";

import type { Cart, Product } from "@/types/product";

type Props = {
  cart: Cart;
  items: Product[];
  count: number;
  subtotal: number;
  onClose: () => void;
  onUpdate: (id: number, change: number) => void;
};

export function CartDrawer({ cart, items, count, subtotal, onClose, onUpdate }: Props) {
  return (
    <motion.aside
      className="cart-drawer"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 240 }}
    >
      <div className="drawer-head">
        <div>
          <p>YOUR BAG</p>
          <h2>
            {count} {count === 1 ? "piece" : "pieces"}
          </h2>
        </div>
        <button className="icon-btn" aria-label="Close cart" onClick={onClose}>
          <X />
        </button>
      </div>
      <div className="shipping-progress">
        <div>
          <span>Free worldwide shipping</span>
          <b>{subtotal >= 150 ? "Unlocked!" : `$${150 - subtotal} away`}</b>
        </div>
        <div className="track">
          <motion.i animate={{ width: `${Math.min(100, (subtotal / 150) * 100)}%` }} />
        </div>
      </div>
      <div className="cart-list">
        {items.length ? (
          items.map((product) => (
            <div className="cart-item" key={product.id}>
              <div className="cart-thumb">
                <Image src={product.image} fill alt={product.name} />
              </div>
              <div className="cart-details">
                <small>{product.category}</small>
                <h3>{product.name}</h3>
                <p>{product.color}</p>
                <div className="quantity">
                  <button
                    aria-label={`Remove one ${product.name}`}
                    onClick={() => onUpdate(product.id, -1)}
                  >
                    <Minus />
                  </button>
                  <span>{cart[product.id]}</span>
                  <button
                    aria-label={`Add one ${product.name}`}
                    onClick={() => onUpdate(product.id, 1)}
                  >
                    <Plus />
                  </button>
                </div>
              </div>
              <b>${product.price * cart[product.id]}</b>
            </div>
          ))
        ) : (
          <div className="empty-cart">
            <ShoppingBag />
            <h3>Your bag is ready for something good.</h3>
            <p>Explore our latest objects and find a new everyday favorite.</p>
            <button className="primary" onClick={onClose}>
              Start exploring
            </button>
          </div>
        )}
      </div>
      {!!items.length && (
        <div className="cart-footer">
          <div>
            <span>Subtotal</span>
            <b>${subtotal}</b>
          </div>
          <p>Taxes and shipping calculated at checkout.</p>
          <button className="checkout">
            Checkout securely <ArrowRight />
          </button>
          <small>Secure checkout · 30-day easy returns</small>
        </div>
      )}
    </motion.aside>
  );
}
