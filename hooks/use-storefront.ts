"use client";

import { useMemo, useState } from "react";

import { products } from "@/data/products";
import type { Cart } from "@/types/product";

export function useStorefront() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Cart>({});
  const [liked, setLiked] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [added, setAdded] = useState<number | null>(null);

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (category === "All" || product.category === category) &&
          product.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [category, search],
  );
  const cartItems = products.filter((product) => cart[product.id]);
  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const subtotal = cartItems.reduce(
    (total, product) => total + product.price * cart[product.id],
    0,
  );

  const addToCart = (id: number) => {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setAdded(id);
    window.setTimeout(() => setAdded(null), 900);
  };

  const updateCart = (id: number, change: number) =>
    setCart((current) => {
      const quantity = Math.max(0, (current[id] || 0) + change);
      const updated = { ...current, [id]: quantity };
      if (!quantity) delete updated[id];
      return updated;
    });

  const toggleLiked = (id: number) =>
    setLiked((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id],
    );
  const resetFilters = () => {
    setSearch("");
    setCategory("All");
  };
  const closeOverlays = () => {
    setCartOpen(false);
    setMobileOpen(false);
  };

  return {
    category,
    setCategory,
    search,
    setSearch,
    cart,
    liked,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    mobileOpen,
    setMobileOpen,
    added,
    filteredProducts,
    cartItems,
    cartCount,
    subtotal,
    addToCart,
    updateCart,
    toggleLiked,
    resetFilters,
    closeOverlays,
  };
}
