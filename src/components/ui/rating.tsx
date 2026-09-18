"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const ratingVariants = cva("inline-flex items-center gap-1 select-none", {
  variants: {
    size: {
      sm: "[&_svg]:h-3.5 [&_svg]:w-3.5",
      md: "[&_svg]:h-4 [&_svg]:w-4",
      lg: "[&_svg]:h-6 [&_svg]:w-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof ratingVariants> {
  value?: number;
  defaultValue?: number;
  max?: number;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 0,
      max = 5,
      readOnly = false,
      disabled = false,
      size,
      onChange,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const value = isControlled ? controlledValue : uncontrolledValue;

    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const handleSelect = (nextValue: number) => {
      if (readOnly || disabled) return;
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(nextValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (readOnly || disabled) return;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(max, (value || 0) + 1);
        handleSelect(next);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.max(0, (value || 0) - 1);
        handleSelect(next);
      } else if (e.key === "Home") {
        e.preventDefault();
        handleSelect(0);
      } else if (e.key === "End") {
        e.preventDefault();
        handleSelect(max);
      }
    };

    const displayValue = hoverValue !== null ? hoverValue : value;

    return (
      <div
        ref={ref}
        role={readOnly ? "img" : "slider"}
        aria-label={`Değerlendirme: ${value} / ${max}`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        tabIndex={readOnly || disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onMouseLeave={() => setHoverValue(null)}
        className={cn(
          ratingVariants({ size }),
          !readOnly && !disabled && "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md p-0.5",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {Array.from({ length: max }).map((_, index) => {
          const starIndex = index + 1;
          const isFilled = starIndex <= displayValue;

          return (
            <span
              key={index}
              onMouseEnter={() => !readOnly && !disabled && setHoverValue(starIndex)}
              onClick={() => handleSelect(starIndex)}
              className={cn(
                "inline-flex p-0.5 transition-transform duration-100 rounded-sm",
                !readOnly && !disabled && "hover:scale-110 cursor-pointer",
                disabled && "cursor-not-allowed"
              )}
              aria-hidden="true"
            >
              <Star
                className={cn(
                  "transition-colors duration-150",
                  isFilled
                    ? "fill-warning text-warning"
                    : "fill-transparent text-muted-foreground/40"
                )}
              />
            </span>
          );
        })}
      </div>
    );
  }
);
Rating.displayName = "Rating";

export { Rating, ratingVariants };
