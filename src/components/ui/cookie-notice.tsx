"use client";

import * as React from "react";
import {
  Cookie,
  ShieldCheck,
  Settings2,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  ExternalLink,
  Lock,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

export type CookieNoticeDesign =
  | "card"
  | "minimal-pill"
  | "glassmorphism"
  | "corporate-banner"
  | "center-modal";

export type CookieNoticePosition =
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"
  | "top";

export interface CookieCategory {
  /** Benzersiz kategori kimliği (örn: 'necessary', 'analytics') */
  id: string;
  /** Kategori başlığı */
  name: string;
  /** Kategori açıklaması */
  description: string;
  /** Zorunlu mu? Zorunluysa kullanıcı kapatamaz */
  required?: boolean;
  /** Varsayılan olarak açık mı? */
  defaultEnabled?: boolean;
  /** Rozet metni (opsiyonel) */
  badge?: string;
}

export interface CookieConsentData {
  /** Kullanıcı izin verdi mi? */
  accepted: boolean;
  /** Seçilen kategorilerin durumu */
  categories: Record<string, boolean>;
  /** İznin verildiği zaman damgası (timestamp) */
  timestamp: number;
  /** Onaylanan sürüm */
  version?: string;
  /** İznin geçerlilik süresi dolum zamanı (timestamp) */
  expiresAt?: number;
}

export const DEFAULT_COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: "necessary",
    name: "Zorunlu Çerezler",
    description: "Web sitesinin temel işlevleri (güvenlik, oturum yönetimi, formlar) için zorunludur. Devre dışı bırakılamaz.",
    required: true,
    defaultEnabled: true,
    badge: "Zorunlu",
  },
  {
    id: "analytics",
    name: "Analitik ve Performans",
    description: "Ziyaretçi sayılarını ve trafik kaynaklarını ölçerek sitemizin performansını analiz etmemize ve iyileştirmemize yardımcı olur.",
    required: false,
    defaultEnabled: false,
  },
  {
    id: "marketing",
    name: "Pazarlama ve Reklam",
    description: "İlgi alanlarınıza göre kişiselleştirilmiş reklam ve sponsorlu içerikler sunmak amacıyla kullanılır.",
    required: false,
    defaultEnabled: false,
  },
  {
    id: "preferences",
    name: "Kişiselleştirme ve Tercihler",
    description: "Dil, tema veya bölgesel tercihleriniz gibi kişisel ayarları hatırlamak için kullanılır.",
    required: false,
    defaultEnabled: true,
  },
];

export const DEFAULT_COOKIE_STORAGE_KEY = "alex_cookie_consent";

/**
 * LocalStorage'dan mevcut çerez iznini güvenli şekilde okur.
 */
export function getStoredConsent(
  storageKey: string = DEFAULT_COOKIE_STORAGE_KEY,
  version?: string
): CookieConsentData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed: CookieConsentData = JSON.parse(raw);
    if (version && parsed.version !== version) {
      return null;
    }
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem(storageKey);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * LocalStorage'daki çerez iznini temizler.
 */
export function clearStoredConsent(
  storageKey: string = DEFAULT_COOKIE_STORAGE_KEY
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(storageKey);
  } catch {
    // Tarayıcı güvenliği kısıtları için fallback
  }
}

export interface UseCookieConsentOptions {
  storageKey?: string;
  version?: string;
  defaultCategories?: CookieCategory[];
}

/**
 * Çerez izin durumunu yönetmek için React hook'u
 */
export function useCookieConsent({
  storageKey = DEFAULT_COOKIE_STORAGE_KEY,
  version,
  defaultCategories = DEFAULT_COOKIE_CATEGORIES,
}: UseCookieConsentOptions = {}) {
  const [consent, setConsent] = React.useState<CookieConsentData | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent(storageKey, version);
    if (stored) {
      setConsent(stored);
    }
  }, [storageKey, version]);

  const hasConsented = Boolean(consent);

  const isCategoryAllowed = React.useCallback(
    (categoryId: string): boolean => {
      if (!consent) return false;
      const cat = defaultCategories.find((c) => c.id === categoryId);
      if (cat?.required) return true;
      return Boolean(consent.categories[categoryId]);
    },
    [consent, defaultCategories]
  );

  const resetConsent = React.useCallback(() => {
    clearStoredConsent(storageKey);
    setConsent(null);
  }, [storageKey]);

  return {
    consent,
    hasConsented,
    isCategoryAllowed,
    resetConsent,
    isReady: mounted,
  };
}

export interface CookieNoticeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  /** Tasarım stili */
  design?: CookieNoticeDesign;
  /** Konumlandırma (card, glassmorphism ve minimal-pill stilleri için) */
  position?: CookieNoticePosition;
  /** Geriye dönük uyumluluk için varyant */
  variant?:
    | "floating-bottom-right"
    | "floating-bottom-left"
    | "floating-center"
    | "banner-bottom"
    | "modal"
    | CookieNoticeDesign;
  /** Başlık metni */
  title?: React.ReactNode;
  /** Açıklama metni */
  description?: React.ReactNode;
  /** Üst rozet metni (ör. "KVKK & GDPR") */
  badgeText?: string;
  /** Çerez kategorileri */
  categories?: CookieCategory[];
  /** Gizlilik / Çerez Politikası bağlantı adresi */
  policyUrl?: string;
  /** Politika bağlantı metni */
  policyLabel?: string;
  /** "Tümünü Kabul Et" butonu metni */
  acceptAllLabel?: string;
  /** "Sadece Zorunluları Kabul Et" / "Reddet" butonu metni */
  rejectAllLabel?: string;
  /** "Tercihleri Kaydet" butonu metni */
  savePreferencesLabel?: string;
  /** "Tercihleri Özelleştir" butonu metni */
  customizeLabel?: string;
  /** "Tercihleri Gizle" butonu metni */
  hideCustomizeLabel?: string;
  /** LocalStorage anahtar adı */
  storageKey?: string;
  /** LocalStorage'a otomatik kaydet */
  persist?: boolean;
  /** İzin geçerlilik süresi (gün) */
  expiresDays?: number;
  /** Politika sürümü */
  version?: string;
  /** Görünürlük durumu (controlled) */
  open?: boolean;
  /** Görünürlük değişim tetikleyicisi */
  onOpenChange?: (open: boolean) => void;
  /** Tüm çerezler kabul edildiğinde */
  onAcceptAll?: (categories: Record<string, boolean>) => void;
  /** Sadece zorunlu çerezler kabul edildiğinde / reddedildiğinde */
  onRejectAll?: (categories: Record<string, boolean>) => void;
  /** Özelleştirilmiş tercihler kaydedildiğinde */
  onSavePreferences?: (categories: Record<string, boolean>) => void;
  /** Herhangi bir onay işleminde güncel veri */
  onConsentChange?: (consent: CookieConsentData) => void;
  /** Detaylı tercih paneli varsayılan olarak açık mı? */
  defaultExpanded?: boolean;
  /** Özel ikon */
  icon?: React.ReactNode;
}

export function CookieNotice({
  design: explicitDesign,
  position: explicitPosition,
  variant,
  title = "Çerez Tercihleriniz",
  description = "Deneyiminizi geliştirmek, site trafiğini analiz etmek ve kişiselleştirilmiş içerik sunmak için çerezleri kullanıyoruz.",
  badgeText = "KVKK & GDPR Uyumlu",
  categories = DEFAULT_COOKIE_CATEGORIES,
  policyUrl,
  policyLabel = "Çerez Politikası",
  acceptAllLabel = "Tümünü Kabul Et",
  rejectAllLabel = "Yalnızca Zorunlular",
  savePreferencesLabel = "Tercihleri Kaydet",
  customizeLabel = "Özelleştir",
  hideCustomizeLabel = "Gizle",
  storageKey = DEFAULT_COOKIE_STORAGE_KEY,
  persist = true,
  expiresDays,
  version = "1.0",
  open: controlledOpen,
  onOpenChange,
  onAcceptAll,
  onRejectAll,
  onSavePreferences,
  onConsentChange,
  defaultExpanded = false,
  icon,
  className,
  ...props
}: CookieNoticeProps) {
  const [mounted, setMounted] = React.useState(false);
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  // Tasarım ve Konum çözümleme (Backwards-compatibility desteğiyle)
  const resolvedDesign: CookieNoticeDesign = React.useMemo(() => {
    if (explicitDesign) return explicitDesign;
    if (variant === "banner-bottom" || variant === "corporate-banner") return "corporate-banner";
    if (variant === "modal" || variant === "center-modal") return "center-modal";
    if (variant === "minimal-pill") return "minimal-pill";
    if (variant === "glassmorphism") return "glassmorphism";
    return "card";
  }, [explicitDesign, variant]);

  const resolvedPosition: CookieNoticePosition = React.useMemo(() => {
    if (explicitPosition) return explicitPosition;
    if (variant === "floating-bottom-left") return "bottom-left";
    if (variant === "floating-center") return "bottom-center";
    if (resolvedDesign === "minimal-pill") return "bottom-center";
    return "bottom-right";
  }, [explicitPosition, variant, resolvedDesign]);

  // Kategori switch durumları
  const [selectedCategories, setSelectedCategories] = React.useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    categories.forEach((cat) => {
      initial[cat.id] = cat.required ? true : Boolean(cat.defaultEnabled);
    });
    return initial;
  });

  // İstemci tarafı hydration güvenliği ve localStorage kontrolü
  React.useEffect(() => {
    setMounted(true);
    if (controlledOpen === undefined) {
      if (persist) {
        const stored = getStoredConsent(storageKey, version);
        if (!stored) {
          setInternalOpen(true);
        } else {
          setSelectedCategories((prev) => ({
            ...prev,
            ...stored.categories,
          }));
        }
      } else {
        setInternalOpen(true);
      }
    }
  }, [controlledOpen, persist, storageKey, version]);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleClose = React.useCallback(
    (acceptedData: CookieConsentData) => {
      if (persist && typeof window !== "undefined") {
        try {
          localStorage.setItem(storageKey, JSON.stringify(acceptedData));
        } catch {
          // Fallback
        }
      }

      onConsentChange?.(acceptedData);

      if (controlledOpen === undefined) {
        setInternalOpen(false);
      }
      onOpenChange?.(false);
    },
    [persist, storageKey, onConsentChange, controlledOpen, onOpenChange]
  );

  const handleAcceptAll = React.useCallback(() => {
    const allEnabled: Record<string, boolean> = {};
    categories.forEach((cat) => {
      allEnabled[cat.id] = true;
    });

    const consentData: CookieConsentData = {
      accepted: true,
      categories: allEnabled,
      timestamp: Date.now(),
      version,
      expiresAt: expiresDays
        ? Date.now() + expiresDays * 24 * 60 * 60 * 1000
        : undefined,
    };

    setSelectedCategories(allEnabled);
    onAcceptAll?.(allEnabled);
    handleClose(consentData);
  }, [categories, version, expiresDays, onAcceptAll, handleClose]);

  const handleRejectAll = React.useCallback(() => {
    const onlyRequired: Record<string, boolean> = {};
    categories.forEach((cat) => {
      onlyRequired[cat.id] = Boolean(cat.required);
    });

    const consentData: CookieConsentData = {
      accepted: false,
      categories: onlyRequired,
      timestamp: Date.now(),
      version,
      expiresAt: expiresDays
        ? Date.now() + expiresDays * 24 * 60 * 60 * 1000
        : undefined,
    };

    setSelectedCategories(onlyRequired);
    onRejectAll?.(onlyRequired);
    handleClose(consentData);
  }, [categories, version, expiresDays, onRejectAll, handleClose]);

  const handleSavePreferences = React.useCallback(() => {
    const finalCategories: Record<string, boolean> = {};
    categories.forEach((cat) => {
      if (cat.required) {
        finalCategories[cat.id] = true;
      } else {
        finalCategories[cat.id] = Boolean(selectedCategories[cat.id]);
      }
    });

    const consentData: CookieConsentData = {
      accepted: true,
      categories: finalCategories,
      timestamp: Date.now(),
      version,
      expiresAt: expiresDays
        ? Date.now() + expiresDays * 24 * 60 * 60 * 1000
        : undefined,
    };

    onSavePreferences?.(finalCategories);
    handleClose(consentData);
  }, [categories, selectedCategories, version, expiresDays, onSavePreferences, handleClose]);

  const handleToggleCategory = (categoryId: string, checked: boolean) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [categoryId]: checked,
    }));
  };

  // SSR sırasında veya kapalıyken render etme
  if (!mounted || !isOpen) {
    return null;
  }

  // Pozisyon sınıfları
  const getPositionClass = () => {
    if (resolvedDesign === "corporate-banner") {
      return "fixed bottom-0 left-0 right-0 z-50 w-full";
    }
    if (resolvedDesign === "center-modal") {
      return "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200";
    }
    switch (resolvedPosition) {
      case "bottom-left":
        return "fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] sm:w-[460px] max-w-full";
      case "bottom-center":
        return resolvedDesign === "minimal-pill"
          ? "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] sm:w-auto max-w-3xl"
          : "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] sm:w-[520px] max-w-full";
      case "top":
        return "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] sm:w-auto max-w-3xl";
      case "bottom-right":
      default:
        return "fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[460px] max-w-full";
    }
  };

  // Ortak Kategori Switch Listesi
  const renderCategoriesList = () => (
    <ScrollArea type="always" className="h-56 pr-3">
      <div className="space-y-2.5 pr-1">
        {categories.map((category) => {
          const isChecked = category.required
            ? true
            : Boolean(selectedCategories[category.id]);

          return (
            <div
              key={category.id}
              className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-muted/40 border border-border/40 hover:bg-muted/60 transition-colors"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground">
                    {category.name}
                  </span>
                  {category.badge && (
                    <Badge
                      variant="secondary"
                      className="text-[9px] px-1.5 py-0 font-normal"
                    >
                      {category.badge}
                    </Badge>
                  )}
                  {category.required && (
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground leading-normal">
                  {category.description}
                </p>
              </div>

              <div className="pt-0.5">
                <Switch
                  checked={isChecked}
                  disabled={category.required}
                  onCheckedChange={(checked) =>
                    handleToggleCategory(category.id, checked)
                  }
                  aria-label={category.name}
                />
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );

  // =========================================================================
  // TASARIM 1: MINIMAL-PILL (Ultra Sade İnce Hap)
  // =========================================================================
  if (resolvedDesign === "minimal-pill") {
    return (
      <div
        role="region"
        aria-label="Çerez Bildirimi ve İzin Tercihleri"
        className={getPositionClass()}
      >
        <div
          className={cn(
            "relative rounded-2xl sm:rounded-full border border-border/80 bg-card/95 text-card-foreground shadow-2xl backdrop-blur-md transition-all duration-300 p-2 sm:px-4 sm:py-2.5 animate-in fade-in slide-in-from-bottom-5",
            className
          )}
          {...props}
        >
          {isExpanded ? (
            <div className="space-y-3 p-2 sm:p-3 min-w-[320px] sm:min-w-[440px]">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <div className="flex items-center gap-2">
                  <Cookie className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-foreground">{title}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="h-6 w-6 p-0 rounded-full"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
              {renderCategoriesList()}
              <div className="flex items-center justify-end gap-2 pt-1">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleSavePreferences}
                  className="text-xs h-7 px-2.5 rounded-lg"
                >
                  <Check className="h-3 w-3 mr-1" />
                  {savePreferencesLabel}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="default"
                  onClick={handleAcceptAll}
                  className="text-xs h-7 px-3 rounded-lg shadow-xs"
                >
                  {acceptAllLabel}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-foreground/90 pl-1">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {icon || <Cookie className="h-3.5 w-3.5" />}
                </div>
                <span className="font-medium text-xs leading-none">
                  Deneyiminizi geliştirmek için çerezleri kullanıyoruz.
                </span>
                {policyUrl && (
                  <a
                    href={policyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-medium underline underline-offset-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  >
                    {policyLabel}
                  </a>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(true)}
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground rounded-full gap-1"
                  title={customizeLabel}
                >
                  <Settings2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{customizeLabel}</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRejectAll}
                  className="h-7 px-2.5 text-xs rounded-full border-border/80"
                >
                  {rejectAllLabel}
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={handleAcceptAll}
                  className="h-7 px-3 text-xs rounded-full shadow-xs font-medium"
                >
                  {acceptAllLabel}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TASARIM 2: GLASSMORPHISM (Buzlu Cam & Neon Parıltı)
  // =========================================================================
  if (resolvedDesign === "glassmorphism") {
    return (
      <div
        role="region"
        aria-label="Çerez Bildirimi ve İzin Tercihleri"
        className={getPositionClass()}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border border-white/20 dark:border-white/10 bg-card/65 text-card-foreground backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] transition-all duration-300 p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-5",
            className
          )}
          {...props}
        >
          {/* Neon Arka Plan Parıltısı */}
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/15 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary border border-primary/20 shadow-inner">
                {icon || <Sparkles className="h-5 w-5" />}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>
                  {badgeText && (
                    <Badge
                      variant="outline"
                      className="text-[10px] font-medium px-2 py-0.5 gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                    >
                      <ShieldCheck className="h-3 w-3 text-emerald-400" />
                      <span>{badgeText}</span>
                    </Badge>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {description}
                  {policyUrl && (
                    <a
                      href={policyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 ml-1.5 hover:text-primary transition-colors"
                    >
                      <span>{policyLabel}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Genişletilmiş Kategoriler */}
            {isExpanded && (
              <div className="space-y-3 pt-2 border-t border-white/10 dark:border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
                {renderCategoriesList()}
              </div>
            )}

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-white/10 dark:border-white/10 items-stretch sm:items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="text-xs font-medium text-muted-foreground hover:text-foreground h-8 px-2 gap-1.5 justify-start sm:justify-center shrink-0 hover:bg-white/10"
              >
                <Settings2 className="h-3.5 w-3.5" />
                <span>{isExpanded ? hideCustomizeLabel : customizeLabel}</span>
                {isExpanded ? (
                  <ChevronUp className="h-3.5 w-3.5 opacity-60" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                )}
              </Button>

              <div className="flex items-center gap-2 justify-end shrink-0">
                {isExpanded ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleSavePreferences}
                    className="text-xs h-8 px-3 rounded-lg font-medium gap-1.5 whitespace-nowrap bg-card/40 border-white/20 hover:bg-white/10"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>{savePreferencesLabel}</span>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleRejectAll}
                    className="text-xs h-8 px-3 rounded-lg font-medium whitespace-nowrap bg-card/40 border-white/20 hover:bg-white/10"
                  >
                    {rejectAllLabel}
                  </Button>
                )}

                <Button
                  type="button"
                  size="sm"
                  variant="default"
                  onClick={handleAcceptAll}
                  className="text-xs h-8 px-4 rounded-lg font-medium whitespace-nowrap shadow-md"
                >
                  {acceptAllLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TASARIM 3: CORPORATE-BANNER (Tam Genişlikli Kurumsal Alt Bant)
  // =========================================================================
  if (resolvedDesign === "corporate-banner") {
    return (
      <div
        role="region"
        aria-label="Çerez Bildirimi ve İzin Tercihleri"
        className={getPositionClass()}
      >
        <div
          className={cn(
            "relative border-t border-border/80 bg-card/95 text-card-foreground shadow-2xl backdrop-blur-md transition-all duration-300 p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-5",
            className
          )}
          {...props}
        >
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {icon || <Cookie className="h-4 w-4" />}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    {badgeText && (
                      <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-normal">
                        {badgeText}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
                    {description}
                    {policyUrl && (
                      <a
                        href={policyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 ml-1.5 hover:text-primary transition-colors"
                      >
                        <span>{policyLabel}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground h-8 px-2.5 gap-1.5"
                >
                  <Settings2 className="h-3.5 w-3.5" />
                  <span>{isExpanded ? hideCustomizeLabel : customizeLabel}</span>
                  {isExpanded ? (
                    <ChevronUp className="h-3.5 w-3.5 opacity-60" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  )}
                </Button>

                {isExpanded ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleSavePreferences}
                    className="text-xs h-8 px-3 rounded-lg font-medium gap-1.5 whitespace-nowrap"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>{savePreferencesLabel}</span>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleRejectAll}
                    className="text-xs h-8 px-3 rounded-lg font-medium whitespace-nowrap"
                  >
                    {rejectAllLabel}
                  </Button>
                )}

                <Button
                  type="button"
                  size="sm"
                  variant="default"
                  onClick={handleAcceptAll}
                  className="text-xs h-8 px-4 rounded-lg font-medium whitespace-nowrap shadow-xs"
                >
                  {acceptAllLabel}
                </Button>
              </div>
            </div>

            {/* Genişletildiğinde Kategoriler */}
            {isExpanded && (
              <div className="pt-3 border-t border-border/60 animate-in fade-in slide-in-from-top-2 duration-200">
                {renderCategoriesList()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TASARIM 4: CENTER-MODAL (Merkezi Odak Onay Penceresi)
  // =========================================================================
  if (resolvedDesign === "center-modal") {
    return (
      <div
        role="region"
        aria-label="Çerez Bildirimi ve İzin Tercihleri"
        className={getPositionClass()}
      >
        <div
          className={cn(
            "relative w-full max-w-lg rounded-2xl border border-border/80 bg-card text-card-foreground shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200",
            className
          )}
          {...props}
        >
          {/* Header */}
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {icon || <Cookie className="h-6 w-6" />}
            </div>
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold tracking-tight text-foreground">{title}</h3>
                {badgeText && (
                  <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                    <ShieldCheck className="h-3 w-3 text-emerald-500 mr-1" />
                    {badgeText}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
                {policyUrl && (
                  <a
                    href={policyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 ml-1 hover:text-primary transition-colors"
                  >
                    <span>{policyLabel}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </p>
            </div>
          </div>

          {/* Kategoriler */}
          <div className="space-y-2 pt-1 border-t border-border/60">
            <div className="flex items-center justify-between text-xs font-semibold text-foreground py-1">
              <span>İzin Kategorileri</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="h-6 px-2 text-[11px] text-muted-foreground hover:text-foreground"
              >
                {isExpanded ? hideCustomizeLabel : customizeLabel}
              </Button>
            </div>
            {isExpanded && renderCategoriesList()}
          </div>

          {/* Aksiyonlar */}
          <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={isExpanded ? handleSavePreferences : handleRejectAll}
              className="w-full sm:flex-1 text-xs h-9 rounded-xl font-medium"
            >
              {isExpanded ? savePreferencesLabel : rejectAllLabel}
            </Button>
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleAcceptAll}
              className="w-full sm:flex-1 text-xs h-9 rounded-xl font-medium shadow-sm"
            >
              {acceptAllLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TASARIM 5: CARD (Varsayılan Modern Yüzen Kart)
  // =========================================================================
  return (
    <div
      role="region"
      aria-label="Çerez Bildirimi ve İzin Tercihleri"
      className={getPositionClass()}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border/80 bg-card/95 text-card-foreground shadow-xl backdrop-blur-md transition-all duration-300 p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-5",
          className
        )}
        {...props}
      >
        <div className="space-y-4">
          {/* Header Bölümü */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {icon || <Cookie className="h-5 w-5" />}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                {badgeText && (
                  <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5 gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    <span>{badgeText}</span>
                  </Badge>
                )}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {description}
                {policyUrl && (
                  <a
                    href={policyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4 ml-1.5 hover:text-primary transition-colors"
                  >
                    <span>{policyLabel}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Özelleştirilebilir Çerez Kategorileri Paneli (Genişletildiğinde) */}
          {isExpanded && (
            <div className="space-y-3 pt-2 border-t border-border/60 animate-in fade-in slide-in-from-top-2 duration-200">
              {renderCategoriesList()}
            </div>
          )}

          {/* Eylem Butonları */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border/40 items-stretch sm:items-center justify-between">
            {/* Tercihleri Özelleştir Aç/Kapa Butonu */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="text-xs font-medium text-muted-foreground hover:text-foreground h-8 px-2 gap-1.5 justify-start sm:justify-center shrink-0"
            >
              <Settings2 className="h-3.5 w-3.5" />
              <span>{isExpanded ? hideCustomizeLabel : customizeLabel}</span>
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5 opacity-60" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              )}
            </Button>

            {/* Kabul ve Reddet Buton Grubu */}
            <div className="flex items-center gap-2 justify-end shrink-0">
              {isExpanded ? (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleSavePreferences}
                  className="text-xs h-8 px-3 rounded-lg font-medium gap-1.5 whitespace-nowrap"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>{savePreferencesLabel}</span>
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleRejectAll}
                  className="text-xs h-8 px-3 rounded-lg font-medium whitespace-nowrap"
                >
                  {rejectAllLabel}
                </Button>
              )}

              <Button
                type="button"
                size="sm"
                variant="default"
                onClick={handleAcceptAll}
                className="text-xs h-8 px-3.5 rounded-lg font-medium whitespace-nowrap shadow-xs"
              >
                {acceptAllLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
