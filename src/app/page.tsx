import Link from "next/link";
import HeroArtRotator from "@/components/HeroArtRotator";
import CampusCarousel from "@/components/CampusCarousel";
import SealLarge from "@/components/SealLarge";
import CtaBanner from "@/components/CtaBanner";

const COUNTRIES = [
  "İtalya",
  "Almanya",
  "Fransa",
  "Amerika",
  "İngiltere",
  "Polonya",
  "Portekiz",
  "İspanya",
];

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <HeroArtRotator />
        <div className="colonnade"></div>
        <div className="stars"></div>
        <div className="arch-frame"></div>
        <div className="wrap hero-inner">
          <div className="hero-seal-row reveal">
            <SealLarge clipId="clipBIG" style={{ width: 150, height: 150 }} />
          </div>
          <div className="hero-text">
            <div className="eyebrow">
              <span className="numeral">Dante</span> Eğitim Danışmanlığı
            </div>
            <h1>
              Geleceğinize Açılan Kapı: <em>Hayalinizdeki Üniversiteye</em> Birlikte Yürüyelim
            </h1>
            <p className="lede">
              İtalya&apos;dan Amerika&apos;ya sekiz farklı ülkede üniversite kabul sürecinde uçtan
              uca danışmanlık; özel ders ve yerleşim destek paketleriyle akademik yolculuğunuzun her
              adımında yanınızdayız.
            </p>
            <div className="flag-row">
              {COUNTRIES.map((country) => (
                <span key={country} className="flag-pill">
                  <span className="dot"></span>
                  {country}
                </span>
              ))}
            </div>
            <div className="cta-row">
              <Link href="/danismanlik/" className="btn btn-gold">
                Danışmanlık Paketini İnceleyin
              </Link>
              <Link href="/ozel-ders/" className="btn btn-outline-light">
                Özel Derslerimiz
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span className="line"></span>Keşfedin
        </div>
      </section>

      {/* SERVICES SPLIT */}
      <section className="services-split">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">
              <span className="numeral">Canto I</span> Hizmetlerimiz
            </div>
            <h2>İki net yol, tek hedef: başarı</h2>
            <p className="desc">
              İster üniversite kabul sürecinde stratejik rehberlik isterseniz dil ve akademik
              derslerde birebir destek arayın; ihtiyacınıza göre iki net hizmet sunuyoruz.
            </p>
          </div>
        </div>
        <div className="wrap">
          <div className="split-grid reveal">
            <article className="split-card">
              <span className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3 2 8l10 5 10-5-10-5Z" />
                  <path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" />
                </svg>
              </span>
              <h3 className="split-title">Danışmanlık</h3>
              <p className="split-desc">
                İtalya, Almanya, Fransa, Amerika, İngiltere, Polonya, Portekiz ve İspanya&apos;daki
                üniversitelere başvurudan kabule, tüm süreci sizinle birlikte yönetiyoruz.
              </p>
              <ul className="split-list">
                <li>Doğru ülke, üniversite ve bölüm seçimi</li>
                <li>Başvuru evrakları ve portfolyo yönetimi</li>
                <li>Sınavlara özel ders desteği</li>
                <li>Vize ve burs başvurusu</li>
              </ul>
              <div className="split-price">
                Ücretsiz görüşme sonrası <b>özel teklif</b>
              </div>
              <Link href="/danismanlik/" className="btn btn-crimson">
                Danışmanlık Detayları
              </Link>
            </article>
            <article className="split-card">
              <span className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 19.5V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v13.5M4 19.5A2.5 2.5 0 0 1 6.5 17H19M4 19.5A2.5 2.5 0 0 0 6.5 22H19v-5" />
                  <line x1="9" y1="7" x2="15" y2="7" />
                </svg>
              </span>
              <h3 className="split-title">Özel Ders</h3>
              <p className="split-desc">
                Dil sınavlarından üniversite giriş sınavlarına, alanında uzman eğitmenlerle birebir
                çalışın.
              </p>
              <ul className="split-list">
                <li>İngilizce (IELTS / SAT / TOLC-SU)</li>
                <li>Matematik, Fen Bilimleri (IMAT, Cent-S)</li>
                <li>Tarih, Sanat Tarihi (ARCHED)</li>
                <li>İtalyanca, Almanca, Fransızca, İspanyolca</li>
              </ul>
              <div className="split-price">
                <b>40€</b> / saat
              </div>
              <Link href="/ozel-ders/" className="btn btn-crimson">
                Özel Ders Detayları
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="about">
        <div className="wrap about-grid">
          <div className="about-copy reveal">
            <div className="eyebrow">
              <span className="numeral">Canto II</span> Dante Farkı
            </div>
            <h2
              style={{
                marginTop: 18,
                color: "var(--on-deep)",
                fontSize: "clamp(28px,3.4vw,42px)",
              }}
            >
              Sadece başvuru değil, tüm yolculuk
            </h2>
            <p className="body-lg">
              Dante Eğitim Danışmanlığı&apos;nda süreç, standart bir şablon değil; öğrencinin
              akademik geçmişi, dil seviyesi ve hedefleri etrafında inşa edilen kişisel bir
              stratejidir. Sekiz farklı ülkenin üniversite sistemlerini yakından tanıyan
              danışmanlarımızla, başvurudan kabule, kabulden yerleşime kadar tek adrestesiniz.
            </p>
            <div className="stat-row">
              <div className="stat">
                <div className="num">300+</div>
                <div className="label">Yerleştirilen Öğrenci</div>
              </div>
              <div className="stat">
                <div className="num">%94</div>
                <div className="label">Hedef Üniversiteye Kabul Oranı</div>
              </div>
              <div className="stat">
                <div className="num">2+</div>
                <div className="label">Yıllık Danışmanlık Tecrübesi</div>
              </div>
            </div>
            <Link href="/hakkimizda/" className="btn btn-outline-light" style={{ marginTop: 36 }}>
              Hakkımızda Daha Fazla
            </Link>
          </div>
          <div className="about-art reveal">
            <span className="frame-corner tl"></span>
            <span className="frame-corner br"></span>
            <CampusCarousel />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL TEASER */}
      <section className="testimonials">
        <div className="wrap">
          <div
            className="section-head center reveal"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <div className="eyebrow">
              <span className="numeral">Canto III</span> Başarı Hikayeleri
            </div>
            <h2>Öğrencilerimizin sesinden</h2>
          </div>
          <div className="testi-wrap reveal" style={{ textAlign: "center" }}>
            <span className="quote-mark">&quot;</span>
            <blockquote
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(20px,2.4vw,28px)",
                lineHeight: 1.5,
                fontWeight: 500,
                color: "var(--ink)",
              }}
            >
              Dante olmasaydı Bocconi&apos;deki başvurumu bu kadar net bir hikayeye
              dönüştüremezdim. Danışmanım hem başvuru hem de İtalyanca hazırlığımda her adımda
              yanımdaydı.
            </blockquote>
            <div className="testi-meta" style={{ justifyContent: "center", marginTop: 28 }}>
              <span className="initials">EA</span>
              <div style={{ textAlign: "left" }}>
                <div className="name">Ela Aydın</div>
                <div className="school">Bocconi University, Milano — İtalya</div>
              </div>
            </div>
            <Link href="/basarilar/" className="btn btn-outline-dark" style={{ marginTop: 40 }}>
              Tüm Başarı Hikayeleri
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <CtaBanner
        title="Hedefinize giden yolda ilk adımı atın"
        text="Ücretsiz ön görüşmede size en uygun yolu birlikte belirleyelim."
        buttonLabel="Ücretsiz Ön Görüşme Planlayın"
      />
    </main>
  );
}
