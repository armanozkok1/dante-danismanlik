"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/site";

// Anasayfa hero arka planı: düşük opaklıkta dönen Rönesans tabloları (6 sn).
const PAINTINGS = [
  "school-of-athens",
  "vitruvian-man",
  "mona-lisa",
  "ideal-city",
];

export default function HeroArtRotator() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % PAINTINGS.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-art-rotator">
      {PAINTINGS.map((name, i) => (
        <div
          key={name}
          className={`hero-art-slide${i === idx ? " active" : ""}`}
          style={{ backgroundImage: `url('${asset(`/assets/img/renaissance/${name}.jpg`)}')` }}
        ></div>
      ))}
    </div>
  );
}
