"use client";

import * as React from "react";
import { Check, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number | string;
  priceYearly: number | string;
  currency?: string;
  periodTextMonthly?: string;
  periodTextYearly?: string;
  isPopular?: boolean;
  popularBadge?: string;
  features: PricingFeature[];
  ctaText?: string;
  ctaVariant?: "default" | "outline" | "secondary";
  onSelect?: (cycle: "monthly" | "yearly") => void;
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: PricingPlan[];
  defaultBillingCycle?: "monthly" | "yearly";
  discountBadge?: string;
  onPlanSelect?: (planId: string, cycle: "monthly" | "yearly") => void;
}

export function PricingTable({
  plans,
  defaultBillingCycle = "monthly",
  discountBadge = "%20 İndirim",
  onPlanSelect,
  className,
  ...props
}: PricingTableProps) {
  const [cycle, setCycle] = React.useState<"monthly" | "yearly">(defaultBillingCycle);

  return (
    <div className={cn("w-full space-y-8", className)} {...props}>
      {/* Billing Cycle Switcher */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setCycle("monthly")}
            className={cn(
              "rounded-lg px-4 py-1.5 text-xs font-medium transition-all duration-150",
              cycle === "monthly"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Aylık Faturalandırma
          </button>
          <button
            type="button"
            onClick={() => setCycle("yearly")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-xs font-medium transition-all duration-150",
              cycle === "yearly"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span>Yıllık Faturalandırma</span>
            {discountBadge && (
              <Badge variant="success" className="text-[10px] px-1.5 py-0">
                {discountBadge}
              </Badge>
            )}
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const price = cycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
          const currency = plan.currency || "₺";
          const period =
            cycle === "monthly"
              ? plan.periodTextMonthly || "/ay"
              : plan.periodTextYearly || "/yıl";

          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-200 bg-card",
                plan.isPopular
                  ? "border-primary ring-1 ring-primary/30 shadow-lg shadow-primary/5"
                  : "border-border/80 hover:border-border"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="gap-1 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider">
                    <Sparkles className="h-3 w-3" />
                    {plan.popularBadge || "En Popüler"}
                  </Badge>
                </div>
              )}

              <div>
                {/* Plan Title & Desc */}
                <div className="mb-4">
                  <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 my-6">
                  <span className="text-3xl font-extrabold tracking-tight text-foreground">
                    {typeof price === "number" ? `${currency}${price}` : price}
                  </span>
                  {typeof price === "number" && (
                    <span className="text-xs text-muted-foreground font-medium">{period}</span>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-2.5 border-t border-border/60 pt-5">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Dahil Olan Özellikler
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs">
                        {feature.included ? (
                          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                            <Check className="h-2.5 w-2.5" />
                          </div>
                        ) : (
                          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground/50">
                            <X className="h-2.5 w-2.5" />
                          </div>
                        )}
                        <span
                          className={cn(
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground/60 line-through"
                          )}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-4 border-t border-border/40">
                <Button
                  variant={plan.isPopular ? "default" : plan.ctaVariant || "outline"}
                  className="w-full text-xs font-semibold rounded-xl h-9"
                  onClick={() => {
                    plan.onSelect?.(cycle);
                    onPlanSelect?.(plan.id, cycle);
                  }}
                >
                  {plan.ctaText || "Planı Seç"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
