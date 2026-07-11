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

  Bu adımlar tamamlanmadan bu dosya sessizce devre dışı kalır;
  "Giriş Yap / Kayıt Ol" butonu görünür ama tıklandığında
  kullanıcıya sistemin henüz aktif olmadığını söyleyen bir
  bilgi mesajı gösterir.
  ==========================================================
*/

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

let auth = null;
if (isConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (err) {
    console.error("[Dante] Firebase başlatılamadı:", err);
  }
} else {
  console.warn(
    "[Dante] Firebase yapılandırılmadı. assets/auth.js dosyasındaki " +
    "firebaseConfig placeholder değerlerini kendi Firebase projenizin " +
    "bilgileriyle değiştirin (bkz. dosyanın başındaki kurulum notu)."
  );
}

const $ = function (sel) { return document.querySelector(sel); };

const overlay = $("#authOverlay");
const openBtns = document.querySelectorAll(".auth-open-trigger");
const closeBtn = $("#authCloseBtn");
const tabs = document.querySelectorAll(".auth-tab");
const forms = document.querySelectorAll(".auth-form");
const authMsg = $("#authMsg");
const userChips = document.querySelectorAll(".user-chip");
const logoutBtns = document.querySelectorAll(".logout-trigger");
const loginForm = $("#loginForm");
const registerForm = $("#registerForm");

function showMsg(text, type) {
  if (!authMsg) return;
  authMsg.textContent = text;
  authMsg.className = "auth-msg show " + type;
}
function clearMsg() {
  if (!authMsg) return;
  authMsg.className = "auth-msg";
  authMsg.textContent = "";
}

function openModal() {
  if (!overlay) return;
  clearMsg();
  if (!isConfigured) {
    showMsg(
      "Giriş sistemi henüz etkinleştirilmedi. Site yöneticisi Firebase " +
      "yapılandırmasını tamamlamalı (assets/auth.js).",
      "info"
    );
  }
  overlay.classList.add("open");
}
function closeModal() {
  if (overlay) overlay.classList.remove("open");
}
openBtns.forEach(function (btn) { btn.addEventListener("click", openModal); });
if (closeBtn) closeBtn.addEventListener("click", closeModal);
if (overlay) {
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (t) { t.classList.remove("active"); });
    forms.forEach(function (f) { f.classList.remove("active"); });
    tab.classList.add("active");
    const target = document.querySelector('[data-form="' + tab.dataset.tab + '"]');
    if (target) target.classList.add("active");
    clearMsg();
  });
});

function autofillAppointmentForm(user) {
  const nameField = document.getElementById("f-name");
  const emailField = document.getElementById("f-email");
  if (nameField && user.displayName && !nameField.value) nameField.value = user.displayName;
  if (emailField && user.email && !emailField.value) emailField.value = user.email;
}

function setLoggedInUI(user) {
  openBtns.forEach(function (btn) { btn.style.display = "none"; });
  const label = (user.displayName || user.email || "?").trim();
  userChips.forEach(function (chip) {
    chip.style.display = "flex";
    const avatarEl = chip.querySelector(".avatar");
    const nameEl = chip.querySelector(".user-name-label");
    if (avatarEl) avatarEl.textContent = label.charAt(0).toUpperCase();
    if (nameEl) nameEl.textContent = user.displayName || user.email;
  });
  autofillAppointmentForm(user);
}
function setLoggedOutUI() {
  openBtns.forEach(function (btn) { btn.style.display = ""; });
  userChips.forEach(function (chip) { chip.style.display = "none"; });
}

if (auth) {
  onAuthStateChanged(auth, function (user) {
    if (user) setLoggedInUI(user);
    else setLoggedOutUI();
  });
}

function mapAuthError(err) {
  const code = err && err.code ? err.code : "";
  const map = {
    "auth/invalid-email": "Geçerli bir e-posta adresi girin.",
    "auth/user-not-found": "Bu e-posta ile kayıtlı bir hesap bulunamadı.",
    "auth/wrong-password": "Şifre hatalı, lütfen tekrar deneyin.",
    "auth/invalid-credential": "E-posta veya şifre hatalı.",
    "auth/email-already-in-use": "Bu e-posta zaten kayıtlı, giriş yapmayı deneyin.",
    "auth/weak-password": "Şifre en az 6 karakter olmalı.",
    "auth/popup-closed-by-user": "Google penceresi kapatıldı, tekrar deneyin.",
    "auth/api-key-not-valid.-please-pass-a-valid-api-key.": "Firebase yapılandırması geçersiz."
  };
  return map[code] || "Bir hata oluştu, lütfen tekrar deneyin.";
}

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!auth) {
      showMsg("Giriş sistemi henüz yapılandırılmadı.", "info");
      return;
    }
    const email = document.getElementById("li-email").value;
    const pass = document.getElementById("li-pass").value;
    signInWithEmailAndPassword(auth, email, pass)
      .then(function () {
        clearMsg();
        closeModal();
      })
      .catch(function (err) { showMsg(mapAuthError(err), "error"); });
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!auth) {
      showMsg("Kayıt sistemi henüz yapılandırılmadı.", "info");
      return;
    }
    const name = document.getElementById("re-name").value;
    const email = document.getElementById("re-email").value;
    const pass = document.getElementById("re-pass").value;
    createUserWithEmailAndPassword(auth, email, pass)
      .then(function (cred) {
        const done = name ? updateProfile(cred.user, { displayName: name }) : Promise.resolve();
        return done;
      })
      .then(function () {
        clearMsg();
        closeModal();
      })
      .catch(function (err) { showMsg(mapAuthError(err), "error"); });
  });
}

document.querySelectorAll("#googleLoginBtn, #googleRegisterBtn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (!auth) {
      showMsg("Giriş sistemi henüz yapılandırılmadı.", "info");
      return;
    }
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(function () {
        clearMsg();
        closeModal();
      })
      .catch(function (err) { showMsg(mapAuthError(err), "error"); });
  });
});

logoutBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (auth) signOut(auth);
  });
});
