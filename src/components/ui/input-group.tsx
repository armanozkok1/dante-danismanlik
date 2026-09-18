"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex items-center w-full rounded-lg border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all overflow-hidden",
      className
    )}
    {...props}
  />
));
InputGroup.displayName = "InputGroup";

interface InputAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "left" | "right";
}

const InputAddon = React.forwardRef<HTMLDivElement, InputAddonProps>(
  ({ className, position = "left", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center bg-muted/60 px-3 text-xs text-muted-foreground select-none shrink-0 border-border font-medium h-9",
        position === "left" ? "border-r" : "border-l",
        className
      )}
      {...props}
    />
  )
);
InputAddon.displayName = "InputAddon";

export { InputGroup, InputAddon };
