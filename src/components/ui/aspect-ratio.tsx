"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 16 / 9, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: `${(1 / ratio) * 100}%`,
          ...style,
        }}
        className={cn("overflow-hidden rounded-xl bg-muted", className)}
        {...props}
      >
        <div className="absolute inset-0 h-full w-full">{children}</div>
      </div>
    );
  }
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
