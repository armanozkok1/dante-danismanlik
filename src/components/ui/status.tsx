"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusDotVariants = cva("rounded-full shrink-0", {
  variants: {
    status: {
      online: "bg-emerald-500",
      offline: "bg-neutral-500",
      busy: "bg-rose-500",
      away: "bg-amber-500",
      info: "bg-sky-500",
    },
  },
  defaultVariants: {
    status: "online",
  },
});

const statusContainerVariants = cva("relative inline-flex shrink-0 items-center justify-center", {
  variants: {
    size: {
      sm: "h-1.5 w-1.5",
      default: "h-2 w-2",
      lg: "h-2.5 w-2.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface StatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusDotVariants>,
    VariantProps<typeof statusContainerVariants> {
  /** Canlı darbe (pulse) efekti */
  pulse?: boolean;
  /** Yanında gösterilecek metin etiketi */
  label?: React.ReactNode;
}

const Status = React.forwardRef<HTMLDivElement, StatusProps>(
  ({ className, status, size, pulse = false, label, children, ...props }, ref) => {
    const colorClass = statusDotVariants({ status });

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-2 text-xs font-medium text-foreground", className)}
        {...props}
      >
        <span className={cn(statusContainerVariants({ size }))}>
          {pulse && status !== "offline" && (
            <span
              className={cn(
                "absolute inset-0 rounded-full animate-ping opacity-75",
                colorClass
              )}
            />
          )}
          <span className={cn("relative inline-flex h-full w-full rounded-full", colorClass)} />
        </span>
        {(label || children) && (
          <span className="leading-none">{label || children}</span>
        )}
      </div>
    );
  }
);

Status.displayName = "Status";

export { Status, statusDotVariants, statusContainerVariants };
