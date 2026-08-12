"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  school: string;
  country: string;
};

// Başarılarımız sayfasındaki öne çıkan yorum kaydırıcısı (6,5 sn'de bir ilerler;
// ok/nokta ile gezinince sayaç sıfırlanır).
export default function TestimonialSlider({ slides }: { slides: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrent((i) => (i + 1) % slides.length),
      6500
    );
  }, [slides.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = (i: number) => {
    setCurrent(((i % slides.length) + slides.length) % slides.length);
    resetTimer();
  };

  return (
    <div className="testi-wrap reveal">
      <div className="testi-track">
        {slides.map((slide, i) => (
          <div key={slide.name} className={`testi-slide${i === current ? " active" : ""}`}>
            <span className="quote-mark">&quot;</span>
            <blockquote>{slide.quote}</blockquote>
            <div className="testi-meta">
              <span className="initials">{slide.initials}</span>
              <div>
                <div className="name">{slide.name}</div>
                <div className="school">{slide.school}</div>
                <div className="country">{slide.country}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="testi-controls">
        <div className="testi-dots">
          {slides.map((slide, i) => (
            <button
              key={slide.name}
              className={i === current ? "active" : undefined}
              aria-label={`Yorum ${i + 1}`}
              onClick={() => goTo(i)}
            ></button>
          ))}
        </div>
        <div className="testi-arrows">
          <button className="arrow-btn" aria-label="Önceki" onClick={() => goTo(current - 1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="arrow-btn" aria-label="Sonraki" onClick={() => goTo(current + 1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
