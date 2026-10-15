import { motion } from "framer-motion";

import { ArrowRight, X } from "lucide-react";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.aside
      className="mobile-menu"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
    >
      <div>
        <a className="logo" href="#">
          foundry<span>.</span>
        </a>
        <button className="icon-btn" aria-label="Close menu" onClick={onClose}>
          <X />
        </button>
      </div>
      <nav>
        <a onClick={onClose} href="#shop">
          Shop <ArrowRight />
        </a>
        <a onClick={onClose} href="#story">
          Our story <ArrowRight />
        </a>
        <a onClick={onClose} href="#journal">
          Journal <ArrowRight />
        </a>
      </nav>
      <p>
        Objects with stories.
        <br />
        Delivered worldwide.
      </p>
    </motion.aside>
  );
}
