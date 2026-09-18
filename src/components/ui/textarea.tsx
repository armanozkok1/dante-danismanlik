"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label metni */
  label?: string;
  /** Hata mesajı */
  error?: string;
  /** Yardımcı metin */
  hint?: string;
  /** Karakter sayacı göster */
  showCount?: boolean;
  /** Maksimum karakter sayısı (showCount ile birlikte kullanılır) */
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, showCount, maxLength, id, value, onChange, ...props }, ref) => {
    const [charCount, setCharCount] = React.useState(
      typeof value === "string" ? value.length : 0
    );
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium leading-none text-foreground"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : hint
              ? `${textareaId}-hint`
              : undefined
          }
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "text-foreground placeholder:text-muted-foreground",
            "transition-colors duration-150 resize-y",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
        <div className="flex items-center justify-between">
          <div>
            {error && (
              <p id={`${textareaId}-error`} className="text-xs text-destructive" role="alert">
                {error}
              </p>
            )}
            {hint && !error && (
              <p id={`${textareaId}-hint`} className="text-xs text-muted-foreground">
                {hint}
              </p>
            )}
          </div>
          {showCount && maxLength && (
            <p className="text-xs text-muted-foreground ml-auto">
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
