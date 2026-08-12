"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import GoogleIcon from "@/components/GoogleIcon";
import {
  isConfigured,
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
} from "@/lib/firebase";

type Msg = { text: string; type: "info" | "error" } | null;

const NOT_CONFIGURED_MSG: Msg = {
  type: "info",
  text:
    "Giriş sistemi henüz etkinleştirilmedi. Site yöneticisi Firebase " +
    "yapılandırmasını tamamlamalı (src/lib/firebase.ts).",
};

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [msg, setMsg] = useState<Msg>(null);
  const loginFormRef = useRef<HTMLFormElement>(null);
  const registerFormRef = useRef<HTMLFormElement>(null);

  // Modal açıldığında: mesajı sıfırla; Firebase kurulu değilse bilgi notu göster.
  useEffect(() => {
    if (open) setMsg(isConfigured ? null : NOT_CONFIGURED_MSG);
  }, [open]);

  // Escape ile kapatma.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const finish = (result: Awaited<ReturnType<typeof loginWithEmail>>) => {
    if (result.ok) {
      setMsg(null);
      onClose();
    } else {
      setMsg({ text: result.message, type: result.type });
    }
  };

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    finish(await loginWithEmail(String(data.get("email")), String(data.get("password"))));
  };

  const onRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    finish(
      await registerWithEmail(
        String(data.get("name")),
        String(data.get("email")),
        String(data.get("password"))
      )
    );
  };

  const onGoogle = async () => finish(await loginWithGoogle());

  const switchTab = (next: "login" | "register") => {
    setTab(next);
    setMsg(isConfigured ? null : NOT_CONFIGURED_MSG);
  };

  return (
    <div
      className={`modal-overlay${open ? " open" : ""}`}
      id="authOverlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="auth-modal">
        <button type="button" className="modal-close" aria-label="Kapat" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="eyebrow on-light" style={{ justifyContent: "center" }}>
          Dante Hesabım
        </div>
        <h3>Hoş Geldiniz</h3>
        <p className="modal-sub">
          Randevu talebinizi hızlıca oluşturmak için giriş yapın veya hesap açın.
        </p>
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab${tab === "login" ? " active" : ""}`}
            onClick={() => switchTab("login")}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            className={`auth-tab${tab === "register" ? " active" : ""}`}
            onClick={() => switchTab("register")}
          >
            Kayıt Ol
          </button>
        </div>
        <div className={`auth-msg${msg ? ` show ${msg.type}` : ""}`}>{msg?.text}</div>
        <form
          ref={loginFormRef}
          className={`auth-form${tab === "login" ? " active" : ""}`}
          onSubmit={onLogin}
        >
          <div className="field">
            <label htmlFor="li-email">E-posta</label>
            <input type="email" id="li-email" name="email" placeholder="ornek@eposta.com" required />
          </div>
          <div className="field">
            <label htmlFor="li-pass">Şifre</label>
            <input type="password" id="li-pass" name="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-crimson btn-block">
            Giriş Yap
          </button>
          <div className="auth-divider">veya</div>
          <button type="button" className="btn-google" onClick={onGoogle}>
            <GoogleIcon />
            Google ile Devam Et
          </button>
        </form>
        <form
          ref={registerFormRef}
          className={`auth-form${tab === "register" ? " active" : ""}`}
          onSubmit={onRegister}
        >
          <div className="field">
            <label htmlFor="re-name">Ad Soyad</label>
            <input type="text" id="re-name" name="name" placeholder="Adınız Soyadınız" required />
          </div>
          <div className="field">
            <label htmlFor="re-email">E-posta</label>
            <input type="email" id="re-email" name="email" placeholder="ornek@eposta.com" required />
          </div>
          <div className="field">
            <label htmlFor="re-pass">Şifre</label>
            <input
              type="password"
              id="re-pass"
              name="password"
              placeholder="En az 6 karakter"
              minLength={6}
              required
            />
          </div>
          <button type="submit" className="btn btn-crimson btn-block">
            Hesap Oluştur
          </button>
          <div className="auth-divider">veya</div>
          <button type="button" className="btn-google" onClick={onGoogle}>
            <GoogleIcon />
            Google ile Devam Et
          </button>
        </form>
      </div>
    </div>
  );
}
