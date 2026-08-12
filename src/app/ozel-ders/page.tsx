import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Özel Ders — Dil ve Sınav Hazırlık Dersleri | Dante",
  description:
    "İngilizce (IELTS/SAT/TOLC-SU), Matematik, Fen Bilimleri, Tarih-Sanat Tarihi (ARCHED), İtalyanca, Almanca, Fransızca ve İspanyolca özel dersleri — 40€/saat.",
};

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>
);

type Subject = {
  id: string;
  numeral: string;
  icon: ReactNode;
  title: string;
  desc: string;
  tag: string;
};

const SUBJECTS: Subject[] = [
  {
    id: "ingilizce",
    numeral: "I",
    icon: <ChatIcon />,
    title: "İngilizce",
    desc: "Genel İngilizce ve sınav odaklı hazırlık; okuma, yazma, dinleme ve konuşma pratiği.",
    tag: "IELTS · SAT · TOLC-SU",
  },
  {
    id: "matematik",
    numeral: "II",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 9h5M8 15h8M15 9l-4 6" />
      </svg>
    ),
    title: "Matematik",
    desc: "Okul müfredatı, üniversite hazırlığı ve uluslararası sınavlara yönelik konu anlatımı ve soru çözümü.",
    tag: "Cent-S · IMAT",
  },
  {
    id: "fen-bilimleri",
    numeral: "III",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3h6M10 3v6l-5.5 9a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9V3" />
        <path d="M7 15h10" />
      </svg>
    ),
    title: "Fizik, Kimya, Biyoloji",
    desc: "Üniversite giriş sınavlarına yönelik fen bilimleri konu anlatımı ve soru çözümü.",
    tag: "IMAT · Cent-S",
  },
  {
    id: "tarih-sanat",
    numeral: "IV",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 0 4 23V5.5Z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 1 2.5 2V5.5Z" />
      </svg>
    ),
    title: "Tarih, Sanat Tarihi",
    desc: "Sınav müfredatına uygun tarih ve sanat tarihi konu anlatımı ve deneme çalışmaları.",
    tag: "Test ARCHED",
  },
  {
    id: "italyanca",
    numeral: "V",
    icon: <ChatIcon />,
    title: "İtalyanca",
    desc: "İtalya'da okumak isteyenler için seviyenize uygun, pratik odaklı dersler.",
    tag: "40€ / saat",
  },
  {
    id: "almanca",
    numeral: "VI",
    icon: <ChatIcon />,
    title: "Almanca",
    desc: "A1'den C1'e, Almanya üniversite hazırlığına ve günlük konuşma pratiğine yönelik dersler.",
    tag: "40€ / saat",
  },
  {
    id: "fransizca",
    numeral: "VII",
    icon: <ChatIcon />,
    title: "Fransızca",
    desc: "Sıfırdan ileri seviyeye, akademik ve günlük kullanıma yönelik birebir dersler.",
    tag: "40€ / saat",
  },
  {
    id: "ispanyolca",
    numeral: "VIII",
    icon: <ChatIcon />,
    title: "İspanyolca",
    desc: "Sıfırdan ileri seviyeye, akademik ve günlük kullanıma yönelik birebir dersler.",
    tag: "40€ / saat",
  },
];

const STEPS = [
  {
    num: "I",
    title: "Seviye Tespiti",
    desc: "Kısa bir görüşmeyle mevcut seviyenizi ve hedefinizi belirliyoruz.",
  },
  {
    num: "II",
    title: "Programın Planlanması",
    desc: "Size uygun eğitmen ve haftalık ders programı oluşturuluyor.",
  },
  {
    num: "III",
    title: "Birebir Dersler",
    desc: "Online veya yüz yüze, düzenli takip ve geri bildirimle derslere başlıyorsunuz.",
  },
];

export default function OzelDersPage() {
  return (
    <main>
      <PageHeader
        crumb="Özel Ders"
        canto="Canto II"
        cantoLabel="Özel Ders"
        title="Sınavlarda Başarı Odaklı Özel Dersler"
        lede="Alanında uzman öğretmenlerimizden birebir, seviyenize özel ve esnek programlı dersler. Saati 40€."
      />

      {/* SUBJECT CARDS */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow on-light">Derslerimiz</div>
            <h2>Hedefinize uygun sekiz alan</h2>
            <p className="desc">
              Sınavlarda başarı odaklı özel derslerimiz, alanında uzman öğretmenler tarafından
              verilmektedir.
            </p>
          </div>
        </div>
        <div className="wrap">
          <div className="card-grid reveal">
            {SUBJECTS.map((subject) => (
              <article key={subject.id} className="svc-card" id={subject.id}>
                <span className="svc-numeral">{subject.numeral}</span>
                <span className="svc-icon">{subject.icon}</span>
                <h3 className="svc-title">{subject.title}</h3>
                <p className="svc-desc">{subject.desc}</p>
                <span className="svc-tag">{subject.tag}</span>
              </article>
            ))}
          </div>
          <div
            className="reveal"
            style={{
              marginTop: 36,
              padding: "22px 26px",
              border: "1px solid var(--parchment-deep)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="eyebrow on-light" style={{ marginBottom: 8 }}>
                Fiyatlandırma
              </div>
              <p style={{ fontSize: 15, color: "var(--ink-soft)", fontFamily: "'EB Garamond',serif" }}>
                Tüm derslerde saat ücreti <strong style={{ color: "var(--ink)" }}>40€</strong>
                &apos;dur.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--crimson)",
                }}
              >
                Danışmanlık Hizmeti Alanlara Özel
              </div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, marginTop: 4 }}>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "var(--ink-soft)",
                    fontSize: 17,
                    marginRight: 8,
                  }}
                >
                  40€
                </span>
                <strong style={{ color: "var(--crimson)" }}>30€</strong>{" "}
                <span style={{ fontSize: 14, color: "var(--ink-soft)" }}>/ saat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-sm" style={{ background: "var(--parchment-dark)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow on-light">Nasıl Çalışıyoruz?</div>
            <h2>Üç adımda derslere başlayın</h2>
          </div>
          <div className="timeline reveal">
            {STEPS.map((step) => (
              <div key={step.num} className="timeline-item">
                <div className="timeline-num">{step.num}</div>
                <div className="timeline-body">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <CtaBanner
        title="Hangi dersle başlamak istersiniz?"
        text="Seviye tespiti için ücretsiz bir görüşme planlayalım."
        buttonLabel="Ders Talep Et"
      />
    </main>
  );
}
