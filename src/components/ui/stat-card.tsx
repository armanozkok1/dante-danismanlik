"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const statCardVariants = cva(
  "relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all duration-200 hover:border-border hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        glass: "bg-card/40 backdrop-blur-xl border-border/60",
        muted: "bg-muted/40 text-foreground border-border/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(statCardVariants({ variant }), className)}
      {...props}
    />
  )
);
StatCard.displayName = "StatCard";

const StatCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between gap-2 mb-3", className)}
    {...props}
  />
));
StatCardHeader.displayName = "StatCardHeader";

const StatCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xs font-medium text-muted-foreground tracking-wide uppercase", className)}
    {...props}
  />
));
StatCardTitle.displayName = "StatCardTitle";

const StatCardIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground border border-border/60 [&_svg]:h-4 [&_svg]:w-4",
      className
    )}
    {...props}
  />
));
StatCardIcon.displayName = "StatCardIcon";

const StatCardValue = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-2xl font-bold tracking-tight text-foreground", className)}
    {...props}
  />
));
StatCardValue.displayName = "StatCardValue";

export interface StatCardTrendProps extends React.HTMLAttributes<HTMLDivElement> {
  trend?: "up" | "down" | "neutral";
  value?: string | number;
}

const StatCardTrend = React.forwardRef<HTMLDivElement, StatCardTrendProps>(
  ({ className, trend = "neutral", value, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 text-xs font-medium rounded-md px-1.5 py-0.5",
          trend === "up" && "text-success bg-success/10",
          trend === "down" && "text-destructive bg-destructive/10",
          trend === "neutral" && "text-muted-foreground bg-muted",
          className
        )}
        {...props}
      >
        {trend === "up" && <ArrowUpRight className="h-3 w-3" />}
        {trend === "down" && <ArrowDownRight className="h-3 w-3" />}
        {trend === "neutral" && <Minus className="h-3 w-3" />}
        {value ? <span>{value}</span> : children}
      </div>
    );
  }
);
StatCardTrend.displayName = "StatCardTrend";

const StatCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground mt-2 flex items-center gap-2", className)}
    {...props}
  />
));
StatCardDescription.displayName = "StatCardDescription";

export {
  StatCard,
  StatCardHeader,
  StatCardTitle,
  StatCardIcon,
  StatCardValue,
  StatCardTrend,
  StatCardDescription,
  statCardVariants,
};
