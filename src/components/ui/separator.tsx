"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  /** Ayırıcı üzerinde görüntülenecek isteğe bağlı metin veya rozet (örn: "VEYA") */
  label?: React.ReactNode;
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { className, orientation = "horizontal", decorative = true, label, children, ...props },
    ref
  ) => {
    const textContent = label || children;

    if (orientation === "horizontal" && textContent) {
      return (
        <div
          ref={ref}
          role={decorative ? "none" : "separator"}
          aria-orientation="horizontal"
          className={cn("relative flex items-center w-full my-4", className)}
        >
          <div className="flex-grow border-t border-border" />
          <span className="flex-shrink mx-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider bg-background px-2">
            {textContent}
          </span>
          <div className="flex-grow border-t border-border" />
        </div>
      );
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px min-h-[1rem]",
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
