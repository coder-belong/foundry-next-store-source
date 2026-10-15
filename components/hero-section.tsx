import Image from "next/image";

import { motion } from "framer-motion";

import { ArrowRight, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="hero" id="story">
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">THE AUTUMN EDIT · 2026</p>
        <h1>
          Good things,
          <br />
          <em>thoughtfully found.</em>
        </h1>
        <p className="hero-text">
          Useful objects with a quiet point of view—made well, meant to last, and sourced from
          independent studios around the world.
        </p>
        <a href="#shop" className="primary">
          Explore the collection <ArrowRight size={18} />
        </a>
        <div className="social-proof">
          <div className="avatars">
            <span>AM</span>
            <span>JL</span>
            <span>SK</span>
          </div>
          <div>
            <b>
              4.9 <Star size={12} fill="currentColor" />
            </b>
            <small>Loved by 2,000+ thoughtful shoppers</small>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <div className="hero-stamp">
          <span>CURATED GLOBALLY · MADE TO LAST · </span>
          <b>F.</b>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1600&q=88"
          fill
          priority
          alt="Curated modern home interior"
          sizes="(max-width: 800px) 100vw, 50vw"
        />
        <div className="floating-card">
          <span className="mini-dot" />
          <div>
            <small>CURATOR&apos;S NOTE</small>
            <p>Warm textures for slower mornings.</p>
          </div>
        </div>
        <span className="image-count">01 / 03</span>
      </motion.div>
    </section>
  );
}
