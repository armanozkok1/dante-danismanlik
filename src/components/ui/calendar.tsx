"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = DayPickerProps;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      // navLayout="around" → oklar MonthCaption içinde < Ay Yıl > konumlanır
      navLayout="around"
      className={cn(
        "w-[308px] select-none rounded-xl border border-border bg-card p-4 shadow-sm",
        className
      )}
      classNames={{
        /* ── Ay yapısı ─────────────────────────── */
        months: "flex flex-col gap-4",
        month: "relative flex flex-col gap-3",

        /* ── Başlık: < August 2026 >  ──────────── */
        month_caption:
          "flex items-center justify-center h-9 px-9",
        caption_label:
          "text-sm font-semibold text-foreground tracking-tight",

        /* ── Önceki / Sonraki butonlar (around modda
             bunlar MonthCaption içinde absolute olarak
             zaten renderlanır, biz sadece stilini atıyoruz) */
        button_previous: cn(
          "absolute left-1 top-1",
          "inline-flex items-center justify-center rounded-md",
          "h-7 w-7 shrink-0",
          "text-muted-foreground border border-border bg-transparent",
          "hover:bg-muted hover:text-foreground",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "transition-colors duration-150"
        ),
        button_next: cn(
          "absolute right-1 top-1",
          "inline-flex items-center justify-center rounded-md",
          "h-7 w-7 shrink-0",
          "text-muted-foreground border border-border bg-transparent",
          "hover:bg-muted hover:text-foreground",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "transition-colors duration-150"
        ),

        /* ── Hafta günü başlıkları ─────────────── */
        weekdays: "grid grid-cols-7",
        weekday:
          "h-8 flex items-center justify-center text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider",

        /* ── Hafta satırları ───────────────────── */
        weeks: "flex flex-col gap-0.5",
        week: "grid grid-cols-7",

        /* ── Gün hücresi (td) ─────────────────── */
        day: "flex items-center justify-center",

        /* ── Gün butonu (button) ──────────────── */
        day_button: cn(
          "flex items-center justify-center",
          "h-8 w-8 rounded-md",
          "text-[13px] font-normal leading-none",
          "text-foreground bg-transparent",
          "hover:bg-muted",
          "transition-colors duration-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        ),

        /* ── Seçili gün ──────────────────────── */
        selected: cn(
          "[&>button]:bg-primary [&>button]:text-primary-foreground",
          "[&>button]:hover:bg-primary/90",
          "[&>button]:font-medium"
        ),

        /* ── Bugün ────────────────────────────── */
        today: cn(
          "[&:not([data-selected])>[button]]:ring-1",
          "[&:not([data-selected])>[button]]:ring-primary/50",
          "[&:not([data-selected])>[button]]:font-semibold",
          "[&:not([data-selected])>[button]]:text-primary"
        ),

        /* ── Ay dışı günler ───────────────────── */
        outside: "opacity-25 pointer-events-none",

        /* ── Range ────────────────────────────── */
        range_start:
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:rounded-r-none",
        range_middle:
          "bg-primary/10 [&>button]:rounded-none [&>button]:text-foreground",
        range_end:
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:rounded-l-none",

        /* ── Diğer ────────────────────────────── */
        disabled: "opacity-25 cursor-not-allowed pointer-events-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
