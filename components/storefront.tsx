"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { MobileMenu } from "@/components/mobile-menu";
import { ProductSection } from "@/components/product-section";
import { useStorefront } from "@/hooks/use-storefront";

export function Storefront() {
  const store = useStorefront();
  const pointerX = useMotionValue(-200);
  const pointerY = useMotionValue(-200);
  const glowX = useSpring(pointerX, { stiffness: 140, damping: 24 });
  const glowY = useSpring(pointerY, { stiffness: 140, damping: 24 });

  return (
    <main
      onPointerMove={(event) => {
        pointerX.set(event.clientX - 190);
        pointerY.set(event.clientY - 190);
      }}
    >
      <motion.div className="cursor-glow" style={{ x: glowX, y: glowY }} />
      <div className="noise" aria-hidden="true" />
      <Header
        cartCount={store.cartCount}
        search={store.search}
        searchOpen={store.searchOpen}
        onCart={() => store.setCartOpen(true)}
        onMenu={() => store.setMobileOpen(true)}
        onSearch={store.setSearch}
        onToggleSearch={() => store.setSearchOpen((open) => !open)}
        onCloseSearch={() => {
          store.setSearchOpen(false);
          store.setSearch("");
        }}
      />
      <HeroSection />
      <ProductSection
        products={store.filteredProducts}
        category={store.category}
        liked={store.liked}
        added={store.added}
        onCategory={store.setCategory}
        onAdd={store.addToCart}
        onLike={store.toggleLiked}
        onReset={store.resetFilters}
      />
      <Footer />
      <AnimatePresence>
        {(store.cartOpen || store.mobileOpen) && (
          <>
            <motion.div
              className="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={store.closeOverlays}
            />
            {store.cartOpen && (
              <CartDrawer
                cart={store.cart}
                items={store.cartItems}
                count={store.cartCount}
                subtotal={store.subtotal}
                onClose={() => store.setCartOpen(false)}
                onUpdate={store.updateCart}
              />
            )}
            {store.mobileOpen && <MobileMenu onClose={() => store.setMobileOpen(false)} />}
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
