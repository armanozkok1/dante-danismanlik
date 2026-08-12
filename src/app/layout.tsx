import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteChrome from "@/components/SiteChrome";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import { asset } from "@/lib/site";
import "./globals.css";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,500;1,600&family=Cinzel:wght@500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap";

export const metadata: Metadata = {
  title: "Dante Eğitim Danışmanlığı — Yurtdışı Üniversite Danışmanlığı ve Özel Ders",
  description:
    "İtalya, Almanya, Fransa, Amerika, İngiltere, Polonya, Portekiz ve İspanya'da üniversite danışmanlığı; özel ders, havalimanı karşılama ve ev bulma hizmetleri.",
  verification: { google: "ZZSttKopLXY8eGjueABUW_7-cd8qXU7utkbV_EsF0lc" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body>
        {/* React bu link etiketlerini <head>'e taşır. Favicon yolları basePath
            içerdiğinden metadata.icons yerine elle veriyoruz. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" precedence="default" href={FONTS_URL} />
        <link rel="icon" type="image/png" sizes="32x32" href={asset("/assets/img/favicon-32.png")} />
        <link rel="icon" type="image/png" sizes="16x16" href={asset("/assets/img/favicon-16.png")} />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href={asset("/assets/img/favicon-512.png")}
        />
        <link rel="apple-touch-icon" sizes="180x180" href={asset("/assets/img/favicon-180.png")} />
        <link rel="shortcut icon" href={asset("/assets/img/favicon.ico")} />

        <SiteChrome />
        {children}
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
