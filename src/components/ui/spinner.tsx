"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        lg: "h-6 w-6",
        xl: "h-8 w-8",
      },
      variant: {
        default: "text-primary",
        muted: "text-muted-foreground",
        white: "text-white",
        inherit: "text-current",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  /** Ekran okuyucu için etiket */
  label?: string;
}

function Spinner({ className, size, variant, label = "Yükleniyor...", ...props }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} {...props}>
      <span
        className={cn(spinnerVariants({ size, variant }), "block", className)}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export { Spinner, spinnerVariants };
