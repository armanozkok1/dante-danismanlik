"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 rounded-full select-none",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full rounded-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium border border-border/60",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export interface AvatarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Rozet rengi veya durumu (örn: "online", "busy", "away", "offline") */
  status?: "online" | "busy" | "away" | "offline";
}

/**
 * Avatarın sağ alt köşesine durum (online/offline) veya bildirim noktası ekler.
 */
const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ className, status = "online", children, ...props }, ref) => {
    const statusClasses = {
      online: "bg-emerald-500",
      busy: "bg-rose-500",
      away: "bg-amber-500",
      offline: "bg-zinc-400 dark:bg-zinc-500",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "absolute bottom-0 right-0 z-10 flex h-3 w-3 items-center justify-center rounded-full ring-2 ring-background shadow-xs",
          statusClasses[status],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
AvatarBadge.displayName = "AvatarBadge";

/**
 * Avatar grubunu yan yana gösteren konteyner.
 * Negatif margin ile üst üste binen modern küme görünümü yaratır.
 */
const AvatarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center -space-x-2.5 hover:space-x-1 transition-all duration-200", className)}
      {...props}
    >
      {children}
    </div>
  )
);
AvatarGroup.displayName = "AvatarGroup";

export interface AvatarGroupCountProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number | string;
}

/**
 * Avatar grubunda gösterilmeyen diğer kullanıcıların sayısını (+3, +5 vb.) belirten sayaç balonu.
 */
const AvatarGroupCount = React.forwardRef<HTMLDivElement, AvatarGroupCountProps>(
  ({ className, count, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-semibold text-muted-foreground ring-2 ring-background select-none",
        className
      )}
      {...props}
    >
      {children || (count ? `+${count}` : null)}
    </div>
  )
);
AvatarGroupCount.displayName = "AvatarGroupCount";

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
};
