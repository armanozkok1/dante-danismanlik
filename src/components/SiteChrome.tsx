"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import DanteSeal from "@/components/DanteSeal";
import AuthModal from "@/components/AuthModal";
import { watchAuth, logout, type DanteUser } from "@/lib/firebase";

const NAV_LINKS = [
  { href: "/", label: "Anasayfa" },
  { href: "/danismanlik/", label: "Danışmanlık" },
  { href: "/ozel-ders/", label: "Özel Ders" },
  { href: "/hakkimizda/", label: "Hakkımızda" },
  { href: "/basarilar/", label: "Başarılarımız" },
  { href: "/iletisim/", label: "İletişim" },
];

const normalize = (p: string) => p.replace(/\/+$/, "") || "/";

// Header + mobil menü + giriş modalı. Sayfadan bağımsız tek parça;
// hangi sayfada olduğunu usePathname ile kendisi anlar.
export default function SiteChrome() {
  const pathname = usePathname();
  const current = normalize(pathname);
  const isHome = current === "/";
  const isContact = current === "/iletisim";

  // Anasayfada header şeffaf başlar, kaydırınca koyulaşır (transparent-start).
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  // Sayfa değişince paneli kapat.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<DanteUser | null>(null);
  useEffect(() => watchAuth(setUser), []);
  // Randevu formunun ad/e-posta alanlarını doldurabilmesi için köprü
  // (bkz. AppointmentForm).
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("dante:user", { detail: user }));
  }, [user]);

  const openAuth = useCallback(() => {
    setMobileOpen(false);
    setAuthOpen(true);
  }, []);

  const headerClass = isHome ? `transparent-start${scrolled ? " scrolled" : ""}` : "solid";
  const ctaHref = isContact ? "#randevu-form" : "/iletisim/";
  const userLabel = user ? user.displayName || user.email || "?" : "";

  const userChip = user && (
    <div className="user-chip">
      <span className="avatar">{userLabel.trim().charAt(0).toUpperCase()}</span>
      <span className="user-name-label">{userLabel}</span>
      <button type="button" className="logout-trigger" onClick={() => logout()}>
        Çıkış
      </button>
    </div>
  );

  return (
    <>
      <header id="site-header" className={headerClass}>
        <div className="wrap header-inner">
          <Link href="/" className="logo">
            <DanteSeal clipId="clipHDR" />
            <span>
              Dante
              <small>Yurtdışı Eğitim Danışmanlığı</small>
            </span>
          </Link>
          <nav className="main-nav">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={current === normalize(link.href) ? "active" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            {isContact ? (
              <a href={ctaHref} className="btn btn-gold" id="cta-desktop">
                Randevu Al
              </a>
            ) : (
              <Link href={ctaHref} className="btn btn-gold" id="cta-desktop">
                Randevu Al
              </Link>
            )}
            {!user && (
              <button
                type="button"
                className="btn btn-outline-light btn-ghost-small auth-open-trigger"
                onClick={openAuth}
              >
                Giriş Yap / Kayıt Ol
              </button>
            )}
            {userChip}
            <button
              className={`nav-toggle${mobileOpen ? " open" : ""}`}
              aria-label="Menüyü aç"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-panel${mobileOpen ? " open" : ""}`} id="mobilePanel">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={current === normalize(link.href) ? "active" : undefined}
            onClick={closeMobile}
          >
            {link.label}
          </Link>
        ))}
        <hr />
        {!user && (
          <button type="button" className="btn btn-outline-light auth-open-trigger" onClick={openAuth}>
            Giriş Yap / Kayıt Ol
          </button>
        )}
        {userChip}
        {isContact ? (
          <a href={ctaHref} className="btn btn-gold" style={{ marginTop: 10 }} onClick={closeMobile}>
            Randevu Al
          </a>
        ) : (
          <Link href={ctaHref} className="btn btn-gold" style={{ marginTop: 10 }} onClick={closeMobile}>
            Randevu Al
          </Link>
        )}
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
