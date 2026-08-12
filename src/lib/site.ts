// Site geneli sabitler ve yardımcılar.

// GitHub Pages proje sayfası öneki — next.config.ts'teki basePath ile aynı
// kaynaktan (env) gelir. next/link bunu otomatik ekler ama <img>, SVG <image>
// ve inline background-image gibi düz URL'lere elle eklememiz gerekir.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;

export const CONTACT = {
  email: "danteiletisim@danteegitim.com",
  whatsapp1: { tel: "393444091719", label: "+39 344 409 17 19" },
  whatsapp2: { tel: "393477957179", label: "+39 347 795 71 79" },
  address: "Bahriye Üçok Bulvarı No:4/2, Daire 1, Karşıyaka / İzmir",
};

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xoeajalr";
