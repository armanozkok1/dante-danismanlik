import Link from "next/link";

// Alt sayfaların koyu renkli başlık bandı (crumb + Canto + başlık + lede).
export default function PageHeader({
  crumb,
  canto,
  cantoLabel,
  title,
  lede,
}: {
  crumb: string;
  canto: string;
  cantoLabel: string;
  title: string;
  lede: string;
}) {
  return (
    <div className="page-header">
      <div className="colonnade"></div>
      <div className="wrap inner">
        <div className="crumb">
          <Link href="/">Anasayfa</Link>
          <span>/</span>
          <span>{crumb}</span>
        </div>
        <div className="eyebrow">
          <span className="numeral">{canto}</span> {cantoLabel}
        </div>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
      </div>
    </div>
  );
}
