/*
  ==========================================================
  FIREBASE AUTHENTICATION KURULUMU
  Giriş Yap / Kayıt Ol sisteminin çalışması için:

  1) https://console.firebase.google.com adresinde ücretsiz
     bir proje oluşturun ("Add project").
  2) Proje ayarları (⚙) > Genel sekmesinden "Web uygulaması
     ekle" (</>) diyerek bir web app kaydedin. Size verilen
     firebaseConfig objesini aşağıya, placeholder değerlerin
     yerine yapıştırın.
  3) Sol menüden Authentication > Sign-in method sekmesine
     girip "E-posta/Şifre" ve "Google" sağlayıcılarını
     etkinleştirin.
  4) Authentication > Settings > Authorized domains kısmına
     yayınladığınız GitHub Pages adresini ekleyin
     (örn. armanozkok1.github.io).

  Bu adımlar tamamlanmadan giriş sistemi devre dışı kalır;
  "Giriş Yap / Kayıt Ol" butonu görünür ama tıklandığında
  kullanıcıya sistemin henüz aktif olmadığını söyleyen bir
  bilgi mesajı gösterilir.
  ==========================================================
*/

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

export const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

// Firebase SDK'sı yalnızca yapılandırma tamamlandığında, tarayıcıda ve
// CDN'den yüklenir — pakete gömülmez. Function ile sarmalamak, bundler'ın
// uzak URL'yi build sırasında çözmeye çalışmasını engeller.
const dynamicImport = (url: string): Promise<Record<string, unknown>> =>
  new Function("u", "return import(u)")(url);

const CDN = "https://www.gstatic.com/firebasejs/10.13.0";

export type DanteUser = { displayName: string | null; email: string | null };

type AuthResult = { ok: true } | { ok: false; message: string; type: "info" | "error" };

const NOT_CONFIGURED = {
  ok: false,
  type: "info",
  message: "Giriş sistemi henüz yapılandırılmadı.",
} as const satisfies AuthResult;

function mapAuthError(err: unknown): string {
  const code =
    err && typeof err === "object" && "code" in err ? String((err as { code: unknown }).code) : "";
  const map: Record<string, string> = {
    "auth/invalid-email": "Geçerli bir e-posta adresi girin.",
    "auth/user-not-found": "Bu e-posta ile kayıtlı bir hesap bulunamadı.",
    "auth/wrong-password": "Şifre hatalı, lütfen tekrar deneyin.",
    "auth/invalid-credential": "E-posta veya şifre hatalı.",
    "auth/email-already-in-use": "Bu e-posta zaten kayıtlı, giriş yapmayı deneyin.",
    "auth/weak-password": "Şifre en az 6 karakter olmalı.",
    "auth/popup-closed-by-user": "Google penceresi kapatıldı, tekrar deneyin.",
    "auth/api-key-not-valid.-please-pass-a-valid-api-key.": "Firebase yapılandırması geçersiz.",
  };
  return map[code] || "Bir hata oluştu, lütfen tekrar deneyin.";
}

/* eslint-disable @typescript-eslint/no-explicit-any */
let authPromise: Promise<any> | null = null;

async function getFirebaseAuth(): Promise<any> {
  if (!isConfigured) return null;
  if (!authPromise) {
    authPromise = (async () => {
      const { initializeApp } = (await dynamicImport(`${CDN}/firebase-app.js`)) as any;
      const authMod = (await dynamicImport(`${CDN}/firebase-auth.js`)) as any;
      const app = initializeApp(firebaseConfig);
      return { auth: authMod.getAuth(app), mod: authMod };
    })();
  }
  return authPromise;
}

export function watchAuth(callback: (user: DanteUser | null) => void): () => void {
  let unsub: (() => void) | null = null;
  let cancelled = false;
  if (isConfigured) {
    getFirebaseAuth().then((fb) => {
      if (fb && !cancelled) unsub = fb.mod.onAuthStateChanged(fb.auth, callback);
    });
  }
  return () => {
    cancelled = true;
    if (unsub) unsub();
  };
}

export async function loginWithEmail(email: string, pass: string): Promise<AuthResult> {
  if (!isConfigured) return NOT_CONFIGURED;
  try {
    const fb = await getFirebaseAuth();
    await fb.mod.signInWithEmailAndPassword(fb.auth, email, pass);
    return { ok: true };
  } catch (err) {
    return { ok: false, type: "error", message: mapAuthError(err) };
  }
}

export async function registerWithEmail(
  name: string,
  email: string,
  pass: string
): Promise<AuthResult> {
  if (!isConfigured) return { ...NOT_CONFIGURED, message: "Kayıt sistemi henüz yapılandırılmadı." };
  try {
    const fb = await getFirebaseAuth();
    const cred = await fb.mod.createUserWithEmailAndPassword(fb.auth, email, pass);
    if (name) await fb.mod.updateProfile(cred.user, { displayName: name });
    return { ok: true };
  } catch (err) {
    return { ok: false, type: "error", message: mapAuthError(err) };
  }
}

export async function loginWithGoogle(): Promise<AuthResult> {
  if (!isConfigured) return NOT_CONFIGURED;
  try {
    const fb = await getFirebaseAuth();
    const provider = new fb.mod.GoogleAuthProvider();
    await fb.mod.signInWithPopup(fb.auth, provider);
    return { ok: true };
  } catch (err) {
    return { ok: false, type: "error", message: mapAuthError(err) };
  }
}

export async function logout(): Promise<void> {
  if (!isConfigured) return;
  const fb = await getFirebaseAuth();
  await fb.mod.signOut(fb.auth);
}
