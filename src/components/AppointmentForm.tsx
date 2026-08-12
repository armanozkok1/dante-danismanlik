"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CONTACT, FORMSPREE_ENDPOINT } from "@/lib/site";
import type { DanteUser } from "@/lib/firebase";

/*
  RANDEVU FORMU — Formspree entegrasyonu
  Form gönderileri FORMSPREE_ENDPOINT (src/lib/site.ts) adresine düşer ve
  Formspree'de doğrulanmış admin e-postasına iletilir. _gotcha alanı basit
  bot koruması için gizli bir tuzak (honeypot) alanıdır.
*/

type Status = "idle" | "sending" | "success" | "error";

export default function AppointmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Giriş yapan kullanıcının adı/e-postası boş alanlara otomatik yazılır
  // (SiteChrome'daki Firebase durum köprüsünden gelir).
  useEffect(() => {
    const onUser = (e: Event) => {
      const user = (e as CustomEvent<DanteUser | null>).detail;
      if (!user) return;
      if (nameRef.current && user.displayName && !nameRef.current.value)
        nameRef.current.value = user.displayName;
      if (emailRef.current && user.email && !emailRef.current.value)
        emailRef.current.value = user.email;
    };
    window.addEventListener("dante:user", onUser);
    return () => window.removeEventListener("dante:user", onUser);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Formspree yanıtı başarısız");
      setStatus("success");
      requestAnimationFrame(() => {
        successRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    } catch {
      setStatus("error");
    }
  };

  const disabled = status === "success";
  const sending = status === "sending";

  return (
    <form
      className="appt"
      id="apptForm"
      noValidate
      action={FORMSPREE_ENDPOINT}
      method="POST"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="_subject" value="Yeni Randevu Talebi — Dante Eğitim Danışmanlığı" />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />
      <div className="field">
        <label htmlFor="f-name">İsim Soyisim</label>
        <input
          ref={nameRef}
          id="f-name"
          name="name"
          type="text"
          placeholder="Adınız Soyadınız"
          required
          disabled={disabled}
        />
      </div>
      <div className="field">
        <label htmlFor="f-phone">Telefon</label>
        <input
          id="f-phone"
          name="phone"
          type="tel"
          placeholder="+90 5xx xxx xx xx"
          required
          disabled={disabled}
        />
      </div>
      <div className="field full">
        <label htmlFor="f-email">E-posta</label>
        <input
          ref={emailRef}
          id="f-email"
          name="email"
          type="email"
          placeholder="ornek@eposta.com"
          required
          disabled={disabled}
        />
      </div>
      <div className="field full">
        <label htmlFor="f-service">İlgilenilen Hizmet</label>
        <select id="f-service" name="service" required defaultValue="" disabled={disabled}>
          <option value="" disabled>
            Bir hizmet seçin
          </option>
          <option>Yurtdışı Eğitim Danışmanlığı</option>
          <option>Özel Ders</option>
          <option>Havalimanında Karşılama Paketi</option>
          <option>Ev Bulma Hizmeti</option>
          <option>Diğer / Emin Değilim</option>
        </select>
      </div>
      <div className="field full">
        <label htmlFor="f-message">Mesajınız</label>
        <textarea
          id="f-message"
          name="message"
          placeholder="Hedef ülke/ders ve hedefleriniz hakkında birkaç cümle yazın..."
          disabled={disabled}
        ></textarea>
      </div>
      <div className="submit-row">
        <button type="submit" className="btn btn-gold" disabled={disabled || sending}>
          {sending ? "Gönderiliyor…" : "Randevu Talep Et"}
        </button>
        <span className="form-note">Bilgileriniz gizli tutulur, üçüncü taraflarla paylaşılmaz.</span>
      </div>
      <div ref={successRef} className={`form-success${status === "success" ? " show" : ""}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <p>
          <strong>Talebiniz alındı.</strong> Danışmanlarımızdan biri en kısa sürede sizinle
          iletişime geçecek.
        </p>
      </div>
      <div className={`form-error${status === "error" ? " show" : ""}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5M12 16h.01" />
        </svg>
        <p>
          <strong>Bir şeyler ters gitti.</strong> Lütfen tekrar deneyin veya doğrudan{" "}
          <a href={`mailto:${CONTACT.email}`} style={{ textDecoration: "underline" }}>
            {CONTACT.email}
          </a>{" "}
          adresine yazın.
        </p>
      </div>
    </form>
  );
}
