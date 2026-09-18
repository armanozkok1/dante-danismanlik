"use client";

import * as React from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export interface AuthCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onError"> {
  defaultMode?: "login" | "register" | "forgot-password";
  logo?: React.ReactNode;
  title?: string;
  showSocial?: boolean;
  onLogin?: (data: { email: string; password?: string; rememberMe?: boolean }) => Promise<void> | void;
  onRegister?: (data: { name?: string; email: string; password?: string }) => Promise<void> | void;
  onForgotPassword?: (email: string) => Promise<void> | void;
  onSocialLogin?: (provider: "github" | "google") => void;
}

export function AuthCard({
  defaultMode = "login",
  logo,
  showSocial = true,
  onLogin,
  onRegister,
  onForgotPassword,
  onSocialLogin,
  className,
  ...props
}: AuthCardProps) {
  const [mode, setMode] = React.useState<"login" | "register" | "forgot-password">(defaultMode);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [agreedTerms, setAgreedTerms] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        await onLogin?.({ email, password, rememberMe });
      } else if (mode === "register") {
        await onRegister?.({ name, email, password });
      } else if (mode === "forgot-password") {
        await onForgotPassword?.(email);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-card",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-2 mb-6">
        {logo && <div className="mb-2">{logo}</div>}
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {mode === "login" && "Hesabınıza Giriş Yapın"}
          {mode === "register" && "Yeni Hesap Oluşturun"}
          {mode === "forgot-password" && "Şifrenizi Sıfırlayın"}
        </h2>
        <p className="text-xs text-muted-foreground max-w-xs">
          {mode === "login" && "Bilgilerinizi girerek yönetim paneline erişin."}
          {mode === "register" && "Hızlıca kaydolun ve hemen kullanmaya başlayın."}
          {mode === "forgot-password" && "E-posta adresinize sıfırlama bağlantısı göndereceğiz."}
        </p>
      </div>

      {/* Social Login Buttons */}
      {showSocial && mode !== "forgot-password" && (
        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs font-medium rounded-xl h-9 gap-2 border-border/80 hover:bg-muted/50"
              onClick={() => onSocialLogin?.("github")}
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs font-medium rounded-xl h-9 gap-2 border-border/80 hover:bg-muted/50"
              onClick={() => onSocialLogin?.("google")}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Google
            </Button>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <Separator />
            <span className="absolute bg-card px-2 text-[11px] text-muted-foreground">
              veya e-posta ile
            </span>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Field (Register Mode) */}
        {mode === "register" && (
          <div className="space-y-1.5 animate-in fade-in-50 duration-200">
            <Label htmlFor="auth-name" className="text-xs">
              Ad Soyad
            </Label>
            <Input
              id="auth-name"
              placeholder="Alexourus"
              leftIcon={<User className="h-4 w-4" />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-9 text-xs rounded-xl"
            />
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-1.5">
          <Label htmlFor="auth-email" className="text-xs">
            E-posta Adresi
          </Label>
          <Input
            id="auth-email"
            type="email"
            placeholder="ornek@alanadi.com"
            leftIcon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-9 text-xs rounded-xl"
          />
        </div>

        {/* Password Field (Login & Register Modes) */}
        {mode !== "forgot-password" && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="auth-pass" className="text-xs">
                Şifre
              </Label>
              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => setMode("forgot-password")}
                  className="text-[11px] text-primary hover:underline cursor-pointer"
                >
                  Şifremi unuttum
                </button>
              )}
            </div>
            <Input
              id="auth-pass"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="text-muted-foreground hover:text-foreground pointer-events-auto cursor-pointer p-0.5"
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-9 text-xs rounded-xl"
            />
          </div>
        )}

        {/* Remember Me / Terms Checkboxes */}
        {mode === "login" && (
          <div className="flex items-center gap-2 pt-1">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
            <Label htmlFor="remember-me" className="text-xs cursor-pointer text-muted-foreground">
              Beni hatırla
            </Label>
          </div>
        )}

        {mode === "register" && (
          <div className="flex items-center gap-2 pt-1">
            <Checkbox
              id="terms-agree"
              checked={agreedTerms}
              onCheckedChange={(checked) => setAgreedTerms(!!checked)}
              required
            />
            <Label htmlFor="terms-agree" className="text-xs cursor-pointer text-muted-foreground">
              Kullanım şartlarını ve gizlilik politikasını onaylıyorum
            </Label>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full text-xs font-semibold rounded-xl h-9 gap-1.5 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>İşleniyor...</span>
            </>
          ) : (
            <>
              <span>
                {mode === "login" && "Giriş Yap"}
                {mode === "register" && "Hesap Oluştur"}
                {mode === "forgot-password" && "Sıfırlama Bağlantısı Gönder"}
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </form>

      {/* Footer Navigation */}
      <div className="mt-6 pt-4 border-t border-border/60 text-center text-xs text-muted-foreground">
        {mode === "login" && (
          <p>
            Hesabınız yok mu?{" "}
            <button
              type="button"
              onClick={() => setMode("register")}
              className="font-semibold text-foreground hover:underline"
            >
              Hemen Kaydolun
            </button>
          </p>
        )}
        {mode === "register" && (
          <p>
            Zaten hesabınız var mı?{" "}
            <button
              type="button"
              onClick={() => setMode("login")}
              className="font-semibold text-foreground hover:underline"
            >
              Giriş Yapın
            </button>
          </p>
        )}
        {mode === "forgot-password" && (
          <button
            type="button"
            onClick={() => setMode("login")}
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:underline"
          >
            <ArrowLeft className="h-3 w-3" />
            Giriş sayfasına dön
          </button>
        )}
      </div>
    </div>
  );
}
