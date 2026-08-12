import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AppointmentForm from "@/components/AppointmentForm";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim & Randevu — Dante Eğitim Danışmanlığı",
  description:
    "Ücretsiz ön görüşme talep edin: yurtdışı üniversite danışmanlığı, özel ders, havalimanı karşılama veya ev bulma hizmeti için randevu alın.",
};

export default function IletisimPage() {
  return (
    <main>
      <PageHeader
        crumb="İletişim"
        canto="Canto V"
        cantoLabel="Randevu"
        title="Yolculuğunuza Bugün Başlayın"
        lede="Danışmanlık paketi veya özel ders talebiniz için formu doldurun, danışmanlarımızdan biri 24 saat içinde sizinle iletişime geçsin."
      />

      {/* CONTACT */}
      <section className="contact" id="randevu-form">
        <div className="wrap contact-grid">
          <div className="contact-info reveal">
            <div className="eyebrow">İletişim Bilgileri</div>
            <h2
              style={{
                marginTop: 18,
                color: "var(--on-deep)",
                fontSize: "clamp(24px,2.8vw,32px)",
              }}
            >
              Bize ulaşın
            </h2>
            <div className="info-item">
              <div className="k">WhatsApp</div>
              <div className="v">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp1.tel}`}
                  target="_blank"
                  rel="noopener"
                  style={{ color: "inherit" }}
                >
                  {CONTACT.whatsapp1.label}
                </a>
              </div>
              <div className="v" style={{ marginTop: 6 }}>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp2.tel}`}
                  target="_blank"
                  rel="noopener"
                  style={{ color: "inherit" }}
                >
                  {CONTACT.whatsapp2.label}
                </a>
              </div>
            </div>
            <div className="info-item">
              <div className="k">E-posta</div>
              <div className="v">{CONTACT.email}</div>
            </div>
            <div className="info-item">
              <div className="k">Ofis</div>
              <div className="v">{CONTACT.address}</div>
            </div>
            <div className="info-item">
              <div className="k">Hizmet Bölgesi</div>
              <div className="v">Online danışmanlık ve dersler — 8 ülke kapsamında</div>
            </div>
          </div>
          <div className="reveal">
            <AppointmentForm />
          </div>
        </div>
      </section>
    </main>
  );
}
