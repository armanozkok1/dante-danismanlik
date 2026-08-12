import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SealLarge from "@/components/SealLarge";
import CtaBanner from "@/components/CtaBanner";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkımızda — Dante Farkı | Dante Eğitim Danışmanlığı",
  description:
    "Dante Eğitim Danışmanlığı; İtalya'da okuyan/mezun olan Burak ve Arman tarafından kuruldu. Kendi yaşadığımız zorluklardan yola çıkarak öğrencilere uçtan uca destek sunuyoruz.",
};

export default function HakkimizdaPage() {
  return (
    <main>
      <PageHeader
        crumb="Hakkımızda"
        canto="Canto III"
        cantoLabel="Dante Farkı"
        title="Biz de Sizin Gibi Başladık"
        lede="Dante'yi kuran ikimiz de bu yolun öğrencisiyiz. Yaşadığınız her belirsizliği biz de yaşadık — bu yüzden buradayız."
      />

      <section className="about" style={{ paddingTop: 100 }}>
        <div className="wrap about-grid">
          <div className="about-copy reveal">
            <div className="eyebrow">Hikayemiz</div>
            <h2
              style={{
                marginTop: 18,
                color: "var(--on-deep)",
                fontSize: "clamp(28px,3.4vw,42px)",
              }}
            >
              İki öğrencinin yol arkadaşlığından doğdu
            </h2>
            <p className="body-lg">
              Dante&apos;yi, İtalya&apos;da eğitim sürecini bizzat deneyimlemiş iki kurucu olarak
              hayata geçirdik. Kurucularımızdan biri beş yıldır İtalya&apos;da yaşıyor ve
              üniversiteden burada mezun oldu; diğerimiz ise şu anda İtalya&apos;da ikinci sınıf
              öğrencisi. Yani bu satırları yazarken bile aramızdan biri hâlâ sınav döneminin
              içinde, aynı ders yükünü ve aynı kaygıyı bizzat taşıyor.
            </p>
            <p className="body-lg">
              Bu işe başlama sebebimiz oldukça basitti: Biz bu yola çıkarken çok sorun yaşadık,
              gittikten sonra da en az o kadar zorlandık. Başvuru sürecindeki belirsizlik bir yana,
              uçağımız havalimanına indiği andan itibaren başlayan bambaşka bir mücadele vardı — ev
              bulmak, oturma izni, SIM kart, kampüse alışmak... Kimsenin bize önceden anlatmadığı,
              sırf yaşayarak öğrendiğimiz onlarca detay. Dante&apos;yi kurarken tek bir hedefimiz
              vardı: Bu karmaşayı, bizden sonra gelecek öğrenciler için basit, anlaşılır ve
              güvenilir bir yol haritasına dönüştürmek.
            </p>
            <p className="body-lg">
              Dante ismini de tam olarak bu yüzden seçtik; hem estetik hem de tarihi bir temeli var
              — karanlıktan aydınlığa, hiç tanımadık bir topraktan yepyeni bir hayata uzanan bir
              yolculuğun hikayesi. Bizimle yola çıkan öğrencilerimizin hikayesi de aslında bundan
              çok farklı değil.
            </p>
            <p className="body-lg">
              Bugün kurucu ikilimizin yanında, öğretmenlerimizle birlikte 15 kişilik güçlü bir
              ekibiz ve büyümeye devam ediyoruz. Ekibimizde İtalya&apos;da okuyan ve mezun olanların
              yanı sıra Amerika&apos;da, Portekiz&apos;de, Polonya&apos;da ve Almanya&apos;da eğitim
              görmüş danışmanlarımız da yer alıyor. Özel ders öğretmenlerimizin tamamı kendi
              alanlarında derece yapmış isimler; kendileri de hâlâ dünyanın en iyi üniversitelerinde
              okuyor ya da oralardan mezun. Dante, iki yılı aşkın süredir bu yolda öğrencilerin
              yanında yürümeye devam ediyor — kurucu ekibimizin bu alandaki vizyonu ve tecrübesi ise
              çok daha eskiye dayanıyor.
            </p>
            <p className="body-lg" style={{ fontStyle: "italic", color: "var(--gold-soft)" }}>
              Biz sadece bir danışmanlık şirketi değiliz. Aklınıza gelebilecek neredeyse her sorunu
              ya yaşadık ya hâlâ yaşıyoruz. Ve bir öğrenciyi en iyi yine bir öğrenci anlar.
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
          </div>
          <div className="about-art reveal">
            <span className="frame-corner tl"></span>
            <span className="frame-corner br"></span>
            <SealLarge clipId="clipBIG" />
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="section-sm" style={{ background: "var(--parchment-dark)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow on-light">Kurucularımız</div>
            <h2>Hâlâ Aynı Yolun İçindeyiz</h2>
            <p className="desc">
              Dante&apos;yi kuran ikimiz de İtalya&apos;da okuduk — biri mezun oldu, diğeri hâlâ
              okuyor.
            </p>
          </div>
          <div className="founder-grid reveal">
            <article className="founder-card">
              <div className="founder-initials">B</div>
              <h3>Burak</h3>
              <div className="founder-role">Kurucu Ortak</div>
              <p>
                Beş yıldır İtalya&apos;da yaşıyor ve İtalya&apos;da üniversiteden mezun oldu.
                Dante&apos;den önce de yıllardır danışmanlık veriyor — bu piyasayı en iyi
                bilenlerden biri.
              </p>
            </article>
            <article className="founder-card">
              <div className="founder-initials">A</div>
              <h3>Arman</h3>
              <div className="founder-role">Kurucu Ortak</div>
              <p>
                Şu anda İtalya&apos;da ikinci sınıf öğrencisi. Bu satırları yazarken bile aynı sınav
                kaygısını, aynı ders yükünü yaşıyor — öğrencinin yanında olmak ona hiç uzak değil.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow on-light">İlkelerimiz</div>
            <h2>Bize güvenmenizin üç nedeni</h2>
          </div>
        </div>
        <div className="wrap">
          <div className="card-grid cols-3 reveal">
            <article className="svc-card">
              <span className="svc-numeral">I</span>
              <span className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3.5 2" />
                </svg>
              </span>
              <h3 className="svc-title">Biz de Öğrenciyiz</h3>
              <p className="svc-desc">
                Kurucularımız İtalya&apos;da okudu ve hâlâ okuyor; yaşadığınız her adımı ya yaşadık
                ya da hâlâ yaşıyoruz.
              </p>
            </article>
            <article className="svc-card">
              <span className="svc-numeral">II</span>
              <span className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                </svg>
              </span>
              <h3 className="svc-title">Öncesinde de Sonrasında da Yanınızdayız</h3>
              <p className="svc-desc">
                Sadece kabul mektubuna kadar değil, uçaktan indiğiniz andan itibaren de
                sürecinizdeyiz.
              </p>
            </article>
            <article className="svc-card">
              <span className="svc-numeral">III</span>
              <span className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 19.5V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v13.5M4 19.5A2.5 2.5 0 0 1 6.5 17H19M4 19.5A2.5 2.5 0 0 0 6.5 22H19v-5" />
                  <line x1="9" y1="7" x2="15" y2="7" />
                </svg>
              </span>
              <h3 className="svc-title">Sekiz Ülke, Geniş Bir Ekip</h3>
              <p className="svc-desc">
                İtalya, Amerika, Portekiz, Polonya ve Almanya&apos;da okumuş 15 kişilik ekibimizle
                yanınızdayız.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <CtaBanner
        title="Bizi daha yakından tanımak ister misiniz?"
        text={
          <>
            Ücretsiz ön görüşmede sorularınızı yanıtlayalım. Ya da bize doğrudan yazın:{" "}
            <a href={`mailto:${CONTACT.email}`} style={{ textDecoration: "underline" }}>
              {CONTACT.email}
            </a>
          </>
        }
        buttonLabel="Ücretsiz Ön Görüşme Planlayın"
      />
    </main>
  );
}
