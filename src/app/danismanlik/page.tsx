import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Danışmanlık — Yurtdışı Üniversite Kabul Danışmanlığı | Dante",
  description:
    "İtalya, Almanya, Fransa, Amerika, İngiltere, Polonya, Portekiz ve İspanya'daki üniversitelere kabul danışmanlığı: üniversite seçimi, başvuru, portfolyo, sınav hazırlığı, vize ve burs süreci.",
};

const CheckIcon = () => (
  <span className="check">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  </span>
);

const INCLUDES = [
  {
    title: "Ülke, üniversite & bölüm seçimi",
    desc: "Öğrencinin ve velinin ihtiyaç ve hedefleri doğrultusunda doğru ülke, üniversite ve bölüm seçimi",
  },
  {
    title: "Başvuru evrakları & portfolyo",
    desc: "Tüm başvuru evraklarının ve akademik portfolyonun hazırlanması",
  },
  {
    title: "Sınavlara hazırlık desteği",
    desc: "Alanında uzman öğretmen kadromuzdan sınavlara özel ders desteği",
  },
  {
    title: "CV & portfolyo yönetimi",
    desc: "Akademik ve kişisel başarılarınızın güçlü bir hikayeye dönüştürülmesi",
  },
  {
    title: "Alanında uzman öğretmen kadrosu",
    desc: "Sınavlara hazırlıkta deneyimli eğitmenlerden birebir destek",
  },
  {
    title: "Vize & burs başvurusu",
    desc: "Vize süreci ve burs başvurularında uçtan uca rehberlik",
  },
];

const TIMELINE = [
  {
    num: "I",
    title: "Keşif Görüşmesi",
    desc: "Hedeflerinizi, akademik geçmişinizi ve dil seviyenizi birlikte değerlendiriyoruz.",
  },
  {
    num: "II",
    title: "Strateji & Üniversite Seçimi",
    desc: "Sekiz ülke arasından size en uygun üniversite ve bölümleri belirleyip başvuru takvimini planlıyoruz.",
  },
  {
    num: "III",
    title: "Başvuru & Portfolyo",
    desc: "Evraklarınızı, motivasyon mektubunuzu ve akademik portfolyonuzu birlikte hazırlıyoruz.",
  },
  {
    num: "IV",
    title: "Sınav & Dil Hazırlığı",
    desc: "IELTS, SAT, TOLC-SU gibi sınavlara ve gerekli dil hazırlığına özel derslerimizle destek veriyoruz.",
  },
  {
    num: "V",
    title: "Kabul & Vize",
    desc: "Kabul mektubunuzun ardından vize ve burs başvurunuzda yanınızdayız; varışınızda da yalnız bırakmıyoruz.",
  },
];

export default function DanismanlikPage() {
  return (
    <main>
      <PageHeader
        crumb="Danışmanlık"
        canto="Canto I"
        cantoLabel="Danışmanlık"
        title="Yurtdışı Üniversitelere Kabul Danışmanlığı"
        lede="İtalya, Almanya, Fransa, Amerika, İngiltere, Polonya, Portekiz ve İspanya'da; üniversite seçiminden vize ve yerleşim sürecine, başvurunuzun her aşamasında sizinle birlikteyiz."
      />

      {/* PRICE + INTRO */}
      <section>
        <div className="wrap consult-grid">
          <div className="reveal">
            <div className="eyebrow on-light">Neden Danışmanlık?</div>
            <h2 style={{ marginTop: 18, fontSize: "clamp(24px,2.8vw,32px)" }}>
              Her öğrenci için tek bir strateji, baştan sona
            </h2>
            <p
              style={{
                marginTop: 20,
                fontSize: 15.5,
                color: "var(--ink-soft)",
                lineHeight: 1.8,
                maxWidth: 560,
              }}
            >
              İtalya, Almanya, Fransa, Amerika, İngiltere, Polonya, Portekiz ve İspanya&apos;nın
              üniversite sistemleri, başvuru takvimleri ve dil gereksinimleri birbirinden oldukça
              farklıdır. Danışmanlarımız ve velilerin ihtiyaç ve hedefleri doğrultusunda doğru
              ülkeyi, doğru üniversiteyi ve doğru bölümü belirleyip başvurudan kabule kadar sürecin
              tamamında yanınızda oluruz.
            </p>

            <div style={{ marginTop: 52 }}>
              <div className="eyebrow on-light">Pakete Neler Dahil?</div>
              <ul className="include-list" style={{ marginTop: 28 }}>
                {INCLUDES.map((item) => (
                  <li key={item.title}>
                    <CheckIcon />
                    <span>
                      <strong>{item.title}</strong>
                      <br />
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal price-col">
            <div className="price-panel">
              <span className="frame-corner tl"></span>
              <span className="frame-corner br"></span>
              <div className="label">Danışmanlık Paketi</div>
              <div className="amount" style={{ fontSize: 34, lineHeight: 1.3 }}>
                Ücretsiz Görüşme Sonrası
                <br />
                <span style={{ color: "var(--gold-soft)", fontStyle: "italic" }}>Özel Teklif</span>
              </div>
              <div className="unit">
                Hedef ülke, üniversite ve başvuru kapsamınıza göre size özel fiyatlandırılır
              </div>
              <Link href="/iletisim/" className="btn btn-gold btn-block">
                Ücretsiz Ön Görüşme Talep Et
              </Link>
              <div className="fine">
                Görüşme sonrası size özel yol haritası ve net fiyat teklifi hazırlanır.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="section-sm" style={{ background: "var(--parchment-dark)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow on-light">Süreç</div>
            <h2>Beş adımda kabul yolculuğunuz</h2>
            <p className="desc">İlk görüşmeden kabul mektubuna kadar izlediğimiz yol haritası.</p>
          </div>
          <div className="timeline reveal">
            {TIMELINE.map((step) => (
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

      {/* ARRIVAL PACKAGES */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow on-light">Ek Hizmetler</div>
            <h2>Varışınızda da Yanınızdayız</h2>
            <p className="desc">
              Kabul mektubunuzu aldıktan sonra yeni şehrinizde kolay bir başlangıç yapmanız için iki
              ayrı destek paketi sunuyoruz.
            </p>
          </div>
        </div>
        <div className="wrap">
          <div className="split-grid reveal">
            <article className="split-card" id="havalimani">
              <span className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 12 22 4l-8 18-3-7-7-3Z" />
                </svg>
              </span>
              <h3 className="split-title">
                Havalimanında Karşılama ve Üniversiteye Başlangıç Paketi
              </h3>
              <p className="split-desc">
                Süreci başarıyla tamamladınız ve hedef şehrinize vardınız. Sizi havalimanında
                karşılıyor, yeni evinize kadar eşlik ediyor ve yeni hayatınıza kolay bir başlangıç
                yapmanız için yanınızda oluyoruz.
              </p>
              <ul className="split-list">
                <li>SIM kartı alma</li>
                <li>Oturma izni başvurusu</li>
                <li>Toplu taşıma kartı çıkartma</li>
                <li>Kampüse ziyaret</li>
              </ul>
              <div className="split-price">
                <b>650€</b>
              </div>
              <Link href="/iletisim/" className="btn btn-crimson">
                Bu Paketi Talep Et
              </Link>
            </article>
            <article className="split-card" id="ev-bulma">
              <span className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 11 12 4l8 7" />
                  <path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9" />
                </svg>
              </span>
              <h3 className="split-title">Ev Bulma Hizmeti</h3>
              <p className="split-desc">
                Emlakçıları ve ev sahiplerini sizin için ziyaret ediyor, ihtiyaçlarınıza yönelik ev
                bulmanıza yardımcı oluyoruz.
              </p>
              <div className="split-price">
                <b>500€</b>
              </div>
              <Link href="/iletisim/" className="btn btn-crimson">
                Bu Hizmeti Talep Et
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <CtaBanner
        title="Danışmanlık sürecinizi bugün başlatın"
        text="Ücretsiz ön görüşmede hedeflerinizi konuşalım."
        buttonLabel="Ücretsiz Ön Görüşme Planlayın"
      />
    </main>
  );
}
