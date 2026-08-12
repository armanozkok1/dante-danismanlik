"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/site";

// Anasayfa "Dante Farkı" panosundaki kampüs fotoğrafı karuseli (3 sn).
const CAMPUSES = [
  { file: "bologna", label: "Bologna Üniversitesi — İtalya", alt: "Bologna Üniversitesi" },
  { file: "heidelberg", label: "Heidelberg Üniversitesi — Almanya", alt: "Heidelberg Üniversitesi" },
  { file: "sorbonne", label: "Sorbonne Üniversitesi — Fransa", alt: "Sorbonne Üniversitesi" },
  { file: "oxford", label: "Oxford Üniversitesi — İngiltere", alt: "Oxford Üniversitesi" },
  { file: "salamanca", label: "Salamanca Üniversitesi — İspanya", alt: "Salamanca Üniversitesi" },
  { file: "coimbra", label: "Coimbra Üniversitesi — Portekiz", alt: "Coimbra Üniversitesi" },
  { file: "krakow", label: "Jagiellonian Üniversitesi — Polonya", alt: "Jagiellonian Üniversitesi" },
];

export default function CampusCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % CAMPUSES.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="campus-carousel">
      {CAMPUSES.map((campus, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={campus.file}
          className={`campus-slide${i === idx ? " active" : ""}`}
          src={asset(`/assets/img/campus/${campus.file}.jpg`)}
          alt={campus.alt}
        />
      ))}
      <div className="campus-tint"></div>
      <div className="campus-caption">{CAMPUSES[idx].label}</div>
    </div>
  );
}
