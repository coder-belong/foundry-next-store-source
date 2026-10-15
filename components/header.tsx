import { AnimatePresence, motion } from "framer-motion";

import { ChevronDown, Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";

type Props = {
  cartCount: number;
  search: string;
  searchOpen: boolean;
  onCart: () => void;
  onMenu: () => void;
  onSearch: (value: string) => void;
  onToggleSearch: () => void;
  onCloseSearch: () => void;
};

export function Header(props: Props) {
  return (
    <>
      <div className="announcement" aria-label="Free worldwide shipping over $150">
        <div className="ticker-track">
          {[0, 1, 2, 3].map((item) => (
            <span key={item}>
              <Sparkles size={14} /> WORLDWIDE SHIPPING OVER $150 <i>✦</i> OBJECTS WITH A POINT OF
              VIEW <i>✦</i>
            </span>
          ))}
        </div>
      </div>
      <header>
        <button className="icon-btn mobile-only" aria-label="Open menu" onClick={props.onMenu}>
          <Menu />
        </button>
        <a className="logo" href="#">
          foundry<span>.</span>
        </a>
        <nav>
          <a href="#shop">Shop</a>
          <a href="#story">Our story</a>
          <a href="#journal">Journal</a>
        </nav>
        <div className="actions">
          <button className="currency">
            USD <ChevronDown size={14} />
          </button>
          <button
            className="icon-btn desktop-search"
            aria-label="Search"
            onClick={props.onToggleSearch}
          >
            <Search />
          </button>
          <button className="cart-button" aria-label="Open cart" onClick={props.onCart}>
            <ShoppingBag />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={props.cartCount}
                initial={{ scale: 0.2, rotate: -35 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
              >
                {props.cartCount}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>
      <AnimatePresence>
        {props.searchOpen && (
          <motion.div
            className="searchbar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 72, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Search />
            <input
              autoFocus
              placeholder="Search our collection…"
              value={props.search}
              onChange={(event) => props.onSearch(event.target.value)}
            />
            <button aria-label="Close search" onClick={props.onCloseSearch}>
              <X />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
