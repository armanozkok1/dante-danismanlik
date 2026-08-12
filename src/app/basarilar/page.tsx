import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TestimonialSlider from "@/components/TestimonialSlider";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Başarı Hikayeleri — Dante Eğitim Danışmanlığı",
  description:
    "İtalya, Almanya, Fransa, Amerika, İngiltere, Polonya, Portekiz ve İspanya'daki üniversitelere yerleşen öğrencilerimizin başarı hikayeleri.",
};

const FEATURED = [
  {
    quote:
      "Dante olmasaydı Bocconi'deki başvurumu bu kadar net bir hikayeye dönüştüremezdim. Danışmanım hem başvuru hem de İtalyanca hazırlığımda her adımda yanımdaydı.",
    initials: "EA",
    name: "Ela Aydın",
    school: "Bocconi University, Milano",
    country: "İtalya",
  },
  {
    quote:
      "IELTS hazırlığından başvuru sürecine kadar her şey o kadar organizeydi ki, TU München'e kabul almaktan başka bir şey düşünmedim.",
    initials: "BK",
    name: "Berk Kaya",
    school: "Technical University of Munich",
    country: "Almanya",
  },
  {
    quote:
      "Almanca derslerine sıfırdan başladım, bir yıl sonra Heidelberg'de kabul mektubumu elime aldım. Dante'nin dil ve danışmanlığı bir arada sunması büyük fark yarattı.",
    initials: "SD",
    name: "Selin Demir",
    school: "Heidelberg University",
    country: "Almanya",
  },
];

const MORE = [
  {
    quote:
      "Matematik derslerim olmasaydı Politecnico di Milano'nun giriş sınavını bu kadar rahat geçemezdim.",
    initials: "CY",
    name: "Cem Yıldız",
    school: "Politecnico di Milano",
    country: "İtalya",
  },
  {
    quote:
      "Danışmanlık paketi gerçekten söylendiği gibi uçtan uca; vize sürecinde bile yalnız kalmadım.",
    initials: "ZK",
    name: "Zeynep Kurt",
    school: "RWTH Aachen University",
    country: "Almanya",
  },
  {
    quote:
      "İngilizce derslerimle IELTS hedef puanımı iki ayda yakaladım, başvuru takvimini kaçırmadım.",
    initials: "AT",
    name: "Ahmet Taş",
    school: "LUISS Guido Carli, Roma",
    country: "İtalya",
  },
];

export default function BasarilarPage() {
  return (
    <main>
      <PageHeader
        crumb="Başarılarımız"
        canto="Canto IV"
        cantoLabel="Başarı Hikayeleri"
        title="Sekiz Ülkede Okuyan Öğrencilerimiz"
        lede="Danışmanlık ve özel ders desteğimizle hedeflerine ulaşan öğrencilerimizin hikayeleri."
      />

      {/* FEATURED SLIDER */}
      <section className="testimonials">
        <div className="wrap">
          <TestimonialSlider slides={FEATURED} />
        </div>
      </section>

      {/* MORE STORIES GRID */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow on-light">Daha Fazla</div>
            <h2>Diğer öğrencilerimizden notlar</h2>
          </div>
          <div className="testi-grid reveal">
            {MORE.map((item) => (
              <article key={item.name} className="testi-card">
                <span className="quote-mark">&quot;</span>
                <blockquote>{item.quote}</blockquote>
                <div className="testi-meta">
                  <span className="initials">{item.initials}</span>
                  <div>
                    <div className="name">{item.name}</div>
                    <div className="school">{item.school}</div>
                    <div className="country">{item.country}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <CtaBanner
        title="Sıradaki başarı hikayesi sizin olsun"
        text="Ücretsiz ön görüşmede yolculuğunuza birlikte başlayalım."
        buttonLabel="Ücretsiz Ön Görüşme Planlayın"
      />
    </main>
  );
}
