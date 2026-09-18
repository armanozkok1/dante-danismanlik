"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const kbdVariants = cva(
  "pointer-events-none inline-flex select-none items-center justify-center gap-1 rounded border border-border bg-muted font-mono font-medium text-muted-foreground transition-colors",
  {
    variants: {
      size: {
        sm: "h-4 min-w-[16px] px-1 text-[10px]",
        default: "h-5 min-w-[20px] px-1.5 text-[11px]",
        lg: "h-6 min-w-[24px] px-2 text-[12px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ size }), className)}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = "Kbd";

export { Kbd, kbdVariants };
