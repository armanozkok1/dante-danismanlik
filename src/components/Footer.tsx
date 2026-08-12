import Link from "next/link";
import DanteSeal from "@/components/DanteSeal";
import { CONTACT } from "@/lib/site";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <DanteSeal clipId="clipFTR" />
              <span>
                Dante<small>Yurtdışı Eğitim Danışmanlığı</small>
              </span>
            </Link>
            <p>
              İtalya, Almanya, Fransa, Amerika, İngiltere, Polonya, Portekiz ve İspanya&apos;da
              üniversite danışmanlığı; özel ders ve yerleşim destek paketleriyle öğrencilerin
              yanında.
            </p>
            <div className="social-row">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="7" y1="10" x2="7" y2="17" />
                  <circle cx="7" cy="7" r="0.6" fill="currentColor" />
                  <path d="M11 17v-4.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5V17" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="6" width="18" height="12" rx="3" />
                  <path d="M11 10l4 2-4 2v-4Z" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Kurumsal</h4>
            <ul>
              <li>
                <Link href="/">Anasayfa</Link>
              </li>
              <li>
                <Link href="/hakkimizda/">Hakkımızda</Link>
              </li>
              <li>
                <Link href="/basarilar/">Başarılarımız</Link>
              </li>
              <li>
                <Link href="/iletisim/">İletişim</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Hizmetler</h4>
            <ul>
              <li>
                <Link href="/danismanlik/">Danışmanlık</Link>
              </li>
              <li>
                <Link href="/ozel-ders/">Özel Ders</Link>
              </li>
              <li>
                <Link href="/danismanlik/#havalimani">Havalimanı Karşılama</Link>
              </li>
              <li>
                <Link href="/danismanlik/#ev-bulma">Ev Bulma Hizmeti</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>İletişim</h4>
            <ul>
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp1.tel}`}
                  target="_blank"
                  rel="noopener"
                >
                  {CONTACT.whatsapp1.label} (WhatsApp)
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <a href="#">Karşıyaka, İzmir</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Dante Eğitim Danışmanlığı. Tüm hakları saklıdır.</span>
          <span>Gizlilik Politikası · Kullanım Şartları</span>
        </div>
      </div>
    </footer>
  );
}
