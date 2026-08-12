import { asset } from "@/lib/site";

// Küçük Dante amblemi (header ve footer logosu). clipId sayfada benzersiz
// olmalı; aynı sayfada iki kez kullanılırsa (header + footer) farklı id verin.
export default function DanteSeal({ clipId }: { clipId: string }) {
  return (
    <svg
      className="dante-mark"
      width="46"
      height="46"
      viewBox="0 0 100 100"
      role="img"
      aria-label="Dante amblemi"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="50" cy="50" r="36" />
        </clipPath>
      </defs>
      <image
        className="seal-portrait"
        href={asset("/assets/img/dante-seal-400.jpg")}
        x="6"
        y="6"
        width="88"
        height="88"
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
      />
      <circle
        className="seal-ring"
        cx="50"
        cy="50"
        r="45"
        strokeWidth="4"
        strokeDasharray="212.06 70.69"
        transform="rotate(135 50 50)"
      />
    </svg>
  );
}
