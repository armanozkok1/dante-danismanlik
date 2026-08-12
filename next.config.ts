import type { NextConfig } from "next";

// Site GitHub Pages'te bir proje sayfası olarak yayınlandığı için tüm yollar
// bu önekin altında yaşar (armanozkok1.github.io/dante-danismanlik).
// Özel bir alan adının köküne taşınırsa burayı '' yapmak yeterli.
const basePath = "/dante-danismanlik";

const nextConfig: NextConfig = {
  // GitHub Pages statik dosya sunar; build çıktısı out/ klasörüne yazılır.
  output: "export",
  basePath,
  // Eski site URL'leriyle birebir aynı kalsın diye: /danismanlik/ gibi.
  trailingSlash: true,
  images: { unoptimized: true },
  // İstemci koduna basePath'i tek kaynaktan aktarır (bkz. src/lib/site.ts).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
