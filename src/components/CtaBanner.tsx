import Link from "next/link";
import type { ReactNode } from "react";

// Sayfa sonlarındaki kırmızı CTA bandı.
export default function CtaBanner({
  title,
  text,
  buttonLabel,
  href = "/iletisim/",
}: {
  title: string;
  text: ReactNode;
  buttonLabel: string;
  href?: string;
}) {
  return (
    <section className="cta-banner">
      <div className="wrap cta-banner-inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Link href={href} className="btn btn-gold">
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
