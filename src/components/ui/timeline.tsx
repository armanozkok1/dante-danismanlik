"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineItemVariants = cva(
  "relative flex gap-4 pb-8 last:pb-0 group",
  {
    variants: {
      status: {
        default: "[&_[data-timeline-connector]]:bg-border",
        completed: "[&_[data-timeline-connector]]:bg-primary [&_[data-timeline-icon]]:border-primary [&_[data-timeline-icon]]:bg-primary [&_[data-timeline-icon]]:text-primary-foreground",
        active: "[&_[data-timeline-connector]]:bg-border [&_[data-timeline-icon]]:border-primary [&_[data-timeline-icon]]:ring-4 [&_[data-timeline-icon]]:ring-primary/20",
        pending: "[&_[data-timeline-connector]]:bg-border/40 [&_[data-timeline-icon]]:border-border/60 [&_[data-timeline-icon]]:text-muted-foreground",
        error: "[&_[data-timeline-connector]]:bg-destructive/40 [&_[data-timeline-icon]]:border-destructive [&_[data-timeline-icon]]:text-destructive",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {}

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn("flex flex-col relative", className)}
      {...props}
    />
  )
);
Timeline.displayName = "Timeline";

export interface TimelineItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof timelineItemVariants> {}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, status, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(timelineItemVariants({ status }), className)}
      {...props}
    />
  )
);
TimelineItem.displayName = "TimelineItem";

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-timeline-connector=""
    className={cn(
      "absolute left-3.5 top-7 -bottom-1 w-px bg-border group-last:hidden transition-colors",
      className
    )}
    {...props}
  />
));
TimelineConnector.displayName = "TimelineConnector";

export interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: "default" | "completed" | "active" | "pending" | "error";
}

const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ className, status, children, ...props }, ref) => (
    <div
      ref={ref}
      data-timeline-icon=""
      className={cn(
        "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold shadow-xs transition-all",
        status === "completed" && "border-primary bg-primary text-primary-foreground",
        status === "active" && "border-primary ring-4 ring-primary/20 bg-background text-primary",
        status === "error" && "border-destructive bg-destructive/10 text-destructive",
        className
      )}
      {...props}
    >
      {children ||
        (status === "completed" ? (
          <Check className="h-3.5 w-3.5" />
        ) : status === "active" ? (
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        ) : (
          <Circle className="h-2.5 w-2.5 fill-current opacity-40" />
        ))}
    </div>
  )
);
TimelineIcon.displayName = "TimelineIcon";

const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between gap-2", className)}
    {...props}
  />
));
TimelineHeader.displayName = "TimelineHeader";

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("text-xs font-semibold text-foreground tracking-tight", className)}
    {...props}
  />
));
TimelineTitle.displayName = "TimelineTitle";

const TimelineTime = React.forwardRef<
  HTMLTimeElement,
  React.TimeHTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => (
  <time
    ref={ref}
    className={cn("text-[11px] text-muted-foreground", className)}
    {...props}
  />
));
TimelineTime.displayName = "TimelineTime";

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground mt-1 leading-relaxed", className)}
    {...props}
  />
));
TimelineDescription.displayName = "TimelineDescription";

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 pt-0.5", className)} {...props} />
));
TimelineContent.displayName = "TimelineContent";

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineHeader,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
  TimelineContent,
  timelineItemVariants,
};
