"use client";

import * as React from "react";
import { Toaster as SonnerToaster, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-overlay group-[.toaster]:rounded-lg group-[.toaster]:p-4",
          description: "group-[.toast]:text-muted-foreground text-xs mt-1",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:font-medium text-xs rounded-md px-3 py-1.5",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:font-medium text-xs rounded-md px-3 py-1.5",
          error: "group-[.toaster]:border-destructive/30 group-[.toaster]:bg-destructive/5 group-[.toaster]:text-destructive",
          success: "group-[.toaster]:border-success/30 group-[.toaster]:bg-success/5 group-[.toaster]:text-success",
          warning: "group-[.toaster]:border-warning/30 group-[.toaster]:bg-warning/5 group-[.toaster]:text-warning",
          info: "group-[.toaster]:border-info/30 group-[.toaster]:bg-info/5 group-[.toaster]:text-info",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
