import type { CSSProperties } from "react";
import { asset } from "@/lib/site";

// Büyük Dante arması (anasayfa hero'su ve Hakkımızda sayfası).
export default function SealLarge({
  clipId,
  style,
}: {
  clipId: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className="dante-mark seal-large"
      viewBox="0 0 320 320"
      role="img"
      aria-label="Dante Eğitim Danışmanlığı arması"
      style={style}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="160" cy="160" r="112" />
        </clipPath>
      </defs>
      <image
        className="seal-portrait"
        href={asset("/assets/img/dante-seal-400.jpg")}
        x="20"
        y="20"
        width="280"
        height="280"
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
      />
      <circle
        className="seal-ring"
        cx="160"
        cy="160"
        r="138"
        strokeWidth="6"
        strokeDasharray="650.31 216.77"
        transform="rotate(135 160 160)"
      />
      <text
        x="160"
        y="281"
        textAnchor="middle"
        fontFamily="Cinzel, serif"
        fontWeight="700"
        fontSize="25"
        letterSpacing="4"
        fill="#DCC07F"
      >
        DANTE
      </text>
      <text
        x="160"
        y="300"
        textAnchor="middle"
        fontFamily="Cinzel, serif"
        fontWeight="500"
        fontSize="12.5"
        letterSpacing="2.5"
        fill="#B8923F"
      >
        DANIŞMANLIK
      </text>
    </svg>
  );
}
