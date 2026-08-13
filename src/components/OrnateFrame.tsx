import { asset } from "@/lib/site";

// Panoların üzerine bindirilen varak (rokoko) çerçeve görseli.
// Kapsayıcının position:relative olması gerekir; tıklamaları engellemez.
export default function OrnateFrame() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="ornate-frame"
      src={asset("/assets/img/ornate-frame.png")}
      alt=""
      aria-hidden="true"
    />
  );
}
